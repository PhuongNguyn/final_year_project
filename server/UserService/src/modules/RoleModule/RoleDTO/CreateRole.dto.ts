import { IsNotEmpty } from 'class-validator';

export class CreateRoleDTO {
  @IsNotEmpty({ message: 'Tên quyền không được để trống' })
  name: string;

  @IsNotEmpty({ message: 'Phân quyền không được để trống' })
  permissions: { [key: string]: string[] };
}
