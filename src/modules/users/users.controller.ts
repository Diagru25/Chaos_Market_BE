import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    Request,
    UseGuards,
} from '@nestjs/common';
import { UsersService } from '../database/services/users.service';
import { Roles, RolesGuard } from '../auth/guards/roles.guard';
import { Role } from 'src/configs/roles.enum';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('v1/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(JwtAuthGuard)
    @Get('/info')
    async findOne(@Request() req) {
        //console.log(req.user);
        return this.usersService.findOne(req.user.id);
    }
    
    @UseGuards(RolesGuard)
    @Roles(Role.Root, Role.Admin)
    @Get()
    async findAll() {
        return this.usersService.findAll();
    }

    @UseGuards(RolesGuard)
    @Roles(Role.Root)
    @Post()
    async create(@Body() data: any) {
        return this.usersService.create(data);
    }

    @UseGuards(RolesGuard)
    @Roles(Role.Root, Role.Admin, Role.User)
    @Put(':id')
    async update(@Body() data: any, @Param('id') id: string, @Request() req) {
        return this.usersService.update(id, data, req.user);
    }
}
