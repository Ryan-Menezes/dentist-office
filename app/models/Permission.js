'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Permission extends Model {
        static associate(models) {
            Permission.belongsToMany(models.Role, {
                model: models.Role,
                as: 'roles',
                foreignKey: 'permissionId',
                through: 'role_permissions'
            })
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