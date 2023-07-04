import {FC, ReactNode} from 'react';
import Link, {LinkProps} from 'next/link';
import classNames from '../../../assets/lib/classNames/classNames';
import cls from './AppLink.module.css'

export enum ThemeAppLink {
  PRIMARY = 'primary',
}

interface AppLinkProps extends LinkProps {
  className?: string
  theme?: ThemeAppLink
  children: ReactNode
}

export const AppLink: FC<AppLinkProps> = (props) => {
  const {
    href,
    className,
    children,
    theme = ThemeAppLink.PRIMARY,
    ...otherProps
  } = props;

  return (
    <Link
      href={href}
      className={classNames(cls.AppLink, {}, [className, theme])}
      {...otherProps}
    >
      {children}
    </Link>
  );
};
