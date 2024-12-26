import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import RestauranteRepository from "../repositories/RestauranteRepository.js";

const AuthController = {
  async login(req, res) {
    const { email, senha } = req.body;

    try {
      const restaurante = await RestauranteRepository.findByEmail(email);
      if (!restaurante) {
        return res.status(404).json({ error: "Restaurante não encontrado" });
      }

      const senhaValida = await bcrypt.compare(senha, restaurante.senha);
      if (!senhaValida) {
        return res.status(401).json({ error: "Senha inválida" });
      }

      // Gerar o token
      const token = jwt.sign(
        { id: restaurante.id }, // Payload com o ID do restaurante
        process.env.JWT_SECRET, // Chave secreta armazenada nas variáveis de ambiente
        { expiresIn: "24h" } // Token válido por 24 horas
      );

      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ error: "Erro no servidor" });
    }
  },
};

export default AuthController;
