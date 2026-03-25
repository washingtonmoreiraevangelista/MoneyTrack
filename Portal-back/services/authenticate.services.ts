import { AuthenticateRequest } from "../@types/authenticateRequest.types";
import { generateToken } from "../middleware/verify-jwt";
import { UserRegisterRepository } from "../repository/registerUser.repository";
import bcrypt from "bcrypt";

export class AuthenticateService {
  constructor(private userRegisterRepository: UserRegisterRepository) {}

  async execute({ email, password }: AuthenticateRequest) {
    const user = await this.userRegisterRepository.findByEmail(email);

    if (!user || !user.password) {
      throw new Error("E-mail ou senha inválidos");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("E-mail ou senha inválidos");
    }

    // Geramos o token com o ID e Email (sem a senha!)
    const token = generateToken({
      sub: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    });

    return { token };
  }
}
