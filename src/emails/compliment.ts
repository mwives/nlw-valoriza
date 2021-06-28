import sgMail = require("@sendgrid/mail");
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendReceivedComlpimentEmail(
  user_sender: string,
  user_receiver: string
) {
  const usersRepository = getCustomRepository(UsersRepository);

  const userSender = await usersRepository.findOne({ id: user_sender });
  const userReceiver = await usersRepository.findOne({ id: user_receiver });
  
  sgMail.send({
    to: userReceiver.email,
    from: "ivo.nlwvaloriza@gmail.com",
    templateId: "d-361dec2e3e60405d8c502586570e05a7",
    dynamicTemplateData: { 
      userReceiverName: userReceiver.name,
      userSenderName: userSender.name,
    },
  });
}
