import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  type?: 'button' | 'submit';
  href?: string;
  children: ReactNode;
  disabled?: boolean
  styles?: string;
  onClick?: () => void
  dataTestId?: string
}

const defaultStyles = ' w-full flex justify-center self-center max-w-[256px] align-center rounded-lg inline-block py-4 px-6 bg-primary text-white disabled:bg-[hsla(244,49%,49%,0.7)] ';

export function Button({ href, children, type, disabled = false, styles = "", onClick, dataTestId }: Props) {
  if (href) {
    return (
      <Link data-testid={dataTestId} to={href} className={`${defaultStyles} ${styles}`}>
        {children}
      </Link>
    );
  }

  return (
    <button data-testid={dataTestId} type={type} onClick={onClick} disabled={disabled} className={`${defaultStyles} ${styles}`}>
      {children}
    </button>
  );
}
