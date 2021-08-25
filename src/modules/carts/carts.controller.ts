import {
    Body,
    Controller,
    Get,
    Post,
    Put,
    Req,
    UseGuards,
    Param,
    Delete,
    Res,
    HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { CartsService } from '../database/services/carts.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import apiResponse from 'src/helpers/api-response';

@Controller('v1/carts')
export class CartsController {
    constructor(private readonly cartsService: CartsService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getCart(@Req() req, @Res() res: Response) {
        try {
            const result = await this.cartsService.findByOwner(req.user.id);
            return apiResponse(res, HttpStatus.OK, result, 'success');
        } catch (error) {
            return apiResponse(res, HttpStatus.BAD_REQUEST, {}, error);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Put(':cartDetailId')
    async updateQuantityCart(
        @Param('cartDetailId') cartDetailId: string,
        @Body() data: any,
        @Res() res: Response,
    ) {
        try {
            const result = await this.cartsService.updateQuantityCartDetail(
                cartDetailId,
                data.quantity,
            );
            return apiResponse(
                res,
                HttpStatus.OK,
                { cartItem: result },
                'success',
            );
        } catch (error) {
            return apiResponse(res, HttpStatus.BAD_REQUEST, {}, error);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':cartDetailId')
    async deleteCartDetail(
        @Param('cartDetailId') cartDetailId: string,
        @Res() res: Response,
    ) {
        try {
            const result = await this.cartsService.deleteCartDetail(
                cartDetailId,
            );
            return apiResponse(
                res,
                HttpStatus.OK,
                { cartItem: result },
                'success',
            );
        } catch (error) {
            return apiResponse(res, HttpStatus.BAD_REQUEST, {}, error);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async addToCart(@Body() data: any, @Req() req, @Res() res: Response) {
        try {
            const result = await this.cartsService.addToCart(req.user.id, data);
            return apiResponse(res, HttpStatus.CREATED, result, 'success');
        }
        catch (error) {
            return apiResponse(res, HttpStatus.BAD_REQUEST, {}, error);
        }
    }
}
