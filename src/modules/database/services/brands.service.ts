import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import apiResponse from 'src/helpers/api-response';
import { Brand, BrandDocument } from '../schema';

@Injectable()
export class BrandsService {
    constructor(
        @InjectModel(Brand.name) private brandModel: Model<BrandDocument>,
    ) {}

    async findAll(): Promise<any> {
        try {
            const items = await this.brandModel.find().exec();
            return apiResponse(HttpStatus.OK, { items }, 'success');
        } catch (error) {
            return apiResponse(HttpStatus.INTERNAL_SERVER_ERROR, {}, '', error);
        }
    }

    async create(data: Brand): Promise<any> {
        try {
            const newBrand = await this.brandModel.create(data);
            return apiResponse(HttpStatus.OK, { brand: newBrand }, 'success');
        } catch (error) {
            return apiResponse(HttpStatus.INTERNAL_SERVER_ERROR, {}, '', error);
        }
    }
}
