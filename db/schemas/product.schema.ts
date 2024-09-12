import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
  @Prop({
    type: String,
    default: function genUUID() {
      return uuidv4();
    },
  })
  _id: string;

  @Prop({
    required: true,
  })
  title: string;

  @Prop({
    required: true,
  })
  description: string;

  @Prop({
    required: true,
    length: 8,
    unique: true,
  })
  sku: string;

  @Prop({
    required: true,
  })
  price: number;

  @Prop({
    required: true,
  })
  categoryId: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
