import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { BrandsService } from '../database/services/brands.service';

import { Role } from 'src/configs/roles.enum';
import { Roles, RolesGuard } from '../auth/guards/roles.guard';

@Controller('v1/brands')
export class BrandsController {
    constructor(private readonly brandsService: BrandsService){}
    
    @Get()
    async findAll() {
        return this.brandsService.findAll();
    }

    @UseGuards(RolesGuard)
    @Roles(Role.Root, Role.Admin)
    @Post()
    async create(@Body() data) {
        return this.brandsService.create(data);
    }
}
