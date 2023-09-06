import 'assets/styles/index.scss'
import { Header } from 'components/Header/Header';
import { TodoList } from 'components/TodoList/TodoList';
import { AddTodo } from 'features/AddTodo/AddTodo';
import { ShowControls } from 'features/ShowControls/ShowControls';
import { Provider } from 'react-redux';
import { store } from 'redux/store/configStore';

function App() {
  return (
    <div className="app">
      <Header />
      <div className="app-content">
        <Provider store={store}>
          <AddTodo />
          <TodoList />
          <ShowControls />
        </Provider>
      </div>
    </div>
  );
}

export default App;
