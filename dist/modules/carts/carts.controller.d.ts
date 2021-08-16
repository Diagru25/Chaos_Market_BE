import { CartsService } from "../database/services/carts.service";
export declare class CartsController {
    private readonly cartsService;
    constructor(cartsService: CartsService);
    getCart(req: any): Promise<any>;
    addToCart(data: any, req: any): Promise<any>;
}
