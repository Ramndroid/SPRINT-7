import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Budget } from './../../models/budget';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Products } from 'src/app/models/products';
import { GetTotalBudgetService } from 'src/app/services/get-total-budget.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('contenido') modalNoProductSelected?: ElementRef;

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

  homeBudgetName: string = "";

  homeCustomerName: string = "";

  constructor(
    private modal: NgbModal,
    private serviceGetTotalBudget: GetTotalBudgetService
  ) { }

  ngOnInit(): void { }

  homeCalculateTotal = (): void => this.serviceGetTotalBudget.calculateTotal(this.homeProducts);

  homeGetTotalInEuros = (): string => this.serviceGetTotalBudget.getTotalInEuros("Preu: ");

  homeSaveBudget(): void {
    const currentBudget = new Budget(
      this.homeBudgetName,
      this.homeCustomerName,
      this.homeProducts.web.selected,
      this.homeProducts.seo.selected,
      this.homeProducts.gads.selected,
      0, 0, // These values will be replaced in the ServiceGetTotalBudget.addNewBudget(...)
      this.serviceGetTotalBudget.getTotalInEuros());

    if (this.serviceGetTotalBudget.addNewBudget(currentBudget)){
      this.modal.open(this.modalNoProductSelected);
    }
  }

  homeEraseInputs(): void {
    this.homeBudgetName = "";
    this.homeCustomerName = "";
    this.homeProducts.web.selected = false;
    this.homeProducts.seo.selected = false;
    this.homeProducts.gads.selected = false;
    this.homeCalculateTotal();
  }
}
