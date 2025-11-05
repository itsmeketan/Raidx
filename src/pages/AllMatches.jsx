import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function AllMatches() {
    const { matchId } = useParams();
    const navigate = useNavigate();

    const [teamA, setTeamA] = useState(null);
    const [teamB, setTeamB] = useState(null);
    const [playerStats, setPlayerStats] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchMatch() {

            try {
                const token =
                    localStorage.getItem("jwtToken") ||
                    localStorage.getItem("token");

                const res = await fetch(`/api/match/${matchId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const data = await res.json();

                if (!res.ok) {
                    console.error("Error:", data);
                    alert("Failed to load match data");
                    return;
                }

                setTeamA(data.teamA);
                setTeamB(data.teamB);
                setPlayerStats(data.playerStats || []);
            } catch (err) {
                console.error(err);
                alert("Something went wrong!");
            }

            setLoading(false);
        }

        fetchMatch();
    }, [matchId]);


    if (loading) {
        return (
            <div style={{ color: "white", padding: "50px", textAlign: "center" }}>
                Loading match results...
            </div>
        );
    }

    if (!teamA || !teamB) {
        return (
            <div style={{ color: "white", padding: "50px", textAlign: "center" }}>
                Match data not available.
            </div>
        );
    }

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "linear-gradient(145deg, #0f172a, #1e293b)",
                color: "white",
                position: "relative",
                paddingTop: "100px",
                paddingBottom: "60px",
            }}
        >

            {/* FLOATING CIRCLES */}
            <div
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


            {/* MAIN CONTENT */}
            <div className="container" style={{ position: "relative", zIndex: 1 }}>
                <h1 className="text-center mb-4" style={{ color: "#facc15" }}>
                    Match Summary
                </h1>

                {/* Team Score Cards */}
                <div className="row justify-content-center text-center mb-5">
                    <div className="col-md-4">
                        <div
                            style={{
                                backgroundColor: "#1e293b",
                                padding: "20px",
                                borderRadius: "12px",
                                boxShadow: "0 0 20px rgba(255,255,255,0.1)"
                            }}
                        >
                            <h4 style={{ color: "#f97316" }}>{teamA.name}</h4>
                            <h2 style={{ color: "#facc15" }}>{teamA.score}</h2>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div
                            style={{
                                backgroundColor: "#1e293b",
                                padding: "20px",
                                borderRadius: "12px",
                                boxShadow: "0 0 20px rgba(255,255,255,0.1)"
                            }}
                        >
                            <h4 style={{ color: "#3b82f6" }}>{teamB.name}</h4>
                            <h2 style={{ color: "#facc15" }}>{teamB.score}</h2>
                        </div>
                    </div>
                </div>

                {/* Player Stats Table */}
                <div
                    style={{
                        backgroundColor: "#1e293b",
                        padding: "30px",
                        borderRadius: "16px",
                        boxShadow: "0 0 30px rgba(255,255,255,0.1)"
                    }}
                >
                    <h3 className="text-center mb-4" style={{ color: "#fbbf24" }}>
                        Player Performance
                    </h3>

                    <div className="table-responsive">
                        <table className="table table-dark table-striped text-center">
                            <thead>
                                <tr>
                                    <th>Player</th>
                                    <th>Raid Points</th>
                                    <th>Defense Points</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {playerStats.map((p, idx) => (
                                    <tr key={idx}>
                                        <td>{p.name}</td>
                                        <td>{p.raidPoints}</td>
                                        <td>{p.defencePoints}</td>
                                        <td>{p.totalPoints}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Buttons */}
                <div className="text-center mt-5 d-flex justify-content-center gap-4">
                    <button
                        className="btn"
                        style={{
                            backgroundColor: "#f97316",
                            color: "white",
                            padding: "10px 25px",
                            borderRadius: "8px",
                            fontWeight: "bold",
                        }}
                        onClick={() => navigate("/")}
                    >
                        Back to Home
                    </button>

                    <button
                        className="btn"
                        style={{
                            backgroundColor: "#3b82f6",
                            color: "white",
                            padding: "10px 25px",
                            borderRadius: "8px",
                            fontWeight: "bold",
                        }}
                        onClick={() => navigate("/startscore")}
                    >
                        Start Another Match
                    </button>
                </div>

            </div>

        </div>
    );
}
