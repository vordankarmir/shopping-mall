import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';

export class CreateProductDto {
  @ApiProperty({
    example: 'Goat meat',
  })
  title: string;

  @ApiProperty({
    example: 'Goat meat',
  })
  description: string;

  @ApiProperty({
    example: 200,
  })
  price: number;

  @ApiProperty({
    example: 'e2b5ea37-1c02-4bd1-b912-1b09cc08b52c',
  })
  categoryId: string;
}

export const createProductSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  categoryId: Joi.string().required(),
});
