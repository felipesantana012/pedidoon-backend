import multer from "multer";
import path from "path";
import fs from "fs/promises";

const UPLOADS_DIR = path.join(process.cwd(), "src/uploads");

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const restaurante_id = req.restaurante_id;
    const pastaRestaurante = path.join(
      UPLOADS_DIR,
      `restaurante_${restaurante_id}`
    );

    try {
      await fs.mkdir(pastaRestaurante, { recursive: true });
      cb(null, pastaRestaurante);
    } catch (error) {
      cb(error);
    }
  },

  filename: (req, file, cb) => {
    const nomeArquivo = `${Date.now()}_${file.originalname}`;
    cb(null, nomeArquivo);
  },
});

const fileFilter = (req, file, cb) => {
  const tiposPermitidos = ["image/jpeg", "image/png", "image/jpg", "image/svg"];

  if (tiposPermitidos.includes(file.mimetype)) {
    cb(null, true);
  } else {
    req.fileValidationError =
      "Formato de arquivo inválido. Apenas imagens são permitidas.";
    cb(null, false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export default upload;
