import { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleLogin(e) {
        e.preventDefault();

        if (!email.trim() || !password.trim()) {
            setErrorMsg("Email and password are required");
            return;
        }

        setErrorMsg("");
        setLoading(true);

        try {
            const response = await fetch("/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok && data.token) {
                // Save token
                localStorage.setItem("token", data.token);
                localStorage.setItem("jwtToken", data.token);

                // Redirect
                const params = new URLSearchParams(window.location.search);
                const returnUrl = params.get("returnUrl");
                window.location.href = returnUrl || `/home1/${data.user_id}`;
            } else {
                setErrorMsg(data.error || "Login failed. Please try again.");
            }
        } catch (err) {
            setErrorMsg("An error occurred. Please try again.");
        }

        setLoading(false);
    }

    return (
        <div
            style={{
                margin: 0,
                padding: 0,
                height: "100vh",
                overflow: "hidden",
                background: "linear-gradient(145deg, #0f172a, #1e293b)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                color: "white",
                fontFamily: "'Segoe UI', sans-serif",
            }}
        >

            {/* Floating Circles */}
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

            {/* LOGIN FORM */}
            <div
                className="login-container"
                style={{
                    position: "relative",
                    zIndex: 1,
                    backgroundColor: "rgba(30, 41, 59, 0.95)",
                    padding: "2.5rem",
                    borderRadius: "1rem",
                    boxShadow: "0 0 20px rgba(255, 122, 0, 0.4)",
                    width: "100%",
                    maxWidth: "420px",
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
                    Login to RaidX
                </h2>

                <form onSubmit={handleLogin}>
                    {/* Email */}
                    <div className="mb-3">
                        <label htmlFor="email" style={{ color: "#facc15" }}>
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Enter your email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ borderRadius: "0.5rem" }}
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-3">
                        <label htmlFor="password" style={{ color: "#facc15" }}>
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Enter your password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ borderRadius: "0.5rem" }}
                        />
                    </div>

                    {/* Error Message */}
                    {errorMsg && (
                        <div className="alert alert-danger">{errorMsg}</div>
                    )}

                    {/* Submit Button */}
                    <div className="d-grid gap-2">
                        <button
                            type="submit"
                            className="btn btn-submit"
                            disabled={loading}
                            style={{
                                background: "linear-gradient(45deg, #f97316, #ea580c)",
                                color: "white",
                                borderRadius: "0.5rem",
                                fontWeight: "bold",
                                boxShadow: "0 4px 15px rgba(255,87,34,0.5)"
                            }}
                        >
                            {loading ? "Processing..." : "Login"}
                        </button>

                        <button
                            type="button"
                            className="btn btn-link"
                            onClick={() => (window.location.href = "/forgot-password")}
                            style={{ color: "#facc15" }}
                        >
                            Forgot Password?
                        </button>
                    </div>
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
                        textDecoration: "none",
                    }}
                >
                    ← Back to Home
                </a>
            </div>
        </div>
    );
}
