import { Link, useMatch } from 'react-router-dom';
import { type ReactNode } from 'react';

interface NavigationLinkProps {
  children: ReactNode;
  to: string;
}
export function NavigationLink({children, to, ...rest}: NavigationLinkProps) {
  const match = useMatch(to);
  return (
    <>
      <Link
        to={to}
        {...rest}
        className={
          `${match ? "font-bold text-red-600" : "font-medium hover:text-red-400"} `
        }
      >
        {children}
      </Link>
    </>
  );
}
