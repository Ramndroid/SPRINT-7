import { ShowBudgetsInstructions } from '../../models/show-budgets-enum';
import { Budget } from './../../models/budget';
import { BudgetsService } from 'src/app/services/get-total-budget.service';
import { Component } from '@angular/core';

/**
 * Componente PressupostListComponent
 * Permite gestionar la lista de presupuestos guardados por el usuario.
 * 
 */
@Component({
  selector: 'app-pressupost-list',
  templateUrl: './pressupost-list.component.html',
  styleUrls: ['./pressupost-list.component.css']
})
export class PressupostListComponent {

  /**
   * Rótulos usados en cada presupuesto para identificar cada producto añadido en la lista de presupuestos.
   */
  pressupostListProductTitles = [
    "Disseny web",
    "Consultoría SEO",
    "Campanya de Google Ads"
  ];

  /**
   * Variable usada para determinar si la búsqueda por palabra está activa.
   * Usada en [checked]="pressupostListIsSearchSelected" en el input 'search-outlined'.
   */
  pressupostListIsSearchSelected = false;

  /**
   * Palabra a buscar entre los nombres de los presupuestos.
   * Usada en [(ngModel)]="pressupostListSearchByName" en el input 'inputSearchWord'.
   */
  pressupostListSearchByName: string = "";

  /**
   * Determina qué forma de visualizar se va a usar en los Budget[] del servicio principial de la aplicación.
   */
  private pressupostListShowSortedBy: ShowBudgetsInstructions = ShowBudgetsInstructions.id_reverse;

  /**
   * Constructor.
   * 
   * @param serviceBudget Servicio principal de la aplicación. Contiene datos, cómputos, presupuestos guardados...
   */
  constructor(private serviceBudget: BudgetsService) { }

  /**
   * Obtiene el número de presupuestos guardados en el servicio principal de la aplicación.
   * 
   * @returns Number - Número de presupuestos guardados por el ususario.
   */
  pressupostListGetBudgetsSize = (): number => this.serviceBudget.getBudgetsSize();

  /**
   * Obtiene los presupuestos guardados en el servicio principal de la aplicación.
   * 
   * @returns Budget[] - Presupuestos guardados en el servicio principal de la aplicación.
   */
  pressupostListGetBudgets = (): Budget[] => this.serviceBudget.getBudgets(this.pressupostListShowSortedBy, this.pressupostListSearchByName);

  /**
   * Elimina un presupuesto de la lista.
   * 
   * @param id Number - ID del presupuesto a eliminar.
   */
  pressupostListDeleteBudget = (id: number): void => this.serviceBudget.deleteBudget(id);

  pressupostListShareBudget(budget: Budget): void {
    this.serviceBudget.shareSavedBudget(budget);
  }

  pressupostListClickSavedBudget(budget: Budget) {
    this.serviceBudget.openSavedBudget(budget);
  }

  /**
   * Cambia la instrucción que determina cómo se muestran los presupuestos.
   * 
   * @param instruction Enum - Determina qué modo de visualización de presupuestos se usa.
   * @returns valor actual de la variable 'pressupostListShowSortedBy'.
   */
  pressupostListSetShowSortedBy = (instruction: ShowBudgetsInstructions): ShowBudgetsInstructions => {
    this.pressupostListIsSearchSelected = (instruction == ShowBudgetsInstructions.search);
    return this.pressupostListShowSortedBy = instruction
  };

  /**
   * Eliminar el texto introducido en el cuadro de búsqueda de presupuestos.
   */
   pressupostListEraseSearchByName = (): void => { this.pressupostListSearchByName = ""; }


  /**
   * Eliminar el localstorage y los presupuestos de la lista.
   */
  pressupostListEraseLocalStorage(): void {
    this.serviceBudget.eraseAllBudgetsAndLocalStorage();
  }

}
