import { Ingredient } from "./Ingredient";
import { ProductHasIngredients } from "./ProductHasIngredients";

export interface Product {
    id: number;
    name: string;
    price: number;
    isCustom: boolean;
    picture: string;
    companyId: number;
    productHasIngredients: ProductHasIngredients[];
}