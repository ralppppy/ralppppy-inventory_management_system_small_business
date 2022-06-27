const { SalesOrder: SalesOrderModel } = require("../models");

const SalesOrder = {
  mutations: {
    createSalesOrder: async (_, data) => {
      let { input } = data;
      try {
        console.log(input, "sdf");
        const response = await SalesOrderModel.create(input);
        return response;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
  },

  queries: {
    salesOrders: async (_, { input }) => {
      try {
        let { page, pageSize } = input;

        let paginationOption =
          page && pageSize
            ? { limit: pageSize, offset: (page - 1) * pageSize }
            : {};

        let options = { ...paginationOption };

        // let response = await ItemModel.findAll({ ...options });
        let response = await SalesOrderModel.findAndCountAll({ ...options });

        return response;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
  },
};

module.exports = SalesOrder;
