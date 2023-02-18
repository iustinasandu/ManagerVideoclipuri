import { Sequelize } from "sequelize";
import { sequelizeConfigProps } from "../config.js";
import { sequelizeOperationsAPI } from "./operations-api.js";

//realizare conexiune la BD
const sequelizeConnection = new Sequelize(
    "manager_videoclipuri", 
    "root", 
    "Asdqwe1234", 
    sequelizeConfigProps
);

export const Videos = sequelizeConnection.define("Videos", {
    VideoId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    Description: {
        type: Sequelize.STRING,
    },
    Title: {
        type: Sequelize.STRING,
    },
    VideoURL: {
      type: Sequelize.STRING,
    },
});


export const Playlists = sequelizeConnection.define("Playlists", {
    PlaylistId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    Name: {
      type: Sequelize.STRING,
    },
    CreationDate: {
      type: Sequelize.STRING,
    },
  });


Playlists.hasMany(Videos, {
    foreignKey: "PlaylistId",
    onDelete: "CASCADE", 
    onUpdate: "RESTRICT",
    foreignKeyConstraint: true,
  });

sequelizeOperationsAPI.init(sequelizeConnection);

export {sequelizeConnection};