require('dotenv').config()

module.exports = {
    dialect: process.env.DB_DIALECT || 'mysql',
    host: process.env.DB_HOST || 'localhost',
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_DATABASE || 'dentist_office',
    port: process.env.DB_PORT || 3306,
    migrationStorage: 'sequelize',
    migrationStorageTableName: 'migrations',
    seederStorage: 'sequelize',
    seederStorageTableName: 'seeders',
    define: {
        timestamps: true,
        underscored: true
    }
}