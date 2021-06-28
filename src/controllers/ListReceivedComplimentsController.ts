import { Request, Response } from "express";
import { ListReceivedComplimentsService } from "../services/ListReceivedComplimentsService";

export class ListReceivedComplimentsController {
  async handle(req: Request, res: Response) {
    const { user_id } = req;

    const listReceivedComplimentsService = new ListReceivedComplimentsService();

    const compliments = await listReceivedComplimentsService.execute(user_id);

    return res.json(compliments);
  }
}
