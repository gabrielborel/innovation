import { UpdateProductInput } from '../inputs/update-product-input';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProductInput } from '../inputs/create-product-input';
import { Product } from '../models/product.entity';
import { ProductsService } from '../services/products.service';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private productsService: ProductsService) {}

  @Query(() => [Product])
  products(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Query(() => Product, { nullable: true })
  async product(
    @Args({
      name: 'productId',
      type: () => Int,
    })
    id: number,
  ): Promise<Product> {
    return await this.productsService.findById(id);
  }

  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') input: CreateProductInput,
  ): Promise<Product> {
    const formattedInput = {
      ...input,
      status: input.status === 'ativo' ? 'active' : 'inactive',
    };
    return this.productsService.createProduct(formattedInput);
  }

  @Mutation(() => Product, { nullable: true })
  async deleteProduct(@Args('productId') id: number): Promise<Product> {
    return await this.productsService.deleteProduct(id);
  }

  @Mutation(() => Product, { nullable: true })
  async updateProduct(
    @Args({ name: 'productId', type: () => Int }) id: number,
    @Args('updateProductInput') input: UpdateProductInput,
  ): Promise<Product> {
    return await this.productsService.updateProduct(id, input);
  }
}
