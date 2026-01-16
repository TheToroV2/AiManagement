import { Assistant } from "../types/assistant";

/**
 * Valida que la suma de los porcentajes sea 100
 * @param short - Porcentaje de respuestas cortas
 * @param medium - Porcentaje de respuestas medianas
 * @param long - Porcentaje de respuestas largas
 * @returns true si la suma es 100, false en caso contrario
 */
export function validateResponseLengthSum(
  short: number,
  medium: number,
  long: number
): boolean {
  return short + medium + long === 100;
}

/**
 * Obtiene los valores de ResponseLength del asistente
 * @param responseLengthObj - Objeto ResponseLength del asistente
 * @returns Objeto con short, medium, long
 */
export function getResponseLengthValues(
  responseLengthObj: Assistant["responseLength"]
): { short: number; medium: number; long: number } {
  return {
    short: responseLengthObj.short,
    medium: responseLengthObj.medium,
    long: responseLengthObj.long,
  };
}

/**
 * Crea un objeto ResponseLength desde valores numéricos
 * @param short - Porcentaje de respuestas cortas (0-100)
 * @param medium - Porcentaje de respuestas medianas (0-100)
 * @param long - Porcentaje de respuestas largas (0-100)
 * @returns Objeto ResponseLength
 */
export function createResponseLengthObject(
  short: number,
  medium: number,
  long: number
): Assistant["responseLength"] {
  return {
    short,
    medium,
    long,
  };
}
