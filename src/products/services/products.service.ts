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
    return this.productStatusMapper(product);
  }

  async findAll(): Promise<Product[]> {
    const products = await this.productsRepository.find({
      withDeleted: true,
    });
    return products.map(this.productStatusMapper);
  }

  async findById(id: number): Promise<Product | null> {
    const product = await this.productsRepository.findOneBy({ id });
    if (!product) return null;

    return product;
  }

  async deleteProduct(id: number): Promise<Product | null> {
    const product = await this.findById(id);
    if (!product) return null;

    product.deletedAt = new Date();
    await this.updateProduct(id, product);
    return product;
  }

  async updateProduct(
    id: number,
    input: UpdateProductInput,
  ): Promise<Product | null> {
    await this.productsRepository.update(id, input);
    const product = await this.findById(id);
    if (!product) return null;

    return this.productStatusMapper(product);
  }

  private productStatusMapper(product: Product): Product {
    product.status = product.status === 'active' ? 'ativo' : 'inativo';
    return product;
  }
}
