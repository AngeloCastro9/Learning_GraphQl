const db = require('../../config/db')

module.exports = {
    usuarios(pefil) {
        return db('usuarios')
            .join(
                'usuarios_perfis',
                'usuarios.id',
                'usuarios_perfis.usuario_id'
            )
            .where({ pefil_id: pefil.id })
    }
}