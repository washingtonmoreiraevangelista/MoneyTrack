import { UserRegisterRepository } from "../repository/registerUser.repository";
import { AuthenticateService } from "../services/authenticate.services";
import { CreateUsers } from "../services/createRegister.services";
import { Request, Response } from "express";

export async function registerUsers(req: Request, res: Response) {
  try {
    const { name, email, password, telefone } = req.body;

    const createUsers = new CreateUsers(new UserRegisterRepository());

    const user = await createUsers.create({
      name,
      email,
      password,
      telefone,
    });

    return res.status(201).json(user);
  } catch (error: any) {
    return res.status(409).send({ message: error.message });
  }
}

export async function loginUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    console.log("Tentativa de login:", { email, password });

    const service = new AuthenticateService(new UserRegisterRepository());

    const result = await service.execute({ email, password });

    return res.status(201).json(result);
  } catch (error: any) {
    return res.status(409).send({ message: error.message });
  }
}
