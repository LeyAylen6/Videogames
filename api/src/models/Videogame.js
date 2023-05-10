const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
  sequelize.define('Videogame', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      require: true,
      defaultValue: DataTypes.UUIDV4
    },

    name: {
      type: DataTypes.STRING,
      allowNull: true,
      require: true,
    },

    description: {
      type: DataTypes.STRING,
      allowNull: true,
      require: true,
    },

    platform: {
      type: DataTypes.STRING, // Ver que hay
      allowNull: true,
      require: true,
    },
    
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      require: true,
    },

    releaseDate: {
      type: DataTypes.STRING,
      allowNull: true,
      require: true,
    }, 

    rating: {
      type: DataTypes.STRING,
      allowNull: true,
      require: true,
    }
  },
  { timestamps: false });
};
