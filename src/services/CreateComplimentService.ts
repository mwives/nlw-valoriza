import { getCustomRepository } from "typeorm";
import { ComplimentsRepository } from "../repositories/ComplimentsRepository";
import { UsersRepository } from "../repositories/UsersRepository";

interface IComplimentRequest {
  tag_id: string;
  user_sender: string;
  user_receiver: string;
  message: string;
}

export class CreateComplimentService {
  async execute({
    tag_id,
    user_sender,
    user_receiver,
    message,
  }: IComplimentRequest) {
    const complimentsRepository = getCustomRepository(
      ComplimentsRepository
    );
    const usersRepositories = getCustomRepository(UsersRepository);

    const userReceiverExists = await usersRepositories.findOne(user_receiver);

    if (user_sender === user_receiver) {
      throw new Error("Cannot send a compliment to yourself");
    }

    if (!userReceiverExists) {
      throw new Error("User receiver does not exist");
    }

    const compliment = complimentsRepository.create({
      tag_id,
      user_sender,
      user_receiver,
      message,
    });

    await complimentsRepository.save(compliment);

    return compliment;
  }
}
