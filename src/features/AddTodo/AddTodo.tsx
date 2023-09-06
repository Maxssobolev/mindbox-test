import { FC, useState, KeyboardEvent } from 'react';
import classes from './AddTodo.module.scss';
import { useAppDispatch } from 'redux/store/configStore';
import { addTodo } from 'redux/reducers/todos';

interface AddTodoProps {
    className?: string;
}

export const AddTodo: FC<AddTodoProps> = ({className}) => {
  const [title, setTitle] = useState<string>('')
  const dispatch = useAppDispatch()
  const add = () => {
    dispatch(addTodo({title}))
    setTitle('')
  }
  const addOnEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if(event.key == 'Enter' && title?.length) add();
  }
  return (
    <div className={classes.AddTodo}>
      <input required type="text" data-testid='addtodoinput' placeholder='What needs to be done?' onChange={({target: {value}}) => {setTitle(value)}} value={title} className={classes.input} onKeyDown={addOnEnter}/>
      <span></span>
    </div>
  );
}