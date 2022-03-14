'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Role extends Model {
        static associate(models) {

        }
    }
    
    Role.init({
        name: DataTypes.STRING,
        description: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'Role',
        tableName: 'roles',
        underscored: true,
        timestamps: true
    })

    return Role
};