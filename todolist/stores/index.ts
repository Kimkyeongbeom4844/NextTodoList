import { configureStore } from "@reduxjs/toolkit";
import counter from "./counter";
import list from "./list";

export const store = configureStore({
  reducer: {
    counter,
    list,
  },
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
