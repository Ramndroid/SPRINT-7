import { GetTotalBudgetService } from './../../services/get-total-budget.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-panell',
  templateUrl: './panell.component.html',
  styleUrls: ['./panell.component.css']
})
export class PanellComponent implements OnInit {

  @Input() panelBaseWebPrice: number = 0;

  panelInputPages: number = 0;

  panelInputLanguages: number = 0;

  panelInvalidForm: boolean = false;

  panelInfoTextModal = {
    pages: "En aquest component teniu que indicar el nombre de pàgines que tindrà la vostra web.",
    languages: "En aquest component teniu que indicar el nombre d'idiomes disponibles que tindrà la vostra web."
  }

  constructor(
    private serviceGetTotalBudget: GetTotalBudgetService
  ) { 
    this.panelInputPages = this.serviceGetTotalBudget.homeProducts.web.pages;
    this.panelInputLanguages = this.serviceGetTotalBudget.homeProducts.web.languages;
  }

  ngOnInit(): void { }

  panelSetQuantityPages(value: number): void {
    this.serviceGetTotalBudget.homeProducts.web.pages = value;
    this.panelCalculateSubtotalWeb();
  }

  panelSetQuantityLanguages(value: number): void {
    this.serviceGetTotalBudget.homeProducts.web.languages = value;
    this.panelCalculateSubtotalWeb();
  }

  private panelCalculateSubtotalWeb(): void {
    this.panelInvalidForm = (this.serviceGetTotalBudget.homeProducts.web.pages == 0 || this.serviceGetTotalBudget.homeProducts.web.languages == 0);
    this.serviceGetTotalBudget.calculateTotal();
  }

}
