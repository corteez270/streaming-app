"use client";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import AdBox from "./components/AdBox";
import Footer from "./components/Footer";
import Login from "./components/Login";

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/api/videos")
      .then((res) => res.json())
      .then((data) => setVideos(data));
  }, []);

  return (
    <div style={{ backgroundColor: "black", color: "white", minHeight: "100vh" }}>
      {!user ? (
        <Login onLogin={(u) => setUser(u)} />
      ) : (
        <>
          <Header />
          <p style={{ padding: "10px", textAlign: "center" }}>
            Welcome, {user.name}! 🎉
          </p>
          <AdBox />

          {/* 🔎 Search Bar */}
          <div style={{ padding: "20px" }}>
            <input
              type="text"
              placeholder="🔎 Search movies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "none",
                marginBottom: "20px",
                fontSize: "16px",
              }}
            />
          </div>

          <div style={{ padding: "20px" }}>
            <h1>🎬 Movie Collection</h1>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "15px",
                marginTop: "20px",
                padding: "10px",
              }}
            >
              {videos
                .filter((v) =>
                  v.title.toLowerCase().includes(search.toLowerCase())
                )
                .map((video, index) => (
                  <>
                    <div
                      key={video.id}
                      style={{
                        background: "#111",
                        padding: "10px",
                        borderRadius: "8px",
                        transition: "transform 0.3s ease, boxShadow 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.05)";
                        e.currentTarget.style.boxShadow =
                          "0 4px 20px rgba(255,255,255,0.2)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <h3>{video.title}</h3>
                      <video width="100%" controls style={{ borderRadius: "8px" }}>
                        <source src={video.url} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>

                    {/* Middle Ad after 2nd video */}
                    {index === 1 && <AdBox />}
                  </>
                ))}
            </div>
          </div>

          {/* Bottom Ad */}
          <AdBox />
          <Footer />
        </>
      )}
    </div>
  );
}
