'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Role extends Model {
        static associate(models) {
            Role.belongsToMany(models.Role, {
                model: models.User,
                as: 'users',
                foreignKey: 'roleId',
                through: 'user_roles'
            })

            Role.belongsToMany(models.Permission, {
                model: models.Permission,
                as: 'permissions',
                foreignKey: 'roleId',
                through: 'role_permissions'
            })
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