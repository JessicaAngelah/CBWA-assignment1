"use client";
import React, { useState, useEffect } from "react";

export default function TabsTab() {
  const [steps, setSteps] = useState<string[]>([]);
  const [activeStep, setActiveStep] = useState(0);
  const [stepContents, setStepContents] = useState<{ content: string; output: string }[]>([]);

  useEffect(() => {
    const savedSteps = localStorage.getItem("steps");
    const savedContents = localStorage.getItem("stepContents");

    if (savedSteps && savedContents) {
      setSteps(JSON.parse(savedSteps));
      setStepContents(JSON.parse(savedContents));
    } else {
      setSteps(["Step 1", "Step 2", "Step 3"]);
      setStepContents([
        { content: "This is a long ahhh paragraph for Step 1.", output: "Output for Step 1" },
        { content: "This is a long ahhh paragraph for Step 2.", output: "Output for Step 2" },
        { content: "This is a long ahhh paragraph for Step 3.", output: "Output for Step 3" },
      ]);
    }
  }, []);


  useEffect(() => {
    if (steps.length > 0 && stepContents.length > 0) {
      localStorage.setItem("steps", JSON.stringify(steps));
      localStorage.setItem("stepContents", JSON.stringify(stepContents));
    }
  }, [steps, stepContents]);

  // Add new step
  const addStep = () => {
  if (steps.length >= 15) {
    alert("Maximum of 15 tabs reached!");
    return;
  }
  const newStepNum = steps.length + 1;
  setSteps([...steps, `Step ${newStepNum}`]);
  setStepContents([...stepContents, { content: "New step content...", output: "New step output..." }]);
  };


  

  // Remove last step
  const removeStep = () => {
    if (steps.length > 1) {
      const updatedSteps = steps.slice(0, -1);
      const updatedContents = stepContents.slice(0, -1);
      setSteps(updatedSteps);
      setStepContents(updatedContents);
      if (activeStep >= updatedSteps.length) setActiveStep(updatedSteps.length - 1);
    }
  };

  // Edit tab name
  const handleRename = (index: number, newName: string) => {
    const updated = [...steps];
    updated[index] = newName;
    setSteps(updated);
  };

  // Edit tab content
  const handleContentChange = (index: number, newContent: string) => {
    const updated = [...stepContents];
    updated[index].content = newContent;
    setStepContents(updated);
  };

  // Generate HTML output (inline CSS only)
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

    <div style="flex:2; border:2px solid black; border-radius:8px; padding:10px; background:#ffdcdc;">
      <h3>${steps[activeStep]}</h3>
      <p>${stepContents[activeStep]?.content || "New step content..."}</p>
    </div>

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
                onDoubleClick={() => {
                  const newName = prompt("Rename this tab:", steps[index]);
                  if (newName && newName.trim() !== "") handleRename(index, newName.trim());
                }}
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
          <textarea
            style={{ width: "100%", height: "120px" }}
            value={stepContents[activeStep]?.content || ""}
            onChange={(e) => handleContentChange(activeStep, e.target.value)}
          />
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
