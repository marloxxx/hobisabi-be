import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/login/:model')
  login(@Body() data: AuthDto, model: string) {
    return this.authService.login(data, 'admin')
  }

  @Post('/register')
  register(@Body() data: RegisterDto) {
    return this.authService.register(data)
  }

  @Post('/logout/:id/:model')
  logout(@Body() model: string, id: number) {
    return this.authService.logout(id, model);
  }

  @Post('/refresh/:model')
  refresh(@Body() refreshToken: string, model: string) {
    return this.authService.refresh(refreshToken, model);
  }

}
