import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
import { hash } from "bcryptjs";
import { sendWelcomeEmail } from "../emails/account";

interface IUserRequest {
  name: string;
  email: string;
  password: string;
  admin?: boolean;
}

export class CreateUserService {
  async execute({ name, email, password, admin = false }: IUserRequest) {
    const usersRepository = getCustomRepository(UsersRepository);

    if (!email) {
      throw new Error("No email provided");
    }

    const userAlreadyExists = await usersRepository.findOne({ email });

    if (userAlreadyExists) {
      throw new Error("Email is invalid or already taken");
    }

    if (password.length < 6) {
      throw new Error("Password must have at least 6 characters");
    }

    if (password.toLowerCase().includes("password")) {
      throw new Error("Password may not contain \"password\"");
    }

    const passwordHash = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: passwordHash,
      admin,
    });

    await usersRepository.save(user);

    sendWelcomeEmail(user);

    return user;
  }
}
