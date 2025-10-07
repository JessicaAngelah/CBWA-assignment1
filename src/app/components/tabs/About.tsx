"use client";

import React from "react";

export default function About() {
  return (
    <div className="about-page" style={{ padding: "20px", textAlign: "center" }}>
      <h2>About This Project</h2>
      <p><strong>Name:</strong> Jessica Angela Huang</p>
      <p><strong>Student ID:</strong> 22586615</p>

      <div style={{ marginTop: "20px" }}>
        <h3>How to Use This Website</h3>
        <p>Watch the tutorial video below:</p>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/23urWKmHS6o?si=bI4x7wXKUA-JFyvp"
          title="Project Demo Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
