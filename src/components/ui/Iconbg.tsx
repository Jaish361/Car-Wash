import React, { ReactElement } from 'react';
interface IIconbg{
    className?:string;
    icon?: ReactElement;
}

const Iconbg: React.FC<IIconbg> = ({className,icon}) => {
    const img = 'https://i.postimg.cc/Dyp0Gsz6/magicpattern-blob-1724645622156.png'
    return (
        <div className={`${className} relative text-center bg-cover  text-white `} 
        // style={{ backgroundImage: `url(${img})`,width:"40px" }}
        >
            <img className='w-16  overflow-hidden' src={img} />
            <h2 className='absolute top-6  left-4 text-2xl items-center'>
               {icon}
            </h2>
        </div>
    );
};

export default Iconbg;