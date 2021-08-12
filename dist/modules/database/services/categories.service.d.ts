import { Model } from 'mongoose';
import { Category, CategoryDocument } from '../schema';
export declare class CategoriesService {
    private categoryModel;
    constructor(categoryModel: Model<CategoryDocument>);
    findAll(): Promise<Category[]>;
    create(data: Category): Promise<Category>;
}
