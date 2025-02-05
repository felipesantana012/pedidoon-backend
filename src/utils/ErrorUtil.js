const messages = {
  NOT_FOUND: "Recurso ou id não encontrado.",
  URL_NOT_FOUND: "Restaurante não encontrado para a URL fornecida.",
  INVALID_ID: "ID inválido.",
  MISSING_FIELDS: "Campos obrigatórios faltando:  ",
  DUPLICATE_EMAIL: "Email já cadastrado, Tente outro email.",
  DUPLICATE_URL: "Url já existe, Tente outra url.",
  PASSWORD_TOO_SHORT: "A senha deve ter no mínimo 4 caracteres.",
  REQUEST_BODY_INVALID: "Corpo da requisição inválido.",
  INVALID_URL: "A URL só pode conter letras, _ e -.",
  UPDATE_FAILED: "Falha ao atualizar, Registro não foi alterado.",
  CATEGORIA_HAS_ITEM: "Categoria possui itens cadastrados.",
  DEFAULT: "Erro ao processar a solicitação: => ",
};

export function gerarMenssagemError(type, details = "") {
  return `${messages[type]}  ${details} `;
}

export function validarCampos(fields, requiredFields) {
  const missingFields = requiredFields.filter((field) => !fields[field]);
  if (missingFields.length > 0) {
    throw new Error(
      gerarMenssagemError("MISSING_FIELDS", missingFields.join(", "))
    );
  }
}

export function statusError(error) {
  if (
    error.message.includes(messages.NOT_FOUND) ||
    error.message.includes(messages.URL_NOT_FOUND)
  ) {
    return 404;
  } else if (
    error.message.includes(messages.MISSING_FIELDS) ||
    error.message.includes(messages.INVALID_ID) ||
    error.message.includes(messages.PASSWORD_TOO_SHORT) ||
    error.message.includes(messages.DUPLICATE_EMAIL) ||
    error.message.includes(messages.DUPLICATE_URL) ||
    error.message.includes(messages.REQUEST_BODY_INVALID) ||
    error.message.includes(messages.UPDATE_FAILED) ||
    error.message.includes(messages.CATEGORIA_HAS_ITEM) ||
    error.message.includes(messages.INVALID_URL)
  ) {
    return 400;
  } else {
    return 500;
  }
}
