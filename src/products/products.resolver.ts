import { UpdateProductInput } from './update-product-input';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
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
    const formattedInput = {
      ...input,
      status: input.status === 'ativo' ? 'active' : 'inactive',
    };
    return this.productsService.createProduct(formattedInput);
  }

  @Mutation(() => String)
  async deleteProduct(@Args('productId') id: number): Promise<string> {
    const deleted = await this.productsService.deleteProduct(id);
    if (deleted) {
      return 'Produto deletado.';
    } else {
      return 'Produto não encontrado.';
    }
  }

  @Mutation(() => String)
  async updateProduct(
    @Args({ name: 'productId', type: () => Int }) id: number,
    @Args('updateProductInput') input: UpdateProductInput,
  ): Promise<string> {
    const deleted = await this.productsService.updateProduct(id, input);
    if (deleted) {
      return 'Produto atualizado.';
    } else {
      return 'Produto não encontrado.';
    }
  }
}
