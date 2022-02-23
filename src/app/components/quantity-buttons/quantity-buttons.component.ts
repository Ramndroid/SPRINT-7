import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-quantity-buttons',
  templateUrl: './quantity-buttons.component.html',
  styleUrls: ['./quantity-buttons.component.css']
})
export class QuantityButtonsComponent implements OnInit {

  @Output() quantityButtonsPressedKey = new EventEmitter<number>();

  quantityInputValue: number = 1;

  constructor() { }

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

  quantityManualChange(value: string) {
    const valueToInt = parseInt(value);
    if (!isNaN(valueToInt)) {
      this.quantityInputValue = valueToInt;
      this.quantityButtonsPressedKey.emit(this.quantityInputValue);
    }
  }

  showValue(value:any) {
    console.log(typeof value, value);
  }

}
