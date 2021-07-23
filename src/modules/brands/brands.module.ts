import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { DatabaseModule } from '../database/database.module';
import { BrandsController } from './brands.controller';

@Module({
    imports: [DatabaseModule, AuthModule],
    controllers: [BrandsController]
})
export class BrandsModule {}
