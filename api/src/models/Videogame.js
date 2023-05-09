const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
  sequelize.define('Videogame', {
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

    description: {
      type: DataTypes.STRING,
      allowNull: false,
      require: true,
    },

    platform: {
      type: DataTypes.STRING, // Ver que hay
      allowNull: false,
      require: true,
    },
    
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      require: true,
    },

    releaseDate: {
      type: DataTypes.STRING,
      allowNull: false,
      require: true,
    }, 

    rating: {
      type: DataTypes.STRING,
      allowNull: false,
      require: true,
    }
  },
  { timestamps: false });
};
