import { SelectHTMLAttributes } from "react";
import { inputStyles, labelStyles } from "../../constants/styles";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  showError?: boolean;
  options: { value: string; label: string }[];
}

export default function Select({
  label,
  error,
  showError,
  options,
  style,
  ...props
}: SelectProps) {
  return (
    <label style={labelStyles.base}>
      {label}
      <select
        style={{
          ...inputStyles.base,
          ...(showError && error ? inputStyles.error : {}),
          ...style,
        }}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {showError && error && (
        <span style={{ color: "#dc3545", fontSize: 12, marginTop: 4 }}>
          {error}
        </span>
      )}
    </label>
  );
}
