import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Product, ProductDocument } from '../schema';

let ObjectId = Types.ObjectId;
@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    ) {}

    async findAll(): Promise<Product[]> {
        const items = await this.productModel.find().exec();
        return items;
    }

    async create(data: Product): Promise<Product> {
        const convertData = {
            ...data,
            category_id: new ObjectId(data.category_id),
            brand_id: new ObjectId(data.brand_id),
        };
        const newProduct = await this.productModel.create(convertData);
        return newProduct;
    }

    async findOne(id: string): Promise<Product> {
        const realId = new ObjectId(id);
        const foundProduct = await this.productModel.findById(realId).exec();
        return foundProduct;
    }

    async delete(id: string): Promise<Product> {
        const realId = new ObjectId(id);
        const deletedProduct = await this.productModel
            .findByIdAndDelete(realId)
            .exec();
        return deletedProduct;
    }

    async update(id: string, data: Product): Promise<Product> {
        const realId = new ObjectId(id);
        const updatedProduct = await this.productModel
            .findByIdAndUpdate(realId, {
                ...data,
                category_id: new ObjectId(data.category_id),
                brand_id: new ObjectId(data.brand_id),
            })
            .exec();
        return updatedProduct;
    }

    async getBestSeller(): Promise<Product[]> {
        const items = await this.productModel
            .find()
            .sort({ sold: -1 })
            .limit(8)
            .populate([
                { path: 'category_id', select: 'name' },
                { path: 'brand_id', select: 'name' },
            ])
            .exec();

        return items;
    }

    async getNewProducts(): Promise<Product[]> {
        const items = await this.productModel
            .find()
            .sort({ import_date: -1 })
            .limit(8)
            .exec();
        return items;
    }
}
