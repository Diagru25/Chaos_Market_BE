import { Injectable } from '@nestjs/common';

import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(){
        super({
            clientID:
                '26226197699-r8rv3op9lbejpdv17a0kni8v7j5cqhs8.apps.googleusercontent.com',
            clientSecret: 'SatPungbZ7-ke7bM8tSAp16B',
            callbackURL: 'http://localhost:5000/auth/login/google/redirect',
            scope: ['email', 'profile'],
        });
    }
    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) : Promise<any> {
        const {name, emails, photos } = profile;
        console.log('guards: ',profile);
        const user = {
            googleId: profile.id,
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            picture: photos[0].value,
            accessToken
        }
        done(null, user)
    }
}