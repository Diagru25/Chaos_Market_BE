import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ProductsController } from './products.controller';

@Module({
    imports: [DatabaseModule],
    controllers: [ProductsController]
})
export class ProductsModule {}
