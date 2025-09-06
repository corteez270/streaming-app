export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#111",
        color: "#aaa",
        textAlign: "center",
        padding: "20px",
        marginTop: "30px",
        borderTop: "1px solid #333",
      }}
    >
      <p>© {new Date().getFullYear()} 🎬 UG Movies. All Rights Reserved.</p>
      <p style={{ fontSize: "14px" }}>
        Built with ❤️ for learning. Enjoy your movies!
      </p>
    </footer>
  );
}
