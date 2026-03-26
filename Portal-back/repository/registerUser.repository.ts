import { randomUUID } from "crypto";
import { RegisterUser } from "../model/register.interface";
import { readData, writeData } from "../utils/fileHandler";

export class UserRegisterRepository {
  async create(data: RegisterUser) {
    // 1. ler dados atuais
    const db = readData();
    // 2. garantir que existe array de usuários
    const users = db.users || [];
    // 3. adicionar novo usuário
    const newUser = {
      id: randomUUID(), // ou qualquer padrão que você usa
      ...data,
      isAdmin: false,
    };

    users.push(newUser);

    // 4. salvar novamente no arquivo
    writeData({
      ...db,
      users,
    });

    // 5. retornar usuário criado
    return newUser;
  }

  async findByEmail(email: string) {
    const db = readData();

    const user = db.users?.find((u: any) => u.email === email) ?? false;

    return user;
  }

  async updateUser(id: string, data: RegisterUser) {
    const db = readData();

    const users = db.users || [];

    const index = users.findIndex(
      (user: any) => user.id.trim() === id.trim(),
    );

    if (index === -1) {
      throw new Error("User not found");
    }

    //atualizar os dados do usuário
    users[index] = {
      ...users[index],
      ...data,
    }

    writeData(db);

    return users[index];
  }
}
