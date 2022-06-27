import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  salesOrders: [],
  defaultPageSize: 10,
  totalDataSize: 0,
  isFetchingData: true,
};

export const SalesOrderSlice = createSlice({
  name: "SalesOrder",
  initialState,
  reducers: {
    setItems: (state, action) => {
      let dataWithKey = action.payload.map((item) => {
        return { ...item, key: item.id };
      });
      state.items = dataWithKey;
    },
    setSalesOrders: (state, action) => {
      let dataWithKey = action.payload.map((item) => {
        return { ...item, key: item.id };
      });
      state.salesOrders = dataWithKey;
    },
    setSalesOrder: (state, action) => {
      state.salesOrders.push(action.payload);
    },

    setTotalDataSize: (state, action) => {
      state.totalDataSize = action.payload;
    },

    setIsFetchingData: (state, action) => {
      state.isFetchingData = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setItems,
  setSalesOrders,
  setSalesOrder,
  setTotalDataSize,
  setIsFetchingData,
} = SalesOrderSlice.actions;

export default SalesOrderSlice.reducer;
