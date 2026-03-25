import { Request } from "express";

export type AuthRequest = Request & {
  user?: {
    userId: string;
    isAdmin: boolean;
  };
};
