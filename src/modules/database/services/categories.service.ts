import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import apiResponse from 'src/helpers/api-response';
import { Category, CategoryDocument } from '../schema';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectModel(Category.name)
        private categoryModel: Model<CategoryDocument>,
    ) {}

    async findAll(): Promise<any> {
        try {
            const items = await this.categoryModel.find().exec();
            return apiResponse(HttpStatus.OK, { items }, 'success');
        } catch (error) {
            return apiResponse(HttpStatus.INTERNAL_SERVER_ERROR, {}, '', error);
        }
    }

    async create(data: Category): Promise<any> {
        try {
            const newCategory = await this.categoryModel.create(data);
            return apiResponse(
                HttpStatus.CREATED,
                { category: newCategory },
                'success',
            );
        } catch (error) {
            apiResponse(HttpStatus.INTERNAL_SERVER_ERROR, {}, '', error);
        }
    }
}
