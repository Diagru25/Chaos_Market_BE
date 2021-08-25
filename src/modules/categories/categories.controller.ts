import { Body, Controller, Get, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { Role } from 'src/configs/roles.enum';
import { Roles, RolesGuard } from '../auth/guards/roles.guard';
import { CategoriesService } from '../database/services/categories.service';
import { Response } from 'express';
import apiResponse from 'src/helpers/api-response';
@Controller('v1/categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService){}

    @Get()
    async findAll(@Res() res: Response) {
        const result = await this.categoriesService.findAll();

        return apiResponse(res, HttpStatus.OK, {items: result}, 'success');
    }

    @UseGuards(RolesGuard)
    @Roles(Role.Root, Role.Admin)
    @Post()
    async create(@Body() data, @Res() res: Response) {
        const result = await this.categoriesService.create(data);
        return apiResponse(res, HttpStatus.CREATED, {category: result}, 'success');
    }
}
