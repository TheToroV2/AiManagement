import { CSSProperties, ReactNode } from "react";

interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
  message?: string;
  style?: CSSProperties;
  fullScreen?: boolean;
}

export default function LoadingSpinner({
  size = "medium",
  message,
  style,
  fullScreen = false,
}: LoadingSpinnerProps) {
  const sizeMap = {
    small: 16,
    medium: 24,
    large: 32,
  };

  const spinner = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        ...style,
      }}
    >
      <div
        style={{
          display: "inline-block",
          width: sizeMap[size],
          height: sizeMap[size],
          border: "3px solid #f3f3f3",
          borderTop: "3px solid #007bff",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      />
      {message && (
        <p style={{ margin: 0, color: "#666", fontSize: 14 }}>{message}</p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(255, 255, 255, 0.9)",
          zIndex: 9999,
        }}
      >
        {spinner}
      </div>
    );
  }

  return spinner;
}
