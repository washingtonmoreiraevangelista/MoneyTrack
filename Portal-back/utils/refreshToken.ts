import { readData, writeData } from "../utils/fileHandler";

export const saveRefreshToken = (userId: string, token: string) => {
  const db = readData();

  db.refreshToken.push({
    userId,
    token,
    createdAt: new Date(),
  });

  writeData(db);
};

export const findRefreshToken = (token: string) => {
  const db = readData();

  return db.refreshToken.find((t: any) => t.token === token);
};

export const deleteRefreshToken = (token: string) => {
  const db = readData();

  db.refreshToken = db.refreshToken.filter((t: any) => t.token !== token);

  writeData(db);
};