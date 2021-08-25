import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from '../schema';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectModel(Category.name)
        private categoryModel: Model<CategoryDocument>,
    ) {}

    async findAll(): Promise<Category[]> {
        const items = await this.categoryModel.find().exec();
        return items;
    }

    async create(data: Category): Promise<Category> {
        const newCategory = await this.categoryModel.create(data);
        return newCategory;
    }
}
