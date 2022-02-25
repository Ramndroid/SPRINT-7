export const getValueInEuros = (value: number): string => Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(value);

export const reverseArray = (values: any[]): any[] => values.reverse();