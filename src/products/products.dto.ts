import { IsBoolean, IsNotEmpty, IsNumber, IsString, Min, MinLength } from "class-validator";


export class CreateProductDTO {
    @Min(0, { message : 'Current stock could not be negative' })
    @IsNumber()
    currentStock : number

    @IsBoolean()
    inStock : boolean

    @IsNotEmpty()
    @IsString()
    @MinLength(1, { 
        message : 'Name field must contain at least 1 character'
     })
    name: string
}


export class UpdateProductStockDTO {
    @IsNotEmpty()
    @IsString()
    id : string

    @Min(0, { message : 'Current stock could not be negative' })
    @IsNumber()
    currentStock : number
}