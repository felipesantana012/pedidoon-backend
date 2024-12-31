import fs from "fs/promises";
import path from "path";

class ImagemService {
  static async removerImagem(imagePath) {
    if (imagePath == "sua-imagem-restaurante.png") {
      return;
    }
    try {
      const imagePathWithoutLeadingSlash = imagePath.startsWith("/")
        ? imagePath.slice(1)
        : imagePath;

      const imagePathWithAbsoluteDir = path.join(
        process.cwd(),
        "src",
        imagePathWithoutLeadingSlash
      );

      // Verifica se o arquivo existe
      await fs.access(imagePathWithAbsoluteDir);

      // Remove o arquivo
      await fs.unlink(imagePathWithAbsoluteDir);
    } catch (error) {
      if (error.code === "ENOENT") {
        console.warn(`Imagem não encontrada: ${imagePath}`);
        return;
      }
      throw new Error("Erro ao remover a imagem.");
    }
  }

  static gerarCaminhoImagem(restaurante_id, filename) {
    return `/uploads/restaurante_${restaurante_id}/${filename}`;
  }
}

export default ImagemService;
