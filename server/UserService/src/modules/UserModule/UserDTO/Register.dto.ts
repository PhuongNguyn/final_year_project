import { IsNotEmpty } from 'class-validator';

export class RegisterDTO {
  @IsNotEmpty({ message: 'Tên người dùng không được bỏ trống' })
  fullname: string;

  @IsNotEmpty({ message: 'Mật khẩu người dùng không được bỏ trống' })
  password: string;

  @IsNotEmpty({ message: 'Số điện thoại người dùng không được bỏ trống' })
  phoneNumber: string;
}
