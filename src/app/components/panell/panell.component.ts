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

  panellWebForm: FormGroup;

  constructor(
    private _builder: FormBuilder,
    private serviceGetTotalBudget: GetTotalBudgetService
  ) {
    this.panellWebForm = this._builder.group({
      inputWebsTotal: ['1', Validators.compose([Validators.min(1), Validators.required])],
      inputLanguagesTotal: ['1', Validators.compose([Validators.min(1), Validators.required])]
    });
  }

  ngOnInit(): void { }

  panelCalculateSubtotalWeb(): void {
    const totalWebs = this.panellWebForm.get('inputWebsTotal')?.value;
    const totalLanguages = this.panellWebForm.get('inputLanguagesTotal')?.value;
    this.serviceGetTotalBudget.setSubtotalWeb(this.panelBaseWebPrice, totalWebs, totalLanguages);
  }

}
