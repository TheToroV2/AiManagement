import { ButtonHTMLAttributes, ReactNode, useState } from "react";
import { buttonStyles } from "../../constants/styles";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  children: ReactNode;
  isLoading?: boolean;
}

export default function Button({
  variant = "primary",
  children,
  isLoading = false,
  disabled,
  style,
  onMouseEnter,
  onMouseLeave,
  onMouseDown,
  onMouseUp,
  ...props
}: ButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const getBaseStyle = () => {
    switch (variant) {
      case "primary":
        return buttonStyles.primary;
      case "secondary":
        return buttonStyles.secondary;
      case "danger":
        return buttonStyles.danger;
      default:
        return buttonStyles.primary;
    }
  };

  const getHoverStyle = () => {
    if (isLoading || disabled) return {};
    switch (variant) {
      case "primary":
        return isActive
          ? buttonStyles.primaryActive
          : isHovered
          ? buttonStyles.primaryHover
          : {};
      case "secondary":
        return isActive
          ? buttonStyles.secondaryActive
          : isHovered
          ? buttonStyles.secondaryHover
          : {};
      case "danger":
        return isActive
          ? buttonStyles.dangerActive
          : isHovered
          ? buttonStyles.dangerHover
          : {};
      default:
        return {};
    }
  };

  const baseStyle = getBaseStyle();
  const hoverStyle = getHoverStyle();
  const disabledStyle = isLoading || disabled ? buttonStyles.disabled : {};

  return (
    <button
      style={{
        ...baseStyle,
        ...hoverStyle,
        ...disabledStyle,
        ...style,
      }}
      disabled={isLoading || disabled}
      onMouseEnter={(e) => {
        setIsHovered(true);
        onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        setIsHovered(false);
        setIsActive(false);
        onMouseLeave?.(e);
      }}
      onMouseDown={(e) => {
        setIsActive(true);
        onMouseDown?.(e);
      }}
      onMouseUp={(e) => {
        setIsActive(false);
        onMouseUp?.(e);
      }}
      {...props}
    >
      {isLoading ? "Cargando..." : children}
    </button>
  );
}
