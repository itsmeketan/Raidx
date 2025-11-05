import { useEffect, useMemo, useRef, useState } from "react";

export default function Viewer() {
    const [teamA, setTeamA] = useState({ name: "Team A", score: 0 });
    const [teamB, setTeamB] = useState({ name: "Team B", score: 0 });
    const [commentary, setCommentary] = useState("Waiting for match updates...");
    const [status, setStatus] = useState("Disconnected");
    const [matchId, setMatchId] = useState("");
    const [showJoin, setShowJoin] = useState(true);
    const wsRef = useRef(null);

    const params = useMemo(() => new URLSearchParams(window.location.search), []);
    const urlMatch = params.get("match_id") || "";

    const getToken = () =>
        localStorage.getItem("jwtToken") || localStorage.getItem("token");

    const joinMatch = (id) => {
        if (!id) return;
        const token = getToken();
        if (!token) {
            const currentUrl = encodeURIComponent(window.location.href);
            window.location.href = `/login?returnUrl=${currentUrl}`;
            return;
        }
        setMatchId(id);
        setShowJoin(false);

        const wsProto = location.protocol === "https:" ? "wss:" : "ws:";
        const wsUrl = `${wsProto}//${location.host}/ws/viewer?token=${token}`;
        const ws = new WebSocket(wsUrl);
        wsRef.current = ws;

        ws.onopen = () => {
            ws.send(JSON.stringify({ type: "join", matchId: id }));
            setStatus("Connected");
        };

        ws.onmessage = (evt) => {
            try {
                const data = JSON.parse(evt.data);
                const payload = data.data || data;
                if (payload.teamA) setTeamA((prev) => ({ ...prev, name: payload.teamA.name, score: payload.teamA.score }));
                if (payload.teamB) setTeamB((prev) => ({ ...prev, name: payload.teamB.name, score: payload.teamB.score }));

                const raid = payload.raidDetails || payload.raid || {};
                const line = raid.raider
                    ? `Raid by ${raid.raider}: ${raid.pointsGained || 0} points ${raid.bonusTaken ? "(Bonus taken) " : ""}${raid.superTackle ? "(Super Tackle)" : ""}`
                    : "Waiting for match updates...";
                setCommentary(line);
            } catch (e) {
                console.error("Invalid WS message", e);
            }
        };

        ws.onerror = () => setStatus("Error");
        ws.onclose = () => setStatus("Disconnected");
    };

    useEffect(() => {
        if (urlMatch) {
            setMatchId(urlMatch);
            joinMatch(urlMatch);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div
            style={{
                margin: 0,
                padding: 0,
                fontFamily: "'Segoe UI', sans-serif",
                background: "linear-gradient(145deg, #0f172a, #1e293b)",
                color: "white",
                minHeight: "100vh",
                overflowX: "hidden",
                position: "relative",
            }}
        >
            {/* floating circles */}
            <div style={{ position: "absolute", width: 200, height: 200, top: "5%", left: "5%", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,122,0,.25), transparent)", animation: "floatAnim 6s ease-in-out infinite", zIndex: 0 }} />
            <div style={{ position: "absolute", width: 250, height: 250, bottom: "10%", right: "5%", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,122,0,.25), transparent)", animation: "floatAnim 6s ease-in-out infinite", zIndex: 0 }} />
            <style>{`@keyframes floatAnim{0%,100%{transform:translateY(0)}50%{transform:translateY(-20px)}}`}</style>

            <div className="container" style={{ position: "relative", zIndex: 1, paddingTop: "3rem", paddingBottom: "3rem" }}>
                {showJoin && (
                    <div id="viewer-join" style={{ maxWidth: 600, margin: "0 auto 1rem" }}>
                        <div className="input-group mb-3">
                            <input
                                className="form-control"
                                placeholder="Enter match id to view"
                                value={matchId}
                                onChange={(e) => setMatchId(e.target.value)}
                            />
                            <button className="btn btn-primary" onClick={() => joinMatch(matchId)}>Join</button>
                        </div>
                        <div id="viewer-info" style={{ color: "#facc15", marginBottom: "1rem" }} />
                    </div>
                )}

                {/* status pill */}
                <div style={{ position: "fixed", top: 12, right: 12, zIndex: 9999, color: "#fff" }}>
                    <div style={{ background: "rgba(0,0,0,0.6)", padding: "8px 10px", borderRadius: 8, display: "flex", gap: 10, alignItems: "center" }}>
                        <div>Match: {matchId || "—"}</div>
                        <div style={{ padding: "4px 8px", borderRadius: 6, background: status === "Connected" ? "#10b981" : status === "Error" ? "#ef4444" : "#6b7280", fontWeight: 600 }}>
                            {status}
                        </div>
                    </div>
                </div>

                <div className="scoreboard" style={{ backgroundColor: "rgba(30,41,59,0.95)", padding: "2rem", borderRadius: "1rem", textAlign: "center", boxShadow: "0 0 15px rgba(255,122,0,0.4)" }}>
                    <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#fbbf24", textShadow: "1px 1px 4px black" }}>Live Kabaddi Match</h1>
                    <div className="d-flex justify-content-around mt-4">
                        <div>
                            <h3 style={{ fontSize: "1.75rem", color: "#facc15" }}>{teamA.name}</h3>
                            <p style={{ fontSize: "2rem", fontWeight: "bold", color: "#fff" }}>{teamA.score}</p>
                        </div>
                        <div>
                            <h3 style={{ fontSize: "1.75rem", color: "#facc15" }}>{teamB.name}</h3>
                            <p style={{ fontSize: "2rem", fontWeight: "bold", color: "#fff" }}>{teamB.score}</p>
                        </div>
                    </div>
                </div>

                <div className="commentary mt-4" style={{ marginTop: "2.5rem", backgroundColor: "rgba(255,255,255,0.05)", padding: "1.5rem", borderRadius: ".75rem", backdropFilter: "blur(5px)", border: "1px solid rgba(255,255,255,0.1)" }}>
                    <h4 style={{ color: "#fbbf24", fontWeight: "bold" }}>Live Commentary</h4>
                    <p style={{ fontSize: "1.2rem", marginTop: ".5rem" }}>{commentary}</p>
                </div>
            </div>
        </div>
    );
}
