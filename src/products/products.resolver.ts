import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProductInput } from './create-product-input';
import { Product } from './product.entity';
import { ProductsService } from './products.service';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private productsService: ProductsService) {}

  @Query(() => [Product])
  products(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') input: CreateProductInput,
  ): Promise<Product> {
    return this.productsService.createProduct(input);
  }
}
