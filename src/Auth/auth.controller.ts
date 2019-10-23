import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  Headers, UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Get()
  async getToken() {
    const token = await this.authService.getCode();
    return { token };
  }

  @Post()
  @UseGuards(AuthService)
  async validateToken(@Headers() headers) {
    return headers;
  }
}
