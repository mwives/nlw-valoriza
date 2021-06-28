import { getCustomRepository } from "typeorm";
import { ComplimentsRepository } from "../repositories/ComplimentsRepository";

export class ListSentComplimentsService {
  async execute(user_id: string) {
    const complimentsRespositories = getCustomRepository(
      ComplimentsRepository
    );

    const compliments = await complimentsRespositories.find({
      where: {
        user_sender: user_id,
      },
      relations: ["userSender", "userReceiver", "tag"],
    });

    return compliments;
  }
}
