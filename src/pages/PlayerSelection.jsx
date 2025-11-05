import { useEffect, useState } from "react";
import { useSearchParams, useParams } from "react-router-dom";

export default function PlayerSelection() {
    const [searchParams] = useSearchParams();
    const { playerId } = useParams();

    const teamId = searchParams.get("team_id");
    const teamKey = searchParams.get("team_key");
    const team1Id = searchParams.get("team1_id");
    const team2Id = searchParams.get("team2_id");
    const team1Name = searchParams.get("team1_name");

    const [teamName, setTeamName] = useState("");
    const [players, setPlayers] = useState([]);
    const [selectedPlayers, setSelectedPlayers] = useState([]);

    // ✅ LOAD TEAM + PLAYERS
    useEffect(() => {
        const token =
            localStorage.getItem("token") ||
            localStorage.getItem("jwtToken");

        fetch(`/api/team/${teamId}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((team) => {
                setTeamName(team.team_name);
                setPlayers(team.players);
            })
            .catch((err) => console.error("Failed to load team:", err));
    }, [teamId]);

    // ✅ TOGGLE PLAYER CHECKBOX
    const togglePlayer = (player) => {
        const exists = selectedPlayers.find((p) => p.id === player.id);

        if (exists) {
            setSelectedPlayers(
                selectedPlayers.filter((p) => p.id !== player.id)
            );
        } else {
            if (selectedPlayers.length >= 7) {
                alert("You must select exactly 7 players.");
                return;
            }
            setSelectedPlayers([...selectedPlayers, player]);
        }
    };

    // ✅ FORM SUBMIT
    const handleSubmit = (e) => {
        e.preventDefault();

        if (selectedPlayers.length !== 7) {
            alert("You must select exactly 7 players.");
            return;
        }

        // SAVE SELECTED PLAYERS
        localStorage.setItem(teamKey, JSON.stringify(selectedPlayers));

        const token =
            localStorage.getItem("jwtToken") || localStorage.getItem("token");

        // ✅ TEAM A FIRST → redirect to next team
        if (teamKey === "teamA_selected") {
            window.location.href = `/playerselection/${playerId}?team_id=${team2Id}&team_key=teamB_selected&team1_id=${team1Id}&team2_id=${team2Id}&team1_name=${encodeURIComponent(teamName)}&token=${encodeURIComponent(token)}`;
        }
        // ✅ TEAM B SECOND → go to scorer
        else {
            window.location.href = `/scorer?team1_id=${team1Id}&team2_id=${team2Id}&team1_name=${encodeURIComponent(team1Name)}&team2_name=${encodeURIComponent(teamName)}&token=${encodeURIComponent(token)}`;
        }
    };

    return (
        <div
            style={{
                margin: 0,
                padding: 0,
                fontFamily: "'Segoe UI', sans-serif",
                background: "linear-gradient(145deg, #0f172a, #1e293b)",
                color: "white",
                height: "100vh",
                overflowY: "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
            }}
        >
            {/* FLOATING BACKGROUND CIRCLES */}
            <div
                className="floating-bg circle1"
                style={{
                    position: "absolute",
                    width: "200px",
                    height: "200px",
                    top: "10%",
                    left: "5%",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(255,122,0,0.3), transparent)",
                    animation: "floatAnim 6s ease-in-out infinite",
                    zIndex: 0,
                }}
            ></div>

            <div
                className="floating-bg circle2"
                style={{
                    position: "absolute",
                    width: "250px",
                    height: "250px",
                    bottom: "10%",
                    right: "5%",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(255,122,0,0.3), transparent)",
                    animation: "floatAnim 6s ease-in-out infinite",
                    zIndex: 0,
                }}
            ></div>

            {/* SELECTION BOX */}
            <div
                className="form-container"
                style={{
                    position: "relative",
                    zIndex: 1,
                    backgroundColor: "rgba(30,41,59,0.95)",
                    padding: "2rem",
                    borderRadius: "1rem",
                    boxShadow: "0 0 20px rgba(255,122,0,0.4)",
                    width: "100%",
                    maxWidth: "600px",
                }}
            >
                <h2
                    style={{
                        textAlign: "center",
                        color: "#fbbf24",
                        textShadow: "1px 1px 4px black",
                        marginBottom: "1.5rem",
                    }}
                >
                    Select 7 Players for {teamName}
                </h2>

                <form onSubmit={handleSubmit}>
                    <div id="player-list">
                        {players.map((player) => (
                            <div
                                key={player.id}
                                className="player-checkbox"
                                style={{
                                    backgroundColor: "#1e293b",
                                    padding: "0.75rem",
                                    marginBottom: "0.5rem",
                                    borderRadius: "0.5rem",
                                    cursor: "pointer",
                                }}
                                onClick={() => togglePlayer(player)}
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedPlayers.some((p) => p.id === player.id)}
                                    readOnly
                                    style={{ marginRight: "10px" }}
                                />
                                {player.name}
                            </div>
                        ))}
                    </div>

                    <button
                        type="submit"
                        className="btn btn-submit"
                        style={{
                            width: "100%",
                            background: "linear-gradient(45deg, #f97316, #ea580c)",
                            color: "white",
                            borderRadius: "0.5rem",
                            fontWeight: "bold",
                            marginTop: "1rem",
                        }}
                    >
                        Confirm Selection
                    </button>
                </form>

                <a
                    href="/"
                    className="back-link"
                    style={{
                        display: "block",
                        textAlign: "center",
                        marginTop: "1rem",
                        color: "#94a3b8",
                        fontSize: "0.9rem",
                    }}
                >
                    ← Back to Home
                </a>
            </div>
        </div>
    );
}
