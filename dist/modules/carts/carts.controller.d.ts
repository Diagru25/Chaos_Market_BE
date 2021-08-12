import { CartsService } from "../database/services/carts.service";
export declare class CartsController {
    private readonly cartsService;
    constructor(cartsService: CartsService);
    getCart(req: any): Promise<import("../database/schema").Cart>;
    createCart(data: any, req: any): Promise<import("../database/schema").Cart>;
}
