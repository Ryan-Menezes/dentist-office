'use strict';

const { Role, Permission } = require('../../app/models/index')

module.exports = {
    async up (queryInterface, Sequelize) {
        await Role.create({
            name: 'Administrador',
            description: 'Administrador do sistema'
        }, {
            include: {
                as: 'permissions',
                model: Permission
            }
        })
        .then(async (role) => {
            Permission.findAll()
                .then(async (permissions) => {
                    role.addPermissions(permissions)
                })
                .catch(error => console.error(error))
        })
        .catch(error => console.error(error))
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.bulkDelete('roles', null, {});
    }
};
