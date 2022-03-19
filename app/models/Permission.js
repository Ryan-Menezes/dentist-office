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
        modelName: 'Permission',
        tableName: 'permissions',
        underscored: false,
        timestamps: true
    })

    return Permission
};