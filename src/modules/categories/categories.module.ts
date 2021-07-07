import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CategoriesController } from './categories.controller';

@Module({
    imports: [DatabaseModule],
    controllers: [CategoriesController]
})
export class CategoriesModule {}
