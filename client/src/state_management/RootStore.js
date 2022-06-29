import { configureStore } from "@reduxjs/toolkit";
import { PurchasedOrdersModel } from "../modules/PurchasedOrders/models";
import { RegisterTheItemSlice } from "../modules/RegisterTheItem/models";
import SalesOrderModel from "../modules/SalesOrder/models/SalesOrderModel";
import GlobalSlice from "./GlobalSlice";

const store = configureStore({
  reducer: {
    Global: GlobalSlice,
    RegisterTheItem: RegisterTheItemSlice,
    SalesOrder: SalesOrderModel,
    PurchasedOrders: PurchasedOrdersModel,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
