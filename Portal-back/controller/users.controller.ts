import { UserRegisterRepository } from "../repository/registerUser.repository";
import { CreateUsers } from "../services/registerUser.services";
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


export async function updateUser(req: Request, res: Response) {
  try {
    const { id } = req.params as { id: string };
    const { name, email, password, telefone } = req.body;

    if(!name || !email || !password || !telefone) {
      return res.status(400).json({ message: "At least one field must be provided for update" });
    }

    const updateUser = new CreateUsers(new UserRegisterRepository());

    const result = await updateUser.updated(id, {
      name,
      email,
      password,
      telefone,
    });
    console.log("Usuário atualizado:", result);

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(409).send({ message: error.message });
  }
}
