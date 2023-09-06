import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from 'redux/store/configStore';
import { AddTodo } from 'features/AddTodo/AddTodo';
import { TodoList } from './TodoList';

test('Новое todo отображается в TodoList', async () => {
  const { getByTestId, getByText } = render(
    <Provider store={store}>
      <AddTodo />
      <TodoList />
    </Provider>
  );
  
  const input = getByTestId('addtodoinput');
  
  act(() => {
    fireEvent.change(input, { target: { value: 'Новое задание' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 13 });
  });  

  // Проверяем, что новое todo отображается в TodoList
  const todoTextElement = getByText('Новое задание');
  expect(todoTextElement).toBeInTheDocument(); 
});
  
  
  
  
  
  
  