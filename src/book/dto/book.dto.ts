import { IsNotEmpty, IsString, IsInt} from "class-validator";

export class BookDto {
    
    @IsNotEmpty()
    email: string;
  
    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    title

    @IsString()
    @IsNotEmpty()
    Author

    @IsString()
    @IsNotEmpty()
    isbn

    @IsString()
    @IsNotEmpty()
    category

    @IsString()
    description

    @IsInt()
    @IsNotEmpty()
    price
  }