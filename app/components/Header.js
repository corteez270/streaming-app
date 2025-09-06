// app/components/Header.js
"use client";

export default function Header() {
  return (
    <header style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "12px 20px",
      background: "#070814",
      color: "#fff",
      borderBottom: "1px solid rgba(255,255,255,0.03)"
    }}>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <div style={{
          width: 40, height: 40, background: "#fff", color: "#000",
          borderRadius: 8, display: "flex", alignItems: "center",
          justifyContent: "center", fontWeight: 700
        }}>UG</div>
        <div style={{ fontSize: 18, fontWeight: 700 }}>UG Movies</div>
      </div>

      <nav style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <button style={{
          background: "transparent", color: "#cfd7ff", border: 0, cursor: "pointer"
        }}>Home</button>
        <button style={{
          background: "transparent", color: "#cfd7ff", border: 0, cursor: "pointer"
        }}>My Library</button>
      </nav>
    </header>
  );
}
