import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { CartsService } from "../database/services/carts.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Controller('v1/carts')
export class CartsController {
    constructor(private readonly cartsService: CartsService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getCart(@Request() req) {
        return this.cartsService.findByOwner(req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createCart(@Body() data: any, @Request() req) {
        return this.cartsService.createCart(req.user.id, data);
    }
}