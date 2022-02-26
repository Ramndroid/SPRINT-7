import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-quantity-buttons',
  templateUrl: './quantity-buttons.component.html',
  styleUrls: ['./quantity-buttons.component.css']
})
export class QuantityButtonsComponent implements OnInit {

  @ViewChild('contenido') modalInfoButton?: ElementRef;
  
  @Input() quantityInformationTextButton: string = "";

  @Input() quantityPreValue: number = 1;
  
  @Output() quantityButtonsPressedKey = new EventEmitter<number>();

  quantityInputValue: number = 1;

  constructor( private modal: NgbModal ) {
    // this.quantityButtonsPressedKey.emit(5);
    // this.quantityManualChange("5");
  }

  ngOnInit(): void {
    // this.quantityButtonsPressedKey.emit(this.quantityInputValue);
    this.quantityInputValue = this.quantityPreValue;
    // this.quantityManualChange("5");
    
  }

  openModal = (): NgbModalRef => this.modal.open(this.modalInfoButton);

  quantityChangeValue(value: number): void {
    const valueTest = this.quantityInputValue + value;
    if (valueTest >= 0) {
      this.quantityInputValue += value;
    } else {
      this.quantityInputValue = 1;
    }
    this.quantityButtonsPressedKey.emit(this.quantityInputValue);
  }

  quantityManualChange(value: string): void {
    const valueToInt = parseInt(value);
    if (!isNaN(valueToInt)) {
      this.quantityInputValue = valueToInt;
      this.quantityButtonsPressedKey.emit(this.quantityInputValue);
    }
  }

}
