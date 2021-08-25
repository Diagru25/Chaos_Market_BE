import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { DatabaseModule } from '../database/database.module';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtAuthStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import keys from 'src/configs/keys';
@Module({
    imports: [
        DatabaseModule,
        PassportModule,
        JwtModule.register({
            secret: keys.jwt.JWT_SECRET,
            signOptions: {
                expiresIn: keys.jwt.expiresIn,
            },
        }),
    ],
    controllers: [AuthController],
    providers: [LocalStrategy, JwtAuthStrategy],
})
export class AuthModule {}
