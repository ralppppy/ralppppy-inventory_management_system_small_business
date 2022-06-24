import { configureStore } from "@reduxjs/toolkit";
import { RegisterTheItemSlice } from "../modules/RegisterTheItem/models";
import SalesOrderModel from "../modules/SalesOrder/models/SalesOrderModel";
import GlobalSlice from "./GlobalSlice";

const store = configureStore({
  reducer: {
    Global: GlobalSlice,
    RegisterTheItem: RegisterTheItemSlice,
    SalesOrder: SalesOrderModel,
  },
});

export default store;
