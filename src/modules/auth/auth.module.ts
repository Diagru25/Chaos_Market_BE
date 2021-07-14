import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { DatabaseModule } from '../database/database.module';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtAuthStrategy } from './strategies/jwt.strategy';

@Module({
    imports: [DatabaseModule, PassportModule],
    controllers: [AuthController],
    providers: [LocalStrategy, JwtAuthStrategy]
})
export class AuthModule {}
