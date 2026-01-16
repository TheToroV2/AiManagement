import { InputHTMLAttributes, forwardRef, useState } from "react";
import { inputStyles, labelStyles } from "../../constants/styles";

interface PercentageInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "onChange" | "value"> {
  label?: string;
  error?: string;
  showError?: boolean;
  value: number;
  onChange: (value: number) => void;
}

const PercentageInput = forwardRef<HTMLInputElement, PercentageInputProps>(
  ({ label, error, showError, value, onChange, style, onFocus, onBlur, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      // Permitir vacío temporalmente mientras se escribe
      if (inputValue === "") {
        onChange(0);
        return;
      }
      const numValue = parseInt(inputValue, 10);
      if (!isNaN(numValue) && numValue >= 0 && numValue <= 100) {
        onChange(numValue);
      }
    };

    return (
      <label style={labelStyles.base}>
        {label}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input
            ref={ref}
            type="number"
            min="0"
            max="100"
            value={value === 0 ? "" : value}
            onChange={handleChange}
            style={{
              ...inputStyles.base,
              ...(isFocused && !showError ? inputStyles.focus : {}),
              ...(showError && error ? inputStyles.error : {}),
              ...(isFocused && showError && error ? inputStyles.errorFocus : {}),
              width: "80px",
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
          <span style={{ color: "#666", fontSize: 14 }}>%</span>
        </div>
        {showError && error && (
          <span style={{ color: "#dc3545", fontSize: 12, marginTop: 4 }}>
            {error}
          </span>
        )}
      </label>
    );
  }
);

PercentageInput.displayName = "PercentageInput";

export default PercentageInput;
