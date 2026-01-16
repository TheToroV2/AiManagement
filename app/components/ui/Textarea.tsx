import { TextareaHTMLAttributes, forwardRef, useState } from "react";
import { textareaStyles, labelStyles } from "../../constants/styles";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  showError?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, showError, style, onFocus, onBlur, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <label style={labelStyles.base}>
        {label}
        <textarea
          ref={ref}
          style={{
            ...textareaStyles.base,
            minHeight: 100,
            ...(isFocused && !showError ? textareaStyles.focus : {}),
            ...(showError && error ? textareaStyles.error : {}),
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

Textarea.displayName = "Textarea";

export default Textarea;
