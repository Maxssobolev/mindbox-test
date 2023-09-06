import { FC, useState } from 'react';
import classes from './TodoList.module.scss';
import { type Todo } from 'types/todo.interface';
import { TodoItem } from 'components/Todo/Todo';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch, useAppSelector } from 'redux/store/configStore';
import { AnimatePresence, motion } from 'framer-motion';
import { variants } from './animate.settings';
import { changeFilter, clearCompleted } from 'redux/reducers/todos';
import { classNames } from 'libs/classNames/classNames';
import { createSelector } from '@reduxjs/toolkit';
import { memoized } from 'libs/memo';

interface TodoListProps {
    className?: string;
}



export const TodoList: FC<TodoListProps> = ({className}) => {
  const {todos, filter} = useAppSelector(memoized);
  
  const todosToShow = todos.filter((item) => {
    switch(filter){
    case 'all':
      return true;
    case 'active':
      return !item.completed;
    case 'completed':
      return item.completed
    }
  });


  return (
    <div className={classes.wrapper}>
      <motion.div className={classes.TodoList} 
        variants={variants}
        initial="hidden"
        animate="visible"
      >
        
        {todosToShow.length ? todosToShow.map((item, idx) => <TodoItem {...item} key={idx} />) : <motion.div className={classes.noData}>No data to show</motion.div>}
        
      </motion.div>
      
    </div>
  );
}