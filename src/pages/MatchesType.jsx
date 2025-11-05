import { useNavigate, useParams } from "react-router-dom";

export default function MatchesType() {
    const navigate = useNavigate();
    const { id } = useParams(); // same as .ID in your Go template

    return (
        <div
            style={{
                minHeight: "100vh",
                backgroundColor: "#1e293b",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: "80px",
            }}
        >
            <div
                className="container"
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "40px",
                }}
            >
                {/* Create Team */}
                <div
                    className="card"
                    onClick={() => navigate(`/createteam/${id}`)}
                    style={cardStyle}
                >
                    <img
                        src="https://img.icons8.com/color/96/teamwork.png"
                        alt="Create Team"
                        style={imgStyle}
                    />
                    <h3 style={titleStyle}>Create Team</h3>
                </div>

                {/* Start Custom Match */}
                <div
                    className="card"
                    onClick={() => navigate(`/selectTeams/${id}`)}
                    style={cardStyle}
                >
                    <img
                        src="https://img.icons8.com/color/96/whistle.png"
                        alt="Start Custom Match"
                        style={imgStyle}
                    />
                    <h3 style={titleStyle}>Start Custom Match</h3>
                </div>

                {/* Create Championship */}
                <div
                    className="card"
                    onClick={() => navigate(`/selectTeams/${id}`)}
                    style={cardStyle}
                >
                    <img
                        src="https://img.icons8.com/color/96/trophy.png"
                        alt="Championship"
                        style={imgStyle}
                    />
                    <h3 style={titleStyle}>Create Championship</h3>
                </div>

                {/* Create Tournament */}
                <div
                    className="card"
                    onClick={() => navigate(`/selectTeams/${id}`)}
                    style={cardStyle}
                >
                    <img
                        src="https://img.icons8.com/color/96/medal.png"
                        alt="Tournament"
                        style={imgStyle}
                    />
                    <h3 style={titleStyle}>Create Tournament</h3>
                </div>
            </div>
        </div>
    );
}

/* ✅ STYLES */
const cardStyle = {
    backgroundColor: "#0f172a",
    borderRadius: "1.5rem",
    padding: "2rem",
    border: "3px solid #fbbf24",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "300px",
    height: "300px",
    cursor: "pointer",
    textAlign: "center",
    transition: "transform 0.3s ease, boxShadow 0.3s ease",
};

const imgStyle = {
    width: "80px",
    height: "80px",
    marginBottom: "20px",
};

const titleStyle = {
    margin: 0,
    fontSize: "24px",
    color: "#f8fafc",
};
