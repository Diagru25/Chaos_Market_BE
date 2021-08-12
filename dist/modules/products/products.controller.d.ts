import { ProductsService } from '../database/services/products.service';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    findAll(): Promise<import("../database/schema").Product[]>;
    getBestSeller(): Promise<import("../database/schema").Product[]>;
    getNewProducts(): Promise<import("../database/schema").Product[]>;
    findOne(id: string): Promise<import("../database/schema").Product>;
    create(data: any, file: any): Promise<import("../database/schema").Product>;
    delete(id: string): Promise<any>;
    update(id: string, data: any, file: any): Promise<any>;
}
