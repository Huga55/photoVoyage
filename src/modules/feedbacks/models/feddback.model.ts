import { Column, DataType, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

interface IFeedbackCreationAttributes {
  phone: string;
  name: string;
  comment: string;
}

@Table({ tableName: "feedbacks" })
export class Feedback extends Model<Feedback, IFeedbackCreationAttributes> {
  @ApiProperty({ example: "1", description: "Id of feedback" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: "+7 999 999-99-99",
    description: "Phone of user's feedback",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone: string;

  @ApiProperty({ example: "Андрей", description: "Costumer name" })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({ example: "Бла бла бла", description: "Feedback comment" })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  comment: string;

  @ApiProperty({ example: true, description: "Is active feedback?" })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  isActive: boolean;
}
