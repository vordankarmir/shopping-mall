import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from '../../db/schemas/product.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel({
      ...createProductDto,
      sku: crypto.randomUUID().toString().substring(0, 8),
    });

    return createdProduct.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel
      .aggregate([
        {
          $match: {
            _id: {
              $eq: id,
            },
          },
        },
        {
          $lookup: {
            from: 'categories',
            localField: 'categoryId',
            foreignField: '_id',
            as: 'category',
          },
        },
        {
          $project: {
            _id: true,
            title: true,
            description: true,
            sku: true,
            price: true,
            createdAt: true,
            updatedAt: true,
            category: [
              {
                _id: true,
                title: true,
                description: true,
              },
            ],
          },
        },
      ])
      .exec();

    if (product == null) {
      throw new NotFoundException('Product not found');
    }

    return product[0];
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    await this.findOne(id);

    const updatedProduct = await this.productModel.findOneAndUpdate(
      {
        _id: id,
      },
      updateProductDto,
      { returnOriginal: false },
    );

    return updatedProduct;
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.productModel.deleteOne({
      _id: id,
    });

    return result.acknowledged;
  }
}
