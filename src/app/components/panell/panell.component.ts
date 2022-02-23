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

  panellWebForm: FormGroup; // legacy de exercici 2 sense us en aquest exercici :(

  panelQuantityPages: number = 0;

  panelQuantityLanguages: number = 0;

  panelInvalidForm: boolean = false;

  panelInfoTextModal = {
    pages: "En aquest component teniu que indicar el nombre de pàgines que tindrà la vostra web.",
    languages: "En aquest component teniu que indicar el nombre d'idiomes disponibles que tindrà la vostra web."
  }

  constructor(
    private _builder: FormBuilder, // legacy de exercici 2 sense us en aquest exercici :(
    private serviceGetTotalBudget: GetTotalBudgetService
  ) {
    // legacy de exercici 2 sense us en aquest exercici :(
    this.panellWebForm = this._builder.group({
      inputWebsTotal: ['1', Validators.compose([Validators.min(1), Validators.required])],
      inputLanguagesTotal: ['1', Validators.compose([Validators.min(1), Validators.required])]
    });
  }

  ngOnInit(): void { }

  panelSetQuantityPages(value: number) {
    this.panelQuantityPages = value;
    this.panelCalculateSubtotalWeb();
  }

  panelSetQuantityLanguages(value: number) {
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
