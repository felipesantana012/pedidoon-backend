import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Valida o token
    req.restaurante_id = decoded.id; // Adiciona o ID do usuário na requisição
    next(); // Continua para a próxima função na rota
  } catch (err) {
    return res.status(401).json({ error: "Token inválido" });
  }
};

export default authMiddleware;
