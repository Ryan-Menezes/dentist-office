'use strict';

module.exports = {
    async up (queryInterface, Sequelize) {
        const actions = ['view', 'create', 'edit', 'delete']
        const modules = ['users', 'queries', 'roles', 'permissions']
        const permissions = []

        await modules.forEach((module) => {
            actions.forEach((action) => permissions.push({
                name: `${action}.${module}`,
                description: `${action}.${module}`,
                createdAt: new Date(),
                updatedAt: new Date()
            }))
        })

        await queryInterface.bulkInsert('permissions', permissions, {});
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.bulkDelete('permissions', null, {});
    }
};
