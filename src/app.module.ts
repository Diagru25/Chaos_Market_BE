
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import keys from './configs/keys';
import { DatabaseModule } from './modules/database/database.module';
import { BrandsModule } from './modules/brands/brands.module';
import { ProductsModule } from './modules/products/products.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ResourcesModule } from './modules/resources/resources.module';
import { CardsModule } from './modules/cards/cards.module';

@Module({
  imports: [
    MongooseModule.forRoot(keys.mongoURI),
    DatabaseModule,
    AuthModule,
    BrandsModule,
    CategoriesModule,
    ProductsModule,
    UsersModule,
    ResourcesModule,
    CardsModule
  ],
})
export class AppModule {}
