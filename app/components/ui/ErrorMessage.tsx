import { ReactNode } from "react";

interface ErrorMessageProps {
  children: ReactNode;
  style?: React.CSSProperties;
}

const errorMessageStyles = {
  base: {
    color: "#d32f2f",
    padding: "8px 12px",
    backgroundColor: "#ffebee",
    borderRadius: "4px",
    fontSize: "14px",
  } as React.CSSProperties,
};

export default function ErrorMessage({ children, style }: ErrorMessageProps) {
  if (!children) return null;

  return (
    <div style={{ ...errorMessageStyles.base, ...style }}>{children}</div>
  );
}
