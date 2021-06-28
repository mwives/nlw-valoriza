import { getCustomRepository } from "typeorm";
import { ComplimentsRepository } from "../repositories/ComplimentsRepository";

export class ListReceivedComplimentsService {
  async execute(user_id: string) {
    const complimentsRespositories = getCustomRepository(
      ComplimentsRepository
    );

    const compliments = await complimentsRespositories.find({
      where: {
        user_receiver: user_id,
      },
    });

    return compliments;
  }
}
