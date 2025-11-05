import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Matches() {
    const [matches, setMatches] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadMatches() {
            try {
                const token =
                    localStorage.getItem("jwtToken") ||
                    localStorage.getItem("token");

                const res = await fetch("/api/matches", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await res.json();
                setMatches(data);
            } catch (err) {
                console.error(err);
                alert("Error loading matches");
            }
        }
        loadMatches();
    }, []);

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "linear-gradient(145deg, #0f172a, #1e293b)",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: "100px",
                position: "relative",
            }}
        >
            {/* Floating Background Circles */}
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

            {/* Content Box */}
            <div
                className="matches-container"
                style={{
                    position: "relative",
                    zIndex: 1,
                    backgroundColor: "rgba(30,41,59,0.95)",
                    padding: "2rem 2.5rem",
                    borderRadius: "1rem",
                    boxShadow: "0 0 20px rgba(255,122,0,0.4)",
                    width: "100%",
                    maxWidth: "600px",
                }}
            >
                <h1
                    style={{
                        textAlign: "center",
                        marginBottom: "1.5rem",
                        color: "#fbbf24",
                        textShadow: "1px 1px 4px black",
                    }}
                >
                    All Matches
                </h1>

                <ul style={{ listStyle: "none", padding: 0 }}>
                    {matches.map((m) => (
                        <li
                            key={m.id}
                            style={{
                                marginBottom: "12px",
                                padding: "10px",
                                backgroundColor: "rgba(51,65,85,0.9)",
                                borderRadius: "8px",
                                cursor: "pointer",
                                transition: "0.3s",
                            }}
                            onClick={() => navigate(`/matches/${m.id}`)}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.backgroundColor = "rgba(71,85,105,0.9)")
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.backgroundColor = "rgba(51,65,85,0.9)")
                            }
                        >
                            <span
                                style={{
                                    textDecoration: "none",
                                    color: "#facc15",
                                    fontWeight: "bold",
                                    display: "block",
                                }}
                            >
                                {m.teamA.name} vs {m.teamB.name}
                            </span>
                        </li>
                    ))}
                </ul>

                <div className="text-center mt-4">
                    <button
                        onClick={() => navigate("/")}
                        className="btn"
                        style={{
                            background: "transparent",
                            color: "#94a3b8",
                            fontSize: "0.9rem",
                            textDecoration: "underline",
                        }}
                    >
                        ← Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
}
