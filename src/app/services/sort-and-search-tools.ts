import { Budget } from '../models/budget';

/**
 * Invertir cualquier array.
 * 
 * @param values - Cualquier array.
 * @returns any[] - Devuelve el array 'values' invertido.
 */
export const reverseArray = (values: any[]): any[] => values.reverse();

/**
 * Ordena un Budget[] alfabéticamente según el nombre del presupuesto.
 * 
 * @param budgets - Budget[] con los prespuestos generados por el usuario.
 * @returns Budget[] - Matriz ordenada alfabéticamente.
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
 * Ordena un Budget[] cronológicamente según la fecha de creación, de más antiguo a más reciente.
 * 
 * @param budgets - Budget[] con los prespuestos generados por el usuario.
 * @returns Budget[] - Matriz ordenada según fecha de creación de cada prespuesto.
 */
export function sortByDate(budgets: Budget[]): Budget[] {
    const result = budgets.sort((a, b) => a.date.getTime() - b.date.getTime());
    return result;
}

/**
 * Busca en un Budget[] aquél (budget) cuyo nombre del presupuesto contenga la palabra buscada.
 * 
 * @param budgets - Budget[] con los prespuestos generados por el usuario.
 * @param search - String con la palabra que queremos encontrar entre los nombres de los presupuestos.
 * @returns Budget[] - Matriz con los 'budget' cuyo nombre de prespuesto incluya la palabra buscada.
 */
export function searchByName(budgets: Budget[], search: string): Budget[] {
    const result = budgets.filter(budget => budget.budgetName.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
    return result;
}

