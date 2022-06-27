const Item = require("./Item");
const SalesOrder = require("./SalesOrder");

const Query = {
  hello: () => "Hello world!",
  getUsers: async () => {
    let users = await User.findAll();

    return users;
  },
  ...Item.queries,
  ...SalesOrder.queries,
};

module.exports = Query;
