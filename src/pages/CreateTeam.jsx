import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateTeam() {
    const [players, setPlayers] = useState([]);
    const [selected, setSelected] = useState([]);
    const [teamName, setTeamName] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        async function loadPlayers() {
            try {
                const res = await fetch("/players");
                const data = await res.json();
                setPlayers(data);
            } catch (err) {
                console.error("Error loading players:", err);
            }
        }
        loadPlayers();
    }, []);

    function togglePlayer(id) {
        if (selected.includes(id)) {
            setSelected(selected.filter((p) => p !== id));
        } else {
            if (selected.length === 9) {
                alert("You can select only 9 players!");
                return;
            }
            setSelected([...selected, id]);
        }
    }

    async function submitTeam() {
        if (teamName.trim() === "") {
            alert("Enter Team Name");
            return;
        }

        if (selected.length !== 9) {
            alert("You must select exactly 9 players");
            return;
        }

        const payload = {
            teamName: teamName,
            selectedPlayers: selected,
        };

        try {
            const res = await fetch("/saveteam", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                alert("Team created successfully!");
                navigate("/scorer"); // or next page
            } else {
                alert("Failed to save team");
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong");
        }
    }

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "linear-gradient(145deg, #0f172a, #1e293b)",
                color: "white",
                paddingTop: "100px",
            }}
        >
            <div className="container">

                <h1 className="text-center mb-4" style={{ color: "#facc15" }}>
                    Create Your Team
                </h1>

                {/* TEAM NAME INPUT */}
                <div className="mb-4 text-center">
                    <input
                        type="text"
                        placeholder="Enter Team Name"
                        className="form-control text-center"
                        style={{
                            backgroundColor: "#1e293b",
                            color: "white",
                            border: "1px solid #facc15",
                        }}
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                    />
                </div>

                {/* PLAYERS GRID */}
                <div className="row">
                    {players.map((player) => (
                        <div className="col-md-4 mb-3" key={player.id}>
                            <div
                                onClick={() => togglePlayer(player.id)}
                                style={{
                                    backgroundColor: "#1e293b",
                                    padding: "15px",
                                    borderRadius: "12px",
                                    cursor: "pointer",
                                    border: selected.includes(player.id)
                                        ? "3px solid #22c55e"
                                        : "1px solid #334155",
                                    boxShadow: "0 0 15px rgba(255,255,255,0.1)",
                                    transition: "0.3s",
                                }}
                            >
                                <h5 style={{ color: "#f97316" }}>{player.fullName}</h5>
                                <p style={{ color: "#94a3b8" }}>{player.position}</p>
                                <p>Total Points: {player.totalPoints}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* SUBMIT BUTTON */}
                <div className="text-center mt-4">
                    <button
                        className="btn"
                        style={{
                            backgroundColor: "#f97316",
                            color: "white",
                            padding: "12px 30px",
                            borderRadius: "10px",
                            fontWeight: "bold",
                        }}
                        onClick={submitTeam}
                    >
                        Save Team
                    </button>
                </div>

            </div>
        </div>
    );
}
