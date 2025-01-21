import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { UserService } from "../@core/domain/services/user.service";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UserService
  ) { }

  @Post()
  @HttpCode(201)
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto)
  }
}