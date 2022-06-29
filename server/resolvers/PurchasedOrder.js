const { Op, QueryTypes } = require("sequelize");
const {
  PurchaseOrder: PurchaseOrderModel,
  Item: ItemModel,
  sequelize,
} = require("../models");

const PurchaseOrder = {
  mutations: {
    createPurchaseOrder: async (_, data) => {
      let { input } = data;

      console.log(data, "sdfsdfsdf");
      try {
        const response = await PurchaseOrderModel.create(input);
        return response;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
  },

  queries: {
    purchaseOrders: async (_, { input }) => {
      try {
        let { page, pageSize } = input;

        let paginationOption =
          page && pageSize
            ? { limit: pageSize, offset: (page - 1) * pageSize }
            : {};

        let options = { ...paginationOption };

        // let response = await ItemModel.findAll({ ...options });
        let response = await PurchaseOrderModel.findAndCountAll({
          ...options,
        });

        return response;
      } catch (error) {
        console.log(error);
        return error;
      }
    },

    // searchedPurchaseOrder: async (_, { searchText, page, pageSize }) => {
    //   try {
    //     let options = { limit: pageSize, offset: (page - 1) * pageSize };

    //     let response = { rows: [], count: 0 };

    //     const rowsSQL = `SELECT
    //                       PurchaseOrders.id as id,
    //                       PurchaseOrders.customerName as customerName,
    //                       PurchaseOrders.date as date,
    //                       PurchaseOrders.quantity as quantity,
    //                       PurchaseOrders.orderedItem as orderedItem,
    //                       Items.itemName as itemName
    //                     FROM
    //                       PurchaseOrders
    //                     LEFT OUTER JOIN
    //                       Items
    //                     ON
    //                       PurchaseOrders.orderedItem = Items.id
    //                     WHERE
    //                       PurchaseOrders.customerName LIKE "%${searchText}%"
    //                     OR
    //                       PurchaseOrders.date LIKE "%${searchText}%"
    //                     OR
    //                       Items.itemName LIKE "%${searchText}%"
    //                     LIMIT
    //                       ${pageSize}
    //                     OFFSET
    //                       ${(page - 1) * pageSize}`;

    //     let rows = await sequelize.query(rowsSQL, { type: QueryTypes.SELECT });

    //     response = { ...response, rows, count: rows.length };

    //     return response;
    //   } catch (error) {
    //     console.log(error);
    //     return error;
    //   }
    // },
  },
};

module.exports = PurchaseOrder;
