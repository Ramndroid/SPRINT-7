import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  homeCheckboxes: boolean[] = [false, false, false];

  homeTotal: number = 0;

  constructor() { }

  ngOnInit(): void { }

  homeClickOnCheckbox(event: any) {

    console.log(event.target.checked ?
      `El usuario ha agregado ${event.target.id.replace("check", "")}`
      : `El usuario ha retirado ${event.target.id.replace("check", "")}`);

    const currentTotal = [0];

    if (this.homeCheckboxes[0]) {
      currentTotal.push(500);
    }

    if (this.homeCheckboxes[1]) {
      currentTotal.push(300);
    }

    if (this.homeCheckboxes[2]) {
      currentTotal.push(200);
    }

    this.homeTotal = currentTotal.reduce((prev, curr) => prev + curr);
  }


}
