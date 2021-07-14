import { UsersController } from './users.controller';
import { DatabaseModule } from '../database/database.module';
import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [DatabaseModule, AuthModule],
    controllers: [UsersController]
})
export class UsersModule {}
