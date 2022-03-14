'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Permission extends Model {
        static associate(models) {

        }
    }

    Permission.init({
        name: DataTypes.STRING,
        description: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'Permission',
        tableName: 'permissions',
        underscored: true,
        timestamps: true
    })

    return Permission
};