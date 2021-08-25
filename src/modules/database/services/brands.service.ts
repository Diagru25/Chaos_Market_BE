import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Brand, BrandDocument } from '../schema';

@Injectable()
export class BrandsService {
    constructor(
        @InjectModel(Brand.name) private brandModel: Model<BrandDocument>,
    ) {}

    async findAll(): Promise<Brand[]> {
        const items = await this.brandModel.find().exec();
        return items;
    }

    async create(data: Brand): Promise<Brand> {
        const newBrand = await this.brandModel.create(data);
        return newBrand;
    }
}
