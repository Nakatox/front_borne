import { Stock } from "./Stock";

export interface Ingredient {
    id: number;
    name: string;
    price: number;
    isRemovable: boolean;
    stock: Stock;
}