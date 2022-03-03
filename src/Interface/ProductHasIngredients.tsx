import { Ingredient } from "./Ingredient";

export interface ProductHasIngredients {
    id: number;
    ingredientId: number;
    productId: number;
    ingredient: Ingredient;
}