import {  useCurrentToken } from '@/redux/features/auths/authSlice';
import {  useAppSelector } from '@/redux/hook';
import CARButton from '../ui/CARButton';
import { Link, NavLink } from 'react-router-dom';
import {  Input } from 'antd';
import { Clock8, PhoneCall } from 'lucide-react';
import Iconbg from '../ui/Iconbg';
import HoverProfileMenu from './HoverProfileMenu';
import { verifyToken } from '@/utils/verifyToken';
import ScrollTop from './ScrollToTop';



const Navbar = () => {
  

  const token = useAppSelector(useCurrentToken);
  let user;
  if(token){
      user= verifyToken(token);
  }
  


  

  
 


  const handleSubmitSearch=(data:string)=>{
    console.log(data);
    
  }

  const navMenu = [
    {
      menuLabel:"Home",
      menuPath:'/'
    },
    
    {
      menuLabel:"Services",
      menuPath:'/services'
    },
    {
      menuLabel:"Reviews",
      menuPath:'/reviews'
    },
     {
      menuLabel:"Compare",
      menuPath:'/compare'
    },
     {
    menuLabel:"Dashboard",
    menuPath:`/${user?.role}/dashboard`
  },
  ]

  return (
    <div className=" hidden lg:block ">
      <div className="flex 2xl:container px-6 mx-auto items-center py-4 justify-between">
       <div>
       <h1 className="text-3xl text-primary  font-bold ">Car Wash</h1>
       <small>professional car wash</small>
       </div>
       
     {/* //call us  */}
     <div className='flex  items-center'>
        <Iconbg icon={<PhoneCall />} className='rounded-full shadow-2xl' />
        <div>
        <p>Call Us</p>
        <p>+919336545990</p>
        </div>
     </div>

{/* //time us  */}
     <div className='flex  items-center'>
     <Iconbg icon={<Clock8 />} className='rounded-full shadow-2xl' />
        <div>
        <p>Mon-Sat: 7:00am - 6:00pm</p>
        <p>Sun: 7:00am - 6:00pm</p>
        </div>
     </div>


     
    
<Link to='/services'><CARButton text='Book an Appointment' className='text-xl p-2 px-10'/></Link>
      </div>
      <div className='bg-button-gradient py-3 px-6 text-white'>
       <div className='container flex justify-between items-center mx-auto'>
        <ul className='flex gap-20'>

          {
            navMenu.map((item,i)=>(
             <NavLink className={({isActive})=> 
            isActive ? 'bg-slate-200 text-primary   animate-press duration-1000  px-3 font-medium rounded-xl p-0.5' : "px-3 text-gray-100 font-medium rounded-xl p-0.5"
            } key={i} to={item.menuPath}> 
             {item.menuLabel}
             </NavLink>

            ))
          }
           
        </ul>
        
        <div className="flex gap-4 items-center">
           <form>
           <div className="flex  items-center justify-end  rounded-tl-md rounded-bl-md    text-black">
               <Input type='text' name='searchTerm' onChange={(e)=>handleSubmitSearch(e.target.value)} />
                <svg
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                  className="pointer-events-none absolute w-4  mr-1 fill-gray-900 transition"
                >
                  <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z"></path>
                </svg>
              </div>
           
           </form>
          {user ?  <HoverProfileMenu user={user}/> : <Link to={'/login'}><CARButton text="Sign In" /></Link>}
          
        </div>
       </div>
      </div>
    <ScrollTop/>
    </div>
  );
};

export default Navbar;
