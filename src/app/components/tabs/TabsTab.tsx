"use client";
import React, { useState } from "react";

export default function TabsTab() {
  const [steps, setSteps] = useState(["Step 1", "Step 2", "Step 3"]);
  const [activeStep, setActiveStep] = useState(0);

  const stepContents = [
    {
      content:
        "This is a long ahhh paragraph for Step 1. It explains everything in detail about this step.",
      output: "Output generated for Step 1...",
    },
    {
      content:
        "This is a long ahhh paragraph for Step 2. It contains more details and expanded explanation.",
      output: "Output generated for Step 2...",
    },
    {
      content:
        "This is a long ahhh paragraph for Step 3. It goes in depth about what happens in this step.",
      output: "Output generated for Step 3...",
    },
  ];

  const addStep = () => {
    const newStepNum = steps.length + 1;
    setSteps([...steps, `Step ${newStepNum}`]);
  };

  return (
    <div className="tabs-tab">
      <h2 className="tabs-title">Tabs</h2>

      <div className="tabs-container">
        {/* Left Column */}
        <div className="tabs-column left-column">
          <div className="tabs-header">
            <span>Tabs Header:</span>
            <button className="add-step" onClick={addStep}>
              [+]
            </button>
          </div>
          <div className="steps-list">
            {steps.map((step, index) => (
              <button
                key={index}
                className={`step-button ${
                  activeStep === index ? "active" : ""
                }`}
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
          <p>{stepContents[activeStep]?.output || "New step output..."}</p>
        </div>
      </div>
    </div>
  );
}
