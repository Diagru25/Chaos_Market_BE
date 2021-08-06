import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { DatabaseModule } from '../database/database.module';
import { CartsController } from './carts.controller';

@Module({
    imports: [DatabaseModule, AuthModule],
    controllers: [CartsController],
})
export class CartsModule {}
