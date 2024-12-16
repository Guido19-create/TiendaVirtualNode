import { DataTypes } from "sequelize";

import {sequelize} from '../../database/mySql.config.js'

//const { Sequelize, DataTypes } = require('sequelize');

export const User = sequelize.define(
  "User",
  {
    // Model attributes are defined here
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    edad: {
      type: DataTypes.INTEGER,
      // allowNull defaults to true
    },
  },
  {
    tableName: "Usuarios",
    timestamps: true
  }
);
