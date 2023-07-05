import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AwsService } from '../../aws/aws/aws.service';
import { CreateProductDTO, UpdateProductStockDTO } from '../products.dto';

export interface IProductService {
  createProduct(args: CreateProductDTO): Promise<void>;
  getProducts(): Promise<CreateProductDTO[]>;
  getProductById(id: string): Promise<CreateProductDTO>;
  updateProductStock(args: UpdateProductStockDTO): Promise<void>;
  deleteProductById(id: string): Promise<void>;
}

@Injectable()
export class ProductsService implements IProductService {
  constructor(private config: ConfigService, private awsService: AwsService) {}

  async createProduct(productDTO: CreateProductDTO): Promise<void> {
    const db = this.awsService.getClient();

    await db
      .put({
        TableName: this.config.get<string>('AWS_PRODUCTS_TABLE'),
        Item: productDTO,
      })
      .promise();
  }

  async getProductById(id: string): Promise<CreateProductDTO> {
    const db = this.awsService.getClient();

    const product = await db
      .get({
        TableName: this.config.get<string>('AWS_PRODUCTS_TABLE'),
        Key: { id },
      })
      .promise();

    return product.Item as CreateProductDTO;
  }

  async getProducts(): Promise<CreateProductDTO[]> {
    const db = this.awsService.getClient();

    const products = await db
      .scan({
        TableName: this.config.get<string>('AWS_PRODUCTS_TABLE'),
      })
      .promise();

    return products.Items as CreateProductDTO[];
  }

  async updateProductStock(args: UpdateProductStockDTO) {
    const db = this.awsService.getClient();

    const { currentStock, id } = args;

    await db
      .update({
        TableName: this.config.get<string>('AWS_PRODUCTS_TABLE'),
        Key: { id },
        UpdateExpression: 'set #currentStock = :currentStock',
        ExpressionAttributeNames: {
          '#currentStock': 'currentStock',
        },
        ExpressionAttributeValues: {
          ':currentStock': currentStock,
        },
      })
      .promise();
  }

  async deleteProductById(id: string): Promise<void> {
    const db = this.awsService.getClient();

    await db
      .delete({
        TableName: this.config.get<string>('AWS_PRODUCTS_TABLE'),
        Key: { id },
      })
      .promise();
  }
}
