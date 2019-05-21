const usuario = require('./Usuario')
const perfil = require('./pefil')

module.exports = {
    ...usuario,
    ...perfil,
}