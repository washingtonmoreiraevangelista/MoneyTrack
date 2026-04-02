import { AuthenticateRequest } from "../@types/authenticateRequest.types";
import { UserRegisterRepository } from "../repository/registerUser.repository";
import { TokenPayload } from "../@types";
import bcrypt from "bcrypt";
import {
  generateRefreshToken,
  generateToken,
  verifyRefreshToken,
} from "../middleware/verify-jwt";
import {
  deleteRefreshToken,
  findRefreshToken,
  saveRefreshToken,
} from "../utils/refreshToken";

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

    const payload: TokenPayload = {
      sub: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    };

    const accessToken = generateToken(payload);
    const refreshToken = generateRefreshToken(payload);

    saveRefreshToken(user.id, refreshToken);

    return {
      accessToken,
      refreshToken,
    };
  }
}

export class RefreshTokenService {
  async execute(refreshToken: string) {
    if (!refreshToken) {
      throw new Error("Refresh token obrigatório");
    }

    try {
      
      const payload: TokenPayload = verifyRefreshToken(refreshToken);
      //verifica se exite o token
      const tokenExists = findRefreshToken(refreshToken);

      if (!tokenExists) {
        throw new Error("Refresh token inválido");
      }

      //  remove antigo (rotação)
      await deleteRefreshToken(refreshToken);

      //  gera novo refresh
      const newRefreshToken = generateRefreshToken({
        sub: payload.sub,
        email: payload.email,
        isAdmin: payload.isAdmin,
      });

      //salva novo token
      await saveRefreshToken(payload.sub, newRefreshToken);

      //gera novo token
      const newAccessToken = generateToken({
        sub: payload.sub,
        email: payload.email,
        isAdmin: payload.isAdmin,
      });

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    } catch {
      throw new Error("Refresh token inválido ou expirado");
    }
  }
}
