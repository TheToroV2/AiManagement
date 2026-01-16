export interface ValidationRule {
  validator: (value: string) => boolean;
  message: string;
}

export const validationRules = {
  required: (message: string = "Este campo es requerido"): ValidationRule => ({
    validator: (value: string) => value.trim().length > 0,
    message,
  }),

  minLength: (
    min: number,
    message?: string
  ): ValidationRule => ({
    validator: (value: string) => value.trim().length >= min,
    message: message || `Debe tener al menos ${min} caracteres`,
  }),

  maxLength: (
    max: number,
    message?: string
  ): ValidationRule => ({
    validator: (value: string) => value.trim().length <= max,
    message: message || `Debe tener máximo ${max} caracteres`,
  }),

  name: (): ValidationRule => ({
    validator: (value: string) => {
      const trimmed = value.trim();
      return trimmed.length >= 3 && trimmed.length <= 50;
    },
    message: "El nombre debe tener entre 3 y 50 caracteres",
  }),

  responseLengthSum: (short: number, medium: number, long: number): ValidationRule => ({
    validator: () => {
      return short + medium + long === 100;
    },
    message: "La suma de los porcentajes debe ser 100%",
  }),
};
