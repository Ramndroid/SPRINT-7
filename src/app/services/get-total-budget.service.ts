import { Budget } from './../models/budget';
import { Injectable } from '@angular/core';
import { Products } from '../models/products';
import { getValueInEuros, reverseArray, sortByAlphabet, sortByDate, searchByName } from './budgets-tools';
import { ShowInstructions } from '../models/show-instructions-enum';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GetTotalBudgetService {

  // Current budget values
  private subtotalWeb: number = 0;
  private subtotalSeo: number = 0;
  private subtotalGAds: number = 0;
  private totalBudget: number = 0;
  private hasOwnSubtotalWeb: boolean = false;

  // Currente budget - number of pages and languages
  public numberOfPages: number = 0;
  public numberOfLanguages: number = 0;

  // Budget array
  private budgets: Budget[] = [];

  constructor() { }

  setSubtotalWebLegacy(basePrice: number = 0, websNumber: number = 0, languagesNumber: number = 0): void {

    this.numberOfPages = websNumber;

    this.numberOfLanguages = languagesNumber;

    if (websNumber > 0 && languagesNumber > 0) {

      this.subtotalWeb = (websNumber * languagesNumber * 30) + basePrice;

    } else if (websNumber > 0 && languagesNumber <= 0) {

      this.subtotalWeb = (websNumber * 30) + basePrice;

    } else if (websNumber <= 0 && languagesNumber > 0) {

      this.subtotalWeb = (languagesNumber * 30) + basePrice;

    } else if (websNumber <= 0 && languagesNumber <= 0) {

      this.subtotalWeb = basePrice;

    }

    this.hasOwnSubtotalWeb = !(basePrice == 0 && websNumber == 0 && languagesNumber == 0);
  }

  setSubtotalWeb(basePrice: number = 0, websNumber: number = 0, languagesNumber: number = 0): void {

    this.numberOfPages = websNumber;

    this.numberOfLanguages = languagesNumber;

    if (this.numberOfPages > 0 && this.numberOfLanguages > 0) {

      this.subtotalWeb = (this.numberOfPages * this.numberOfLanguages * 30) + basePrice;

    } else if (this.numberOfPages > 0 && this.numberOfLanguages <= 0) {

      this.subtotalWeb = (this.numberOfPages * 30) + basePrice;

    } else if (this.numberOfPages <= 0 && this.numberOfLanguages > 0) {

      this.subtotalWeb = (this.numberOfLanguages * 30) + basePrice;

    } else if (this.numberOfPages <= 0 && this.numberOfLanguages <= 0) {

      this.subtotalWeb = basePrice;

    }

    this.hasOwnSubtotalWeb = !(basePrice == 0 && websNumber == 0 && languagesNumber == 0);
  }

  calculateTotal(products: Products): void {

    if (products.web.selected) {

      if (!this.hasOwnSubtotalWeb) {
        this.setSubtotalWeb(products.web.price, 1, 1);
      }

    } else {
      this.setSubtotalWeb();
      // this.setSubtotalWeb(products.web.price, 1, 1);
    }

    this.subtotalSeo = products.seo.selected ? products.seo.price : 0;

    this.subtotalGAds = products.gads.selected ? products.gads.price : 0;
  }

  getTotalInEuros(prevalue: string = ""): string {
    this.totalBudget = this.subtotalWeb + this.subtotalSeo + this.subtotalGAds;
    const totalInEuros = getValueInEuros(this.totalBudget);
    return `${prevalue}${totalInEuros}`;
  }

  getBudgetsSize = (): number => this.budgets.length;

  addNewBudget(budget: Budget): boolean {
    budget.webNumberPages = this.numberOfPages;
    budget.webNumberLanguages = this.numberOfLanguages;
    const currentTotal = parseInt(budget.budgetTotal);
    if (currentTotal > 0) {
      Budget.addID();
      budget.id = Budget.ids.valueOf();
      this.budgets.push(budget);
      return false;
    }
    return true;
  }

  deleteBudget(id: number): void {
    const indexToDelete = this.budgets.findIndex(budget => budget.id == id);
    this.budgets.splice(indexToDelete, 1);
  }

  getBudgets(instruction: ShowInstructions = ShowInstructions.id_reverse, search: string = ""): Budget[] {

    const result: Budget[] = [...this.budgets];
    
    switch (instruction) {
      case ShowInstructions.id_reverse: return reverseArray(result);
      case ShowInstructions.alphabet: return sortByAlphabet(result);
      case ShowInstructions.date: return sortByDate(result);
      case ShowInstructions.search: return searchByName(result, search);
    }
  }

}