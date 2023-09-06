import { FC } from 'react';
import classes from './Checkbox.module.scss';
import { Todo } from 'types/todo.interface';

interface CheckboxProps extends Todo{
    onChange: () => void;
    className?: string;
}

export const Checkbox: FC<CheckboxProps> = ({className, title, completed, onChange}) => {

  return (
    <div className={classes.checkbox}>
        
      <input className={classes.checkboxPull} type="checkbox" id={title} checked={completed} onChange={onChange} data-testid={`checkbox-${title}`}/>
      <label htmlFor={title} data-testid={`label-${title}`}><span></span><i>{title}</i></label>
  
    </div>
  );
}