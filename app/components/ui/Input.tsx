import { InputHTMLAttributes, forwardRef, useState } from "react";
import { inputStyles } from "../../constants/styles";

const labelStyles = {
  base: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 8,
  },
};

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  showError?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, showError, style, onFocus, onBlur, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <label style={labelStyles.base}>
        {label}
        <input
          ref={ref}
          style={{
            ...inputStyles.base,
            ...(isFocused && !showError ? inputStyles.focus : {}),
            ...(showError && error ? inputStyles.error : {}),
            ...(isFocused && showError && error ? inputStyles.errorFocus : {}),
            ...style,
          }}
          onFocus={(e) => {
            setIsFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          {...props}
        />
        {showError && error && (
          <span style={{ color: "#dc3545", fontSize: 12, marginTop: 4 }}>
            {error}
          </span>
        )}
      </label>
    );
  }
);

Input.displayName = "Input";

export default Input;
