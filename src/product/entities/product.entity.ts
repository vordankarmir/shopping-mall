import { ApiProperty } from '@nestjs/swagger';

export class Product {
  @ApiProperty({
    example: 'e2b5ea37-1c02-4bd1-b912-1b09cc08b52c',
  })
  _id: string;

  @ApiProperty({
    example: 'Title',
  })
  title: string;

  @ApiProperty({
    example: 'Description',
  })
  description: string;

  @ApiProperty({
    example: '7537b7a9',
  })
  sku: string;

  @ApiProperty({
    example: 200,
  })
  price: number;

  @ApiProperty({
    example: 'e2b5ea37-1c02-4bd1-b912-1b09cc08b52c',
  })
  categoryId: string;
}
