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
        first_name: {
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
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'O campo sobrenome é de preenchimento obrigatório!'
                },
                len: {
                    args: [1, 191],
                    msg: 'O campo sobrenome deve conter no minímo 1 digíto e no máximo 191 digítos!'
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'O campo email é de preenchimento obrigatório!'
                },
                len: {
                    args: [1, 191],
                    msg: 'O campo email deve conter no minímo 1 digíto e no máximo 191 digítos!'
                },
                isEmail: {
                    args: true,
                    msg: 'O campo email deve ser preenchido com um email válido!'
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'O campo senha é de preenchimento obrigatório!'
                },
                len: {
                    args: [8, 191],
                    msg: 'O campo senha deve conter no minímo 8 digítos e no máximo 191 digítos!'
                }
            }
        }
    }, {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        underscored: false,
        timestamps: true,
        hooks: {
            beforeCreate: async (user, options) => {
                if(user.password.trim()){
                    user.password = bcryptjs.hashSync(user.password, bcrypt.salt)
                }
            },

            beforeSave: async (user, options) => {
                if(user.password.trim()){
                    user.password = bcryptjs.hashSync(user.password, bcrypt.salt)
                }
            },

            /*
            beforeUpdate: async (user, options) => {
                if(user.password.trim()){
                    user.password = bcryptjs.hashSync(user.password, bcrypt.salt)
                }else{
                    const _user = await User.findByPk(user.id)

                    user.password = _user.password
                }
            }
            */
        }
    })

    return User;
};