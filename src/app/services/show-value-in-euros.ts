/**
 * Transformar una expresión numérica a una expresión string con el valor monetário de 'value'.
 * 
 * @param value - Número que queremos transformar en expresión monetária.
 * @returns string - Expresión en euros de 'value' ('0,00 €').
 */
 export const getValueInEuros = (value: number): string => Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(value);
