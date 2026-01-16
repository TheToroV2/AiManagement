import { CSSProperties } from "react";

export const buttonStyles = {
  primary: {
    padding: "8px 16px",
    border: "none",
    borderRadius: "4px",
    background: "#007bff",
    color: "white",
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 500,
    transition: "all 0.2s ease",
    boxShadow: "0 1px 3px rgba(0, 123, 255, 0.2)",
  } as CSSProperties,

  primaryHover: {
    background: "#0056b3",
    transform: "translateY(-2px)",
    boxShadow: "0 4px 12px rgba(0, 123, 255, 0.3)",
  } as CSSProperties,

  primaryActive: {
    transform: "translateY(0)",
    boxShadow: "0 2px 6px rgba(0, 123, 255, 0.2)",
  } as CSSProperties,

  secondary: {
    padding: "8px 16px",
    border: "none",
    borderRadius: "4px",
    background: "#6c757d",
    color: "white",
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 500,
    transition: "all 0.2s ease",
    boxShadow: "0 1px 3px rgba(108, 117, 125, 0.2)",
  } as CSSProperties,

  secondaryHover: {
    background: "#545b62",
    transform: "translateY(-2px)",
    boxShadow: "0 4px 12px rgba(108, 117, 125, 0.3)",
  } as CSSProperties,

  secondaryActive: {
    transform: "translateY(0)",
    boxShadow: "0 2px 6px rgba(108, 117, 125, 0.2)",
  } as CSSProperties,

  danger: {
    padding: "8px 16px",
    border: "none",
    borderRadius: "4px",
    background: "#dc3545",
    color: "white",
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 500,
    transition: "all 0.2s ease",
    boxShadow: "0 1px 3px rgba(220, 53, 69, 0.2)",
  } as CSSProperties,

  dangerHover: {
    background: "#bb2d3b",
    transform: "translateY(-2px)",
    boxShadow: "0 4px 12px rgba(220, 53, 69, 0.3)",
  } as CSSProperties,

  dangerActive: {
    transform: "translateY(0)",
    boxShadow: "0 2px 6px rgba(220, 53, 69, 0.2)",
  } as CSSProperties,

  disabled: {
    opacity: 0.6,
    cursor: "not-allowed",
    transform: "none",
    boxShadow: "none",
  } as CSSProperties,
};

export const inputStyles = {
  base: {
    padding: "10px 12px",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "#ddd",
    borderRadius: "4px",
    fontSize: 14,
    fontFamily: "inherit",
    width: "100%",
    boxSizing: "border-box" as const,
    transition: "all 0.2s ease",
    backgroundColor: "#fff",
  } as CSSProperties,

  focus: {
    borderColor: "#007bff",
    outline: "none",
    boxShadow: "0 0 0 3px rgba(0, 123, 255, 0.1)",
  } as CSSProperties,

  error: {
    borderColor: "#dc3545",
    boxShadow: "0 0 0 3px rgba(220, 53, 69, 0.1)",
  } as CSSProperties,

  errorFocus: {
    borderColor: "#dc3545",
    boxShadow: "0 0 0 3px rgba(220, 53, 69, 0.2)",
  } as CSSProperties,

  disabled: {
    backgroundColor: "#f5f5f5",
    color: "#999",
    cursor: "not-allowed",
    opacity: 0.7,
  } as CSSProperties,
};

export const labelStyles = {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    fontSize: 14,
    fontWeight: 500,
  } as CSSProperties,
};

export const textareaStyles = {
  base: {
    padding: "10px 12px",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "#ddd",
    borderRadius: "4px",
    fontSize: 14,
    fontFamily: "monospace",
    width: "100%",
    boxSizing: "border-box" as const,
    transition: "all 0.2s ease",
    backgroundColor: "#fff",
    resize: "vertical" as const,
  } as CSSProperties,

  focus: {
    borderColor: "#007bff",
    outline: "none",
    boxShadow: "0 0 0 3px rgba(0, 123, 255, 0.1)",
  } as CSSProperties,

  error: {
    borderColor: "#dc3545",
    boxShadow: "0 0 0 3px rgba(220, 53, 69, 0.1)",
  } as CSSProperties,
};

export const errorMessageStyles = {
  base: {
    padding: 12,
    background: "#fee",
    border: "1px solid #fcc",
    borderRadius: 4,
    color: "#c33",
    fontSize: 14,
  } as CSSProperties,
};

export const modalStyles = {
  overlay: {
    position: "fixed" as const,
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  } as CSSProperties,

  container: {
    background: "white",
    padding: 24,
    width: 400,
    maxWidth: "90vw",
    borderRadius: 8,
    display: "flex",
    flexDirection: "column",
    gap: 16,
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  } as CSSProperties,
};
