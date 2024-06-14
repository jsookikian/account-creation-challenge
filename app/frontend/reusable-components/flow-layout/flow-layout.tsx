import { useLogout } from 'app/frontend/hooks/useLogout';
import React, { ReactNode } from 'react';
import { Button } from '../button/button';

interface Props {
  children: ReactNode;
}

export function FlowLayout({ children }: Props) {
  const logout = useLogout();
  return (
    <div className="flex flex-col h-full mt-5 max-w-[1000px]
    mx-6
    lg:mx-48
    md:mx-24
    items-center
    ">
      < div className="flex w-full text-right p-4 justify-end" >
        <Button onClick={logout} styles="max-w-[80px]">
          Logout
        </Button>
      </div >
      {children}
    </div >
  );
}
