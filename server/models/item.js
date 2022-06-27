"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Item.SalesOrders = Item.hasMany(models.SalesOrder, {
        as: "SalesOrders",
        foreignKey: "orderedItem",
      });
    }
  }
  Item.init(
    {
      itemName: DataTypes.STRING,
      costPrice: DataTypes.FLOAT,
      retailPrice: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Item",
    }
  );
  return Item;
};
