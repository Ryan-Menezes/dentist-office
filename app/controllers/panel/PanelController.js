const { User, Query, Role, Permission } = require('../../models/index')

const dir = 'panel/'
const url = '/painel/'

module.exports = {
    async index(req, res, next){
        const userCount = await User.count()
        const queryCount = await Query.count()
        const roleCount = await Role.count()
        const permissionCount = await Permission.count()

        await res.status(200).render(`${dir}index`, {
            title: 'Início',
            userCount,
            queryCount,
            roleCount,
            permissionCount
        })
    },

    async logout(req, res, next){
        await res.status(200).redirect('/')
    }
}