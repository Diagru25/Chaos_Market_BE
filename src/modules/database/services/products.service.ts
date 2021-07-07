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
    return this.productModel.find().exec();
  }

  async create(data: Product): Promise<Product> {
    const convertData = {
      ...data,
      category_id: new ObjectId(data.category_id),
      brand_id: new ObjectId(data.brand_id),
    };
    return this.productModel.create(convertData);
  }

  async findOne(id: string): Promise<Product> {
    const realId = new ObjectId(id);
    return this.productModel.findById(realId).exec();
  }

  async delete(id: string): Promise<any> {
    const realId = new ObjectId(id);
    return this.productModel.findByIdAndDelete(id).exec();
  }

  async update(id: string, data: Product): Promise<any> {
      const realId = new ObjectId(id);
      return this.productModel.findByIdAndUpdate(realId, {
        ...data,
        category_id: new ObjectId(data.category_id),
        brand_id: new ObjectId(data.brand_id),
      }).exec();
  }
}
