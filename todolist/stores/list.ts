import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  list: (string | number)[];
};

const initialState: InitialState = {
  list: [],
};

export const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    addList: (state, action: PayloadAction<string | number>) => {
      state.list.push(action.payload);
    },
    deleteList: (state, action: PayloadAction<number>) => {
      state.list.splice(action.payload, 1);
    },
  },
});

export const { addList, deleteList } = listSlice.actions;
export default listSlice.reducer;
