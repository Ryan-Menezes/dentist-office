'use strict'

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('queries', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            pacient_name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            status: {
                type: Sequelize.ENUM('MA', 'CO', 'CA'), // MA - Market | CO - Concluded | CA - Canceled
                allowNull: false,
                defaultValue: 'MA'
            },
            date_query: {
                type: Sequelize.DATE,
                allowNull: false
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false
            }
        })
    },
    
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Queries')
    }
};