import { Budget } from './../models/budget';
import { AfterContentInit, Injectable, OnInit } from '@angular/core';
import { Products } from '../models/products';
import { reverseArray, sortByAlphabet, sortByDate, searchByName } from './sort-and-search-tools';
import { getValueInEuros } from './show-value-in-euros';
import { ShowBudgetsInstructions } from '../models/show-budgets-enum';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

/**
 * Servicio principal de la aplicación.
 * Contiene datos, valores almacenados, cálculos...
 * 
 */
@Injectable({
  providedIn: 'root'
})
export class BudgetsService implements OnInit, AfterContentInit {

  /**
   * Total del presupuesto actula en euros (string).
   * 'home.component.html' consume esta variable.
   * 
   */
  public totalInEuros: string = "";

  /**
   * Productos disponibles en la web y su estado ('selected') en el presupuesto actual.
   * 'home.component.html' consume estos datos.
   * 
   */
  public products: Products = {
    web: {
      title: "Una pàgina web (desde 530 €)",
      price: 500,
      selected: false,
      pages: 1,
      languages: 1
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

  /**
   * Total del presupuesto (number).
   */
  private totalBudget: number = 0;

  /**
   * Todos los presupuestos generados y guardados por el usuario.
   */
  private budgets: Budget[] = [];

  private budgetName$: Subject<string>;

  private customerName$: Subject<string>;

  private npages$: Subject<number>;

  private nlanguages$: Subject<number>;

  // budgetName: string;

  // customerName: string;

  /**
   * Constructor.
   * Recupera datos (Budget[]) guardados en otras sesiones.
   * 
   * @param router Un servicio que proporciona navegación entre vistas y capacidades de manipulación de URL.
   * @param _activatedRoute Brinda acceso a información sobre una ruta asociada a un componente.
   */
  constructor(
    private router: Router,
    private _activatedRoute: ActivatedRoute,
  ) {
    this.getParams();
    this.getLocalStorage();
    this.npages$ = new Subject();
    this.nlanguages$ = new Subject();
    this.budgetName$ = new Subject();
    this.customerName$ = new Subject();
    // this.budgetName = "";
    // this.customerName = "";
  }
  ngAfterContentInit(): void {
    // this.getParams();
    // this.getLocalStorage();
    // this.budgetName$.next(this.budgetName);
    
  }

  ngOnInit(): void {
    // this.getParams();
    // this.getLocalStorage();
    // this.budgetName$.next(this.budgetName);
  }

  getBudgetName$(): Observable<string> {
    return this.budgetName$.asObservable();
  }

  getCustomerName$(): Observable<string> {
    return this.customerName$.asObservable();
  }

  getNPages$(): Observable<number> {
    return this.npages$.asObservable();
  }

  getNLanguages$(): Observable<number> {
    return this.nlanguages$.asObservable();
  }

  private modBudgetName(name: string) {
    // this.budgetName = name;
    // this.budgetName$.next(name);
  }
  /**
   * Obtiene los parámtetros de la URL y los inyecta en 'products'.
   */
  private getParams(): void {
    let urlTree = this.router.parseUrl(this.router.url);
    // let budgetName: string = urlTree.queryParams['budget'] === undefined ? "noname" : urlTree.queryParams['budget'];
    // let customerName: string = urlTree.queryParams['customer'];
    let paginaWeb: boolean = urlTree.queryParams['paginaWeb'] === "true";
    let campaniaSeo: boolean = urlTree.queryParams['campaniaSeo'] === "true";
    let campaniaAds: boolean = urlTree.queryParams['campaniaAds'] === "true";

    // console.log(budgetName);
    // this.modBudgetName(budgetName);
    // this.budgetName$.next(budgetName);
    // this.budgetName = budgetName;


    // this.customerName$.next(customerName);
    // this.budgetName = budgetName;
    // if (budgetName !== undefined) {
      // this.budgetName$.next(budgetName);

    // }
    // this.customerName = customerName;

    this.products.web.selected = paginaWeb;
    this.products.seo.selected = campaniaSeo;
    this.products.gads.selected = campaniaAds;

    let paginas: number = parseInt(urlTree.queryParams['nPaginas']);
    let idiomas: number = parseInt(urlTree.queryParams['nIdiomas']);

    if (!isNaN(paginas))
      this.products.web.pages = paginas;

    if (!isNaN(idiomas))
      this.products.web.languages = idiomas;

    this.calculateTotal();
    // this.budgetName$.next("ramon");
  }

  /**
   * Modifica los parámetros de la URL en función del estado de 'products'.
   */
  private setParams(): void {
    this.router.navigate([], {
      relativeTo: this._activatedRoute,
      queryParams: {
        // budget: this.budgetName,
        // customer: this.customerName,
        paginaWeb: this.products.web.selected,
        campaniaSeo: this.products.seo.selected,
        campaniaAds: this.products.gads.selected,
        nPaginas: this.products.web.pages,
        nIdiomas: this.products.web.languages
      },
      queryParamsHandling: 'merge'
    });

    // this.budgetName$.next(this.budgetName);
  }

  /**
   * Copia la url del presupuesto actual y la pega en el portapapeles.
   */
  shareBudget(): void {
    const url = this.router.createUrlTree([], {
      relativeTo: this._activatedRoute,
      queryParams: {
        // budget: this.budgetName,
        // customer: this.customerName,
        paginaWeb: this.products.web.selected,
        campaniaSeo: this.products.seo.selected,
        campaniaAds: this.products.gads.selected,
        nPaginas: this.products.web.pages,
        nIdiomas: this.products.web.languages
      }
    });
    const textArea = document.createElement('textarea');
    textArea.value = window.location.origin + url;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    alert('Link del pressupost enganxat al porta-papers!');
  }

  shareSavedBudget(budget: Budget) {
    // const budgetname = this.budgetName;
    // const customer = this.customerName;
    const paginaWeb = budget.hasProductWeb;
    const campaniaSeo = budget.hasProductSeo
    const campaniaAds = budget.hasProductGads
    const nPaginas = budget.webNumberPages;
    const nIdiomas = budget.webNumberLanguages;
    // let result = `/calculadora?budgetname=${budgetname}&`;
    // result += `customer=${customer}&`;
    let result = `/calculadora?`;
    result += `paginaWeb=${paginaWeb}&`;
    result += `campaniaSeo=${campaniaSeo}&`;
    result += `campaniaAds=${campaniaAds}&`;
    result += `nPaginas=${nPaginas}&`;
    result += `nIdiomas=${nIdiomas}`;

    const textArea = document.createElement('textarea');
    textArea.value = window.location.origin + result;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    alert('Link del pressupost enganxat al porta-papers!');
  }

  openSavedBudget(budget: Budget) {
    const paginaWeb = budget.hasProductWeb;
    const campaniaSeo = budget.hasProductSeo
    const campaniaAds = budget.hasProductGads
    const nPaginas = budget.webNumberPages;
    const nIdiomas = budget.webNumberLanguages;

    this.router.navigate([], {
      relativeTo: this._activatedRoute,
      queryParams: {
        paginaWeb: paginaWeb,
        campaniaSeo: campaniaSeo,
        campaniaAds: campaniaAds,
        nPaginas: nPaginas,
        nIdiomas: nIdiomas
      },
      queryParamsHandling: 'preserve'
    });

    this.products.web.selected = paginaWeb;
    this.products.seo.selected = campaniaSeo;
    this.products.gads.selected = campaniaAds;

    let paginas: number = nPaginas;

    let idiomas: number = nIdiomas;

    this.budgetName$.next(budget.budgetName);

    this.customerName$.next(budget.customerName);

    if (!isNaN(paginas)) {
      this.products.web.pages = paginas;
      this.npages$.next(paginas);
    }

    if (!isNaN(idiomas)) {
      this.products.web.languages = idiomas;
      this.nlanguages$.next(idiomas);
    }

    this.calculateTotal();

  }

  /**
   * Recupera los presupuestos almacenados en localstorage.
   */
  private getLocalStorage(): void {
    // Recuperación de los presupuestos (Budget[]) guardados.
    const budgets = window.localStorage.getItem("budgets");
    if (budgets != null) {
      const result: Budget[] = JSON.parse(budgets);
      result.map((budget: Budget) => {
        const date = new Date(budget.date);
        budget.date = date;
      });
      this.loadBudgets(result);
    }

    // Recuperación de ids
    const ids = window.localStorage.getItem("ids");
    if (ids != null) {
      Budget.ids = parseInt(ids);
    }
  }

  /**
   * Modifica los presupuestos almacenados en localstorage.
   */
  private saveBudgetsInLocalStorage(): void {
    window.localStorage.setItem("budgets", JSON.stringify(this.budgets));
    window.localStorage.setItem("ids", Budget.ids.toString());
  }

  /**
   * Calcula el total presupuestado en el producto web con todas sus modificaciones.
   * 
   * @returns Number - Total presupuestado por la web (base + páginas + idiomas).
   */
  private setSubtotalWeb(): number {

    if (this.products.web.pages > 0 && this.products.web.languages > 0) {

      return (this.products.web.pages * this.products.web.languages * 30) + this.products.web.price;

    } else if (this.products.web.pages > 0 && this.products.web.languages <= 0) {

      return (this.products.web.pages * 30) + this.products.web.price;

    } else if (this.products.web.pages <= 0 && this.products.web.languages > 0) {

      return (this.products.web.languages * 30) + this.products.web.price;

    } else if (this.products.web.pages <= 0 && this.products.web.languages <= 0) {

      return this.products.web.price;

    }

    return 0;

  }

  /**
   * Devuelve 'products' a su estado original.
   */
  eraseFields(): void {
    this.products.web.selected = false;
    this.products.web.pages = 1;
    this.products.web.languages = 1;
    this.products.seo.selected = false;
    this.products.gads.selected = false;
  }

  /**
   * Obtener el número de páginas en el presupuesto actual.
   * 
   * @returns Number - Número de páginas del presupuesto actual almacenadas en 'products'.
   */
  getNPages = (): number => this.products.web.pages;



  /**
   * Obtener el número de idiomas en el presupuesto actual.
   * 
   * @returns Number - Número de idiomas del presupuesto actual almacenados en 'products'.
   */
  getNLanguages = (): number => this.products.web.languages;

  /**
   * Modifica el número de páginas a presupuestar.
   * 
   * @param value Number - Nuevo valor que va atener 'this.products.web.pages'.
   */
  setNPages(value: number): void {
    this.products.web.pages = value;
  }

  /**
   * Modifica el número de idiomas a presupuestar.
   * 
   * @param value Number - Nuevo valor que va atener 'this.products.web.languages'.
   */
  setNLanguages(value: number): void {
    this.products.web.languages = value;
  }

  /**
   * Determina si se ha seleccionado '0' páginas o '0' idiomas
   * 
   * @returns Boolean - true si alguno de los campos es 0. False si todos los campos son 1 o más
   */
  isNPagesOrNLanguagesZero(): boolean {
    return (this.products.web.pages == 0 || this.products.web.languages == 0);
  }

  /**
   * Calcula el total del presupuesto actual en función de si hay producto web, seo y/o google ads.
   * 
   * @returns Number - Total del presupuesto actual.
   */
  calculateTotal(): number {

    let subtotalWeb: number;

    if (this.products.web.selected) {
      subtotalWeb = this.setSubtotalWeb();
    } else {
      subtotalWeb = 0;
      this.products.web.pages = 1;
      this.products.web.languages = 1;
    }

    const subtotalSeo = this.products.seo.selected ? this.products.seo.price : 0;

    const subtotalGAds = this.products.gads.selected ? this.products.gads.price : 0;

    this.totalBudget = subtotalWeb + subtotalSeo + subtotalGAds;

    this.totalInEuros = getValueInEuros(this.totalBudget);

    this.setParams();

    return this.totalBudget;
  }

  /**
   * Cargar una colección (array) de Budgets.
   * 
   * @param budgets Matriz de presupuestos (Budget[]).
   */
  loadBudgets = (budgets: Budget[]) => this.budgets = [...budgets];

  /**
   * Devuelve el número total de presupuesto almacenados.
   * 
   * @returns Number - Budget[] length.
   */
  getBudgetsSize = (): number => this.budgets.length;

  /**
   * Obtiene los presupuestos almacenados en el servicio principal de la aplicación
   * 
   * @param instruction Enum, determina cómo se van a visualizar los datos
   * @param search Palabra a buscar en el caso de ShowBudgetsInstructions = 3.
   * @returns Budget[] con los valores organizados tal y como 'instruction' ha determinado.
   */
  getBudgets(instruction: ShowBudgetsInstructions = ShowBudgetsInstructions.id_reverse, search: string = ""): Budget[] {

    const result: Budget[] = [...this.budgets];

    switch (instruction) {
      case ShowBudgetsInstructions.id_reverse: return reverseArray(result);
      case ShowBudgetsInstructions.alphabet: return sortByAlphabet(result);
      case ShowBudgetsInstructions.date: return sortByDate(result);
      case ShowBudgetsInstructions.search: return searchByName(result, search);
    }
  }

  /**
   * Añade un nuevo presupuesto a Budget[].
   * 
   * @param budgetName Nombre del presupuesto.
   * @param customerName Nombre del cliente del presupuesto.
   * @returns Devuelve true si ha podido crear un nuevo presupuesto, y false si no.
   */
  addNewBudget(budgetName: string, customerName: string): boolean {

    if (this.totalBudget > 0) {

      const currentBudget = new Budget(
        budgetName,
        customerName,
        this.products.web.selected,
        this.products.seo.selected,
        this.products.gads.selected,
        this.products.web.pages,
        this.products.web.languages,
        getValueInEuros(this.totalBudget)
      );

      this.budgets.push(currentBudget);

      this.saveBudgetsInLocalStorage();

      return true;
    }

    return false;
  }

  /**
   * Elimina un determinado presupuesto de Budget[].
   * 
   * @param id Identificación del presupuesto a eliminar.
   */
  deleteBudget(id: number): void {
    const indexToDelete = this.budgets.findIndex(budget => budget.id == id);
    this.budgets.splice(indexToDelete, 1);
    this.saveBudgetsInLocalStorage();
  }

  /**
   * Eliminar todo el localstorage, vacia Budget[] y resetea Budget.ids.
   */
  eraseAllBudgetsAndLocalStorage() {
    window.localStorage.clear();
    this.budgets = [];
    Budget.ids = 0;
  }

}