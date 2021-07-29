import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
    Product,
    Category,
    Brand,
    User,
    Card,
    ProductSchema,
    CategorySchema,
    BrandSchema,
    UserSchema,
    CardSchema,
} from './schema';
import { JwtModule } from '@nestjs/jwt';
import { BrandsService } from './services/brands.service';
import { ProductsService } from './services/products.service';
import { CategoriesService } from './services/categories.service';
import { UsersService } from './services/users.service';
import { AuthService } from './services/auth.service';
import { CardService } from './services/cards.service';

import keys from 'src/configs/keys';

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
            {
                name: User.name,
                schema: UserSchema,
            },
            {
                name: Card.name,
                schema: CardSchema,
            },
        ]),
        JwtModule.register({
            secret: keys.JWT_SECRET,
            signOptions: {
                expiresIn: '1d',
            },
        }),
    ],

    providers: [
        BrandsService,
        CategoriesService,
        ProductsService,
        UsersService,
        AuthService,
        CardService,
    ],
    exports: [
        BrandsService,
        CategoriesService,
        ProductsService,
        UsersService,
        AuthService,
        CardService,
    ],
})
export class DatabaseModule {}
