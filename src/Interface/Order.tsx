import { Product } from "./Product";
import { Ingredient } from "./Ingredient";
import { State } from "./State";
import { User } from "./User";

export interface Order {
    id: number;
    createdAt: Date;
    products: Array<Product>;
    totalPrice: number;
    state: State;
    user: User;
    orderNumber: string;
}