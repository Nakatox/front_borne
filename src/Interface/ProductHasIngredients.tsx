import { Ingredient } from "./Ingredient";

export interface ProductHasIngredient {
    id: number;
    ingredientId: number;
    productId: number;
    ingredient: Ingredient;
}