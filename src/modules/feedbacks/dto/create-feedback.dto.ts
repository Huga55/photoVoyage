import { ApiProperty } from "@nestjs/swagger";

export class CreateFeedbackDto {
  @ApiProperty({
    example: "+7 999 999-99-99",
    description: "Competitor phone",
    required: true,
  })
  phone: string;

  @ApiProperty({
    example: "Андрей",
    description: "Competitor name",
    required: true,
  })
  name: string;

  @ApiProperty({
    example: "Бла бла бла",
    description: "Competitor comment",
    required: false,
  })
  comment: string;
}
