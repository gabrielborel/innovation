import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsIn,
  IsInt,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateProductInput {
  @IsNotEmpty({ message: 'Nome do produto é obrigatório.' })
  @IsString({ message: 'Nome do produto deve ser um texto.' })
  @MinLength(5, { message: 'Nome do produto deve ter no mínimo 5 caracteres.' })
  @MaxLength(255, {
    message: 'Nome do produto deve ter no máximo 255 caracteres',
  })
  @Field({ nullable: true })
  name?: string;

  @IsString({ message: 'Categoria do produto deve ser um texto.' })
  @MinLength(5, {
    message: 'Categoria do produto deve ter no mínimo 5 caracteres.',
  })
  @MaxLength(255, {
    message: 'Categoria do produto deve ter no máximo 255 caracteres',
  })
  @Field({ nullable: true })
  category?: string;

  @IsInt({ message: 'Quantidade do produto deve ser um número.' })
  @Min(1, { message: 'Quantidade do produto deve ser no mínimo 1.' })
  @Field(() => Int, { nullable: true })
  quantity: number;

  @IsString({ message: 'Status do produto deve ser um texto.' })
  @IsIn(['ativo', 'inativo'])
  @Field({ nullable: true })
  status: string;
}
