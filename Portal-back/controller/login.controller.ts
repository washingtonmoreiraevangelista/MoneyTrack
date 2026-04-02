import { UserRegisterRepository } from "../repository";
import { AuthenticateService, RefreshTokenService } from "../services";
import { Request, Response } from "express";

export async function loginUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    console.log("Tentativa de login:", { email, password });

    const service = new AuthenticateService(new UserRegisterRepository());

    const result = await service.execute({ email, password });

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(401).send({ message: error.message });
  }
}

export async function refresh(req: Request, res: Response) {
  try {
    const refreshToken = req.body?.refreshToken;
    console.log("BODY:", req.body);

    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token obrigatório" });
    }

    const service = new RefreshTokenService();

    const result = await service.execute(refreshToken);

    return res.json(result);
  } catch (error: any) {
    return res.status(401).json({ message: error.message });
  }
}
