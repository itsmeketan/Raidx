import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function StartScore() {
    const navigate = useNavigate();

    // ✅ Replicates requireAuth() behavior from auth.js
    useEffect(() => {
        const token =
            localStorage.getItem("jwtToken") ||
            localStorage.getItem("token");

        if (!token) {
            navigate("/login?returnUrl=/startscore");
        }
    }, [navigate]);

    const logoutUser = () => {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div style={{ backgroundColor: "#f3f6f5", minHeight: "100vh" }}>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4">
                <div className="container-fluid">
                    <a className="navbar-brand fw-bold" style={{ color: "#f97316" }}>
                        RaidX
                    </a>

                    <div className="ms-auto d-flex gap-2">
                        <button className="btn btn-outline-danger" onClick={logoutUser}>
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="container text-center" style={{ marginTop: "100px" }}>
                <h1>
                    <span style={{ color: "#f97316" }}>RaidX</span>{" "}
                    <span style={{ color: "#2563eb" }}>Kabaddi</span> Match
                </h1>
                <p className="lead text-secondary">Start a new Kabaddi scoring session.</p>

                <button
                    onClick={() => navigate("/scorer")}
                    className="btn px-5 py-3 mt-4 fs-5"
                    style={{
                        backgroundColor: "#f97316",
                        color: "white",
                    }}
                >
                    Start Match
                </button>
            </div>
        </div>
    );
}
