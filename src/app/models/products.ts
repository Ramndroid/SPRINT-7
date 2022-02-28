/**
 * Interface Products: referéncia de los productos disponibles y su estado en el presupuesto actual. 
 */
export interface Products {
    web: {
        title: string
        price: number
        selected: boolean
        pages: number
        languages: number
    }
    seo: {
        title: string
        price: number
        selected: boolean
    }
    gads: {
        title: string
        price: number
        selected: boolean
    }
}