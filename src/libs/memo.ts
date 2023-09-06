import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "redux/store/configStore";

export const memoized = createSelector(
  (state: RootState) => state.todos.filter,
  (state: RootState) => state.todos.data,
  (filter, data) => ({todos: data, filter}),
)