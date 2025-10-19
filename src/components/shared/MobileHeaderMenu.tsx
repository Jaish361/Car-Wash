import { logout, useCurrentToken } from "@/redux/features/auths/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { verifyToken } from "@/utils/verifyToken";
import { AlignJustify, AlignRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";


const MobileHeaderMenu = () => {
    const dispatch = useAppDispatch()
    const token = useAppSelector(useCurrentToken);
    let user;
    if(token){
        user= verifyToken(token);
    }
    
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };

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
       <nav className="bg-button-gradient text-white xl:hidden shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold">Car Wash </h1>
          </div>
        
          <div className="">
            <button onClick={toggleMenu} className="text-gray-200 focus:outline-none">
              {isOpen ?<AlignJustify /> : <AlignRight />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className={`-translate-y-60 ${isOpen && "translate-y-0 duration-1000"}    `}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navMenu.map((item, index) => (
              <Link
                key={index}
                to={item.menuPath}
                className="block text-white hover:text-blue-500 px-3 py-2 rounded-md text-base font-medium"
              >
                {item.menuLabel}
              </Link>
            ))}
            {user ? <button onClick={()=>dispatch(logout())} className="p-3 ">Logout</button> : <Link to='/login'><button className="p-3 ">Login</button></Link>}
          </div>
        </div>
      )}
    </nav>
    );
};

export default MobileHeaderMenu;