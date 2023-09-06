import React from 'react';
import { render, fireEvent, act, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from 'redux/store/configStore';
import { TodoList } from 'components/TodoList/TodoList';
import { AddTodo } from 'features/AddTodo/AddTodo';
import { ShowControls } from './ShowControls';
import { addTodo } from 'redux/reducers/todos';

describe("Нижняя панель управления", () => {
  test('Фильтрация списка todo', async () => {
    const { getByText, getByTestId, queryByText } = render(
      <Provider store={store}>
        <AddTodo />
        <TodoList />
        <ShowControls />
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

    // Проверяем, что все задачи отображаются
    expect(getByText('Задача 1')).toBeInTheDocument();
    expect(getByText('Задача 2')).toBeInTheDocument();
    expect(getByText('Задача 3')).toBeInTheDocument();

  
    // Меняем фильтр на "completed"
    const filterCompleted = getByTestId('filter-completed');
    act(() => {
      fireEvent.click(filterCompleted);
    })

    // Проверяем, что отображаются только завершенные задачи
    expect(queryByText('Задача 1')).toBeNull();
    expect(queryByText('Задача 2')).toBeNull();
    expect(getByText('Задача 3')).toBeInTheDocument();

  
    // Меняем фильтр на "active"
    const filterActive = getByTestId('filter-active');
    act(() => {
      fireEvent.click(filterActive);
    })

    // Проверяем, что отображаются только активные задачи
    expect(getByText('Задача 1')).toBeInTheDocument();
    expect(getByText('Задача 2')).toBeInTheDocument();
    expect(queryByText('Задача 3')).toBeNull();

    // Меняем фильтр на "all"
    const filterAll = getByTestId('filter-all');
    act(() => {
      fireEvent.click(filterAll);
    })

    // Проверяем, что отображаются все задачи снова
    expect(getByText('Задача 1')).toBeInTheDocument();
    expect(getByText('Задача 2')).toBeInTheDocument();
    expect(getByText('Задача 3')).toBeInTheDocument();
  });

  test("Удаление завершенных задач", () => {
    const { getByText, getByTestId, queryByText } = render(
      <Provider store={store}>  
        <TodoList />
        <ShowControls />
      </Provider>
    );

    const filterDelete = getByTestId('clear-completed');
    act(() => {
      fireEvent.click(filterDelete);
    })

    expect(getByText('Задача 1')).toBeInTheDocument();
    expect(getByText('Задача 2')).toBeInTheDocument();
    expect(queryByText('Задача 3')).toBeNull();
  })

})

