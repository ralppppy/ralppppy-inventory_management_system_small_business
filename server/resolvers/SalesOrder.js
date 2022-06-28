const { Op, QueryTypes } = require("sequelize");
const {
  SalesOrder: SalesOrderModel,
  Item: ItemModel,
  sequelize,
} = require("../models");

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

    searchedSalesOrder: async (_, { searchText, page, pageSize }) => {
      try {
        let options = { limit: pageSize, offset: (page - 1) * pageSize };

        let response = { rows: [], count: 0 };

        const rowsSQL = `SELECT 
                          SalesOrders.id as id, 
                          SalesOrders.customerName as customerName,
                          SalesOrders.date as date,
                          SalesOrders.quantity as quantity,
                          SalesOrders.orderedItem as orderedItem,
                          Items.itemName as itemName
                        FROM
                          SalesOrders
                        LEFT OUTER JOIN
                          Items
                        ON
                          SalesOrders.orderedItem = Items.id
                        WHERE
                          SalesOrders.customerName LIKE "%${searchText}%"
                        OR
                          SalesOrders.date LIKE "%${searchText}%"
                        OR
                          Items.itemName LIKE "%${searchText}%"
                        LIMIT
                          ${pageSize}
                        OFFSET
                          ${(page - 1) * pageSize}`;

        let rows = await sequelize.query(rowsSQL, { type: QueryTypes.SELECT });

        response = { ...response, rows, count: rows.length };

        return response;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
  },
};

module.exports = SalesOrder;
