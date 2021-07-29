import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { CardService } from "../database/services/cards.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Controller('v1/cards')
export class CardsController {
    constructor(private readonly cardsService: CardService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getCard(@Request() req) {
        return this.cardsService.findByOwner(req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createCard(@Body() data: any, @Request() req) {
        return this.cardsService.createCard(req.user.id, data);
    }
}