import { IsNotEmpty, IsString, IsInt, IsNumber} from "class-validator";

export class BookDto {

    @IsString()
    @IsNotEmpty()
    title

    @IsString()
    @IsNotEmpty()
    author

    @IsString()
    @IsNotEmpty()
    isbn

    @IsString()
    @IsNotEmpty()
    category

    @IsString()
    description

    @IsNumber()
    @IsNotEmpty()
    price
  }