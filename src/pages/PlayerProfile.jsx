import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PlayerProfile() {
    const { id } = useParams(); // playerId from URL
    const [player, setPlayer] = useState(null);

    useEffect(() => {
        async function fetchPlayer() {
            try {
                const token =
                    localStorage.getItem("jwtToken") ||
                    localStorage.getItem("token");

                const res = await fetch(`/api/player/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await res.json();
                setPlayer(data);
            } catch (err) {
                console.error(err);
                alert("Error loading player profile");
            }
        }
        fetchPlayer();
    }, [id]);

    if (!player) {
        return (
            <div style={{ padding: "100px", textAlign: "center", color: "white" }}>
                Loading Player Profile...
            </div>
        );
    }

    return (
        <div
            style={{
                background: "linear-gradient(145deg, #0f172a, #1e293b)",
                minHeight: "100vh",
                color: "white",
                paddingTop: "120px",
                position: "relative",
            }}
        >
            {/* Floating BG */}
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
                    animation: "floatAnim 6s infinite",
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
                    animation: "floatAnim 6s infinite",
                    zIndex: 0,
                }}
            ></div>

            {/* Player Profile Header */}
            <section
                className="player-profile"
                style={{
                    textAlign: "center",
                    padding: "80px 20px 60px",
                    background:
                        "url('https://cdn.pixabay.com/photo/2022/01/15/05/45/silhouette-6939270_1280.png') no-repeat center bottom",
                    backgroundSize: "contain",
                }}
            >
                <h1 style={{ fontSize: "3rem", color: "#fbbf24", textShadow: "2px 2px #000" }}>
                    {player.fullName}
                </h1>
                <p>Email: {player.email}</p>

                {/* Player Info Box */}
                <div
                    className="player-info-box"
                    style={{
                        backgroundColor: "#1e293b",
                        padding: "40px 30px",
                        borderRadius: "20px",
                        marginTop: "50px",
                        boxShadow: "0 0 40px rgba(255,255,255,0.05)",
                    }}
                >
                    <h5 style={{ color: "#facc15", marginBottom: "30px" }}>Player Information</h5>

                    {/* Top Details */}
                    <div className="player-details" style={{ display: "flex", justifyContent: "space-around", marginBottom: "30px" }}>
                        <DetailCard title="User ID" value={player.userId} />
                        <DetailCard title="Position" value={player.position} />
                        <DetailCard title="Joined At" value={player.createdAt} />
                    </div>

                    {/* Stats */}
                    <h5 style={{ color: "#facc15", marginBottom: "20px" }}>Other Stats</h5>

                    <div className="player-details" style={{ display: "flex", justifyContent: "space-around" }}>
                        <DetailCard title="Total Points" value={player.totalPoints} />
                        <DetailCard title="Raid Points" value={player.raidPoints} />
                        <DetailCard title="Defence Points" value={player.defencePoints} />
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer
                className="footer"
                style={{
                    background: "#0f172a",
                    textAlign: "center",
                    padding: "30px",
                    color: "#94a3b8",
                    fontSize: "14px",
                    marginTop: "40px",
                }}
            >
                © 2025 RaidX Kabaddi Platform · All Rights Reserved
            </footer>
        </div>
    );
}

/* ✅ Card Component */
function DetailCard({ title, value }) {
    return (
        <div
            className="detail-card"
            style={{
                backgroundColor: "#334155",
                padding: "20px",
                borderRadius: "15px",
                width: "25%",
                textAlign: "center",
                boxShadow: "0 0 15px rgba(255,255,255,0.1)",
            }}
        >
            <h6 style={{ fontSize: "1.3rem", color: "#fbbf24" }}>{title}</h6>
            <p style={{ color: "#cbd5e1" }}>{value}</p>
        </div>
    );
}
