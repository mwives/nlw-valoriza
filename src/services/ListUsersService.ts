import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";

export class ListUsersService {
  async execute() {
    const usersRepositories = getCustomRepository(UsersRepository);

    const users = await usersRepositories.find();

    return classToPlain(users);
  }
}
