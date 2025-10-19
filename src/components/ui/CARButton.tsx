import React, { ReactElement } from 'react';

interface CARButtonProps {
  text: string;
  className?:string;
  icon?:ReactElement;
}

const CARButton: React.FC<CARButtonProps> = ({ text,className,icon }) => {
  return (
    <button
      className={`${className} px-3   
        active:shadow-2xl flex items-center justify-center gap-2 hover:bg-primary/85 hover:animate-press hover:duration-1000 font-medium active:animate-press p-1 bg-button-gradient text-white rounded-md`}
    >
      {icon}{text}
    </button>
  );
};

export default CARButton;
