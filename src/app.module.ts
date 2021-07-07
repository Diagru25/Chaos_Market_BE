import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import keys from './configs/keys';
import { DatabaseModule } from './modules/database/database.module';
import { BrandsModule } from './modules/brands/brands.module';
import { ProductsModule } from './modules/products/products.module';
import { CategoriesModule } from './modules/categories/categories.module';

@Module({
  imports: [
    MongooseModule.forRoot(keys.mongoURI),
    DatabaseModule,
    BrandsModule,
    CategoriesModule,
    ProductsModule,
  ],
})
export class AppModule {}
