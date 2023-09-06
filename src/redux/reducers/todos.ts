import { createSlice } from '@reduxjs/toolkit'
import { Todo } from 'types/todo.interface';

const getInitialTodo = () => {
 
  const localTodoList = window.localStorage.getItem('todos');
  // if todo list is not empty
  if (localTodoList) {
    return JSON.parse(localTodoList);
  }
  window.localStorage.setItem('todos', JSON.stringify([]));
  return [];
};

type FilterOpt = 'all' | 'completed' | 'active'
const initialState: {filter: FilterOpt, data: Todo[]} = {
  filter: 'all',
  data: getInitialTodo(),
}

const todoReducer = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    changeFilter: (state, {payload}: {payload: FilterOpt}) => {
      state.filter = payload
    },

    addTodo: (state, {payload}) => {
      const newTodo = {
        completed: payload.completed || false, 
        title: payload.title
      }
      
      state.data.push(newTodo);

      const todoList = window.localStorage.getItem('todos');

      if (todoList) {
        //if exist, add to localstorage too
        const todoListArr = JSON.parse(todoList);
        todoListArr.push(newTodo);
        window.localStorage.setItem('todos', JSON.stringify(todoListArr));
      } else {
        //or create
        window.localStorage.setItem('todos',JSON.stringify([newTodo]));
      }
    },
    toggleTodo: (state, {payload}) => {
      const updatedTodos = state.data.map((todo) => {
        if (todo.title === payload.title) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      });
      
      window.localStorage.setItem('todos', JSON.stringify(updatedTodos));
      state.data = updatedTodos
    },
    clearCompleted: (state) => {
      const todoList = window.localStorage.getItem('todos');
      const filtered = state.data.filter(i => !i.completed)
      
      window.localStorage.setItem('todos', JSON.stringify(filtered));
      state.data = filtered;
      
    },

    clearAll: (state) => {
      window.localStorage.setItem('todos', JSON.stringify([]));
      state.data = [];
    },
  }
})


export const { clearAll, addTodo, toggleTodo, changeFilter, clearCompleted } = todoReducer.actions;
export default todoReducer.reducer;
