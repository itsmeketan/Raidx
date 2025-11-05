import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const MATCH_STORAGE_KEY = "currentMatchId";

export default function useScorerLogic() {
    // ===== State (mirrors app.js) =====
    const [teamA, setTeamA] = useState({ name: "", score: 0, players: [] });
    const [teamB, setTeamB] = useState({ name: "", score: 0, players: [] });
    const [playerStats, setPlayerStats] = useState({});
    const [currentRaidNumber, setCurrentRaidNumber] = useState(1);
    const [selectedRaider, setSelectedRaider] = useState(null);
    const [selectedDefenders, setSelectedDefenders] = useState([]);
    const [bonusTaken, setBonusTaken] = useState(false);
    const [emptyRaidA, setEmptyRaidA] = useState(0);
    const [emptyRaidB, setEmptyRaidB] = useState(0);
    const [matchId, setMatchId] = useState("");
    const [status, setStatus] = useState("Disconnected"); // Connected | Disconnected | Error
    const [overlayOpen, setOverlayOpen] = useState(true);
    const socketRef = useRef(null);

    // ===== Helpers =====
    const getToken = useCallback(() => {
        // auth.js helpers might set both; we mirror that behavior
        return (
            (window.getValidToken && window.getValidToken()) ||
            localStorage.getItem("jwtToken") ||
            localStorage.getItem("token")
        );
    }, []);

    const params = useMemo(() => new URLSearchParams(window.location.search), []);
    const team1Id = params.get("team1_id");
    const team2Id = params.get("team2_id");
    const prefillMatchId = params.get("match_id");
    const team1NameParam = params.get("team1_name");
    const team2NameParam = params.get("team2_name");

    // ===== Turn helpers =====
    const getRaidingTeam = useCallback(
        () => (currentRaidNumber % 2 !== 0 ? "A" : "B"),
        [currentRaidNumber]
    );
    const raidingTeamObj = getRaidingTeam() === "A" ? teamA : teamB;
    const defendingTeamObj = getRaidingTeam() === "A" ? teamB : teamA;

    const canRaid = (team) => {
        const active = team.players.filter((p) => p.status === "in").length;
        return active >= 1 && active <= 7;
    };

    // ===== Init (teams, players, persisted match) =====
    useEffect(() => {
        // If not authenticated, bounce to login with returnUrl
        const jwt = getToken();
        if (!jwt) {
            const currentUrl = encodeURIComponent(window.location.href);
            window.location.href = `/login?returnUrl=${currentUrl}`;
            return;
        }

        (async () => {
            try {
                if (team1Id && team2Id) {
                    const [r1, r2] = await Promise.all([
                        fetch(`/api/team/${team1Id}`),
                        fetch(`/api/team/${team2Id}`),
                    ]);
                    const t1 = await r1.json();
                    const t2 = await r2.json();

                    const selA = JSON.parse(localStorage.getItem("teamA_selected") || "[]");
                    const selB = JSON.parse(localStorage.getItem("teamB_selected") || "[]");

                    const newA = {
                        name: team1NameParam || t1.team_name || "Team A",
                        score: 0,
                        players: selA.map((p) => ({ ...p, status: "in" })),
                    };
                    const newB = {
                        name: team2NameParam || t2.team_name || "Team B",
                        score: 0,
                        players: selB.map((p) => ({ ...p, status: "in" })),
                    };

                    setTeamA(newA);
                    setTeamB(newB);

                    // initialize playerStats
                    const stats = {};
                    [...newA.players, ...newB.players].forEach((p) => {
                        stats[p.id] = {
                            name: p.name,
                            id: p.id,
                            totalPoints: 0,
                            raidPoints: 0,
                            defencePoints: 0,
                            status: p.status,
                        };
                    });
                    setPlayerStats(stats);
                }

                // Prefill match id or restore persisted one
                if (prefillMatchId) {
                    setMatchId(prefillMatchId);
                    setOverlayOpen(true);
                } else {
                    const stored = localStorage.getItem(MATCH_STORAGE_KEY) || "";
                    if (stored) {
                        setMatchId(stored);
                        setOverlayOpen(false);
                        // auto join
                        connectSocketAndJoin(stored);
                    } else {
                        // suggest short id
                        setMatchId(`m-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`);
                        setOverlayOpen(true);
                    }
                }
            } catch (e) {
                console.error("Failed to load teams:", e);
                alert("Error: Failed to load team data.");
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ===== WebSocket =====
    const connectSocketAndJoin = useCallback(
        (mid) => {
            if (socketRef.current) return;
            const jwt = getToken();
            if (!jwt) return;

            const wsProto = location.protocol === "https:" ? "wss:" : "ws:";
            const wsUrl = `${wsProto}//${location.host}/ws/scorer?token=${jwt}`;
            const ws = new WebSocket(wsUrl);
            socketRef.current = ws;

            ws.onopen = () => {
                ws.send(JSON.stringify({ type: "join", matchId: mid }));
                setStatus("Connected");
            };

            ws.onmessage = (evt) => {
                try {
                    const msg = JSON.parse(evt.data);
                    if (msg.type === "requestInit") {
                        const init = {
                            type: "gameStats",
                            data: {
                                teamA: { name: teamA.name, score: teamA.score },
                                teamB: { name: teamB.name, score: teamB.score },
                                playerStats,
                                teamAPlayerIds: teamA.players.map((p) => p.id),
                                teamBPlayerIds: teamB.players.map((p) => p.id),
                                raidNumber: currentRaidNumber,
                                emptyRaidCounts: { teamA: emptyRaidA, teamB: emptyRaidB },
                            },
                        };
                        ws.send(JSON.stringify(init));
                        return;
                    }

                    if (msg.error) {
                        alert(`Server error: ${msg.error}`);
                        return;
                    }

                    const d = msg.data;
                    if (d) {
                        if (d.teamA) setTeamA((prev) => ({ ...prev, score: d.teamA.score ?? prev.score }));
                        if (d.teamB) setTeamB((prev) => ({ ...prev, score: d.teamB.score ?? prev.score }));
                        if (d.playerStats) {
                            setPlayerStats(d.playerStats);
                            // sync statuses into roster
                            setTeamA((prev) => ({
                                ...prev,
                                players: prev.players.map((p) => (d.playerStats[p.id]?.status ? { ...p, status: d.playerStats[p.id].status } : p)),
                            }));
                            setTeamB((prev) => ({
                                ...prev,
                                players: prev.players.map((p) => (d.playerStats[p.id]?.status ? { ...p, status: d.playerStats[p.id].status } : p)),
                            }));
                            // clear selections for any now-out players
                            setSelectedRaider((r) => (r && d.playerStats[r.id]?.status !== "in" ? null : r));
                            setSelectedDefenders((defs) => defs.filter((x) => d.playerStats[x.id]?.status === "in"));
                        }
                        if (d.raidNumber) setCurrentRaidNumber(d.raidNumber);
                        if (d.emptyRaidCounts) {
                            setEmptyRaidA(d.emptyRaidCounts.teamA ?? 0);
                            setEmptyRaidB(d.emptyRaidCounts.teamB ?? 0);
                        }
                        // reset UI for next raid
                        setSelectedRaider(null);
                        setSelectedDefenders([]);
                        setBonusTaken(false);
                    }
                } catch (e) {
                    console.error("Invalid WS message", e);
                }
            };

            ws.onerror = () => setStatus("Error");
            ws.onclose = () => {
                setStatus("Disconnected");
                socketRef.current = null;
            };
        },
        [currentRaidNumber, emptyRaidA, emptyRaidB, getToken, playerStats, teamA, teamB]
    );

    // ===== Actions =====
    const startMatch = useCallback(() => {
        if (!matchId.trim()) return alert("Please enter a match ID");
        try {
            localStorage.setItem(MATCH_STORAGE_KEY, matchId.trim());
        } catch { }
        setOverlayOpen(false);
        connectSocketAndJoin(matchId.trim());
    }, [connectSocketAndJoin, matchId]);

    const copyLink = useCallback(() => {
        const link = `${location.origin}/viewer?match_id=${encodeURIComponent(matchId)}`;
        navigator.clipboard?.writeText(link).then(() => {
            alert("Link copied!");
        }).catch(() => alert("Copy failed. Please copy manually."));
    }, [matchId]);

    const selectPlayer = useCallback((player) => {
        // clicking an IN player from raiding team => raider
        // clicking an IN player from defending team => toggle defender
        const raiding = getRaidingTeam();
        const inRaiding = (raiding === "A" ? teamA : teamB).players.some((p) => p.id === player.id);
        if (!player || player.status !== "in") return;

        if (inRaiding) {
            setSelectedRaider(player);
            setSelectedDefenders([]);
        } else {
            setSelectedDefenders((prev) => {
                const found = prev.some((d) => d.id === player.id);
                if (found) return prev.filter((d) => d.id !== player.id);
                return [...prev, player];
            });
        }
    }, [getRaidingTeam, teamA, teamB]);

    const withSocket = (payloadBuilder) => {
        const ws = socketRef.current;
        if (!selectedRaider) {
            alert("Select a raider.");
            return;
        }
        if (!ws || ws.readyState !== WebSocket.OPEN) {
            alert("Socket not connected");
            return;
        }
        const payload = payloadBuilder();
        ws.send(JSON.stringify(payload));
    };

    const raidSuccessful = useCallback(() => {
        withSocket(() => ({
            raidType: "successful",
            raiderId: selectedRaider.id,
            defenderIds: selectedDefenders.map((d) => d.id),
            raidingTeam: getRaidingTeam(),
            bonusTaken,
            emptyRaidCounts: { teamA: emptyRaidA, teamB: emptyRaidB },
        }));
        // reset empty count for raiding team
        if (getRaidingTeam() === "A") setEmptyRaidA(0);
        else setEmptyRaidB(0);
    }, [bonusTaken, emptyRaidA, emptyRaidB, getRaidingTeam, selectedDefenders, selectedRaider]);

    const defenseSuccessful = useCallback(() => {
        withSocket(() => ({
            raidType: "defense",
            raiderId: selectedRaider.id,
            defenderIds: selectedDefenders.map((d) => d.id),
            raidingTeam: getRaidingTeam(),
            bonusTaken,
            emptyRaidCounts: { teamA: emptyRaidA, teamB: emptyRaidB },
        }));
        if (getRaidingTeam() === "A") setEmptyRaidA(0);
        else setEmptyRaidB(0);
    }, [bonusTaken, emptyRaidA, emptyRaidB, getRaidingTeam, selectedDefenders, selectedRaider]);

    const emptyRaid = useCallback(() => {
        withSocket(() => ({
            raidType: "empty",
            raiderId: selectedRaider.id,
            defenderIds: [],
            raidingTeam: getRaidingTeam(),
            bonusTaken,
            emptyRaidCounts: { teamA: emptyRaidA, teamB: emptyRaidB },
        }));
        if (getRaidingTeam() === "A") setEmptyRaidA((n) => n + 1);
        else setEmptyRaidB((n) => n + 1);
    }, [bonusTaken, emptyRaidA, emptyRaidB, getRaidingTeam, selectedRaider]);

    const handleLobbyTouch = useCallback((touchedPlayer, isRaiderTouchingLobby) => {
        const ws = socketRef.current;
        if (!ws || ws.readyState !== WebSocket.OPEN) {
            alert("Socket not connected");
            return;
        }
        const scoringTeam = isRaiderTouchingLobby ? (getRaidingTeam() === "A" ? "B" : "A") : getRaidingTeam();
        const payload = {
            type: "lobbyTouch",
            data: {
                touchedPlayerId: touchedPlayer?.id,
                isRaider: (getRaidingTeam() === "A" ? teamA : teamB).players.some((p) => p.id === (touchedPlayer?.id)),
                scoringTeam,
            },
        };
        ws.send(JSON.stringify(payload));
    }, [getRaidingTeam, teamA, teamB]);

    const endGame = useCallback(async () => {
        const a = teamA.score, b = teamB.score;
        alert(a > b ? `${teamA.name || "Team A"} wins` : a < b ? `${teamB.name || "Team B"} wins` : "It was a tie");

        const token = getToken();
        if (!token) {
            window.location.href = "/login";
            return;
        }
        try { localStorage.removeItem(MATCH_STORAGE_KEY); } catch { }

        const res = await fetch(`/endgame?match_id=${encodeURIComponent(matchId)}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) window.location.href = `/matches?token=${encodeURIComponent(token)}`;
        else alert("Failed to end game. Please try again.");
    }, [getToken, matchId, teamA.name, teamA.score, teamB.name, teamB.score]);

    // ===== Derived text for UI =====
    const currentRaidText = useMemo(() => {
        const raidTeam = getRaidingTeam() === "A" ? teamA : teamB;
        if (!selectedRaider) return `**${raidTeam.name}** to raid. Select a raider.`;
        const defs = selectedDefenders.map((d) => d.name).join(", ");
        return `Raider (**${selectedRaider.name}** from ${raidTeam.name}), Defended By: ${defs || "No defenders selected"}`;
    }, [getRaidingTeam, selectedDefenders, selectedRaider, teamA, teamB]);

    const raidNumberLine = useMemo(() => {
        const raidTeam = getRaidingTeam() === "A" ? teamA : teamB;
        const emptyCount = raidTeam.name === teamA.name ? emptyRaidA : emptyRaidB;
        const kind = emptyCount === 2 ? "🔴 Do or Die Raid" : "Normal Raid";
        return `Raid: **${currentRaidNumber}** | Turn: **${raidTeam.name}** | Status: **${kind}**`;
    }, [currentRaidNumber, emptyRaidA, emptyRaidB, getRaidingTeam, teamA, teamB]);

    const bonusDisabled = useMemo(() => {
        // Bonus only if defending team has >= 6 IN players
        const defending = getRaidingTeam() === "A" ? teamB : teamA;
        const inCount = defending.players.filter((p) => p.status === "in").length;
        return inCount < 6;
    }, [getRaidingTeam, teamA, teamB]);

    return {
        // state
        teamA, teamB, status, matchId, overlayOpen, currentRaidNumber, bonusTaken,
        selectedRaider, selectedDefenders, currentRaidText, raidNumberLine, bonusDisabled,
        // setters
        setBonusTaken, setMatchId, setOverlayOpen,
        // actions
        startMatch, copyLink, selectPlayer, raidSuccessful, defenseSuccessful, emptyRaid, handleLobbyTouch, endGame,
    };
}
