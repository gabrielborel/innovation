import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Product } from './product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
})
export class ProductsModule {}
