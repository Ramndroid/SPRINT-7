import { Budget } from './../models/budget';

/**
 * 
 * @param value 
 * @returns 
 */
export const getValueInEuros = (value: number): string => Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(value);

/**
 * Devuelve un array invertido.
 * @param values cualquier array
 * @returns devuelve el array values revertido
 */
export const reverseArray = (values: any[]): any[] => values.reverse();

/**
 * 
 * @param budgets 
 * @returns 
 */
export function sortByAlphabet(budgets: Budget[]): Budget[] {
    const result = budgets.sort((a, b) => {
        if (a.budgetName === "" || a.budgetName === null) return 1;
        if (b.budgetName === "" || b.budgetName === null) return -1;
        if (a.budgetName.toLocaleLowerCase() === b.budgetName.toLocaleLowerCase()) return 0;
        return a.budgetName.toLocaleLowerCase() < b.budgetName.toLocaleLowerCase() ? -1 : 1;
    })
    return result;
}

/**
 * 
 * @param budgets 
 * @returns 
 */
export function sortByDate(budgets: Budget[]): Budget[] {
    const result = budgets.sort((a, b) => a.date.getTime() - b.date.getTime());
    return result;
}

/**
 * Buscar entre una matriz el parámetro nombre de presupuesto que coincida con la search
 * @param budgets matriz con los elementos budget
 * @param search palabra a buscar entre los nombre de los presupuestos de la matriz
 * @returns matriz con elementos cuyo nombre de presupuesto coincida con el param search
 */
export function searchByName(budgets: Budget[], search: string): Budget[] {
    const result = budgets.filter(budget => budget.budgetName.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
    return result;
}

