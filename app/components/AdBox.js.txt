"use client";

export default function AdBox({ slotName = "Banner Ad" }) {
  return (
    <div
      style={{
        background: "#111",
        border: "1px dashed #555",
        borderRadius: "8px",
        padding: "12px",
        margin: "16px 0",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: "12px", color: "#aaa" }}>Sponsored</div>
      <div
        style={{
          height: "90px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ color: "#ccc" }}>
          {slotName} — your ad will appear here
        </span>
      </div>
    </div>
  );
}
