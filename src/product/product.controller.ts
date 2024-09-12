import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UsePipes,
} from '@nestjs/common';
import { ProductService } from './product.service';
import {
  CreateProductDto,
  createProductSchema,
} from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JoiValidationPipe } from '../../pipes/validation.pipe';
import * as Joi from 'joi';
import { Product } from './entities/product.entity';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({ summary: 'Create Product' })
  @ApiResponse({ status: 200, description: 'Created', type: Product })
  @Post()
  @UsePipes(new JoiValidationPipe(createProductSchema))
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @ApiOperation({ summary: 'Get products' })
  @ApiResponse({
    status: 200,
    description: 'Find all product',
    type: [Product],
  })
  @Get()
  async findAll() {
    return this.productService.findAll();
  }

  @ApiOperation({ summary: 'Get product by id' })
  @ApiResponse({
    status: 200,
    description: 'Find product by id',
    type: Product,
  })
  @ApiResponse({
    status: 400,
    description: 'Product id is required',
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found',
  })
  @Get(':id')
  async findOne(
    @Param('id', new JoiValidationPipe(Joi.string().uuid())) id: string,
  ) {
    return this.productService.findOne(id);
  }

  @ApiOperation({ summary: 'Update product by id' })
  @ApiResponse({
    status: 200,
    description: 'Update product by id',
    type: Product,
  })
  @ApiResponse({
    status: 400,
    description: 'Product id is required',
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found',
  })
  @Put(':id')
  @UsePipes(new JoiValidationPipe(createProductSchema))
  async update(
    @Param('id', new JoiValidationPipe(Joi.string().uuid())) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(id, updateProductDto);
  }

  @ApiOperation({ summary: 'Delete product' })
  @ApiResponse({
    status: 200,
    description: 'Delete product',
    type: null,
  })
  @Delete(':id')
  async remove(
    @Param('id', new JoiValidationPipe(Joi.string().uuid())) id: string,
  ) {
    return this.productService.remove(id);
  }
}
