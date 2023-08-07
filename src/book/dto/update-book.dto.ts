import { IsString, IsOptional, IsNumber} from "class-validator";

export class UpdateBookDto {

    @IsString()
    @IsOptional()
    title

    @IsString()
    @IsOptional()
    author

    @IsString()
    @IsOptional()
    isbn

    @IsString()
    @IsOptional()
    category

    @IsString()
    @IsOptional()
    description

    @IsNumber()
    @IsOptional()
    price
  }