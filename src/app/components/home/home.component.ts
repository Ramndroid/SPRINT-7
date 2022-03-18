import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { BudgetsService } from 'src/app/services/get-total-budget.service';
import { Subscription } from 'rxjs';

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
export class HomeComponent implements OnInit, OnDestroy {

  /**
   * ViewChild enlazado con ng-template #modal.
   * Ventana modal que advierte sobre que no podemos añadir un presupuesto a la lista si este no tiene valores.
   */
  @ViewChild('modal') homeModalNoProductsSelected?: ElementRef;

  /**
   * Nombre del presupuesto. Utiliza [(ngModel)] con el input 'inputBudgetName'.
   */
  homeBudgetName: string = "";

  private homeBudgetName$: Subscription;

  /**
   * Nombre del cliente del presupuesto. Utiliza [(ngModel)] con el input 'inputClientName'.
   */
  homeCustomerName: string = "";

  private homeCustomerName$: Subscription;

  /**
   * Constructor.
   * 
   * @param modal Elemento para poder visualizar 'homeModalNoProductsSelected'.
   * @param serviceBudget Servicio principal de la aplicación. Contiene datos, cómputos, presupuestos guardados...
   */
  constructor(
    private modal: NgbModal,
    public serviceBudget: BudgetsService
  ) {
    this.homeBudgetName$ = new Subscription;
    this.homeCustomerName$ = new Subscription;
  }

  ngOnDestroy(): void {
    this.homeBudgetName$.unsubscribe();
    this.homeCustomerName$.unsubscribe();
  }

  ngOnInit(): void {
    this.homeBudgetName$ = this.serviceBudget.getBudgetName$()
      .subscribe(
        (name: string) => {
          this.homeBudgetName = name;
        }
      );

    this.homeCustomerName$ = this.serviceBudget.getCustomerName$()
      .subscribe(
        (name: string) => {
          this.homeCustomerName = name;
        }
      );
  }

  /**
   * Resetea todos los campos introducidos.
   */
  homeEraseFields(): void {
    this.homeBudgetName = "";
    this.homeCustomerName = "";
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
    if (!this.serviceBudget.addNewBudget(this.homeBudgetName, this.homeCustomerName))
      this.modal.open(this.homeModalNoProductsSelected);
    this.homeEraseFields();
  }

}