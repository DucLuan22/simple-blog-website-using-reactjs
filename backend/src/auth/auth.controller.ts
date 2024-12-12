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
  @Post('refresh')
  refreshToken(@Req() req) {
    return this.authService.refreshToken(req.user.id);
  }

  @Public()
  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async handleCallback(@Req() req, @Res() res) {
    const response = await this.authService.login(req.user.id);

    // Get FRONTEND_URL from the environment variables
    const frontendUrl = this.configService.get<string>('FRONTEND_URL');

    res.redirect(`${frontendUrl}?token=${response.accessToken}`);
  }
}
