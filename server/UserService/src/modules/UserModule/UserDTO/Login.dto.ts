import { IsNotEmpty } from 'class-validator';

export class LoginDTO {
  @IsNotEmpty({ message: 'Không được để trống số điện thoại' })
  phoneNumber: string;

  @IsNotEmpty({ message: 'Không được để trống số mật khẩu' })
  password: string;
}
