import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({
    example: "email@mail.ru",
    description: "User's email",
    required: true,
  })
  email: string;

  @ApiProperty({
    example: "123456",
    description: "User's password",
    required: true,
  })
  password: string;

  @ApiProperty({
    example: "Андрей",
    description: "User's name",
    required: true,
  })
  name: string;

  @ApiProperty({
    example: true,
    description: "Is user admin?",
    required: false,
  })
  isAdmin?: boolean;

  @ApiProperty({
    example: "121324",
    description: "User's telegram id",
    required: false,
  })
  telegramId?: string;
}
