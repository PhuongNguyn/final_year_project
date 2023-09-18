import { IsNotEmpty } from 'class-validator';
// import { promotionType } from '../promotion.entity';

export class CreateProductPriceDTO {
  @IsNotEmpty({ message: 'Giá không được để trống!' })
  price: number;
  @IsNotEmpty({ message: 'Sản phẩm không được để trống!' })
  unit: number;
  fakePrice: number;
}

export class updateProductPriceDTO {
  @IsNotEmpty({ message: 'Giá không được để trống!' })
  price: number;
}
