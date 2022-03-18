'use strict';

const bcryptjs = require('bcryptjs')
const bcrypt = require('../../config/bcrypt')

module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.bulkInsert('users', [{
            first_name: 'Ryan',
            last_name: 'Menezes',
            email: 'menezesryan1010@gmail.com',
            password: bcryptjs.hashSync('12345678', bcrypt.salt),
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.bulkDelete('users', null, {});
    }
};
