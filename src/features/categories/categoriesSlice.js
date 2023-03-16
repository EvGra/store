import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    llist: [],
  },
});

export const getCategories = createAsyncThunk();
