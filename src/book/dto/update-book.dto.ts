import { IsString, IsOptional, IsNumber} from "class-validator";

export class UpdateBookDto {

    @IsString()
    @IsOptional()
    title? : string;

    @IsString()
    @IsOptional()
    author? : string;

    @IsString()
    @IsOptional()
    isbn? : string;

    @IsString()
    @IsOptional()
    category? : string;

    @IsString()
    @IsOptional()
    description? : string;

    @IsNumber()
    @IsOptional()
    price? : number;
  }