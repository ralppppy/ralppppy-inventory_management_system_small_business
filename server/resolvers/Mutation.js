const { User } = require("../models");
const Item = require("./Item");
const SalesOrder = require("./SalesOrder");

const Mutation = {
  login: async (_, { email, password }, { req }) => {
    let user = await User.findOne({ where: { email, password } });
    console.log(user);

    if (!user) return null;

    return user;
  },

  test: (_, __, { req }) => {
    console.log(req.session);
    return "WE";
  },

  createUser: async (_, { input }) => {
    let data = input;
    let user = await User.create(data);
    // console.log(user);

    return user;
  },

  ...Item.mutations,
  ...SalesOrder.mutations,
};

module.exports = Mutation;
