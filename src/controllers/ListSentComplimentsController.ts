import { Request, Response } from "express";
import { ListSentComplimentsService } from "../services/ListSentComplimentsService";

export class ListSentComplimentsController {
  async handle(req: Request, res: Response) {
    const { user_id } = req;

    const listSentComplimentsService = new ListSentComplimentsService();

    const compliments = await listSentComplimentsService.execute(user_id);

    return res.json(compliments);
  }
}
