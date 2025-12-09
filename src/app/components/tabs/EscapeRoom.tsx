/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function EscapeRoom() {
  const [stage, setStage] = useState(1);
  const [timer, setTimer] = useState(0);
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);

  const [showHint, setShowHint] = useState(false);

  const startTimer = () => {
    setTimer(300); // 5 minutes
    setRunning(true);
    setPaused(false);
  };

  const [codeInput, setCodeInput] = useState("");
  const [generateInput, setGenerateInput] = useState("");
  const [convertInput, setConvertInput] = useState("");

  // TIMER LOGIC
  useEffect(() => {
    if (!running || paused) return;

    if (timer <= 0) {
      setRunning(false);
      alert("⏳ Time's up! You failed to escape the room.");
      return;
    }

    const interval = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [running, paused, timer]);

  // -------- Stage 1 Check --------
  const checkStage1 = () => {
    const correct = `function hello() {
  console.log("Hello World");
}`;

    if (codeInput.trim() === correct.trim()) {
      setStage(2);
      setShowHint(false);
    } else {
      alert("❌ Incorrect formatting. Try again!");
    }
  };

  // -------- Stage 2 Check --------
  const handleImageClick = () => {
    if (stage === 2) {
      alert("🐞 Bug fixed! Moving to Stage 3.");
      setStage(3);
      setShowHint(false);
    }
  };

  // -------- Stage 3 Check --------
  const checkStage3 = () => {
    const correct = `for (let i = 0; i <= 1000; i++) console.log(i)`;

    if (generateInput.replace(/\s+/g, "") === correct.replace(/\s+/g, "")) {
      setStage(4);
      setShowHint(false);
    } else {
      alert("❌ Make sure your loop prints 0–1000.");
    }
  };

  // -------- Stage 4 Check --------
  const checkStage4 = () => {
    try {
      const arr = JSON.parse(convertInput);
      if (Array.isArray(arr)) {
        setStage(5);
        saveResultToDB(); // ★ SAVE RESULT WHEN FINISHED
      } else {
        alert("❌ Input must be a JSON array.");
      }
    } catch {
      alert("❌ Invalid JSON.");
    }
  };

  // ⭐⭐⭐ SAVE RESULT TO DATABASE (POST → /api/items)
  const saveResultToDB = async () => {
    try {
      const data = {
        title: "Escape Room Result",
        content: JSON.stringify({
          stage: 5,
          timeRemaining: timer,
          timestamp: new Date().toISOString(),
        }),
      };

      const res = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to save result");

      alert("💾 Your escape result was saved!");

    } catch (err) {
      console.error(err);
      alert("⚠ Could not save result to database.");
    }
  };

  return (
    <div
      className="escape-room-page"
      style={{
        backgroundImage: "url('/assets/Img2.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "40px",
        minHeight: "100vh",
      }}
    >
      <div className="escape-room-container">
        <h1 className="escape-title">🔐 Escape Room Challenge</h1>

        {/* TIMER */}
        <div className="timer-box">
          ⏱ Time Left: <strong>{timer}s</strong>

          {!running ? (
            <button
              onClick={startTimer}
              className="pink-btn"
              style={{ marginLeft: "10px" }}
            >
              Start Timer
            </button>
          ) : (
            <button
              onClick={() => setPaused(!paused)}
              className="pink-btn"
              style={{ marginLeft: "10px" }}
            >
              {paused ? "Resume" : "Pause"}
            </button>
          )}
        </div>

        {/* HINT BUTTON */}
        {stage < 5 && (
          <button
            className="pink-btn"
            onClick={() => setShowHint(!showHint)}
            style={{ marginTop: "10px" }}
          >
            💡 {showHint ? "Hide Hint" : "Show Hint"}
          </button>
        )}

        {/* HINT BOX */}
        {showHint && (
          <div className="hint-box">
            {stage === 1 && (
              <pre>
{`function hello() {
  console.log("Hello World");
}`}
              </pre>
            )}

            {stage === 2 && (
              <p>Click the &quot;pink gate&quot; to fix the bug.</p>
            )}

            {stage === 3 && (
              <pre>
{`for (let i = 0; i <= 1000; i++) console.log(i)`}
              </pre>
            )}

            {stage === 4 && <pre>{`["name", "age", "city"]`}</pre>}
          </div>
        )}

        {/* ---------------- STAGE 1 ---------------- */}
        {stage === 1 && (
          <div className="stage-card">
            <h2>Stage 1 — Format Code</h2>
            <p>Fix the code formatting below:</p>

            <textarea
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value)}
              className="input-box"
            ></textarea>

            <button onClick={checkStage1} className="pink-btn">
              Submit
            </button>
          </div>
        )}

        {/* ---------------- STAGE 2 ---------------- */}
        {stage === 2 && (
          <div className="stage-card">
            <h2>Stage 2 — Debug by Clicking</h2>
            <p>Click the &quot;pink gate&quot; to fix the bug:</p>

            <Image
              src="/assetsfortabs/image1.jpg"
              alt="Pink gate"
              width={300}
              height={200}
              onClick={handleImageClick}
              className="bug-image"
              style={{
                cursor: "pointer",
                borderRadius: "10px",
                border: "3px solid pink",
              }}
            />
          </div>
        )}

        {/* ---------------- STAGE 3 ---------------- */}
        {stage === 3 && (
          <div className="stage-card">
            <h2>Stage 3 — Generate Numbers</h2>
            <p>Write JavaScript code that prints numbers from 0 to 1000:</p>

            <textarea
              value={generateInput}
              onChange={(e) => setGenerateInput(e.target.value)}
              className="input-box"
            ></textarea>

            <button onClick={checkStage3} className="pink-btn">
              Submit
            </button>
          </div>
        )}

        {/* ---------------- STAGE 4 ---------------- */}
        {stage === 4 && (
          <div className="stage-card">
            <h2>Stage 4 — Convert JSON</h2>
              <code className="example-code">[&quot;name&quot;, &quot;age&quot;, &quot;city&quot;]</code>

            <code className="example-code">["name", "age", "city"]</code>

            <textarea
              value={convertInput}
              onChange={(e) => setConvertInput(e.target.value)}
              className="input-box"
            ></textarea>

            <button onClick={checkStage4} className="pink-btn">
              Submit
            </button>
          </div>
        )}

        {/* ---------------- FINAL ---------------- */}
        {stage === 5 && (
          <div className="success-box">
            🎉 You escaped the room successfully!  
            <br />
            <small>Your result has been saved to the database.</small>

            <button
              className="pink-btn"
              onClick={() => {
                setStage(1);
                setTimer(0);
                setRunning(false);
                setCodeInput("");
                setGenerateInput("");
                setConvertInput("");
                setShowHint(false);
              }}
              style={{ marginLeft: "10px" }}
            >
              🔄 Restart Challenge
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
