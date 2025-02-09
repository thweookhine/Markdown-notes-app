const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user");

const Note = sequelize.define('Note', {
    id: {
        type: DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true, 
    },
    fileName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        },
        allowNull: false
    }
}, {
    tableName: 'notes',
})

module.exports = Note