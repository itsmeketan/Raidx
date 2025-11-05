import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function SelectTeams() {
    const { id } = useParams(); // this is playerId coming from URL
    const [teams, setTeams] = useState([]);
    const [team1, setTeam1] = useState("");
    const [team2, setTeam2] = useState("");
    const navigate = useNavigate();

    // Load available teams
    useEffect(() => {
        async function loadTeams() {
            try {
                const token =
                    localStorage.getItem("jwtToken") ||
                    localStorage.getItem("token");

                const res = await fetch("/api/teams", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await res.json();
                setTeams(data);
            } catch (err) {
                console.error("Failed to load teams:", err);
            }
        }

        loadTeams();
    }, []);

    // Check both selections before enabling button
    const isValid = team1 && team2 && team1 !== team2;

    // Handle Start Match
    function handleStart() {
        const t1 = teams.find(t => String(t.id) === team1);
        const t2 = teams.find(t => String(t.id) === team2);

        if (!t1 || !t2) {
            alert("Could not find selected teams.");
            return;
        }

        const params = new URLSearchParams({
            team_id: t1.id,
            team_key: "teamA_selected",
            team1_id: t1.id,
            team1_name: t1.team_name,
            team2_id: t2.id,
            team2_name: t2.team_name,
        });

        navigate(`/playerselection/${id}?${params.toString()}`);
    }

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "linear-gradient(145deg, #0f172a, #1e293b)",
                color: "white",
                overflowX: "hidden",
                paddingTop: "80px",
                position: "relative",
            }}
        >
            {/* Floating Background Animation */}
            <div
                style={{
                    position: "absolute",
                    width: "200px",
                    height: "200px",
                    top: "10%",
                    left: "5%",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(255,122,0,0.3), transparent)",
                    animation: "floatAnim 9s ease-in-out infinite",
                    zIndex: 0,
                }}
            ></div>

            <div
                style={{
                    position: "absolute",
                    width: "250px",
                    height: "250px",
                    bottom: "10%",
                    right: "5%",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(255,122,0,0.3), transparent)",
                    animation: "floatAnim 9s ease-in-out infinite",
                    zIndex: 0,
                }}
            ></div>

            {/* Select Box Section */}
            <section
                style={{
                    padding: "80px 20px",
                    position: "relative",
                    zIndex: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <h2
                    style={{
                        color: "#facc15",
                        fontSize: "2.5rem",
                        marginBottom: "10px",
                    }}
                >
                    <i className="bi bi-people-fill me-2"></i>
                    Select Teams for RaidX Match
                </h2>

                <div
                    style={{
                        backgroundColor: "rgba(255,255,255,0.05)",
                        padding: "2rem",
                        borderRadius: "1rem",
                        boxShadow: "0 0 30px rgba(255,166,0,0.15)",
                        maxWidth: "900px",
                        width: "100%",
                    }}
                >
                    <div className="row g-4">

                        {/* TEAM A */}
                        <div className="col-md-6">
                            <label className="form-label">Team A</label>
                            <select
                                className="form-select"
                                value={team1}
                                onChange={(e) => setTeam1(e.target.value)}
                                style={{
                                    backgroundColor: "#1e293b",
                                    color: "white",
                                    boxShadow: "0 0 5px #f97316",
                                }}
                            >
                                <option value="">Select Team A</option>
                                {teams.map((team) => (
                                    <option key={team.id} value={team.id}>
                                        {team.team_name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* TEAM B */}
                        <div className="col-md-6">
                            <label className="form-label">Team B</label>
                            <select
                                className="form-select"
                                value={team2}
                                onChange={(e) => setTeam2(e.target.value)}
                                style={{
                                    backgroundColor: "#1e293b",
                                    color: "white",
                                    boxShadow: "0 0 5px #f97316",
                                }}
                            >
                                <option value="">Select Team B</option>
                                {teams.map((team) => (
                                    <option key={team.id} value={team.id}>
                                        {team.team_name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* BUTTON */}
                        <div className="col-12 d-flex justify-content-center">
                            <button
                                className="btn btn-orange mt-3"
                                onClick={handleStart}
                                disabled={!isValid}
                                style={{
                                    backgroundColor: isValid ? "#f97316" : "#6b7280",
                                    color: "white",
                                    borderRadius: "30px",
                                    padding: "0.75rem 1.5rem",
                                    fontSize: "1.1rem",
                                    fontWeight: 600,
                                    width: "50%",
                                    boxShadow: isValid ? "0 0 15px #f9731690" : "none",
                                }}
                            >
                                Start Match
                            </button>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
}
