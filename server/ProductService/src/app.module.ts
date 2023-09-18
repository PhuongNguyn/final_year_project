import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  I18nModule,
  AcceptLanguageResolver,
  QueryResolver,
  HeaderResolver,
} from 'nestjs-i18n';
import { join } from 'path';
import { Promotion } from './modules/Promotion/promotion.entity';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './modules/CategoryModule/categories.module';
import { Category } from './modules/CategoryModule/categories.entity';
import { UnitModule } from './modules/Unit/unit.module';
import { WarehouseModule } from './modules/WarehouseModule/warehouse.module';
import { ProductModule } from './modules/ProductModule/product.module';
import { ProductQuantityModule } from './modules/ProductQuantityModule/productQuantity.module';
import { ProductFileModule } from './modules/ProductFile/productFile.module';
import { ProductDetailModule } from './modules/ProductDetail/productDetail.module';
import { AuthModule } from './modules/Auth/Auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PWD,
      database: process.env.POSTGRES_DB,
      entities: [],
      synchronize: true,
      logging: true,
      autoLoadEntities: true,
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'vi',
      loaderOptions: {
        path: join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
      ],
    }),
    CategoryModule,
    UnitModule,
    WarehouseModule,
    ProductModule,
    ProductQuantityModule,
    ProductFileModule,
    ProductDetailModule,
    AuthModule,
  ],
})
export class AppModule {}
