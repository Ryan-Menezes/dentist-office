'use strict';

module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.createTable('user_roles', { 
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id'
                },
                onDelete: 'cascade',
                onUpdate: 'cascade'
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
        await queryInterface.dropTable('user_roles');
    }
};
