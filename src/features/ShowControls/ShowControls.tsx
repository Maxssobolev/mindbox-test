import { FC } from 'react';
import classes from './ShowControls.module.scss';
import { useAppDispatch, useAppSelector } from 'redux/store/configStore';
import { classNames } from 'libs/classNames/classNames';
import { changeFilter, clearAll, clearCompleted } from 'redux/reducers/todos';
import { memoized } from 'libs/memo';

interface ShowControlsProps {
    className?: string;
}

export const ShowControls: FC<ShowControlsProps> = ({className}) => {
  const dispatch = useAppDispatch()
  const {todos, filter} = useAppSelector(memoized);
  const itemsLeft = todos.filter(i => !i.completed).length

  return (
    <div className={classes.footer}>
      <div>{itemsLeft} items left</div>
      <div className={classes.filterControllers}>
        <button onClick={() => dispatch(changeFilter('all'))} className={classNames(classes.btn, {[classes.activeBtn]: filter == 'all'})} data-testid="filter-all">All</button>
        <button onClick={() => dispatch(changeFilter('active'))} className={classNames(classes.btn, {[classes.activeBtn]: filter == 'active'})} data-testid="filter-active">Active</button>
        <button onClick={() => dispatch(changeFilter('completed'))} className={classNames(classes.btn, {[classes.activeBtn]: filter == 'completed'})} data-testid="filter-completed">Completed</button>
      </div>
      <div>
        <button onClick={() => dispatch(clearCompleted())} className={classes.btn} data-testid="clear-completed">Clear completed</button>
        {/* <button onClick={() => dispatch(clearAll())} className={classes.btn}>Clear All</button> */}
      </div>
    </div>
  );
}