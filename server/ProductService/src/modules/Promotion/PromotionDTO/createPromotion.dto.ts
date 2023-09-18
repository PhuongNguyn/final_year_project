import { IsNotEmpty } from 'class-validator';
import { promotionType } from '../promotion.entity';

export class CreatePromotionDTO {
  @IsNotEmpty({ message: 'Tên khuyến mãi không được để trống' })
  name: string;

  @IsNotEmpty({ message: 'Số lượng không được để trống' })
  amount: number;

  @IsNotEmpty({ message: 'Loại khuyến mãi không được để trống' })
  type: promotionType;
}
