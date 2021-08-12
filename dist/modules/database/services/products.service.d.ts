import { Model } from 'mongoose';
import { Product, ProductDocument } from '../schema';
export declare class ProductsService {
    private productModel;
    constructor(productModel: Model<ProductDocument>);
    findAll(): Promise<Product[]>;
    create(data: Product): Promise<Product>;
    findOne(id: string): Promise<Product>;
    delete(id: string): Promise<any>;
    update(id: string, data: Product): Promise<any>;
    getBestSeller(): Promise<Product[]>;
    getNewProducts(): Promise<Product[]>;
}
