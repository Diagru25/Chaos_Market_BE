import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { DatabaseModule } from '../database/database.module';
import { CardsController } from './cards.controller';

@Module({
    imports: [DatabaseModule, AuthModule],
    controllers: [CardsController],
})
export class CardsModule {}
