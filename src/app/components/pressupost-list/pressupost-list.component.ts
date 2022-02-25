import { ShowInstructions } from '../../models/show-instructions-enum';
import { Budget } from './../../models/budget';
import { GetTotalBudgetService } from 'src/app/services/get-total-budget.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pressupost-list',
  templateUrl: './pressupost-list.component.html',
  styleUrls: ['./pressupost-list.component.css']
})
export class PressupostListComponent implements OnInit {
  
  budgetListProductTitles = [
    "Disseny web",
    "Consultoría SEO",
    "Campanya de Google Ads"
  ];

  showSortedBy: ShowInstructions = ShowInstructions.id_reverse;

  isSearchSelected = false;

  searchByName: string = "";

  constructor(private serviceGetTotalBudget: GetTotalBudgetService) { }

  ngOnInit(): void { }

  getBudgets = (): Budget[] => this.serviceGetTotalBudget.getBudgets(this.showSortedBy, this.searchByName);

  getBudgetsSize = (): number => this.serviceGetTotalBudget.getBudgetsSize();

  deleteBudget = (id: number): void => this.serviceGetTotalBudget.deleteBudget(id);

  setShowSorted = (instruction: ShowInstructions): ShowInstructions => {
    this.isSearchSelected = false;
    return this.showSortedBy = instruction
  };

  eraseSearchByName = (): void => { this.searchByName = ""; }

  clickSearch(): void {
    this.setShowSorted(3);
    this.isSearchSelected = true;
  }

}
