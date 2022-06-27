"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SalesOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SalesOrder.init(
    {
      customerName: DataTypes.STRING,
      date: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      orderedItem: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "SalesOrder",
    }
  );
  return SalesOrder;
};
