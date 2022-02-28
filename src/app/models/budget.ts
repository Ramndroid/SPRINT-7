import { IBudget } from './ibudget';

/**
 * Objeto Budget para representar los presupuestos que el usuario va generando y guardando.
 * Implementa la interfaz IBudget.
 */
export class Budget implements IBudget {

    /**
     * Referencia de ID autoincremental.
     */
    public static ids: number = 0;

    /**
     * ID único para cada presupuesto.
     */
    public id: number = 0;

    /**
     * Fecha de creación del prespuesto.
     */
    public date: Date;

    /**
     * Constructor. Implementa la interface IBudgets
     * 
     * @param budgetName String - Nombre del presupuesto.
     * @param customerName String - Nombre del cliente del presupuesto.
     * @param hasProductWeb Boolean - Determina si el presupuesto incluye o no una página web.
     * @param hasProductSeo Boolean - Determina si el presupuesto incluye o no una asesoria SEO.
     * @param hasProductGads Boolean - Determina si el presupuesto incluye o no una campaña de Googel Ads.
     * @param webNumberPages Number - Número de páginas que tendrá la web presupuestada.
     * @param webNumberLanguages Number - Número de idiomas disponibles en la web presupuestada.
     * @param budgetTotal String - Total expresado en euros del presupuesto.
     */
    constructor(
        public budgetName: string,
        public customerName: string,
        public hasProductWeb: boolean,
        public hasProductSeo: boolean,
        public hasProductGads: boolean,
        public webNumberPages: number,
        public webNumberLanguages: number,
        public budgetTotal: string
    ) {
        Budget.ids++;
        this.id = Budget.ids.valueOf();
        this.date = new Date();
    }
}