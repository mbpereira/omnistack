const errors = require('./errors')

module.exports = function (e) {

    if(e instanceof errors.HttpError)
        return e

    // pg error
    if(typeof e.code === 'string' && e.severity && e.routine && e.detail) {
        switch(e.code) {
            case '22PO2':
                return errors.BadRequest("Valor inválido para construir a consulta", e.detail)
            case '23502':
                return errors.BadRequest("Campos obrigatórios não informados", e.detail)
            case '42703':
                return errors.BadRequest("Uma das propriedades enviadas não existem nessa tabela", e.detail)
            case '23503':
                return errors.NotFound("Chave estrangeira não econtrada", e.detail)
            case '23505':
                return errors.Conflict("Já existe um registro cadastrado com essa chave", e.detail)
            default:
                return errors.GeneralError("Ocorreu um erro", e.detail)
        }
    }

    return errors.GeneralError("Erro ao processar requisição")
}

