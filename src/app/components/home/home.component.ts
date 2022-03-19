import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { BudgetsService } from 'src/app/services/get-total-budget.service';

/**
 * Componente HomeComponent.
 * Crear y calcular presupuestos, y añadirlos a una lista.
 * 
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  /**
   * ViewChild enlazado con ng-template #modal.
   * Ventana modal que advierte sobre que no podemos añadir un presupuesto a la lista si este no tiene valores.
   */
  @ViewChild('modal') homeModalNoProductsSelected?: ElementRef;

  /**
   * Constructor.
   * 
   * @param modal Elemento para poder visualizar 'homeModalNoProductsSelected'.
   * @param serviceBudget Servicio principal de la aplicación. Contiene datos, cómputos, presupuestos guardados...
   */
  constructor(
    private modal: NgbModal,
    public serviceBudget: BudgetsService
  ) { }

  /**
   * Resetea todos los campos introducidos.
   */
  homeEraseFields(): void {
    this.serviceBudget.eraseFields();
    this.serviceBudget.calculateTotal();
  }

  shareBudget(): void {
    this.serviceBudget.shareBudget();
  }

  /**
   * Guarda el presupuesto actual en el servicio principal de la aplicación.
   * Abre una ventana modal si no ha sido posible añadir el presupuesto (falta de valores).
   * Si sí ha podido añadir el presupuesto, guarda en localstorage una copia de this.serviceBudget.getBudgets().
   */
  homeSaveBudget(): void {
    if (!this.serviceBudget.addNewBudget())
      this.modal.open(this.homeModalNoProductsSelected);
    this.homeEraseFields();
  }

}