import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  defaultPageSize: 10,
  totalDataSize: 0,
  isFetchingData: true,
};

export const RegisterTheItemSlice = createSlice({
  name: "RegisterTheItem",
  initialState,
  reducers: {
    setItems: (state, action) => {
      let dataWithKey = action.payload.map((item) => {
        return { ...item, key: item.id };
      });
      state.items = dataWithKey;
    },
    setItem: (state, action) => {
      state.items.push(action.payload);
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
export const { setItems, setItem, setTotalDataSize, setIsFetchingData } =
  RegisterTheItemSlice.actions;

export default RegisterTheItemSlice.reducer;
