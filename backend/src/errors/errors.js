function HttpError (name, message, code, detail) {
    this.name = name
    this.message = message
    this.code = code
    this.stack = (new Error()).stack
    this.detail = detail
}
HttpError.prototype.parse = function () {
    const self = Object.assign({}, this)
    self.stack = undefined
    return self
}
function Conflict (message, detail = "") {
    return new HttpError('Conflict', message || 'Não é possível inserir um registro já existente', 409, detail)
}
function BadRequest (message, detail = "") {
    return new HttpError('BadRequest', message || 'Requisição mal formada', 400, detail)
}
function GeneralError (message, detail = "") {
    return new HttpError('GeneralError', message || 'Ocorreu um erro no servidor', 500, detail)
}
function Unauthorized (message, detail = "") {
    return new HttpError('Unauthorized', message || 'Usuario sem permissao', 401, detail)
}
function NotFound (message, detail = "") {
    return new HttpError('NotFound', message || 'Conteúdo requisitado não encontrado', 404, detail)
}
function MethodNotAllowed (message, detail = "") {
    return new HttpError('MethodNotAllowed', message || 'Método não implementado para esta rota', 405, detail)
}

module.exports = {
    MethodNotAllowed,
    NotFound,
    Unauthorized, 
    GeneralError,
    BadRequest,
    Conflict,
    HttpError
}