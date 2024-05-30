import { Body, Controller, Get, Param, Post, Request, Res, UseGuards } from "@nestjs/common";
import { LocalAuthGuard } from "./guards/local.guard";
import { AuthService } from "./auth.service";
import { Response } from "express";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  async login(@Request() req , @Res({ passthrough: true }) res: Response) {

    const jwt = await this.authService.login(req.user);
    res.status(200).cookie('token', jwt, {
      httpOnly: true,
      maxAge: 604800000 // 1 week in milliseconds
  }).json(req.user);
  

  }

  @Get('/signout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.cookie('token','',{ expires: new Date(Date.now())}).json({signOut:'seccuss'});
  }


  @Get('/forget-password/:email')
  async forgetPassword(@Param('email') email: string) {
    return await this.authService.forgetPassword(email);
  }
  @Post('/rest-password')
  async RestPassword(@Body() token: any) {
    return await this.authService.restPassword(token);
  }
}