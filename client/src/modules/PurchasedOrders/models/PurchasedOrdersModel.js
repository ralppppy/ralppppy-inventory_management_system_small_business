import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  purchaseOrders: [],
  defaultPageSize: 10,
  totalDataSize: 0,
  isFetchingData: true,
};

export const PurchasedOrdersSlice = createSlice({
  name: "PurchasedOrder",
  initialState,
  reducers: {
    setItems: (state, action) => {
      let dataWithKey = action.payload.map((item) => {
        return { ...item, key: item.id };
      });
      state.items = dataWithKey;
    },
    setPurchaseOrders: (state, action) => {
      let dataWithKey = action.payload.map((item) => {
        return { ...item, key: item.id };
      });
      state.purchaseOrders = dataWithKey;
    },
    setPurchaseOrder: (state, action) => {
      state.purchaseOrders.push(action.payload);
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
  setPurchaseOrder,
  setPurchaseOrders,
  //   setSalesOrders,
  //   setSalesOrder,
  setTotalDataSize,
  setIsFetchingData,
} = PurchasedOrdersSlice.actions;

export default PurchasedOrdersSlice.reducer;
