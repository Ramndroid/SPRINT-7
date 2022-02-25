import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-quantity-buttons',
  templateUrl: './quantity-buttons.component.html',
  styleUrls: ['./quantity-buttons.component.css']
})
export class QuantityButtonsComponent implements OnInit {

  @Input() quantityInformationTextButton: string = "";

  @Output() quantityButtonsPressedKey = new EventEmitter<number>();

  quantityInputValue: number = 1;

  constructor( public modal: NgbModal ) { }

  ngOnInit(): void {
    this.quantityButtonsPressedKey.emit(this.quantityInputValue);
  }

  quantityChangeValue(value: number): void {

    const valueTest = this.quantityInputValue + value;

    if (valueTest >= 0) {
      this.quantityInputValue += value;
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
