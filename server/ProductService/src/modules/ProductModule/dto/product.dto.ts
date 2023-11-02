import { IsNotEmpty } from 'class-validator';
// import { promotionType } from '../promotion.entity';

export class CreateProductDTO {
  @IsNotEmpty({ message: 'Tên không được để trống!' })
  title: string;
  @IsNotEmpty({ message: 'Slug không được để trống!' })
  slug: string;
  @IsNotEmpty({ message: 'Mô tả không được để trống!' })
  description: string;
  category: number;
  price: number;
  fakePrice: number
  thumbnail: string
}

export class UpdateProductDTO {
  title: string;
  slug: string;
  description: string;
  category: number;
  fakePrice: number;
  //OPTIONAL
  price: number
  thumbnail: string
}
