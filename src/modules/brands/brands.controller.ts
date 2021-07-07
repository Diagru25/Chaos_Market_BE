import { Body, Controller, Get, Post } from '@nestjs/common';
import { BrandsService } from '../database/services/brands.service';

@Controller('brands')
export class BrandsController {
    constructor(private readonly brandsService: BrandsService){}
    @Get()
    async findAll() {
        return this.brandsService.findAll();
    }

    @Post()
    async create(@Body() data) {
        return this.brandsService.create(data);
    }
}
