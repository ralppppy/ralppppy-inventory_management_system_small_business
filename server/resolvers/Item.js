const { Op } = require("sequelize");
const { Item: ItemModel } = require("../models");
const Item = {
  mutations: {
    createItem: async (_, values) => {
      console.log(values, "sdfsdf");

      try {
        let response = await ItemModel.create(values.input);

        return response;
      } catch (error) {
        console.log(error);

        return error;
      }
    },
  },

  queries: {
    items: async (_, { input }) => {
      try {
        let { page, pageSize } = input;

        let paginationOption =
          page && pageSize
            ? { limit: pageSize, offset: (page - 1) * pageSize }
            : {};

        let options = { ...paginationOption };

        // let response = await ItemModel.findAll({ ...options });
        let response = await ItemModel.findAndCountAll({ ...options });

        return response;
      } catch (error) {
        console.log(error);
        return error;
      }
    },

    searchedItems: async (_, { itemName, page, pageSize }) => {
      try {
        let options = { limit: pageSize, offset: (page - 1) * pageSize };

        let where = itemName
          ? { where: { itemName: { [Op.substring]: itemName } } }
          : {};

        options = { ...options, ...where };

        const response = await ItemModel.findAndCountAll({ ...options });

        return response;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
  },
};

module.exports = Item;
