import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { DatabaseModule } from '../database/database.module';
import { CategoriesController } from './categories.controller';

@Module({
    imports: [DatabaseModule, AuthModule],
    controllers: [CategoriesController]
})
export class CategoriesModule {}
