"use client";
import React, { useState } from "react";

export default function TabsTab() {
  const [steps, setSteps] = useState(["Step 1", "Step 2", "Step 3"]);
  const [activeStep, setActiveStep] = useState(0);

  const stepContents = [
    { content: "This is a long ahhh paragraph for Step 1.", output: "Output for Step 1" },
    { content: "This is a long ahhh paragraph for Step 2.", output: "Output for Step 2" },
    { content: "This is a long ahhh paragraph for Step 3.", output: "Output for Step 3" },
  ];

  // Add a new step
  const addStep = () => {
    const newStepNum = steps.length + 1;
    setSteps([...steps, `Step ${newStepNum}`]);
  };

  // Remove the last step
  const removeStep = () => {
    if (steps.length > 1) {
      const updatedSteps = steps.slice(0, -1);
      setSteps(updatedSteps);

      // Adjust active step if current one was removed
      if (activeStep >= updatedSteps.length) {
        setActiveStep(updatedSteps.length - 1);
      }
    }
  };

  // ✅ Generate HTML output with inline styles only
  const generateOutputHTML = () => {
    let tabsHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Tabs Demo</title>
</head>
<body style="font-family: Arial, sans-serif; background:#ffe4e9; padding:20px;">
  <div style="display:flex; gap:20px;">
    <!-- Left column -->
    <div style="flex:1; border:2px solid black; border-radius:8px; padding:10px; background:#ffdcdc;">
      <h3 style="margin:0 0 10px 0;">Tabs</h3>
      ${steps
        .map(
          (step, i) =>
            `<button style="display:block; width:100%; margin-bottom:5px; padding:6px; border:1px solid #ccc; border-radius:4px; background:${
              i === activeStep ? "#ef88ad" : "#fff2eb"
            }; font-weight:${i === activeStep ? "bold" : "normal"};">${step}</button>`
        )
        .join("")}
    </div>

    <!-- Middle column -->
    <div style="flex:2; border:2px solid black; border-radius:8px; padding:10px; background:#ffdcdc;">
      <h3>${steps[activeStep]}</h3>
      <p>${stepContents[activeStep]?.content || "New step content..."}</p>
    </div>

    <!-- Right column -->
    <div style="flex:1; border:2px solid black; border-radius:8px; padding:10px; background:#ffdcdc;">
      <h3>Output</h3>
      <p>${stepContents[activeStep]?.output || "New step output..."}</p>
    </div>
  </div>
</body>
</html>
    `;
    return tabsHTML.trim();
  };

  return (
    <div className="tabs-tab">
      <h2 className="tabs-title">Tabs</h2>

      <div className="tabs-container">
        {/* Left Column */}
        <div className="tabs-column left-column">
          <div className="tabs-header">
            <span>Tabs Header:</span>
            <div style={{ display: "flex", gap: "6px" }}>
              <button className="add-step" onClick={addStep}>[+]</button>
              <button className="add-step" onClick={removeStep}>[-]</button>
            </div>
          </div>
          <div className="steps-list">
            {steps.map((step, index) => (
              <button
                key={index}
                className={`step-button ${activeStep === index ? "active" : ""}`}
                onClick={() => setActiveStep(index)}
              >
                {step}
              </button>
            ))}
          </div>
        </div>

        {/* Middle Column */}
        <div className="tabs-column middle-column">
          <h3>Tabs Content</h3>
          <h4>{steps[activeStep]}</h4>
          <p>{stepContents[activeStep]?.content || "New step content..."}</p>
        </div>

        {/* Right Column */}
        <div className="tabs-column right-column">
          <h3>Output</h3>
          <textarea
            style={{ width: "100%", height: "200px" }}
            readOnly
            value={generateOutputHTML()}
          />
          <button
            onClick={() => navigator.clipboard.writeText(generateOutputHTML())}
            style={{
              marginTop: "10px",
              padding: "8px 12px",
              border: "none",
              background: "#be5985",
              color: "white",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Copy HTML
          </button>
        </div>
      </div>
    </div>
  );
}
