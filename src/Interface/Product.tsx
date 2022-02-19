import { Ingredient } from "./Ingredient";

export interface Product {
    id: number;
    name: string;
    price: number;
    isCustom: boolean;
    picture: string;
    companyId: number;
    ingredients: Ingredient[];
}