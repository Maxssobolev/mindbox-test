import { FC } from 'react';
import classes from './Todo.module.scss';
import { Checkbox } from './components/Checkbox/Checkbox';
import { Todo } from 'types/todo.interface';
import { useAppDispatch } from 'redux/store/configStore';
import {toggleTodo} from 'redux/reducers/todos'
import { motion } from 'framer-motion';
import { variants } from './animate.settings';

interface TodoProps extends Todo{
    className?: string;
}

export const TodoItem: FC<TodoProps> = ({className, completed, title}) => {
  const dispatch = useAppDispatch()
  const toggle = () => {dispatch(toggleTodo({title}))}
  return (
    <motion.div className={classes.Todo} variants={variants}>
      <Checkbox completed={completed} title={title} onChange={toggle}  />
    </motion.div>
  );
}