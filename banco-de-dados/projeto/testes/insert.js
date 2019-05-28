const db = require('../config/db')

// const novoPerfil = {
//     nome: 'visitante',
//     rotulo: 'Visitante'
// }

// db('perfis').insert(novoPerfil).then(res => console.log(res))
//     .catch(err => console.log(err.sqlMessage))
//     .finally(() => db.destroy())

const perfilSU = {
    nome: 'root' + Math.random(),
    rotulo: 'Super Usuario'
}

db.insert(perfilSU).into('perfis').then(string => console.log(string))
    .then(res => res[0])
    .then(id => `O codigo gerado foi ${id}`)
    .catch(err => console.log(err.sqlMessage))
    .finally(() => db.destroy())