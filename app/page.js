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
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    fetch("/api/videos")
      .then((res) => res.json())
      .then((data) => setVideos(data || []));
  }, []);

  // collect unique categories
  const categories = ["All", ...Array.from(new Set(videos.map(v => v.category || "Uncategorized")) )];

  const filtered = videos
    .filter(v => v.title.toLowerCase().includes(search.toLowerCase()))
    .filter(v => selectedCategory === "All" ? true : (v.category === selectedCategory));

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

          {/* Top Ad */}
          <AdBox />

          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "20px" }}>
            {/* Search + categories */}
            <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12, flexWrap: "wrap" }}>
              <input
                type="text"
                placeholder="🔎 Search movies..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: "8px",
                  border: "none",
                  background: "#0b0f16",
                  color: "#fff",
                  minWidth: 180
                }}
              />

              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    style={{
                      padding: "8px 12px",
                      borderRadius: 8,
                      background: selectedCategory === cat ? "#0070f3" : "transparent",
                      border: "1px solid #222",
                      color: "#fff",
                      cursor: "pointer"
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "16px"
            }}>
              {filtered.map((video) => (
                <div
                  key={video.id}
                  style={{
                    background: "#111",
                    borderRadius: 8,
                    overflow: "hidden",
                    transition: "transform 0.25s ease, box-shadow 0.25s ease",
                    cursor: "pointer"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.03)";
                    e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.6)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {/* Poster */}
                  <div style={{ position: "relative", height: 0, paddingBottom: "56.25%", background: "#222" }}>
                    <img
                      src={video.poster}
                      alt={video.title}
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover"
                      }}
                      onError={(e)=>{ e.currentTarget.src = "https://picsum.photos/400/225"; }}
                    />
                    {/* Play button overlay */}
                    <div
                      onClick={() => setSelectedVideo(video)}
                      style={{
                        position: "absolute",
                        left: 0, right: 0, top: 0, bottom: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontSize: 36,
                        background: "linear-gradient(0deg, rgba(0,0,0,0.0) 30%, rgba(0,0,0,0.4) 100%)",
                        opacity: 1
                      }}
                    >
                      <div style={{
                        width: 70, height: 70, borderRadius: "50%", background: "rgba(0,0,0,0.5)", display: "flex",
                        alignItems: "center", justifyContent: "center", border: "2px solid rgba(255,255,255,0.12)"
                      }}>
                        ►
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div style={{ padding: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                      <strong style={{ fontSize: 14 }}>{video.title}</strong>
                      <span style={{ fontSize: 12, color: "#9aa" }}>{video.category || "—"}</span>
                    </div>

                    <div style={{ display: "flex", gap: 8 }}>
                      <button
                        onClick={() => setSelectedVideo(video)}
                        style={{
                          padding: "8px 12px",
                          background: "#0070f3",
                          border: "none",
                          color: "#fff",
                          borderRadius: 6,
                          cursor: "pointer"
                        }}
                      >
                        Watch
                      </button>

                      <button
                        style={{
                          padding: "8px 12px",
                          background: "transparent",
                          border: "1px solid #222",
                          color: "#fff",
                          borderRadius: 6,
                          cursor: "pointer"
                        }}
                        onClick={() => alert("Renting not implemented yet — we can add this later")}
                      >
                        Rent
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ads & Footer */}
          <div style={{ maxWidth: 1100, margin: "20px auto", padding: "0 20px" }}>
            <AdBox />
          </div>

          <Footer />
        </>
      )}

      {/* Video lightbox */}
      {selectedVideo && (
        <div style={{
          position: "fixed", left: 0, top: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 2000, padding: 20
        }}>
          <div style={{ width: "100%", maxWidth: 1000 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <strong style={{ color: "#fff" }}>{selectedVideo.title}</strong>
              <button onClick={() => setSelectedVideo(null)} style={{
                background: "transparent", color: "#fff", border: "1px solid #333", padding: "6px 10px", borderRadius: 6
              }}>Close</button>
            </div>
            <video src={selectedVideo.url} controls autoPlay style={{ width: "100%", borderRadius: 8 }}>
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </div>
  );
}
