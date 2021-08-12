import { Model } from 'mongoose';
import { Brand, BrandDocument } from '../schema';
export declare class BrandsService {
    private brandModel;
    constructor(brandModel: Model<BrandDocument>);
    findAll(): Promise<Brand[]>;
    create(data: Brand): Promise<Brand>;
}
