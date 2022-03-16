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
                }
            },
            roleId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'roles',
                    key: 'id'
                }
            }
        });
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.dropTable('user_roles');
    }
};
