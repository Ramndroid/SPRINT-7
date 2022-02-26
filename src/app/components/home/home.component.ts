import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Budget } from './../../models/budget';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Products } from 'src/app/models/products';
import { GetTotalBudgetService } from 'src/app/services/get-total-budget.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('contenido') modalNoProductSelected?: ElementRef;

  homeProducts: Products = {
    web: {
      title: "Una pàgina web (desde 530 €)",
      price: 500,
      selected: false,
      pages: 10,
      languages: 15
    },
    seo: {
      title: "Una consultoría SEO (300 €)",
      price: 300,
      selected: false
    },
    gads: {
      title: "Una campanya de Google Ads (200 €)",
      price: 200,
      selected: false
    }
  }

  homeBudgetName: string = "";

  homeCustomerName: string = "";

  constructor(
    private modal: NgbModal,
    private serviceGetTotalBudget: GetTotalBudgetService,
    private router: Router,
    private _activatedRoute: ActivatedRoute,
  ) {
    this.homeGetParams();
  }

  ngOnInit(): void {
    this.homeCalculateTotal();

  }

  private homeSetParams() {

    this.router.navigate([], {
      relativeTo: this._activatedRoute,
      queryParams: {
        paginaWeb: this.homeProducts.web.selected,
        campaniaSeo: this.homeProducts.seo.selected,
        campaniaAds: this.homeProducts.gads.selected,
        nPaginas: this.homeProducts.web.pages,
        nIdiomas: this.homeProducts.web.languages
      },
      queryParamsHandling: 'merge'
    });
  }

  private homeGetParams() {
    //http://localhost:4200/calculadora?paginaWeb=true&campaniaSeo=true&campaniaAds=true&nPaginas=5&nIdiomas=10
    //http://localhost:4200/calculadora?paginaWeb=false&campaniaSeo=false&campaniaAds=false&nPaginas=1&nIdiomas=1

    let urlTree = this.router.parseUrl(this.router.url);
    let paginaWeb: boolean = urlTree.queryParams['paginaWeb'] === "true";
    let campaniaSeo: boolean = urlTree.queryParams['campaniaSeo'] === "true";
    let campaniaAds: boolean = urlTree.queryParams['campaniaAds'] === "true";

    this.homeProducts.web.selected = paginaWeb;
    this.homeProducts.seo.selected = campaniaSeo;
    this.homeProducts.gads.selected = campaniaAds;


    let paginas: number = parseInt(urlTree.queryParams['nPaginas']);
    let idiomas: number = parseInt(urlTree.queryParams['nIdiomas']);

    if (!isNaN(paginas))
      this.homeProducts.web.pages = paginas;

    if (!isNaN(idiomas))
      this.homeProducts.web.languages = idiomas;

    console.log(this.homeProducts);
  }

  homeCalculateTotal = (): void => {
    this.serviceGetTotalBudget.calculateTotal(this.homeProducts);
    this.homeSetParams();
  };

  homeGetTotalInEuros = (): string => this.serviceGetTotalBudget.getTotalInEuros("Preu: ");

  homeSaveBudget(): void {
    const currentBudget = new Budget(
      this.homeBudgetName,
      this.homeCustomerName,
      this.homeProducts.web.selected,
      this.homeProducts.seo.selected,
      this.homeProducts.gads.selected,
      0, 0, // These values will be replaced in the ServiceGetTotalBudget.addNewBudget(...)
      this.serviceGetTotalBudget.getTotalInEuros());

    if (this.serviceGetTotalBudget.addNewBudget(currentBudget)) {
      this.modal.open(this.modalNoProductSelected);
    }

  }

  homeEraseInputs(): void {
    this.homeBudgetName = "";
    this.homeCustomerName = "";
    this.homeProducts.web.selected = false;
    this.homeProducts.seo.selected = false;
    this.homeProducts.gads.selected = false;
    this.homeCalculateTotal();
  }
}