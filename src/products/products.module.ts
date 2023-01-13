import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ProductsResolver } from './resolvers/products.resolver';
import { ProductsService } from './services/products.service';
import { Product } from './models/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ProductsResolver, ProductsService],
})
export class ProductsModule {}
