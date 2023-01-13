import { CreateProductInput } from './create-product-input';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
  ) {}

  async createProduct(input: CreateProductInput): Promise<Product> {
    const createdProduct = this.productsRepository.create(input);
    const product = await this.productsRepository.save(createdProduct);
    return this.responseStatusMapper(product);
  }

  async findAll(): Promise<Product[]> {
    const products = await this.productsRepository.find();
    return products.map(this.responseStatusMapper);
  }

  private responseStatusMapper(product: Product): Product {
    product.status = product.status === 'active' ? 'ativo' : 'inativo';
    return product;
  }
}
