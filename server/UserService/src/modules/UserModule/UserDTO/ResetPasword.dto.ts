import { IsNotEmpty } from 'class-validator';

export class ResetPasswordDTO {
  @IsNotEmpty({ message: 'Mật khẩu người dùng không được bỏ trống' })
  password: string;
}
