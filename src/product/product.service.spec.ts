import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { Product, ProductSchema } from '../../db/schemas/product.schema';
import { getModelToken } from '@nestjs/mongoose';
import { connect, Connection, Model } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { NotFoundException } from '@nestjs/common';
import { dummyId, productMock } from '../../test/stubs/product.dto.stub';

describe('ProductService', () => {
  let productService: ProductService;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let productModel: Model<Product>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    productModel = mongoConnection.model(Product.name, ProductSchema);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        { provide: getModelToken(Product.name), useValue: productModel },
      ],
    }).compile();

    productService = module.get<ProductService>(ProductService);
  });

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
  });

  afterEach(async () => {
    const collections = mongoConnection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  });

  describe('create product', () => {
    it('should create product and return 200 response', async () => {
      const product = await productService.create(productMock);

      expect(product).toHaveProperty('_id');
    });
  });

  describe('get product by id', () => {
    it('should get a product by id', async () => {
      const productRepository = new productModel(productMock);
      const createdMember = await productRepository.save();

      const product = await productService.findOne(createdMember._id);
      expect(product._id).toEqual(createdMember._id);
      expect(product).toHaveProperty('category');
    });

    it('should throw 404 if product does not exist', async () => {
      try {
        await productService.findOne(dummyId);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('get all products', () => {
    it('should get all products', async () => {
      const productRepository = new productModel(productMock);
      await productRepository.save();

      const products = await productService.findAll();
      expect(products[0]).toHaveProperty('_id');
    });
  });

  describe('update product', () => {
    const updatedTitle = 'updated';
    it('should find and update product by id', async () => {
      const productRepository = new productModel(productMock);
      const createdTask = await productRepository.save();

      const updatedTask = await productService.update(createdTask._id, {
        title: updatedTitle,
      });

      expect(updatedTask._id).toEqual(createdTask._id);
      expect(updatedTask.title).toEqual(updatedTitle);
    });

    it('should throw 404 if product does not exist', async () => {
      try {
        await productService.update(dummyId, { title: updatedTitle });
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('delete product', () => {
    it('should delete product by id', async () => {
      const productRepository = new productModel(productMock);
      const createdTask = await productRepository.save();

      const deleted = await productService.remove(createdTask._id);
      expect(deleted).toBeTruthy();
    });
  });
});
