export default function Navbar() {
    return (
        <nav
            className="navbar navbar-dark"
            style={{
                backgroundColor: "rgba(0,0,0,0.85)",
                padding: "1rem 2rem",
                boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
                width: "100%",
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: 9999,
            }}
        >
            <div className="container-fluid d-flex justify-content-between align-items-center">

                {/* BRAND */}
                <a
                    className="navbar-brand"
                    href="/"
                    style={{
                        fontWeight: "bold",
                        fontSize: "1.8rem",
                        color: "#f97316",
                    }}
                >
                    RaidX
                </a>

                {/* NAV LINKS (ALWAYS VISIBLE) */}
                <ul className="navbar-nav flex-row gap-4" style={{ display: "flex", alignItems: "center" }}>

                    <li className="nav-item">
                        <a className="nav-link" href="/">Home</a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link" href="#about">About</a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link" href="#features">Features</a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link" href="/scorer">Scorer</a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link" href="/viewer">Viewer</a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link" href="#contact">Contact</a>
                    </li>

                    {/* LOGIN BUTTON */}
                    <li className="nav-item ms-3">
                        <a
                            href="/login"
                            className="btn btn-orange btn-sm"
                            style={{
                                backgroundColor: "#f97316",
                                color: "white",
                                borderRadius: "30px",
                                padding: "0.4rem 1.2rem",
                                fontWeight: 600,
                                boxShadow: "0 0 15px #f9731690",
                            }}
                        >
                            Login
                        </a>
                    </li>

                    {/* SIGNUP BUTTON */}
                    <li className="nav-item ms-2">
                        <a
                            href="/signup"
                            className="btn btn-orange btn-sm"
                            style={{
                                backgroundColor: "#f97316",
                                color: "white",
                                borderRadius: "30px",
                                padding: "0.4rem 1.2rem",
                                fontWeight: 600,
                                boxShadow: "0 0 15px #f9731690",
                            }}
                        >
                            Sign Up
                        </a>
                    </li>

                </ul>
            </div>
        </nav>
    );
}
