import { CSSProperties } from "react";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  style?: CSSProperties;
}

export default function StepIndicator({
  currentStep,
  totalSteps,
  style,
}: StepIndicatorProps) {
  return (
    <div
      style={{
        position: "relative",
        ...style,
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 8,
        }}
      >
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
          <div
            key={step}
            style={{
              flex: 1,
              height: 4,
              borderRadius: 2,
              background: step <= currentStep ? "#007bff" : "#e0e0e0",
              transition: "background 0.3s ease",
            }}
          />
        ))}
      </div>
      <div
        style={{
          fontSize: 12,
          color: "#666",
          fontWeight: 500,
          textAlign: "right",
        }}
      >
        Paso {currentStep} de {totalSteps}
      </div>
    </div>
  );
}
