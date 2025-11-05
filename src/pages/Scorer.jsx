import useScorerLogic from "../hooks/useScorerLogic";

export default function Scorer() {
    const {
        teamA, teamB, status, matchId, overlayOpen, currentRaidNumber, bonusTaken,
        selectedRaider, selectedDefenders, currentRaidText, raidNumberLine, bonusDisabled,
        setBonusTaken, setMatchId, setOverlayOpen,
        startMatch, copyLink, selectPlayer, raidSuccessful, defenseSuccessful, emptyRaid, handleLobbyTouch, endGame,
    } = useScorerLogic();

    return (
        <div
            style={{
                fontFamily: "'Segoe UI', sans-serif",
                background: "linear-gradient(145deg, #0f172a, #1e293b)",
                color: "white",
                margin: 0,
                padding: 20,
                minHeight: "100vh",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            {/* blurred colored bg (like body::before) */}
            <div style={{
                position: "fixed", inset: 0, zIndex: -1, opacity: 0.2, filter: "blur(10px)",
                background: "radial-gradient(circle at 20% 20%, #f97316 0%, transparent 30%), radial-gradient(circle at 80% 80%, #dc2626 0%, transparent 30%), radial-gradient(circle at 50% 50%, #0ea5e9 0%, transparent 40%)",
                animation: "bgPulse 10s ease-in-out infinite"
            }} />
            <style>{`@keyframes bgPulse{0%,100%{transform:scale(1);opacity:.2}50%{transform:scale(1.1);opacity:.3}}`}</style>

            {/* top scoreboard */}
            <div
                className="scoreboard-container"
                style={{
                    backgroundColor: "rgba(0,0,0,0.7)",
                    padding: 25,
                    borderRadius: 15,
                    boxShadow: "0 5px 20px rgba(0,0,0,0.7)",
                    marginBottom: 30,
                    width: "90%",
                    maxWidth: 800,
                }}
            >
                <div className="scoreboard" style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                    <div className="team-info" style={{ textAlign: "center" }}>
                        <h5 className="team-name" style={{ fontSize: "1.8rem", color: "#f97316", marginBottom: 8, textShadow: "1px 1px #000" }}>
                            {teamA.name || "Team A"}
                        </h5>
                        <div className="team-score" style={{ fontSize: "3rem", fontWeight: "bold", color: "#fff", textShadow: "2px 2px #000" }}>
                            {teamA.score ?? 0}
                        </div>
                    </div>
                    <div className="vs" style={{ fontSize: "2.5rem", color: "#cbd5e1", margin: "0 30px" }}>VS</div>
                    <div className="team-info" style={{ textAlign: "center" }}>
                        <h5 className="team-name" style={{ fontSize: "1.8rem", color: "#f97316", marginBottom: 8, textShadow: "1px 1px #000" }}>
                            {teamB.name || "Team B"}
                        </h5>
                        <div className="team-score" style={{ fontSize: "3rem", fontWeight: "bold", color: "#fff", textShadow: "2px 2px #000" }}>
                            {teamB.score ?? 0}
                        </div>
                    </div>
                </div>
            </div>

            {/* persistent match status */}
            <div style={{ position: "fixed", top: 12, right: 12, zIndex: 99999, color: "#fff" }}>
                <div style={{ background: "rgba(0,0,0,0.6)", padding: "8px 12px", borderRadius: 8, display: "flex", gap: 8, alignItems: "center" }}>
                    <div>Match: {matchId || "—"}</div>
                    <div style={{
                        padding: "4px 8px", borderRadius: 6, fontWeight: 600,
                        background: status === "Connected" ? "#10b981" : status === "Error" ? "#ef4444" : "#6b7280"
                    }}>{status}</div>
                </div>
            </div>

            {/* match setup overlay */}
            {overlayOpen && (
                <div style={{ position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.6)", zIndex: 9999 }}>
                    <div style={{ background: "#0b1220", color: "#fff", padding: 20, borderRadius: 12, maxWidth: 520, width: "100%", boxShadow: "0 8px 40px rgba(0,0,0,0.6)" }}>
                        <h4 style={{ marginTop: 0 }}>Create / Join Match</h4>
                        <p style={{ color: "#cbd5e1" }}>Enter a match id to join an existing match or accept the generated id.</p>
                        <div className="mb-2">
                            <label className="form-label">Match ID</label>
                            <div className="input-group">
                                <input className="form-control" type="text" value={matchId} onChange={(e) => setMatchId(e.target.value)} />
                                <button className="btn btn-outline-light" type="button" onClick={copyLink}>Copy Link</button>
                            </div>
                        </div>
                        <div className="mb-3">
                            <small style={{ color: "#facc15" }}>{`${location.origin}/viewer?match_id=${encodeURIComponent(matchId || "")}`}</small>
                        </div>
                        <div className="d-flex justify-content-end gap-2">
                            <button className="btn btn-success btn-action" onClick={startMatch}>Start Match</button>
                        </div>
                    </div>
                </div>
            )}

            {/* raid info */}
            <div
                className="raid-info-container"
                style={{
                    backgroundColor: "rgba(30,41,59,0.8)",
                    padding: 20,
                    borderRadius: 12,
                    boxShadow: "0 3px 15px rgba(0,0,0,0.6)",
                    marginBottom: 25,
                    width: "90%",
                    maxWidth: 800,
                    textAlign: "center",
                }}
            >
                <div id="raid-number" style={{ fontSize: "1.4rem", color: "#facc15", marginBottom: 10, fontWeight: "bold" }}>
                    {raidNumberLine}
                </div>
                <div id="current-raid" style={{ color: "#e2e8f0", fontSize: "1.1rem", fontStyle: "italic" }}>{currentRaidText}</div>
            </div>

            {/* teams */}
            <div className="teams-container" style={{ display: "flex", width: "95%", maxWidth: 1000, gap: 25, marginBottom: 30 }}>
                {/* A */}
                <div className="team-section" style={{ flex: 1, backgroundColor: "rgba(51,65,85,0.8)", padding: 20, borderRadius: 15, boxShadow: "0 3px 15px rgba(0,0,0,0.6)" }}>
                    <h5 className="team-header" style={{ color: "#f97316", fontSize: "1.5rem", marginBottom: 18, textAlign: "center", textShadow: "1px 1px #000" }}>
                        {teamA.name || "Team A"}
                    </h5>
                    <div className="players-grid" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {teamA.players.map((p) => {
                            const isRaider = selectedRaider?.id === p.id;
                            const isDef = selectedDefenders.some((d) => d.id === p.id);
                            const base = {
                                backgroundColor: p.status === "in" ? "#64748b" : "#718096",
                                color: "#fff",
                                border: "none",
                                borderRadius: 10,
                                padding: "12px 18px",
                                textAlign: "center",
                                cursor: p.status === "in" ? "pointer" : "not-allowed",
                                fontSize: "1rem",
                                boxShadow: "0 2px 5px rgba(0,0,0,0.4)",
                                opacity: p.status === "in" ? 1 : 0.7,
                                textDecoration: p.status === "in" ? "none" : "line-through",
                            };
                            if (isRaider) base.backgroundColor = "#198754"; // btn-success vibe
                            if (isDef) base.backgroundColor = "#ed8936";     // btn-warning vibe
                            return (
                                <button key={p.id} className="player-card btn" style={base} disabled={p.status !== "in"} onClick={() => selectPlayer(p)}>
                                    {p.name}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* B */}
                <div className="team-section" style={{ flex: 1, backgroundColor: "rgba(51,65,85,0.8)", padding: 20, borderRadius: 15, boxShadow: "0 3px 15px rgba(0,0,0,0.6)" }}>
                    <h5 className="team-header" style={{ color: "#f97316", fontSize: "1.5rem", marginBottom: 18, textAlign: "center", textShadow: "1px 1px #000" }}>
                        {teamB.name || "Team B"}
                    </h5>
                    <div className="players-grid" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {teamB.players.map((p) => {
                            const isRaider = selectedRaider?.id === p.id;
                            const isDef = selectedDefenders.some((d) => d.id === p.id);
                            const base = {
                                backgroundColor: p.status === "in" ? "#64748b" : "#718096",
                                color: "#fff",
                                border: "none",
                                borderRadius: 10,
                                padding: "12px 18px",
                                textAlign: "center",
                                cursor: p.status === "in" ? "pointer" : "not-allowed",
                                fontSize: "1rem",
                                boxShadow: "0 2px 5px rgba(0,0,0,0.4)",
                                opacity: p.status === "in" ? 1 : 0.7,
                                textDecoration: p.status === "in" ? "none" : "line-through",
                            };
                            if (isRaider) base.backgroundColor = "#198754";
                            if (isDef) base.backgroundColor = "#ed8936";
                            return (
                                <button key={p.id} className="player-card btn" style={base} disabled={p.status !== "in"} onClick={() => selectPlayer(p)}>
                                    {p.name}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* action controls */}
            <div className="action-controls-container" style={{ backgroundColor: "rgba(0,0,0,0.7)", padding: 25, borderRadius: 15, boxShadow: "0 5px 20px rgba(0,0,0,0.7)", width: "95%", maxWidth: 1000, marginBottom: 30 }}>
                <div className="action-controls" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-around", gap: 18 }}>
                    <div className="form-check" style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="bonus-toggle"
                            disabled={bonusDisabled}
                            checked={bonusTaken}
                            onChange={(e) => setBonusTaken(e.target.checked)}
                            style={{ width: 40, height: 20, backgroundColor: "#f97316", borderRadius: 20, cursor: "pointer" }}
                        />
                        <label className="form-check-label" htmlFor="bonus-toggle" style={{ color: "#edf2f7", fontSize: "1.1rem" }}>Bonus Point</label>
                    </div>

                    <div className="btn-group">
                        <button className="btn btn-action btn-success" onClick={raidSuccessful} style={btnAction("#38a169")}>Raid Successful</button>
                        <button className="btn btn-action btn-danger" onClick={defenseSuccessful} style={btnAction("#e53e3e")}>Defense Successful</button>
                        <button className="btn btn-action btn-warning" onClick={emptyRaid} style={btnAction("#ed8936")}>Empty Raid</button>
                    </div>

                    <div className="d-flex gap-3">
                        <button className="btn btn-action btn-outline-warning" onClick={() => handleLobbyTouch(selectedRaider, true)} style={btnOutline}>Raider Lobby</button>
                        <button className="btn btn-action btn-outline-info" onClick={() => handleLobbyTouch(selectedDefenders[0], false)} style={btnOutline}>Defender Lobby</button>
                    </div>

                    <button className="btn btn-action btn-dark ms-auto" onClick={endGame} style={{ ...btnAction("#1a202c"), color: "#e2e8f0" }}>End Game</button>
                </div>
            </div>
        </div>
    );
}

const btnAction = (bg) => ({
    backgroundColor: bg, color: "#fff", border: "none", borderRadius: 10,
    padding: "12px 24px", fontWeight: "bold", fontSize: "1.1rem",
    boxShadow: "0 3px 7px rgba(0,0,0,0.6)",
});
const btnOutline = { color: "#facc15", border: "2px solid #facc15", borderRadius: 10, padding: "12px 24px", background: "transparent", fontWeight: "bold" };
