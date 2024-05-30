import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { template } from 'nestjs-mailer';
import { MailerService } from '@nestjs-modules/mailer';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private readonly mailerService: MailerService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const findUser = await this.usersService.findOneByEmail(email);
    if(!findUser[0]) throw new HttpException('الحساب غير مسجل', HttpStatus.UNAUTHORIZED)

    const isMatch = await bcrypt.compare(pass, findUser[0].password);
    if(!isMatch){
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        throw new HttpException('كلمة المرور غير صحيحة', HttpStatus.UNAUTHORIZED)

    }
    if(!findUser[0].is_active){
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      throw new HttpException('الحساب غير مفعل', HttpStatus.UNAUTHORIZED)

  }
    

    const {password,...user}=findUser[0];
    return user;
  }

  async login(user: any) {
    user = {sub: user.id, role: user.role, email: user.email, department:user.department_id};
    return await this.jwtService.sign(user,{secret:process.env.SECRET_KEY});
  }


  async forgetPassword(email: string) {
    try {
        // Find user by email
        const findUser = await this.usersService.findOneByEmail(email);

        // If user not found, throw unauthorized exception
        if (!findUser) {
            throw new HttpException('الحساب غير مسجل', HttpStatus.UNAUTHORIZED);
        }

        // Generate JWT token with email payload
        const token = await this.jwtService.sign({ email : email , id: findUser[0].id },{secret:process.env.SECRET_KEY});

        // Send password reset email using mailer service
        await this.mailerService.sendMail({
            to: email, // Receiver's email address
            from: 'anasaloqaidi@gmail.com', // Sender's email address
            subject: 'تغيير كلمة المرور', // Email subject
            text: 'أهلا,', // Plain text body (optional)
            html: template("template/index.hbs",{data:{link:`http://localhost:5173/rest-password?token=${token}`,name:findUser[0].first_name}})
        
        });

        // Return a success response
        return { message: 'تم إرسال رابط إعادة تعيين كلمة المرور بنجاح.' };
    } catch (error) {
        // Handle any errors during the process
        throw new HttpException('فشل في إعادة تعيين كلمة المرور.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

async restPassword(payload: any) {
  try {
      // Find user by email
    const token = await this.jwtService.verify(payload.token);

      // If user not found, throw unauthorized exception
      if (!token?.id) {
          throw new HttpException('الحساب غير مسجل', HttpStatus.UNAUTHORIZED);
      }

      const hashpassword = await this.usersService.hashPassword(payload.password);
     
      await this.usersService.update(Number(token.id),{password:hashpassword});

      // Return a success response
      return { message: 'تم اعادة تعيين كلمة المرور' };
  } catch (error) {
      // Handle any errors during the process
      throw new HttpException('فشل في إعادة تعيين كلمة المرور.', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

}