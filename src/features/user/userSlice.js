import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: [],
    cart: [],
  },
  reducers: {
    addItemToCart: (state, { payload }) => {
      let newCart = [...state.cart];
      const found = state.cart.find(({ id }) => id === payload.id);

      if (found) {
        newCart = newCart.map((item) => {
          return item.id === payload.id
            ? { ...item, quantity: payload.quantity || item.quantity + 1 }
            : item;
        });
      } else {
        newCart.push({ ...payload, quantity: 1 });
      }
      state.cart = newCart;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, { payload }) => {
      state.list = payload;
    });
  },
});

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async (_, thunkAPI) => {
    try {
      const res = await axios(`${BASE_URL}/categories`);
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const { addItemToCart } = userSlice.actions;

export default userSlice.reducer;
