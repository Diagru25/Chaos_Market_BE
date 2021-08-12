import { BrandsService } from '../database/services/brands.service';
export declare class BrandsController {
    private readonly brandsService;
    constructor(brandsService: BrandsService);
    findAll(): Promise<import("../database/schema").Brand[]>;
    create(data: any): Promise<import("../database/schema").Brand>;
}
