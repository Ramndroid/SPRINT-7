import { Component, DoCheck, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

/**
 * Componente QuantityButtonsComponent
 * Usados en PanellComponent.html
 * Incrementan o decrementan un valor.
 * 
 */
@Component({
  selector: 'app-quantity-buttons',
  templateUrl: './quantity-buttons.component.html',
  styleUrls: ['./quantity-buttons.component.css']
})
export class QuantityButtonsComponent implements OnInit, DoCheck {

  /**
   * ViewChild enlazado con ng-template #modal.
   * Ventana modal que mostrará el texto recibido en el @Input() 'quantityInformationTextButton'.
   */
  @ViewChild('modal') modalInfoButton?: ElementRef;
  
  /**
   * Texto a mostrar en el botón de información.
   */
  @Input() quantityInformationTextButton: string = "";

  /**
   * Valor precargado. Se recogerá (en otros componentes) si hay valores en los parámetros de la url.
   */
  @Input() quantityPreValue: number = 1;
  
  /**
   * Emisor accionado por el botón.
   */
  @Output() quantityButtonPressed = new EventEmitter<number>();

  /**
   * Valor emitido por @Output() 'quantityButtonPressed'.
   */
  quantityOutputValue: number = 1;

  /**
   * Constructor.
   * 
   * @param modal Elemento para poder visualizar 'modalInfoButton'.
   */
  constructor( private modal: NgbModal ) { }
  
  ngDoCheck(): void {
    this.quantityOutputValue = this.quantityPreValue;
  }

  /**
   * ngOnInit()
   * Recogemos el valor @Input() 'quantityPreValue' para actualizar el valor
   * de 'quantityOutputValue' (valor que va a ser emitido).
   * Se usa cuándo entramos a la web con parámetros modificados y estos son recogidos, se
   * usan para actualizar el valor de la cajetilla de texto de este componente.
   */
  ngOnInit(): void {
    this.quantityOutputValue = this.quantityPreValue;
  }

  /**
   * Abre al ventana modal. El botón información acciona este modal.
   * @returns Ventana modal con información del botón.
   */
  openModal = (): NgbModalRef => this.modal.open(this.modalInfoButton);

  /**
   * Modifica el valor que va a ser emitido.
   * 
   * @param value Unidades de crecimiento, solo puede ser +1 o -1.
   */
  quantityChangeValue(value: number): void {
    const valueTest = this.quantityOutputValue + value;
    if (valueTest >= 0) {
      this.quantityOutputValue += value;
      this.quantityPreValue += value;
    } else {
      this.quantityOutputValue = 1;
      this.quantityPreValue = 1;
    }
    this.quantityButtonPressed.emit(this.quantityOutputValue);
  }

  /**
   * Modifica el valor que va a ser emitido mediante introducción manual del usuario.
   * 
   * @param value Valor que va a tratar de modificar la cantidad que va a ser emitida.
   */
  quantityManualChange(value: string): void {
    const valueToInt = parseInt(value);
    if (!isNaN(valueToInt)) {
      this.quantityOutputValue = valueToInt;
      this.quantityPreValue = valueToInt;
      this.quantityButtonPressed.emit(this.quantityOutputValue);
    }
  }

}
