import { GetTotalBudgetService } from './../../services/get-total-budget.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-panell',
  templateUrl: './panell.component.html',
  styleUrls: ['./panell.component.css']
})
export class PanellComponent implements OnInit {

  @Input() panelBaseWebPrice: number = 0;

  panelQuantityPages: number = 0;

  panelQuantityLanguages: number = 0;

  panelInvalidForm: boolean = false;

  panelInfoTextModal = {
    pages: "En aquest component teniu que indicar el nombre de pàgines que tindrà la vostra web.",
    languages: "En aquest component teniu que indicar el nombre d'idiomes disponibles que tindrà la vostra web."
  }

  constructor(
    private serviceGetTotalBudget: GetTotalBudgetService
  ) { }

  ngOnInit(): void { }

  panelSetQuantityPages(value: number): void {
    this.serviceGetTotalBudget.numberOfPages = value;
    this.panelQuantityPages = value;
    this.panelCalculateSubtotalWeb();
  }

  panelSetQuantityLanguages(value: number): void {
    this.serviceGetTotalBudget.numberOfLanguages = value;
    this.panelQuantityLanguages = value;
    this.panelCalculateSubtotalWeb();
  }

  panelCalculateSubtotalWeb(): void {
    this.panelInvalidForm = (this.panelQuantityPages == 0 || this.panelQuantityLanguages == 0);
    this.serviceGetTotalBudget.setSubtotalWeb(
      this.panelBaseWebPrice, this.panelQuantityPages, this.panelQuantityLanguages
    );
  }

}
