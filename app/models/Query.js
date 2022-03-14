'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Query extends Model {
        static associate(models) {
            
        }
    }

    Query.init({
        pacient_name: DataTypes.STRING,
        description: DataTypes.TEXT,
        status: DataTypes.ENUM('MA', 'CO', 'CA'), // MA - Market | CO - Concluded | CA - Canceled
        date_query: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'Query',
        tableName: 'queries',
        underscored: true,
        timestamps: true
    })

    return Query
};