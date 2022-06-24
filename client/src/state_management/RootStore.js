import { configureStore } from "@reduxjs/toolkit";
import { RegisterTheItemSlice } from "../modules/RegisterTheItem/models";
import GlobalSlice from "./GlobalSlice";

const store = configureStore({
  reducer: { Global: GlobalSlice, RegisterTheItem: RegisterTheItemSlice },
});

export default store;
