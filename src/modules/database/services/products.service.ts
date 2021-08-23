import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import apiResponse from 'src/helpers/api-response';
import { Product, ProductDocument } from '../schema';

let ObjectId = Types.ObjectId;
@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    ) {}

    async findAll(): Promise<any> {
        try {
            const items = await this.productModel.find().exec();
            return apiResponse(
                HttpStatus.OK,
                { items, total: items.length },
                'success',
            );
        } catch (error) {
            return apiResponse(HttpStatus.INTERNAL_SERVER_ERROR, {}, '', error);
        }
    }

    async create(data: Product): Promise<any> {
        try {
            const convertData = {
                ...data,
                category_id: new ObjectId(data.category_id),
                brand_id: new ObjectId(data.brand_id),
            };
            const newProduct = await this.productModel.create(convertData);
            return apiResponse(
                HttpStatus.CREATED,
                { product: newProduct },
                'success',
            );
        } catch (error) {
            return apiResponse(HttpStatus.INTERNAL_SERVER_ERROR, {}, '', error);
        }
    }

    async findOne(id: string): Promise<any> {
        try {
            const realId = new ObjectId(id);
            const foundProduct = await this.productModel
                .findById(realId)
                .exec();
            return apiResponse(
                HttpStatus.OK,
                { product: foundProduct },
                'success',
            );
        } catch (error) {
            return apiResponse(HttpStatus.INTERNAL_SERVER_ERROR, {}, '', error);
        }
    }

    async delete(id: string): Promise<any> {
        try {
            const realId = new ObjectId(id);
            const deletedProduct = await this.productModel
                .findByIdAndDelete(realId)
                .exec();
            return apiResponse(
                HttpStatus.OK,
                { product: deletedProduct },
                'success',
            );
        } catch (error) {
            return apiResponse(HttpStatus.INTERNAL_SERVER_ERROR, {}, '', error);
        }
    }

    async update(id: string, data: Product): Promise<any> {
        try {
            const realId = new ObjectId(id);
            const updatedProduct = await this.productModel
                .findByIdAndUpdate(realId, {
                    ...data,
                    category_id: new ObjectId(data.category_id),
                    brand_id: new ObjectId(data.brand_id),
                })
                .exec();
            return apiResponse(
                HttpStatus.OK,
                { product: updatedProduct },
                'success',
            );
        } catch (error) {
            return apiResponse(HttpStatus.INTERNAL_SERVER_ERROR, {}, '', error);
        }
    }

    async getBestSeller(): Promise<any> {
        try {
            const items = await this.productModel
                .find()
                .sort({ sold: -1 })
                .limit(8)
                .populate([
                    { path: 'category_id', select: 'name' },
                    { path: 'brand_id', select: 'name' },
                ])
                .exec();

            return apiResponse(HttpStatus.OK, { items, total: items.length }, 'success');
        } catch (error) {
            return apiResponse(HttpStatus.INTERNAL_SERVER_ERROR, {}, '', error);
        }
    }

    async getNewProducts(): Promise<any> {
        try {
            const items = await this.productModel
                .find()
                .sort({ import_date: -1 })
                .limit(8)
                .exec();

            return apiResponse(HttpStatus.OK, { items, total: items.length }, 'success');
        } catch (error) {
            return apiResponse(HttpStatus.INTERNAL_SERVER_ERROR, {}, '', error);
        }
    }
}
