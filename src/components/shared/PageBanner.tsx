import React from 'react';
import { useLocation } from 'react-router-dom';

interface IPageBannerProps{
    pathName?:string;
    pageName?:string;
    tagLine?:string;
}


const PageBanner: React.FC<IPageBannerProps> = ({pageName,tagLine}) => {
    const location = useLocation();
   
    
    const pathname = location.pathname;
    return (
        <div className='h-32 bg-primary/5 flex flex-col justify-center'>
        <div className='container text-center mx-auto  '>
            <header>
                <div>
                    
                <h2 className='text-5xl font-bold'>{pageName}</h2>
                <p>{tagLine}</p>
                </div >
                <p className='flex justify-center items-center'><span>Home</span>  <span>{pathname}</span></p>
            </header>
            
        </div>
        </div>
    );
};

export default PageBanner;