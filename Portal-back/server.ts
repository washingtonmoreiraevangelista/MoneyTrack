import { app } from "./App";


app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});


const server = app.listen(3000, () => {
  console.log("Servidor rodando")
})

server.on("error", (error: any) => {
  console.error("Erro ao iniciar servidor:", error)

  if (error.code === "EADDRINUSE") {
    console.error("⚠️ Porta 3000 já está em uso")
  }
})