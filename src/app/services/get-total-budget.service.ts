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
  public totalBudget: number = 0;

  public totalInEuros: string = "";

  // Budget array
  private budgets: Budget[] = [];

  // Products
  homeProducts: Products = {
    web: {
      title: "Una pàgina web (desde 530 €)",
      price: 500,
      selected: false,
      pages: 1,
      languages: 1
    },
    seo: {
      title: "Una consultoría SEO (300 €)",
      price: 300,
      selected: false
    },
    gads: {
      title: "Una campanya de Google Ads (200 €)",
      price: 200,
      selected: false
    }
  }

  constructor(    
    private router: Router,
    private _activatedRoute: ActivatedRoute,
  ) {
    this.homeGetParams();
   }

  private homeSetParams() {

    this.router.navigate([], {
      relativeTo: this._activatedRoute,
      queryParams: {
        paginaWeb: this.homeProducts.web.selected,
        campaniaSeo: this.homeProducts.seo.selected,
        campaniaAds: this.homeProducts.gads.selected,
        nPaginas: this.homeProducts.web.pages,
        nIdiomas: this.homeProducts.web.languages
      },
      queryParamsHandling: 'merge'
    });
    
  }

  private homeGetParams() {
    //http://localhost:4200/calculadora?paginaWeb=true&campaniaSeo=true&campaniaAds=true&nPaginas=5&nIdiomas=10
    //http://localhost:4200/calculadora?paginaWeb=false&campaniaSeo=false&campaniaAds=false&nPaginas=1&nIdiomas=1

    let urlTree = this.router.parseUrl(this.router.url);
    let paginaWeb: boolean = urlTree.queryParams['paginaWeb'] === "true";
    let campaniaSeo: boolean = urlTree.queryParams['campaniaSeo'] === "true";
    let campaniaAds: boolean = urlTree.queryParams['campaniaAds'] === "true";

    this.homeProducts.web.selected = paginaWeb;
    this.homeProducts.seo.selected = campaniaSeo;
    this.homeProducts.gads.selected = campaniaAds;


    let paginas: number = parseInt(urlTree.queryParams['nPaginas']);
    let idiomas: number = parseInt(urlTree.queryParams['nIdiomas']);

    if (!isNaN(paginas))
      this.homeProducts.web.pages = paginas;

    if (!isNaN(idiomas))
      this.homeProducts.web.languages = idiomas;

    this.calculateTotal();
  }

  private setSubtotalWeb(): number {


    if (this.homeProducts.web.pages > 0 && this.homeProducts.web.languages > 0) {

      return (this.homeProducts.web.pages * this.homeProducts.web.languages * 30) + this.homeProducts.web.price;

    } else if (this.homeProducts.web.pages > 0 && this.homeProducts.web.languages <= 0) {

      return (this.homeProducts.web.pages * 30) + this.homeProducts.web.price;

    } else if (this.homeProducts.web.pages <= 0 && this.homeProducts.web.languages > 0) {

      return (this.homeProducts.web.languages * 30) + this.homeProducts.web.price;

    } else if (this.homeProducts.web.pages <= 0 && this.homeProducts.web.languages <= 0) {

      return this.homeProducts.web.price;

    }

    return 0;

  }

  calculateTotal(): number {

    let arrts: number;

    if (this.homeProducts.web.selected) {
      arrts = this.setSubtotalWeb();
    } else {
      arrts = 0;
      this.homeProducts.web.pages = 1;
      this.homeProducts.web.languages = 1;
    }


    const subtotalWeb = this.homeProducts.web.selected ? this.setSubtotalWeb() : 0;

    const subtotalSeo = this.homeProducts.seo.selected ? this.homeProducts.seo.price : 0;

    const subtotalGAds = this.homeProducts.gads.selected ? this.homeProducts.gads.price : 0;

    this.totalBudget = subtotalWeb + subtotalSeo + subtotalGAds;

    this.totalInEuros = getValueInEuros(this.totalBudget);

    this.homeSetParams();
    
    // console.log(this.totalBudget);


    return this.totalBudget;
  }

  getTotalInEuros(prevalue: string = ""): string {
    const totalInEuros = getValueInEuros(this.totalBudget);
    return `${prevalue}${totalInEuros}`;
  }

  getBudgetsSize = (): number => this.budgets.length;

  addNewBudget(budgetName: string, customarName: string): boolean {


    const currentBudget = new Budget(
      budgetName,
      customarName,
      this.homeProducts.web.selected,
      this.homeProducts.seo.selected,
      this.homeProducts.gads.selected,
      this.homeProducts.web.pages,
      this.homeProducts.web.languages,
      this.getTotalInEuros()
    );

    const currentTotal = parseInt(currentBudget.budgetTotal);

    if (currentTotal > 0) {
      Budget.addID();
      currentBudget.id = Budget.ids.valueOf();
      this.budgets.push(currentBudget);
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