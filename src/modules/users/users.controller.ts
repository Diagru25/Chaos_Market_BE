import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { UsersService } from '../database/services/users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles, RolesGuard } from '../auth/guards/roles.guard';
import {Role} from 'src/configs/roles.enum';

@Controller('v1/users')
export class UsersController {

    constructor(private readonly usersService: UsersService){}

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll() {
        return this.usersService.findAll();
    }

    @UseGuards(RolesGuard)
    @Roles(Role.Admin, Role.Root)
    @Get(':id')
    async findOne(@Param('id') id: string, @Request() req) {
        return this.usersService.findOne(id);
    }

    @Post()
    async create(@Body() data: any) {
        return this.usersService.create(data);
    }
}
