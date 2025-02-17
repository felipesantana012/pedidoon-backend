import app from "./app.js";
import defineAssociations from "./associations.js";
const PORT_SERVER = process.env.PORT_SERVER || 4000;

defineAssociations();

app.listen(PORT_SERVER, "0.0.0.0", () => {
  console.log(`Server iniciado na porta: ${PORT_SERVER}`);
});
