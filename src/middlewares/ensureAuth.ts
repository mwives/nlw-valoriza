import { Request, Response, NextFunction, response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureAuth(req: Request, res: Response, next: NextFunction) {
  // Receber o token
  const authToken = req.headers.authorization;

  // Verificar se token está preenchido
  if (!authToken) {
    return res.status(401).end();
  }

  const [, token] = authToken.split(" ");

  try {
    // Validar token
    const { sub } = verify(
      token,
      "00eddc799574fe1cd95855f5bdf63cdc"
    ) as IPayload;

    // Recuperar informações do usuário
    req.user_id = sub;

    return next();
  } catch (err) {
    return res.status(401).end();
  }
}
