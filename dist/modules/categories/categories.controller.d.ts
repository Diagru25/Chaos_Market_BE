import { CategoriesService } from '../database/services/categories.service';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    findAll(): Promise<import("../database/schema").Category[]>;
    create(data: any): Promise<import("../database/schema").Category>;
}
