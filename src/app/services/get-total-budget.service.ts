import { Injectable } from '@angular/core';
import { Products } from '../models/products';

@Injectable({
  providedIn: 'root'
})
export class GetTotalBudgetService {

  private hasOwnSubtotalWeb: boolean = false;
  private subtotalWeb: number = 0;
  private subtotalSeo: number = 0;
  private subtotalGAds: number = 0;
  private totalBudget: number = 0;

  constructor() { }

  setSubtotalWeb(basePrice: number = 0, websNumber: number = 0, languagesNumber: number = 0): void {

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

  calculateTotal(products: Products): void {

    if (products.web.selected) {

      if (!this.hasOwnSubtotalWeb) {
        this.setSubtotalWeb(products.web.price, 1, 1);
      }

    } else {
      this.setSubtotalWeb();
    }

    this.subtotalSeo = products.seo.selected ? products.seo.price : 0;

    this.subtotalGAds = products.gads.selected ? products.gads.price : 0;
  }

  getTotalInEuros(prevalue: string = ""): string {
    this.totalBudget = this.subtotalWeb + this.subtotalSeo + this.subtotalGAds;
    const totalInEuros = this.getInEuros(this.totalBudget);
    return `${prevalue}${totalInEuros}`;
  }

  private getInEuros = (value: number): string => Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(value);

}
