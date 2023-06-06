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

    platforms: {
      type: DataTypes.STRING, // Ver que hay
      allowNull: true,
      require: true,
    },
    
    image: {
      type: DataTypes.STRING(2083),
      allowNull: false,
      defaultValue: 'https://github.com/LeyAylen6/Videogames/blob/develop/client/src/assets/FotoDefaultGames.png?raw=true'
    },

    releaseDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    }, 

    rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
      require: true,
      defaultValue: 3
    }
  },
  { timestamps: false });
};
