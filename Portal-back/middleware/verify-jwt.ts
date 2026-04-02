import jwt from "jsonwebtoken";
import "dotenv/config";
import { TokenPayload } from "../@types/jwtPayload.types";

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET as string;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;

const ACCESS_EXPIRES = process.env.JWT_ACCESS_EXPIRES as string;
const REFRESH_EXPIRES = process.env.JWT_REFRESH_EXPIRES as string;

// ACCESS TOKEN
export const generateToken = (payload: TokenPayload) => {
  return jwt.sign(payload, ACCESS_SECRET, {
    expiresIn: ACCESS_EXPIRES as jwt.SignOptions["expiresIn"],
  });
}

// REFRESH TOKEN
export const generateRefreshToken = (payload: TokenPayload) => {
  return jwt.sign(payload, REFRESH_SECRET, {
    expiresIn: REFRESH_EXPIRES as jwt.SignOptions["expiresIn"],
  });
}


//validar accesso
export const verifyAccessToke = (token: string): TokenPayload => {
const decoded = jwt.verify(token, ACCESS_SECRET);

return decoded as TokenPayload;
}
  

// validar token
export const verifyRefreshToken = (token: string): TokenPayload => {
  const decoded = jwt.verify(token, REFRESH_SECRET);

  return decoded as TokenPayload;
};
