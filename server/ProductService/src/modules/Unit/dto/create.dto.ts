import { IsNotEmpty } from 'class-validator';
// import { promotionType } from '../promotion.entity';

export class CreateUnitDTO {
  @IsNotEmpty({ message: 'Tên không được để trống' })
  name: string;
}
