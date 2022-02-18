const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      unique: true
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    hp: {
      type: DataTypes.FLOAT(1),
      validate: {
        min: 1,
        max: 100,
      }
    },

    attack: {
      type: DataTypes.FLOAT(1),
      validate: {
        min: 1,
        max: 100,
      }
    },

    defense: {
      type: DataTypes.FLOAT(1),
      validate: {
        min: 1,
        max: 100,
      }
    },

    speed: {
      type: DataTypes.FLOAT(1),
      validate: {
        min: 1,
        max: 100,
      }
    },
    
    height: {
      type: DataTypes.INTEGER
    },
    
    weight: {
      type: DataTypes.INTEGER
    },

    img: {
      type: DataTypes.STRING,
      defaultValue: "https://c.tenor.com/1W4gpgv6GU8AAAAd/sus-eyebrow.gif"
    },

    createdInDb: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    }

  }, {
    timestamps: false
  });

};
