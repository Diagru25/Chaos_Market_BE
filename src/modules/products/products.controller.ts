import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Res,
    Post,
    Put,
    UploadedFile,
    UseInterceptors,
    UseGuards,
    HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ProductsService } from '../database/services/products.service';
import { Roles, RolesGuard } from '../auth/guards/roles.guard';
import { Role } from 'src/configs/roles.enum';
import apiResponse from 'src/helpers/api-response';
@Controller('v1/products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get()
    async findAll(@Res() res: Response) {
        try {
            const result = await this.productsService.findAll();
            return apiResponse(
                res,
                HttpStatus.OK,
                { items: result },
                'success',
            );
        } catch (error) {
            return apiResponse(res, HttpStatus.BAD_REQUEST, {}, error);
        }
    }

    @Get('/best-seller')
    async getBestSeller(@Res() res: Response) {
        try {
            const result = await this.productsService.getBestSeller();
            return apiResponse(
                res,
                HttpStatus.OK,
                { items: result },
                'success',
            );
        } catch (error) {
            return apiResponse(res, HttpStatus.BAD_REQUEST, {}, error);
        }
    }

    @Get('/new-products')
    async getNewProducts(@Res() res: Response) {
        try {
            const result = await this.productsService.getNewProducts();
            return apiResponse(
                res,
                HttpStatus.OK,
                { items: result },
                'success',
            );
        } catch (error) {
            return apiResponse(res, HttpStatus.BAD_REQUEST, {}, error);
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: string, @Res() res: Response) {
        try {
            const result = await this.productsService.findOne(id);
            return apiResponse(
                res,
                HttpStatus.OK,
                { product: result },
                'success',
            );
        } catch (error) {
            return apiResponse(res, HttpStatus.BAD_REQUEST, {}, error);
        }
    }

    @UseGuards(RolesGuard)
    @Roles(Role.Root, Role.Admin)
    @Post()
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './images',
                filename: (req, file, cb) => {
                    const randomName = Array(32)
                        .fill(null)
                        .map(() => Math.round(Math.random() * 16).toString(16))
                        .join('');
                    return cb(
                        null,
                        `${randomName}${extname(file.originalname)}`,
                    );
                },
            }),
        }),
    )
    async create(@Body() data, @UploadedFile() file, @Res() res: Response) {
        try {
            const product = {
                ...data,
                image: file ? file.filename : '',
            };
            const result = await this.productsService.create(product);
            return apiResponse(
                res,
                HttpStatus.CREATED,
                { product: result },
                'success',
            );
        } catch (error) {
            return apiResponse(res, HttpStatus.BAD_REQUEST, {}, error);
        }
    }

    @UseGuards(RolesGuard)
    @Roles(Role.Root, Role.Admin)
    @Delete(':id')
    async delete(@Param('id') id: string, @Res() res: Response) {
        try {
            const result = await this.productsService.delete(id);
            return apiResponse(
                res,
                HttpStatus.OK,
                { product: result },
                'success',
            );
        } catch (error) {
            return apiResponse(res, HttpStatus.BAD_REQUEST, {}, error);
        }
    }

    @UseGuards(RolesGuard)
    @Roles(Role.Root, Role.Admin)
    @Put(':id')
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './images',
                filename: (req, file, cb) => {
                    const randomName = Array(32)
                        .fill(null)
                        .map(() => Math.round(Math.random() * 16).toString(16))
                        .join('');
                    return cb(
                        null,
                        `${randomName}${extname(file.originalname)}`,
                    );
                },
            }),
        }),
    )
    async update(
        @Param('id') id: string,
        @Body() data,
        @UploadedFile() file,
        @Res() res: Response,
    ) {
        try {
            const product = {
                ...data,
                image: file ? file.filename : '',
            };
            const result = await this.productsService.update(id, product);
            return apiResponse(
                res,
                HttpStatus.OK,
                { product: result },
                'success',
            );
        } catch (error) {
            return apiResponse(res, HttpStatus.BAD_REQUEST, {}, error);
        }
    }
}
