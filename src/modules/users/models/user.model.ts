import { Column, DataType, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

interface IUserCreationAttributes {
  email: string;
  password: string;
  name: string;
}

@Table({ tableName: "users" })
export class User extends Model<User, IUserCreationAttributes> {
  @ApiProperty({ example: 1, description: "User's id" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: "example@mail.ru", description: "User's email" })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @ApiProperty({ example: "123456Aa)", description: "User's password" })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ApiProperty({ example: "User_123", description: "User's name" })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({ example: true, description: "Is user admin?" })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isAdmin: boolean;

  @ApiProperty({ example: "1233211321", description: "User's telegram id" })
  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  telegramId: string | null;
}
