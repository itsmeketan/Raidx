export default function Home() {
    return (
        <div style={{ position: "relative", zIndex: 1 }}>
            {/* Floating Background Circles */}
            <div
                className="floating-bg circle1"
                style={{
                    position: "absolute",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(255,122,0,0.3), transparent)",
                    animation: "floatAnim 6s ease-in-out infinite",
                    width: "200px",
                    height: "200px",
                    top: "10%",
                    left: "5%",
                    zIndex: 0,
                }}
            ></div>

            <div
                className="floating-bg circle2"
                style={{
                    position: "absolute",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(255,122,0,0.3), transparent)",
                    animation: "floatAnim 6s ease-in-out infinite",
                    width: "250px",
                    height: "250px",
                    bottom: "10%",
                    right: "5%",
                    zIndex: 0,
                }}
            ></div>

            {/* HERO SECTION */}
            <section
                id="hero"
                className="hero"
                data-aos="fade-up"
                style={{
                    textAlign: "center",
                    padding: "100px 20px 60px",
                    background:
                        "url('https://cdn.pixabay.com/photo/2022/01/15/05/45/silhouette-6939270_1280.png') no-repeat center bottom",
                    backgroundSize: "contain",
                }}
            >
                <h1
                    style={{
                        fontSize: "3rem",
                        fontWeight: "bold",
                        color: "#fbbf24",
                        textShadow: "2px 2px #000",
                    }}
                >
                    Welcome to <span className="text-warning">RaidX</span>
                </h1>
                <p style={{ fontSize: "1.2rem", color: "#cbd5e1" }}>
                    India’s Premier Real-Time Kabaddi Scoring & Viewing Platform
                </p>

                <div className="d-flex justify-content-center gap-3 mt-4">
                    <a href="/login" className="btn btn-orange" style={btnOrange}>
                        Login For Matches and Tournaments
                    </a>
                    <a href="/viewer" className="btn btn-outline-light" style={btnOutline}>
                        Live Score
                    </a>
                </div>
            </section>

            {/* ABOUT SECTION */}
            <section
                id="about"
                className="container info-box"
                data-aos="fade-up"
                style={infoBox}
            >
                <div className="section-title text-center" style={sectionTitle}>
                    About RaidX
                </div>
                <p className="text-center">
                    RaidX is a cutting-edge platform for real-time Kabaddi scoring and
                    match streaming. We help players and fans enjoy tournaments digitally
                    — anytime, anywhere.
                </p>
                <p className="text-center">
                    RaidX is revolutionizing Kabaddi by providing real-time scoring, live
                    streaming, and player insights, making the sport more accessible and
                    exciting for fans and players alike.
                </p>
                <p className="text-center">Raidx – Apna Game, Apni Pehchaan!</p>
            </section>

            {/* FEATURES SECTION */}
            <section
                id="features"
                className="container info-box"
                data-aos="fade-up"
                style={infoBox}
            >
                <div className="section-title text-center" style={sectionTitle}>
                    Features
                </div>

                <div className="row">
                    {/* Left */}
                    <div className="col-md-6" data-aos="fade-right">
                        <h5 style={{ color: "#facc15" }}>For Scorers</h5>

                        <div className="highlight" style={highlightBox}>
                            <i className="bi bi-person-plus"></i>Select raiders by clicking on Team A
                        </div>

                        <div className="highlight" style={highlightBox}>
                            <i className="bi bi-shield"></i>Select defenders from Team B
                        </div>

                        <div className="highlight" style={highlightBox}>
                            <i className="bi bi-plus-circle"></i>Bonus, Super Tackles, Do or Die logic
                        </div>

                        <div className="highlight" style={highlightBox}>
                            <i className="bi bi-upload"></i>Submit raid result instantly
                        </div>

                        <div className="highlight" style={highlightBox}>
                            <i className="bi bi-tools"></i>Use review mode to fix errors
                        </div>
                    </div>

                    {/* Right */}
                    <div className="col-md-6" data-aos="fade-left">
                        <h5 style={{ color: "#facc15" }}>For Viewers</h5>

                        <div className="highlight" style={highlightBox}>
                            <i className="bi bi-tv"></i>Real-time updates on all matches
                        </div>

                        <div className="highlight" style={highlightBox}>
                            <i className="bi bi-person-check"></i>Raider and defenders live status
                        </div>

                        <div className="highlight" style={highlightBox}>
                            <i className="bi bi-bar-chart-line"></i>Track team performance
                        </div>

                        <div className="highlight" style={highlightBox}>
                            <i className="bi bi-clock-history"></i>Replay & timeline features
                        </div>

                        <div className="highlight" style={highlightBox}>
                            <i className="bi bi-clock-history"></i>Live Textual Commentary
                        </div>
                    </div>
                </div>
            </section>

            {/* HOW TO USE SECTION */}
            <section
                id="how-to-use"
                className="container info-box"
                data-aos="fade-up"
                style={infoBox}
            >
                <div className="section-title text-center" style={sectionTitle}>
                    How to Use
                </div>

                <div className="row">
                    {/* Step 1 */}
                    <div className="col-md-4" data-aos="fade-right">
                        <div className="step-box" style={stepBox}>
                            <div className="step-number" style={stepNum}>1</div>
                            <h5 style={{ color: "#facc15" }}>Host a Tournament</h5>
                            <p style={{ color: "#cbd5e1" }}>
                                Click on the "Host Match" button on the new page to start creating your match.
                            </p>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="col-md-4" data-aos="fade-up">
                        <div className="step-box" style={stepBox}>
                            <div className="step-number" style={stepNum}>2</div>
                            <h5 style={{ color: "#facc15" }}>Enter Match Details</h5>
                            <p style={{ color: "#cbd5e1" }}>
                                Provide the necessary details like name, venue, date, and time of the match.
                            </p>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="col-md-4" data-aos="fade-left">
                        <div className="step-box" style={stepBox}>
                            <div className="step-number" style={stepNum}>3</div>
                            <h5 style={{ color: "#facc15" }}>Host the Match</h5>
                            <p style={{ color: "#cbd5e1" }}>
                                Click on "Host Now" to make your match visible to teams and viewers.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Final Step */}
                <div className="row">
                    <div className="col-md-12 text-center mt-4" data-aos="fade-up">
                        <div className="step-box final-step" style={finalStep}>
                            <h5>Your Match is Live!</h5>
                            <p>The match session has been successfully created, and players can join to play!</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CONTACT SECTION */}
            <section
                id="contact"
                className="container info-box"
                data-aos="fade-up"
                style={infoBox}
            >
                <div className="section-title text-center" style={sectionTitle}>
                    Contact Us
                </div>

                <p className="text-center">
                    Have questions or feedback? Reach out to us at{" "}
                    <a href="mailto:chandekarsujal884@gmail.com">SujalChandekar (Dev)</a>.
                </p>

                <div className="text-center mt-4">
                    <p>Follow us on social media:</p>

                    <div className="d-flex justify-content-center gap-5">
                        <a href="https://twitter.com" target="_blank" className="social-icon twitter">
                            <i className="bi bi-twitter"></i>
                        </a>

                        <a href="https://youtube.com" target="_blank" className="social-icon youtube">
                            <i className="bi bi-youtube"></i>
                        </a>

                        <a href="https://facebook.com" target="_blank" className="social-icon facebook">
                            <i className="bi bi-facebook"></i>
                        </a>

                        <a href="https://instagram.com" target="_blank" className="social-icon instagram">
                            <i className="bi bi-instagram"></i>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}

/* ========== Inline styles extracted for clean JSX ========== */

const btnOrange = {
    backgroundColor: "#f97316",
    color: "white",
    borderRadius: "30px",
    padding: "0.5rem 1.5rem",
    fontWeight: 600,
    boxShadow: "0 0 15px #f9731690",
};

const btnOutline = {
    borderRadius: "30px",
    padding: "0.5rem 1.5rem",
    fontWeight: 600,
};

const infoBox = {
    backgroundColor: "#1e293b",
    padding: "50px 30px",
    borderRadius: "20px",
    marginTop: "50px",
    boxShadow: "0 0 40px rgba(255,255,255,0.05)",
};

const sectionTitle = {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#facc15",
    marginBottom: "40px",
};

const highlightBox = {
    padding: "15px",
    backgroundColor: "#334155",
    borderRadius: "12px",
    marginBottom: "15px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    color: "#e2e8f0",
};

const stepBox = {
    backgroundColor: "#334155",
    borderRadius: "15px",
    padding: "30px",
    textAlign: "center",
    boxShadow: "0 0 20px rgba(255,255,255,0.1)",
};

const stepNum = {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#fbbf24",
    border: "2px solid #fbbf24",
    borderRadius: "50%",
    padding: "15px",
    width: "60px",
    height: "60px",
    margin: "0 auto",
    marginBottom: "10px",
};

const finalStep = {
    backgroundColor: "#0f172a",
    boxShadow: "0 0 40px rgba(255,255,255,0.1)",
    borderRadius: "15px",
    padding: "40px",
};
