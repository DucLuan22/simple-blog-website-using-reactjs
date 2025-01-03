import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { GoogleAuthGuard } from './guards/google.guard';
import { Public } from './decorators/public.decorator';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RefreshAuthGuard } from './guards/refresh-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService, // Inject ConfigService
  ) {}

  // @Public()
  // @HttpCode(HttpStatus.OK)
  // @UseGuards(LocalAuthGuard)
  // @Post('login')
  // async login(@Request() req) {
  //   return this.authService.login(req.user.id);
  // }

  @UseGuards(JwtAuthGuard)
  @Post('signout')
  signOut(@Req() req) {
    this.authService.signOut(req.user.id);
  }

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  googleLogin() {
    return {};
  }

  @UseGuards(RefreshAuthGuard)
  @Public()
  @Post('refresh')
  refreshToken(@Req() req) {
    return this.authService.refreshToken(req.user.id);
  }

  private parseExpiry(expiry: string): number {
    const days = parseInt(expiry.replace('d', ''), 10);
    return days * 24 * 60 * 60 * 1000;
  }

  @Public()
  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async handleCallback(@Req() req, @Res() res) {
    const response = await this.authService.login(req.user.id);

    const frontendUrl = this.configService.get<string>('FRONTEND_URL');
    const refreshToken = response.refreshToken;
    const refreshTokenExpiry = this.configService.get<string>(
      'REFRESH_JWT_EXPIRE_IN',
    );

    const expiryDuration = this.parseExpiry(refreshTokenExpiry);

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: new Date(Date.now() + expiryDuration),
      sameSite: 'Strict',
    });

    res.redirect(`${frontendUrl}?token=${response.accessToken}`);
  }
}
