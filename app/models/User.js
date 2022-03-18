'use strict'

const bcryptjs = require('bcryptjs')
const bcrypt = require('../../config/bcrypt')

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.belongsToMany(models.Role, {
                model: models.Role,
                as: 'roles',
                foreignKey: 'userId',
                through: 'user_roles'
            })
        }
    }

    User.init({
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        underscored: false,
        timestamps: true,
        hooks: {
            beforeCreate: async (user, options) => {
                user.password = bcryptjs.hashSync(user.password, bcrypt.salt)
            },

            beforeUpdate: async (user, options) => {
                if(user.password.trim()){
                    user.password = bcryptjs.hashSync(user.password, bcrypt.salt)
                }
            }
        }
    })

    return User;
};