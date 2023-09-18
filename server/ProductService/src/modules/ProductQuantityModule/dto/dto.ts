import { IsNotEmpty } from 'class-validator';
// import { promotionType } from '../promotion.entity';

export class createDTO {
  @IsNotEmpty({ message: 'Số lượng không được để trống' })
  quantity: number;
  @IsNotEmpty({ message: 'Nhà kho không được để trống' })
  warehouse: number;

  @IsNotEmpty({ message: 'Đơn vị tính không được để trống' })
  unit: number;
  @IsNotEmpty({ message: 'Sản phẩm tính không được để trống' })
  product: number;
}

export class updateDTO {
  @IsNotEmpty({ message: 'Số lượng không được để trống' })
  quantity: number;
}
