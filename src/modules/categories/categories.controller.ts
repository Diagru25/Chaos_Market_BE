import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoriesService } from '../database/services/categories.service';
@Controller('v1/categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService){}

    @Get()
    async findAll() {
        return this.categoriesService.findAll();
    }

    @Post()
    async create(@Body() data) {
        return this.categoriesService.create(data);
    }
}
