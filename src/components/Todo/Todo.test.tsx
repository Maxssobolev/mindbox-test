import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { AddTodo } from 'features/AddTodo/AddTodo';
import { TodoList } from 'components/TodoList/TodoList';
import { store } from 'redux/store/configStore';
import { addTodo } from 'redux/reducers/todos';


test('Изменение свойства completed при клике на чекбокс для каждой задачи', async () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <AddTodo />
      <TodoList />
    </Provider>
  );

  // Добавляем несколько задач
  const input = getByTestId('addtodoinput');
  act(() => {
    fireEvent.change(input, { target: { value: 'Задача 1' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 13 });
    fireEvent.change(input, { target: { value: 'Задача 2' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 13 });
    store.dispatch(addTodo({title: 'Задача 3', completed: true})); //добавляю вручную, так как при вводе через инпут невозможно сделать задачу сразу отмеченной
  })

  // Получаем начальное состояние всех задач
  const initialState = store.getState();
  const todos = initialState.todos.data;

  // Проверяем, что начальное состояние чекбоксов соответствует состоянию задач
  todos.forEach((todo) => {
    const checkbox = getByTestId(`checkbox-${todo.title}`);
    expect(checkbox).toHaveProperty('checked', todo.completed);
    
  });

  // Меняем состояние для каждой задачи и проверяем изменения
  todos.forEach((todo) => {
    const label = getByTestId(`label-${todo.title}`);

    // Имитируем клик на чекбоксе
    act(() => {
      fireEvent.click(label);
    })

    // Проверяем, что свойство completed задачи изменилось
    const updatedState = store.getState();
    const updatedTodo = updatedState.todos.data.find((item) => item.title === todo.title);
    expect(updatedTodo?.completed).toBe(!todo.completed);
  });
});
