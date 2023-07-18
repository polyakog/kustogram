import { FC, ReactNode } from "react";
import Link, { LinkProps } from "next/link";

export enum ThemeAppLink {
  PRIMARY = "primary"
}

interface AppLinkProps extends LinkProps {
  // className?: string
  theme?: ThemeAppLink;
  children: ReactNode;
}

export const AppLink: FC<AppLinkProps> = (props) => {
  const { href, children, ...otherProps } = props;

  return (
    <Link
      href={href}
      // className={classNames(cls.AppLink, {}, [className, theme])}
      {...otherProps}
    >
      {children}
    </Link>
  );
};
