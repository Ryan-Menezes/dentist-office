'use strict';

module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.createTable('role_permissions', { 
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            roleId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'roles',
                    key: 'id'
                },
                onDelete: 'cascade',
                onUpdate: 'cascade'
            },
            permissionId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'permissions',
                    key: 'id'
                },
                onDelete: 'cascade',
                onUpdate: 'cascade'
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: new Date()
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: new Date()
            }
        });
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.dropTable('role_permissions');
    }
};
