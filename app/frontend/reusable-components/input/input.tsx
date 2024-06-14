import React, { ChangeEvent, useState } from 'react';

interface Props {
  label: string;
  onChange?: (value: string) => void;
  styles?: string;
  required?: boolean
}

export function Input({ onChange, label, required = false, styles = "", ...restProps }: Props) {
  const [value, setValue] = useState('');
  const id = label.replace(/ /gm, '_');
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
    onChange?.(event.target.value);
  }
  return (
    <div className="p-2 relative group" >
      <label className="block text-sm text-slate-500">{label}</label>
      <div className="relative">
        <input
          id={id}
          className={`block w-full outline-none peer ${styles}`}
          required={required}
          onChange={handleChange}
          value={value}
          {...restProps}
        />
        <span className="
            absolute w-full h-0.5 bg-slate-300 transition-all duration-300
            peer-focus:bg-gradient-to-r 
          peer-focus:from-[hsla(244,49%,49%,1)]
          peer-focus:via-slate-300 
          peer-focus:to-[hsla(244,49%,49%,1)]
            peer-focus:bg-[length:200%_200%] 
            peer-focus:animate-glow
          "
        />
      </div>
    </div>

  );
}
