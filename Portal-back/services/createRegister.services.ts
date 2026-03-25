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
}
