const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Genre', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            require: true
        },
    
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            require: true,
        },  
    }, 
    { timestamps: false });
}