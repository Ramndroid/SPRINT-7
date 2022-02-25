import { Budget } from './../models/budget';

export const getValueInEuros = (value: number): string => Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(value);

export const reverseArray = (values: any[]): any[] => values.reverse();

export function sortByAlphabet(budgets: Budget[]): Budget[] {
    const result = budgets.sort((a, b) => {
        if (a.budgetName === "" || a.budgetName === null) return 1;
        if (b.budgetName === "" || b.budgetName === null) return -1;
        if (a.budgetName.toLocaleLowerCase() === b.budgetName.toLocaleLowerCase()) return 0;
        return a.budgetName.toLocaleLowerCase() < b.budgetName.toLocaleLowerCase() ? -1 : 1;
    })
    return result;
}

export function sortByDate(budgets: Budget[]): Budget[] {
    const result = budgets.sort((a, b) => a.date.getTime() - b.date.getTime());
    return result;
}

export function searchByName(budgets: Budget[], search: string): Budget[] {
    const result = budgets.filter(budget => budget.budgetName.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
    return result;
}

