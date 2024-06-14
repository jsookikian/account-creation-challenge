import React, { ReactNode } from 'react';
import { WealthfrontIcon } from '../icons/wealthfront-icon';

interface Props {
  children: ReactNode;
  title: string;
  description?: string;
  styles?: string
  showIcon?: boolean;
}

export function Card({ children, title, description, styles = "", showIcon = false }: Props) {
  return (
    <section className="min-h-[498px] w-full flex flex-col p-8 shadow-card min-h-[400px]  rounded-2xl border border-solid border-slate-200">
      {showIcon && (
        <div className="flex justify-center">
          <WealthfrontIcon size={50} />
        </div>
      )}

      <h1 className={`text-2xl font-medium mt-4 mb-4 ${styles}`}>{title}</h1>
      <p className="text-[hsla(243,30%,13%,.63)] text-base m-0 mb-1">{description}</p>
      {children}
    </section >
  );
}
