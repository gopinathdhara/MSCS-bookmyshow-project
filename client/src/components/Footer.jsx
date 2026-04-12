import React from "react";

export default function Footer() {
  return (
    <div
      style={{
        background: "#111827",
        color: "white",
        textAlign: "center",
        padding: "16px 12px",
        bottom: 0,
        width: "100%",
      }}
    >
      <p
        className="footer_cls"
        style={{ margin: 0, fontSize: "14px", color: "white" }}
      >
        © 2026 BookMyShow. All Rights Reserved.
      </p>
      <p
        className="footer_cls"
        style={{ margin: "6px 0 0 0", fontSize: "13px", color: "#d1d5db" }}
      >
        Built with using React, Node.js, Express, and MongoDB
      </p>
    </div>
  );
}
