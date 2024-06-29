import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./models/user.model";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async createOne(createUserDto: CreateUserDto) {
    return await this.userRepository.create(createUserDto);
  }

  async getById(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async getOneByTgId(telegramId: string | number) {
    return await this.userRepository.findOne({
      where: { telegramId: String(telegramId) },
    });
  }

  async getAdmins() {
    return await this.userRepository.findAll({ where: { isAdmin: true } });
  }
}
