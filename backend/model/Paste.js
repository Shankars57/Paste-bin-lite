import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Paste = sequelize.define(
  "Paste",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    max_views: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    views: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: "pastes",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);

export default Paste;
