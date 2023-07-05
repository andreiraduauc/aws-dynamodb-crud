import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AwsService } from './aws.service';

@Controller('aws')
export class AwsController {
    constructor(
        private config : ConfigService,
        private awsService: AwsService
    ){}

    @Get()
    getTableName(){
        return this.awsService.getClient();
    }

}
