import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Model } from 'mongoose';
import { Product } from '../../db/schemas/product.schema';
import { getModelToken } from '@nestjs/mongoose';

describe('ProductController', () => {
  let controller: ProductController;
  let productModel: Model<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        ProductService,
        { provide: getModelToken(Product.name), useValue: productModel },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
