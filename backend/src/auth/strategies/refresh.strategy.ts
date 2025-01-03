import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, Inject } from '@nestjs/common';
import { AuthService } from '../auth.service';
import refreshJwtConfig from 'src/config/refresh-jwt.config';
import { UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { AuthJWtPayload } from '../types/auth-jwt-payload';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'refresh-jwt',
) {
  constructor(
    @Inject(refreshJwtConfig.KEY)
    private refreshJwtConfiguration: ConfigType<typeof refreshJwtConfig>,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          return req.cookies['refresh_token'];
        },
      ]),
      secretOrKey: refreshJwtConfiguration.secret,
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: AuthJWtPayload) {
    const refreshToken = req.cookies['refresh_token'];
    const userId = payload.sub;

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found in cookies');
    }

    const isValid = await this.authService.validateRefreshToken(
      userId,
      refreshToken,
    );

    if (!isValid) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    return { userId };
  }
}
