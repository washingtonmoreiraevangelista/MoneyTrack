import fs from "fs";
import path from "path";

const filepath = path.join(__dirname, "..", "database", "db.json");

//ler arquivo
export const readData = () => {
  const data = fs.readFileSync(filepath, "utf-8");
  const parsed = JSON.parse(data || "{}");

  return {
    users: parsed.users || [],
    refreshToken: parsed.refreshToken || [],
    transaction: parsed.transaction || []
  };
};

// salva os dados
export const writeData = (data: any) => {
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
};

