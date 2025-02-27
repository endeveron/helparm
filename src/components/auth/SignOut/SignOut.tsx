'use client';

import { signOut } from 'next-auth/react';

import LogoutIcon from '/public/icons/ui/logout.svg';

import './SignOut.scss';

interface ISignOutProps {
  title: string;
  className?: string;
}

const SignOut = ({ title, className }: ISignOutProps) => {
  return (
    <div
      className={`sign-out ${className}`}
      onClick={() => signOut({ callbackUrl: '/' })}
    >
      <div className="sign-out__title">{title}</div>
      <div className="sign-out__icon">
        <LogoutIcon />
      </div>
    </div>
  );
};

export { SignOut };
