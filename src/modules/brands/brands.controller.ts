import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Post,
    Res,
    UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

import { BrandsService } from '../database/services/brands.service';
import { Role } from 'src/configs/roles.enum';
import { Roles, RolesGuard } from '../auth/guards/roles.guard';
import apiResponse from 'src/helpers/api-response';
@Controller('v1/brands')
export class BrandsController {
    constructor(private readonly brandsService: BrandsService) {}

    @Get()
    async findAll(@Res() res: Response) {
        try {
            const result = await this.brandsService.findAll();
            return apiResponse(
                res,
                HttpStatus.OK,
                { items: result },
                'success',
            );
        } catch (error) {
            return apiResponse(
                res,
                HttpStatus.INTERNAL_SERVER_ERROR,
                {},
                error,
            );
        }
    }

    @UseGuards(RolesGuard)
    @Roles(Role.Root, Role.Admin)
    @Post()
    async create(@Body() data, @Res() res: Response) {
        try {
            const result = await this.brandsService.create(data);
            return apiResponse(
                res,
                HttpStatus.OK,
                { brand: result },
                'success',
            );
        } catch (error) {
            return apiResponse(
                res,
                HttpStatus.INTERNAL_SERVER_ERROR,
                {},
                error,
            );
        }
    }
}
