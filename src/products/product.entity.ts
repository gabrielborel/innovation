import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'products' })
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  category: string;

  @Column()
  @Field(() => Int)
  quantity: number;

  @Column()
  @Field({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'updated_at' })
  @Field()
  updatedAt: Date;

  @Column({ nullable: true, name: 'deleted_at' })
  @Field()
  deletedAt: Date;
}
