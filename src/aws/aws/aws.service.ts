import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DynamoDB } from 'aws-sdk';

@Injectable()
export class AwsService {
  client: DynamoDB.DocumentClient;
  documentClient: DynamoDBClient;
  constructor(private config: ConfigService) {
    const clientConfig = {
      region: this.config.getOrThrow<string>('AWS_REGION'),
      accessKeyId: this.config.getOrThrow<string>('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.config.getOrThrow<string>('AWS_SECRET_ACCESS_KEY'),
    };

    this.client = new DynamoDB.DocumentClient(clientConfig);
    this.documentClient = new DynamoDBClient(clientConfig);
  }

  getClient(): DynamoDB.DocumentClient {
    return this.client;
  }

  getDocumentClient(): DynamoDBClient {
    return this.documentClient;
  }
}
