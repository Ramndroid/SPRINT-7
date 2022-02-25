import { IBudget } from './ibudget';
export class Budget implements IBudget {

    static ids: number = 0;

    public id: number = 0;
    public date: Date;

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
        this.date = new Date();
    }

    static addID() {
        Budget.ids++;
    }
}