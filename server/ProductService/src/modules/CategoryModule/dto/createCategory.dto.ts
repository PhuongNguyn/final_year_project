import { IsNotEmpty } from 'class-validator';
// import { promotionType } from '../promotion.entity';

export class CreateCategoryDTO {
  @IsNotEmpty({ message: 'Tên chuyên mục không được để trống' })
  name: string;

  @IsNotEmpty({ message: 'Slug không được để trống' })
  slug: string;
}
