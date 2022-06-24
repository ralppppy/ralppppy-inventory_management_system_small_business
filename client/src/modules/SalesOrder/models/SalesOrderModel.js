import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  salesOrders: [],
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
      state.salesOrders = action.payload;
    },
    setSalesOrder: (state, action) => {
      state.salesOrders.push(action.payload);
    },
    // setTotalDataSize: (state, action) => {
    //   state.totalDataSize = action.payload;
    // },
    // setIsFetchingData: (state, action) => {
    //   state.isFetchingData = action.payload;
    // },
  },
});

// Action creators are generated for each case reducer function
export const { setItems, setSalesOrders, setSalesOrder } =
  SalesOrderSlice.actions;

export default SalesOrderSlice.reducer;
