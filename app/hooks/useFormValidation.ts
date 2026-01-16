import { useState, useCallback } from "react";
import { ValidationRule } from "../utils/validationRules";

interface UseFormValidationReturn {
  errors: Record<string, string>;
  validateField: (fieldName: string, value: string, rules: ValidationRule[]) => boolean;
  validateForm: (fields: Record<string, { value: string; rules: ValidationRule[] }>) => boolean;
  clearError: (fieldName: string) => void;
  clearAllErrors: () => void;
}

export function useFormValidation(): UseFormValidationReturn {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = useCallback(
    (fieldName: string, value: string, rules: ValidationRule[]): boolean => {
      for (const rule of rules) {
        if (!rule.validator(value)) {
          setErrors((prev) => ({ ...prev, [fieldName]: rule.message }));
          return false;
        }
      }
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
      return true;
    },
    []
  );

  const validateForm = useCallback(
    (
      fields: Record<string, { value: string; rules: ValidationRule[] }>
    ): boolean => {
      let isValid = true;
      const newErrors: Record<string, string> = {};

      for (const [fieldName, { value, rules }] of Object.entries(fields)) {
        for (const rule of rules) {
          if (!rule.validator(value)) {
            newErrors[fieldName] = rule.message;
            isValid = false;
            break;
          }
        }
      }

      setErrors(newErrors);
      return isValid;
    },
    []
  );

  const clearError = useCallback((fieldName: string) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  }, []);

  const clearAllErrors = useCallback(() => {
    setErrors({});
  }, []);

  return {
    errors,
    validateField,
    validateForm,
    clearError,
    clearAllErrors,
  };
}
