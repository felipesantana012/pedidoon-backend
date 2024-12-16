import e from "express";

const messages = {
  NOT_FOUND: "Recurso não encontrado.",
  INVALID_ID: "ID inválido.",
  MISSING_FIELDS: "Campos obrigatórios faltando: ",
  DUPLICATE_EMAIL: "Email já cadastrado. Tente outro email.",
  PASSWORD_TOO_SHORT: "A senha deve ter no mínimo 4 caracteres.",
  REQUEST_BODY_INVALID: "Corpo da requisição inválido.",
  DEFAULT: "Erro ao processar a solicitação.",
};

export function gerarMenssagemError(type, details = "") {
  return `${messages[type] || messages.DEFAULT} ${details}`;
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
  if (error.message.includes(messages.NOT_FOUND)) {
    return 404;
  } else if (
    error.message.includes(messages.MISSING_FIELDS) ||
    error.message.includes(messages.INVALID_ID) ||
    error.message.includes(messages.PASSWORD_TOO_SHORT) ||
    error.message.includes(messages.DUPLICATE_EMAIL) ||
    error.message.includes(messages.REQUEST_BODY_INVALID)
  ) {
    return 400;
  } else {
    return 500;
  }
}
