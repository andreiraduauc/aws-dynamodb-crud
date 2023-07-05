import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDTO, UpdateProductStockDTO } from '../products.dto';
import { GlobalMessageErrors } from 'src/types/enums';

@Controller({
  version: '1',
  path: 'api/products',
})
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get('/')
  async getProducts(): Promise<CreateProductDTO[]> {
    try {
      const products = await this.productsService.getProducts();
      return products;
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }

      throw new InternalServerErrorException(
        GlobalMessageErrors.UnexpectedErrorOccured,
      );
    }
  }

  @Get('/:id')
  async getProductById(@Param() id: string): Promise<CreateProductDTO> {
    try {
      if (!id) {
        throw new BadRequestException(
          'Invalid parameters. Expected id as request peremeter',
        );
      }
      const product = await this.productsService.getProductById(id);

      return product;
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }

      throw new InternalServerErrorException(
        GlobalMessageErrors.UnexpectedErrorOccured,
      );
    }
  }

  @Post()
  async createProduct(@Body() dto: CreateProductDTO): Promise<void> {
    try {
      await this.productsService.createProduct(dto);
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }

      throw new InternalServerErrorException(
        GlobalMessageErrors.UnexpectedErrorOccured,
      );
    }
  }

  @Patch()
  async updateProductStock(@Body() dto: UpdateProductStockDTO): Promise<void> {
    try {
      await this.productsService.updateProductStock(dto);
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }

      throw new InternalServerErrorException(
        GlobalMessageErrors.UnexpectedErrorOccured,
      );
    }
  }

  @Delete('/:id')
  async deleteProductById(@Param() id: string): Promise<void> {
    try {
      await this.productsService.deleteProductById(id);
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }

      throw new InternalServerErrorException(
        GlobalMessageErrors.UnexpectedErrorOccured,
      );
    }
  }
}
