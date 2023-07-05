import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { AwsService } from 'src/aws/aws/aws.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService,AwsService],
  exports : [ProductsService]
})
export class ProductsModule {}
