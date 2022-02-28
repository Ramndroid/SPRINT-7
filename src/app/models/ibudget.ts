/**
 * Interface IBudget. Representación de los presupuestos generados y guardados por el usuario.
 * 
 * budgetName String - Nombre del presupuesto.
 * customerName String - Nombre del cliente del presupuesto.
 * hasProductWeb Boolean - Determina si el presupuesto incluye o no una página web.
 * hasProductSeo Boolean - Determina si el presupuesto incluye o no una asesoria SEO.
 * hasProductGads Boolean - Determina si el presupuesto incluye o no una campaña de Googel Ads.
 * webNumberPages Number - Número de páginas que tendrá la web presupuestada.
 * webNumberLanguages Number - Número de idiomas disponibles en la web presupuestada.
 * budgetTotal String - Total expresado en euros del presupuesto.
 */
export interface IBudget {
    budgetName: string,
    customerName: string,
    hasProductWeb: boolean,
    hasProductSeo: boolean,
    hasProductGads: boolean,
    webNumberPages: number,
    webNumberLanguages: number,
    budgetTotal: string
}