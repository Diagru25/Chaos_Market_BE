import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { BrandsController } from './brands.controller';

@Module({
    imports: [DatabaseModule],
    controllers: [BrandsController]
})
export class BrandsModule {}
