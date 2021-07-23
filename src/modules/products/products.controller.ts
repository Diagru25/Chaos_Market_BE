import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ProductsService } from '../database/services/products.service';
import { Roles, RolesGuard } from '../auth/guards/roles.guard';
import { Role } from 'src/configs/roles.enum';

@Controller('v1/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll() {
    return this.productsService.findAll();
  }

  @Get('/best-seller')
  async getBestSeller() {
    return this.productsService.getBestSeller();
  }

  @Get('/new-products')
  async getNewProducts() {
    return this.productsService.getNewProducts();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
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
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async create(@Body() data, @UploadedFile() file) {
    const product = {
      ...data,
      image: file ? file.filename : '',
    };
    return this.productsService.create(product);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Root, Role.Admin)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.productsService.delete(id);
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
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async update(@Param('id') id: string, @Body() data, @UploadedFile() file) {
    const product = {
      ...data,
      image: file ? file.filename : '',
    };
    return this.productsService.update(id, product);
  }
}
