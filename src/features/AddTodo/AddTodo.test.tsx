import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { AddTodo } from './AddTodo';
import { store } from 'redux/store/configStore';

test('Добавление нового todo', () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <AddTodo />
    </Provider>
  );
  
  const input = getByTestId('addtodoinput'); 

  fireEvent.change(input, { target: { value: 'New task' } });
  fireEvent.keyDown(input, { key: 'Enter', code: 13 });
  
  const state = store.getState();
  expect(state.todos.data).toHaveLength(1); // Проверка на длину массива todos
  expect(state.todos.data[0].title).toBe('New task'); // Проверка текста нового todo
});
  
  
  
  
  
  
  