import app from "./app.js";
const PORT_SERVER = process.env.PORT_SERVER || 4000;

app.listen(PORT_SERVER, () => {
  console.log(`Server iniciado na porta: ${PORT_SERVER}`);
});
