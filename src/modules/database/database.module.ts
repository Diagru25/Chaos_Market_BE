import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, Category, Brand, ProductSchema, CategorySchema, BrandSchema } from './schema';
import { BrandsService } from './services/brands.service';
import { ProductsService } from './services/products.service';
import { CategoriesService } from './services/categories.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Category.name,
        schema: CategorySchema,
      },
      {
        name: Brand.name,
        schema: BrandSchema,
      },
      {
        name: Product.name,
        schema: ProductSchema,
      },
    ]),
  ],

  providers: [BrandsService, CategoriesService, ProductsService],
  exports: [BrandsService, CategoriesService, ProductsService],
})
export class DatabaseModule {}
