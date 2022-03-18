import { BudgetsService } from './../../services/get-total-budget.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

/**
 * Componente PanellComponent.
 * Muestra detalles del producto 'web'. Permite configurar el número de páginas e idiomas.
 * 
 */
@Component({
  selector: 'app-panell',
  templateUrl: './panell.component.html',
  styleUrls: ['./panell.component.css']
})
export class PanellComponent implements OnInit, OnDestroy {

  /**
   * Número de páginas de la web seleccionadas por el usuario. 
   * Esta variable se pasa al @Input() 'quantityPreValue' de 'QuantityButtonsComponent'.
   */
  panelNPages: number = 0;

  private panelNPages$: Subscription;

  /**
   * Número de idiomas de la web seleccionados por el usuario. 
   * Esta variable se pasa al @Input() 'quantityPreValue' de 'QuantityButtonsComponent'.
   */
  panelNLanguages: number = 0;

  private panelNLanguages$: Subscription;

  /**
   * Boolean usada para determinar si los valores introducidos por el usuario cumplen unos mínimos requisitos.
   * Usada en directiva *ngIf
   */
  panelInvalidForm: boolean = false;

  /**
   * Detalle del botón info que explica para que sirve cada bloque de botones.
   * Esta variable se pasa al @Input() 'quantityInformationTextButton'  de 'QuantityButtonsComponent'.
   */
  panelInvalidFormInfoModalText = {
    pages: "En aquest component teniu que indicar el nombre de pàgines que tindrà la vostra web.",
    languages: "En aquest component teniu que indicar el nombre d'idiomes disponibles que tindrà la vostra web."
  }

  /**
   * Constructor
   * 
   * @param serviceBudget Servicio principal de la aplicación. Contiene datos, cómputos, presupuestos guardados...
   */
  constructor(
    private serviceBudget: BudgetsService
  ) {
    this.panelNPages = this.serviceBudget.products.web.pages;
    this.panelNLanguages = this.serviceBudget.products.web.languages;
    this.panelNPages$ = new Subscription;
    this.panelNLanguages$ = new Subscription;
  }

 
  ngOnInit(): void {
    this.panelNPages$ = this.serviceBudget.getNPages$()
      .subscribe(
        (page: number) => {
          this.panelNPages = page;
        }
      );

    this.panelNLanguages$ = this.serviceBudget.getNLanguages$()
      .subscribe(
        (languages: number) => {
          this.panelNLanguages = languages;
        }
      );
  }

  ngOnDestroy(): void {
    this.panelNPages$.unsubscribe();
    this.panelNLanguages$.unsubscribe();
  }


  /**
   * Modifica la cantidad de páginas seleccionadas por el usuario.
   * Recibe el  @Output() 'quantityButtonPressed' de 'QuantityButtonsComponent'.
   * 
   * @param value Number - Emitido por el componente 'QuantityButtonsComponent'.
   */
  panelSetQuantityPages(value: number): void {
    this.serviceBudget.setNPages(value);
    this.panelCalculateSubtotalWeb();
  }

  /**
   * Modifica la cantidad de idiomas seleccionados por el usuario.
   * Recibe el  @Output() 'quantityButtonPressed' de 'QuantityButtonsComponent'.
   * 
   * @param value Number - Emitido por el componente 'QuantityButtonsComponent'.
   */
  panelSetQuantityLanguages(value: number): void {
    this.serviceBudget.setNLanguages(value);
    this.panelCalculateSubtotalWeb();
  }

  /**
   * Comprueba si los valores añadidos cumplen unos requisitos mínimos. 
   * Genera un total según los elementos web seleccionados.
   */
  private panelCalculateSubtotalWeb(): void {
    this.panelInvalidForm = this.serviceBudget.isNPagesOrNLanguagesZero();
    this.serviceBudget.calculateTotal();
  }

}
