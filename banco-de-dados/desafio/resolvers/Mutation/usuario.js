const db = require('../../config/db')
const { perfil: obterPerfil } = require('../Query/perfil')
const { usuario: obterUsuario } = require('../Query/usuario')

module.exports = {
    async novoUsuario(_, { dados }) {
        try {
            const idsPerfis = []
            if (dados.perfis) {
                for (perfilFiltro of dados.perfis) {
                    const perfil = await obterPerfil(_, {
                        filtro
                    })
                    if (perfil) idsPerfis.push(perfil.id)
                }
            }

            delete dados.perfis

            const [id] = await db('usuarios')
                .insert(dados)

            for (perfil_id of idsPerfis) {
                await db('usuarios_perfis')
                    .insert({ perfil_id, usuario_id: id })
            }
        } catch (e) {
            throw new Error(e.sqlMessage)
        }
    },
    async excluirUsuario(_, { filtro }) {
        try {
            const usuario = await obterUsuario(_, { filtro })
            if (usuario) {
                const { id } = usuario
                await db('usuarios_perfis')
                    .where({ usuario_id: id }).delete()
                await db('usuarios')
                    .where({ id }).delete()
            }
            return usuario
        } catch (e) {
            throw new Error(e.sqlMessage)
        }
    },
    async alterarUsuario(_, { filtro, dados }) {
        try {

        } catch (e) {
            throw new Error(e.sqlMessage)
        }
    }
}