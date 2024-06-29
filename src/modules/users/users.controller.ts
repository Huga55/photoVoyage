import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UsersService } from "./users.service";

@ApiTags("Users")
@Controller("/api/users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("/:id")
  async getUserById(@Param("id") id: number) {
    return await this.usersService.getById(id);
  }
}
