import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomeAuthenticated() {
    const navigate = useNavigate();
    const [playerName, setPlayerName] = useState("");
    const [userId, setUserId] = useState("");

    useEffect(() => {
        const token =
            localStorage.getItem("jwtToken") ||
            localStorage.getItem("token");

        const uid = localStorage.getItem("userId");
        const uname = localStorage.getItem("name");

        if (!token || !uid) {
            navigate("/login");
            return;
        }

        setUserId(uid);
        setPlayerName(uname || "Player");
    }, []);

    return (
        <div
            style={{
                background: "linear-gradient(145deg, #0f172a, #1e293b)",
                color: "white",
                minHeight: "100vh",
                position: "relative",
                paddingTop: "0px",
            }}
        >
            {/* Floating Circles */}
            <div className="floating-bg circle1"></div>
            <div className="floating-bg circle2"></div>

            {/* Navbar */}
            <nav
                className="navbar navbar-expand-lg navbar-dark"
                style={{
                    backgroundColor: "rgba(0,0,0,0.85)",
                    padding: "1rem 2rem",
                }}
            >
                <div className="container-fluid">

                    <a
                        className="navbar-brand"
                        href="/"
                        style={{ color: "#f97316", fontWeight: "bold", fontSize: "1.8rem" }}
                    >
                        RaidX
                    </a>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navMenu"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navMenu">
                        <ul className="navbar-nav ms-auto align-items-center">
                            <li className="nav-item">
                                <a
                                    className="nav-link d-flex align-items-center"
                                    href={`/player/${userId}`}
                                >
                                    <img
                                        src="/Static/user.png"
                                        alt="Profile"
                                        style={{
                                            width: "32px",
                                            height: "32px",
                                            borderRadius: "50%",
                                            marginRight: "8px",
                                        }}
                                    />
                                    <span className="fw-bold text-primary">{playerName}</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                </div>
            </nav>

            {/* Hero Section */}
            <section className="hero" style={{ textAlign: "center", padding: "100px 20px 60px" }}>
                <h1 style={{ fontSize: "3rem", color: "#fbbf24", textShadow: "2px 2px #000" }}>
                    Welcome to <span className="text-warning">RaidX</span>
                </h1>

                <p style={{ color: "#cbd5e1", fontSize: "1.2rem" }}>
                    India’s Premier Real-Time Kabaddi Scoring & Viewing Platform
                </p>

                <div className="d-flex justify-content-center gap-3 mt-4">
                    <button
                        className="btn btn-orange"
                        onClick={() => navigate(`/matchestype/${userId}`)}
                    >
                        Matches and Tournaments
                    </button>

                    <a href="/viewer" className="btn btn-outline-light">
                        Live Score
                    </a>

                    <a href="/matches" className="btn btn-outline-warning">
                        All Matches Scores
                    </a>
                </div>
            </section>

            {/* ABOUT */}
            <SectionBox
                id="about"
                title="About RaidX"
                paragraphs={[
                    "RaidX is a cutting-edge platform for real-time Kabaddi scoring and match streaming.",
                    "We help players and fans enjoy tournaments digitally — anytime, anywhere.",
                    "Raidx – Apna Game, Apni Pehchaan!",
                ]}
            />

            {/* FEATURES */}
            <section id="features" className="container info-box" data-aos="fade-up">
                <div className="section-title text-center">Features</div>

                <div className="row">
                    <div className="col-md-6" data-aos="fade-right">
                        <h5>For Scorers</h5>
                        <Feature text="Select raiders by clicking on Team A" icon="bi-person-plus" />
                        <Feature text="Select defenders from Team B" icon="bi-shield" />
                        <Feature text="Bonus, Super Tackles, Do or Die logic" icon="bi-plus-circle" />
                        <Feature text="Submit raid result instantly" icon="bi-upload" />
                        <Feature text="Use review mode to fix errors" icon="bi-tools" />
                    </div>

                    <div className="col-md-6" data-aos="fade-left">
                        <h5>For Viewers</h5>
                        <Feature text="Real-time updates on all matches" icon="bi-tv" />
                        <Feature text="Raider and defenders live status" icon="bi-person-check" />
                        <Feature text="Track team performance" icon="bi-bar-chart-line" />
                        <Feature text="Replay & timeline features" icon="bi-clock-history" />
                        <Feature text="Live Textual Commentary" icon="bi-clock-history" />
                    </div>
                </div>
            </section>

            {/* HOW TO USE */}
            <HowToUse />

            {/* CONTACT */}
            <ContactSection />

            {/* FOOTER */}
            <footer className="footer">
                &copy; 2025 RaidX Kabaddi Platform. Built with dedication to India's sport.
            </footer>
        </div>
    );
}

/* ✅ Reusable Components */

function SectionBox({ id, title, paragraphs }) {
    return (
        <section id={id} className="container info-box" data-aos="fade-up">
            <div className="section-title text-center">{title}</div>
            {paragraphs.map((p, idx) => (
                <p key={idx} className="text-center">{p}</p>
            ))}
        </section>
    );
}

function Feature({ text, icon }) {
    return (
        <div className="highlight">
            <i className={`bi ${icon}`}></i>
            {text}
        </div>
    );
}

function HowToUse() {
    return (
        <section id="how-to-use" className="container info-box" data-aos="fade-up">
            <div className="section-title text-center">How to Use</div>

            <div className="row">
                <Step number="1" title="Host a Tournament" text="Click on the Host Match button to start creating your match." />
                <Step number="2" title="Enter Match Details" text="Provide details like venue, date, and time." />
                <Step number="3" title="Host the Match" text="Click Host Now to make your match visible." />
            </div>

            <div className="row">
                <div className="col-md-12 text-center mt-4">
                    <div className="step-box final-step">
                        <h5>Your Match is Live!</h5>
                        <p>Players can now join and start playing.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

function Step({ number, title, text }) {
    return (
        <div className="col-md-4">
            <div className="step-box">
                <div className="step-number">{number}</div>
                <h5>{title}</h5>
                <p>{text}</p>
            </div>
        </div>
    );
}

function ContactSection() {
    return (
        <section id="contact" className="container info-box" data-aos="fade-up">
            <div className="section-title text-center">Contact Us</div>

            <p className="text-center">
                Questions? Reach us at <a href="mailto:chandekarsujal884@gmail.com">Sujal Chandekar (Dev)</a>
            </p>

            <div className="text-center mt-4">
                <p>Follow us on social media:</p>

                <div className="d-flex justify-content-center gap-5">
                    <SocialLink icon="twitter" url="https://twitter.com" />
                    <SocialLink icon="youtube" url="https://youtube.com" />
                    <SocialLink icon="facebook" url="https://facebook.com" />
                    <SocialLink icon="instagram" url="https://instagram.com" />
                </div>
            </div>
        </section>
    );
}

function SocialLink({ icon, url }) {
    return (
        <a href={url} target="_blank" className={`social-icon ${icon}`}>
            <i className={`bi bi-${icon}`}></i>
        </a>
    );
}
