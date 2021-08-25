import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    Req,
    UseGuards,
    Res,
    HttpStatus
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from '../database/services/users.service';
import { Roles, RolesGuard } from '../auth/guards/roles.guard';
import { Role } from 'src/configs/roles.enum';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import apiResponse from 'src/helpers/api-response';

@Controller('v1/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(JwtAuthGuard)
    @Get('/info')
    async findOne(@Req() req, @Res() res: Response) {
        try {
            const result = await this.usersService.findOne(req.user.id);
            return apiResponse(res, HttpStatus.OK, {user: result}, 'success');
        }
        catch (error) {
            return apiResponse(res, HttpStatus.BAD_REQUEST, {}, error);
        }
    }
    
    @UseGuards(RolesGuard)
    @Roles(Role.Root, Role.Admin)
    @Get()
    async findAll(@Res() res: Response) {
        try {
            const result = await this.usersService.findAll();
            return apiResponse(res, HttpStatus.OK, {items: result}, 'success');
        }
        catch (error) {
            return apiResponse(res, HttpStatus.BAD_REQUEST, {}, error);
        }
    }

    @UseGuards(RolesGuard)
    @Roles(Role.Root)
    @Post()
    async create(@Body() data: any, @Res() res: Response) {
        try {
            const result = await this.usersService.create(data);
            return apiResponse(res, HttpStatus.CREATED, {user: result}, 'success');
        }
        catch (error) {
            return apiResponse(res, HttpStatus.BAD_REQUEST, {}, error);
        }
    }

    @UseGuards(RolesGuard)
    @Roles(Role.Root, Role.Admin, Role.User)
    @Put(':id')
    async update(@Body() data: any, @Param('id') id: string, @Req() req, @Res() res: Response) {
        try {
            const result = await this.usersService.update(id, data, req.user);
            if (!result)
                return apiResponse(res, HttpStatus.FORBIDDEN, {}, 'You do not have permission for this action');
            
            return apiResponse(res, HttpStatus.OK, {user: result}, 'success');
        }
        catch (error) {
            return apiResponse(res, HttpStatus.BAD_REQUEST, {}, error);
        }
    }
}
