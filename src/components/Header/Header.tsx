import { FC } from 'react';
import classes from './Header.module.scss';

interface HeaderProps {
    className?: string;
}

export const Header: FC<HeaderProps> = ({className}) => {

  return (
    <div className={classes.Header}> </div>
  );
}