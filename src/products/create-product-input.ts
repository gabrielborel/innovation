import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field()
  name: string;

  @Field()
  category: string;

  @Field(() => Int)
  quantity: number;

  @Field()
  status: string;
}
