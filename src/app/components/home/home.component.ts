import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GetTotalBudgetService } from 'src/app/services/get-total-budget.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  /**
   * Referencia a la ventana modal que informa que no es posible añadir presupuesto si no se ha seleccionado nada
   */
  @ViewChild('contenido') modalNoProductSelected?: ElementRef;

  /**
   * Nombre del presupuesto actual
   */
  homeBudgetName: string = "";

  /**
   * Nombre del cliente del presupuesto actual
   */
  homeCustomerName: string = "";

  constructor(
    private modal: NgbModal,
    public serviceGetTotalBudget: GetTotalBudgetService
  ) { }

  ngOnInit(): void { }

  /**
   * Llama a 'serviceGetTotalBudget.addNewBudget(...)' para añadir un objeto tipo 'Budget'
   * a Budget[] de 'serviceGetTotalBudget'
   */
  homeSaveBudget(): void {
    if (this.serviceGetTotalBudget.addNewBudget(this.homeBudgetName, this.homeCustomerName))
      this.modal.open(this.modalNoProductSelected);
  }

  /**
   * Borra todos los campos de textos y casillas seleccionadas
   */
  homeEraseInputs(): void {
    this.homeBudgetName = "";
    this.homeCustomerName = "";
    this.serviceGetTotalBudget.homeProducts.web.selected = false;
    this.serviceGetTotalBudget.homeProducts.web.pages = 1;
    this.serviceGetTotalBudget.homeProducts.web.languages = 1;
    this.serviceGetTotalBudget.homeProducts.seo.selected = false;
    this.serviceGetTotalBudget.homeProducts.gads.selected = false;
    this.serviceGetTotalBudget.calculateTotal();
  }
}