const usuarios = [{
    id: 1,
    nome: 'Joao Silva',
    email: 'jsilva@zemail.com',
    idade: 29,
    perfil_id: 1
}, {
    id: 2,
    nome: 'Rafael Junio',
    email: 'rafajun@wemail.com',
    idade: 31,
    perfil_id: 2
}, {
    id: 3,
    nome: 'Daniela Smith',
    email: 'danismi@umail.com',
    idade: 24,
    perfil_id: 1
}]

const perfis = [
    { id: 1, nome: 'comum'},
    { id: 2, nome: 'adminstrador'}
]

module.exports = {usuarios, perfis}