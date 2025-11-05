import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        userId: "",
        password: "",
        confirmPassword: "",
        position: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const response = await fetch("/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (response.ok) {
                alert("Signup successful! Please log in.");
                navigate("/login");
            } else {
                const data = await response.json();
                alert(data.error || "Signup failed.");
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong.");
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
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
            }}
        >
            {/* Floating Circles */}
            <div
                className="floating-bg circle1"
                style={{
                    position: "absolute",
                    width: 200,
                    height: 200,
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
                    width: 250,
                    height: 250,
                    bottom: "10%",
                    right: "5%",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(255,122,0,0.3), transparent)",
                    animation: "floatAnim 6s ease-in-out infinite",
                    zIndex: 0,
                }}
            ></div>

            <style>
                {`
          @keyframes floatAnim {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }
        `}
            </style>

            {/* Signup Box */}
            <div
                className="signup-container"
                style={{
                    position: "relative",
                    zIndex: 1,
                    backgroundColor: "rgba(30,41,59,0.95)",
                    padding: "2.5rem",
                    borderRadius: "1rem",
                    boxShadow: "0 0 20px rgba(255,122,0,0.4)",
                    width: "100%",
                    maxWidth: "500px",
                }}
            >
                <h2
                    style={{
                        textAlign: "center",
                        marginBottom: "1.5rem",
                        fontWeight: "bold",
                        color: "#fbbf24",
                        textShadow: "1px 1px 4px black",
                    }}
                >
                    Sign Up for RaidX
                </h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label style={{ color: "#facc15" }}>Full Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="fullName"
                            placeholder="Enter full name"
                            value={form.fullName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label style={{ color: "#facc15" }}>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            placeholder="Enter email"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label style={{ color: "#facc15" }}>User ID</label>
                        <input
                            type="text"
                            className="form-control"
                            name="userId"
                            placeholder="Choose a user ID"
                            value={form.userId}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label style={{ color: "#facc15" }}>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            placeholder="Enter password"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label style={{ color: "#facc15" }}>Confirm Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="confirmPassword"
                            placeholder="Confirm password"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label style={{ color: "#facc15" }}>Playing Position</label>
                        <select
                            className="form-select"
                            name="position"
                            value={form.position}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>
                                Select Position
                            </option>
                            <option value="raider">Raider</option>
                            <option value="defender">Defender</option>
                            <option value="allrounder">All-Rounder</option>
                        </select>
                    </div>

                    <div className="d-grid">
                        <button
                            type="submit"
                            className="btn btn-submit"
                            style={{
                                background: "linear-gradient(45deg, #f97316, #ea580c)",
                                color: "white",
                                fontWeight: "bold",
                                borderRadius: ".5rem",
                            }}
                        >
                            Sign Up
                        </button>
                    </div>
                </form>

                <a href="/" className="back-link" style={{ color: "#94a3b8", fontSize: ".9rem" }}>
                    ← Back to Home
                </a>
            </div>
        </div>
    );
}
