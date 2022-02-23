import { GetTotalBudgetService } from './services/get-total-budget.service';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PanellComponent } from './components/panell/panell.component';
import { QuantityButtonsComponent } from './components/quantity-buttons/quantity-buttons.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PanellComponent,
    QuantityButtonsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    GetTotalBudgetService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
