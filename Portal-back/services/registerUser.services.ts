import { RegisterUser } from "../model/register.interface";
import { UserRegisterRepository } from "../repository/registerUser.repository";
import bcrypt from "bcrypt";

export class CreateUsers {
  constructor(private createUsersRepository: UserRegisterRepository) {}

  async create({ name, email, password, telefone }: RegisterUser) {
    // .trim() remove espaços nas pontas, .toLowerCase() padroniza
    const cleanEmail = email.trim().toLocaleLowerCase();
    // .replace(/\s+/g, '') remove TODOS os espaços da senha, inclusive no meio
    const cleanPassword = password.replace(/\s+/g, "");
    // Converte para string caso venha como número por engano e limpa tudo que não for dígito
    const cleanTelefone = String(telefone).replace(/\D/g, "");

    const passwordHashed = await bcrypt.hash(cleanPassword, 8);

    const userWithSameEmail =
      await this.createUsersRepository.findByEmail(cleanEmail);

    if (userWithSameEmail) {
      throw new Error("Email ou Senha ja Ultilizado");
    }

    const user = await this.createUsersRepository.create({
      name: name.trim(),
      email: cleanEmail,
      password: passwordHashed,
      telefone: cleanTelefone,
    });

    return user;
  }

  async updated(id: string, data: Partial<RegisterUser>) {
    // Criamos um objeto para armazenar apenas o que será atualizado
    const updateData: Partial<RegisterUser> = {};

    if (data.email) {
      // .trim() remove espaços nas pontas, .toLowerCase() padroniza
      const cleanEmail = data.email.trim().toLocaleLowerCase();

      //verificação de deuplicidade,apenas se o email foi enviado
      const userWithSameEmail =
        await this.createUsersRepository.findByEmail(cleanEmail);

      console.log("ID que chegou no Service:", id);
      console.log("ID que veio do Banco:", userWithSameEmail?.id);
      
      if (userWithSameEmail && userWithSameEmail.id !== id) {
        throw new Error("Email já utilizado");
      }

      updateData.email = cleanEmail;
    }

    if (data.password) {
      // .replace(/\s+/g, '') remove TODOS os espaços da senha, inclusive no meio
      const cleanPassword = data.password.replace(/\s+/g, "");
      updateData.password = await bcrypt.hash(cleanPassword, 8);
    }

    if (data.telefone) {
      // Converte para string caso venha como número por engano e limpa tudo que não for dígito
      updateData.telefone = String(data.telefone).replace(/\D/g, "");
    }

    if (data.name) {
      updateData.name = data.name.trim();
    }

    const user = await this.createUsersRepository.updateUser(id, updateData);

    return user;
  }
}
