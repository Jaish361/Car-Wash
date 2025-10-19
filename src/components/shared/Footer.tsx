
import Blue_waves from '../svg/Blue_waves';
import Iconbg from '../ui/Iconbg';
import { Facebook, Instagram, Mail,  Twitter, Youtube } from 'lucide-react';
import { Input } from 'antd';

const Footer = () => {
  return (
    <div>
      <div className="relative ">
        <Blue_waves />
        <div className="bg-button-gradient px-6  relative overflow-hidden  max-h-[350px]">
          <img
            className="hover:translate-x-5  overflow-hidden object-cover translate-x-2 
            duration-1000 hover:ease-in-out hover:duration-1000"
            src="/svg/bg.svg"
            alt=""
          />

          <div className="absolute  mx-auto md:w-[90vw] top-0 md:top-14 left-[5%] xl:px-8 md:flex justify-between  
          w-full 2xl:container 2xl:mx-auto text-white">
            {/* contact us  */}
            <div className="space-y-4 hidden md:block">
              <h3 className="text-3xl  font-bold">Contact Us</h3>
              <div className="space-y-1">
                <p>
                  <span className="font-bold">Phone:</span> +919336545990
                </p>
                <p>
                  <span className="font-bold">Email:</span> jaish3281@carwash.com
                </p>
                <p> Chennai,India</p>
              </div>
              <div className="flex">
                <Iconbg icon={<Facebook />} />
                <Iconbg icon={<Instagram />} />
                <Iconbg icon={<Youtube />} />
                <Iconbg icon={<Twitter />} />
              </div>
            </div>
            {/* Company info  */}
            <div className=" items-center mt-20 md:mt-0  flex flex-col ">
              <h3 className="text-5xl  font-bold">Car Wash</h3>
              <p>professional car wash</p>
             
            
           <div className='mt-16 space-y-2'>
            <p>Sign Up For Offers And Promotions!</p>
           <div className='flex gap-1 items-center'>
            <Input type='email' placeholder='Your email address'/>
            <div className='bg-primary p-1 rounded-md'>

            <Mail className=' text-4xl '/>
            </div>
           </div>
            </div>
            </div>
            {/* shedule us  */}
            <div className="space-y-4 hidden md:block text-right">
              <h3 className="text-3xl  font-bold">Hours of Operation</h3>
              <div className="space-y-1 ">
                <p
                className="font-bold ">Open 7 Days a Week!
                </p>
                <p
                className="font-normal"> 8:00AM - 7:00 PM
                </p>
                <p
                className="font-bold">Closed on:
                </p>
                <p
                className="font-normal"> Indian Festival
                </p>
              
              
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
