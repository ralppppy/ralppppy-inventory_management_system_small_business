const Item = require("./Item");
const PurchaseOrder = require("./PurchasedOrder");
const SalesOrder = require("./SalesOrder");

const Query = {
  hello: () => "Hello world!",
  getUsers: async () => {
    let users = await User.findAll();

    return users;
  },
  ...Item.queries,
  ...SalesOrder.queries,
  ...PurchaseOrder.queries,
};

module.exports = Query;
