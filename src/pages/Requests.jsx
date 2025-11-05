import { useEffect, useState } from "react";

export default function Requests() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadRequest() {
            try {
                const token =
                    localStorage.getItem("jwtToken") ||
                    localStorage.getItem("token");

                const res = await fetch("/api/request/info", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const json = await res.json();
                setData(json);
            } catch (err) {
                console.error(err);
                alert("Error loading request");
            } finally {
                setLoading(false);
            }
        }

        loadRequest();
    }, []);

    if (loading) {
        return (
            <div
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "linear-gradient(145deg, #0f172a, #1e293b)",
                    color: "white",
                    fontSize: "1.5rem",
                }}
            >
                Loading Request...
            </div>
        );
    }

    if (!data) {
        return (
            <div
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "linear-gradient(145deg, #0f172a, #1e293b)",
                    color: "white",
                    fontSize: "1.3rem",
                }}
            >
                No request found.
            </div>
        );
    }

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "linear-gradient(145deg, #0f172a, #1e293b)",
                color: "white",
                paddingTop: "130px",
                textAlign: "center",
            }}
        >
            <h1 style={{ marginBottom: "20px", color: "#fbbf24" }}>
                Team Request
            </h1>

            {/* MESSAGE CASE */}
            {data.message ? (
                <p style={{ fontSize: "1.2rem" }}>{data.message}</p>
            ) : (
                <>
                    <p style={{ fontSize: "1.2rem" }}>
                        You have a request to join the team:{" "}
                        <span style={{ color: "#f97316", fontWeight: "bold" }}>
                            {data.teamName}
                        </span>
                    </p>

                    {/* YES / NO BUTTONS */}
                    <div
                        style={{
                            marginTop: "30px",
                            display: "flex",
                            justifyContent: "center",
                            gap: "20px",
                        }}
                    >
                        <a
                            href={data.yesURL}
                            className="btn"
                            style={{
                                background: "#22c55e",
                                color: "white",
                                padding: "12px 25px",
                                borderRadius: "10px",
                                fontWeight: "bold",
                                textDecoration: "none",
                            }}
                        >
                            Yes
                        </a>

                        <a
                            href={data.noURL}
                            className="btn"
                            style={{
                                background: "#ef4444",
                                color: "white",
                                padding: "12px 25px",
                                borderRadius: "10px",
                                fontWeight: "bold",
                                textDecoration: "none",
                            }}
                        >
                            No
                        </a>
                    </div>
                </>
            )}
        </div>
    );
}
