import { CreateProductInput } from '../inputs/create-product-input';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../models/product.entity';
import { UpdateProductInput } from '../inputs/update-product-input';

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

  async findById(id: number): Promise<Product | null> {
    return await this.productsRepository.findOneBy({ id });
  }

  async deleteProduct(id: number): Promise<Product> {
    const product = await this.findById(id);
    product.deletedAt = new Date();
    return product;
  }

  async updateProduct(id: number, input: UpdateProductInput): Promise<Product> {
    await this.productsRepository.update(id, input);
    const product = await this.findById(id);
    return this.responseStatusMapper(product);
  }

  private responseStatusMapper(product: Product): Product {
    product.status = product.status === 'active' ? 'ativo' : 'inativo';
    return product;
  }
}
