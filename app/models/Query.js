'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Query extends Model {
        static associate(models) {
            
        }
    }

    Query.init({
        pacient_name: DataTypes.STRING,
        status: DataTypes.ENUM('MA', 'CO', 'CA'), // MA - Market | CO - Concluded | CA - Canceled
        date_query: DataTypes.DATE,
        description: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'Query',
        tableName: 'queries',
        underscored: false,
        timestamps: true
    })

    return Query
};