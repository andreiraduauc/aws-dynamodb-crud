import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AwsModule } from './aws/aws/aws.module';
import { ProductsModule } from './products/products/products.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal : true
  }),AwsModule,ProductsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
