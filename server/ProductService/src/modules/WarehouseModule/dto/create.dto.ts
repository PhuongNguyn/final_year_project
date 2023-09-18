import { IsNotEmpty } from 'class-validator';
// import { promotionType } from '../promotion.entity';

export class CreateWareHouseDto {
  @IsNotEmpty({ message: 'Tên không được để trống' })
  name: string;
  manager: string;
  @IsNotEmpty({ message: 'Địa chỉ không được để trống' })
  address: string;
  iat: number;
  long: number;
}

export class UpdateWareHouseDto {
  name: string;
  manager: string;
  address: string;
  iat: number;
  long: number;
}
