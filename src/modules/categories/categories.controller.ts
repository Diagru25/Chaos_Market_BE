import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Role } from 'src/configs/roles.enum';
import { Roles, RolesGuard } from '../auth/guards/roles.guard';
import { CategoriesService } from '../database/services/categories.service';
@Controller('v1/categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService){}

    @Get()
    async findAll() {
        return this.categoriesService.findAll();
    }

    @UseGuards(RolesGuard)
    @Roles(Role.Root, Role.Admin)
    @Post()
    async create(@Body() data) {
        return this.categoriesService.create(data);
    }
}
