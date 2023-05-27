import React from 'react'
import s from './tag.module.scss';
import classNames from 'classnames';

const Tag = ({ children, classname }) => {
  return <span className={classNames(s.tag)}>{children}</span>;
}

export default Tag