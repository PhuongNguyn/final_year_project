import { IsNotEmpty } from 'class-validator';
import { fileRole } from 'src/modules/ProductFile/productFile.entity';
// import { promotionType } from '../promotion.entity';

export class CreateProductDTO {
  @IsNotEmpty({ message: 'Tên không được để trống!' })
  name: string;
  @IsNotEmpty({ message: 'Slug không được để trống!' })
  slug: string;
  @IsNotEmpty({ message: 'Mô tả không được để trống!' })
  description: string;
  content: string;
  category: number[];
  files: { image: string; type: fileRole }[];
  priceList: {
    unit: number;
    price: number;
    fakePrice: number;
  }[];
  //OPTIONAL
  // price?: [{ price: number; unitId: number; id: number }];
  // quantity?: [{ quantity: number; unitId: number; id: number }];
  // file?: [{ link: string; name: string; role: string; description: string }];
  // detail: {
  //   parameter: [
  //     {
  //       key: string;
  //       value: string;
  //     },
  //   ];
  // };
}

export class UpdateProductDTO {
  name: string;
  slug: string;
  description: string;
  content: string;
  categoryId: number;
  basePrice: number;
  //OPTIONAL
  price: [{ price: number; unitId: number; id: number }];
  quantity: [{ quantity: number; unitId: number; id: number }];
  file: [{ link: string; name: string; role: string; description: string }];
  detail: {
    parameter: [
      {
        key: string;
        value: string;
      },
    ];
  };
}
