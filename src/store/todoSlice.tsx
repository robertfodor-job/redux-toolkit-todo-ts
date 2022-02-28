import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface TodoState {
  todos: { name: string; id: string }[];
}

const initialState: TodoState = {
  todos: [{ name: "Todo #1", id: "1" }],
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push({
        name: action.payload,
        id: new Date().getTime().toString(),
      });
    },
    deleteTodo: (state, action) => {
      const id = action.payload;
      state.todos = state.todos.filter((todo) => todo.id !== id);
    },
  },
});

export const todosActions = todosSlice.actions;
export const selectTodo = (state: RootState) => state.todos.todos;

export default todosSlice.reducer;
