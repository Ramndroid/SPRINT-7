import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/models/products';
import { GetTotalBudgetService } from 'src/app/services/get-total-budget.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  homeProducts: Products = {
    web: {
      title: "Una pàgina web (desde 530 €)",
      price: 500,
      selected: false
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
    private serviceGetTotalBudget: GetTotalBudgetService
  ) { }

  ngOnInit(): void { }

  homeCalculateTotal = (): void => this.serviceGetTotalBudget.calculateTotal(this.homeProducts);

  homeGetTotalInEuros = (): string => this.serviceGetTotalBudget.getTotalInEuros("Preu: ");

}
