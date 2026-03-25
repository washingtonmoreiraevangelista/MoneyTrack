import jwt from "jsonwebtoken";
import "dotenv/config";
import { TokenPayload } from "../@types/jwtPayload.types";

const SECRET = process.env.JWT_SECRET as string;
const EXPIRES = process.env.JWT_EXPIRES as string;

// gerar token
export const generateToken = (payload: TokenPayload) => {
  return jwt.sign(payload, SECRET, {
    expiresIn: EXPIRES as jwt.SignOptions["expiresIn"],
  });
};

// validar token
export const verifyToken = (token: string): TokenPayload => {
  const decoded = jwt.verify(token, SECRET);

  return decoded as TokenPayload;
};
