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
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'O campo nome é de preenchimento obrigatório!'
                },
                len: {
                    args: [1, 191],
                    msg: 'O campo nome deve conter no minímo 1 digíto e no máximo 191 digítos!'
                }
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
    }, {
        sequelize,
        modelName: 'Role',
        tableName: 'roles',
        underscored: false,
        timestamps: true
    })

    return Role
};