import CARButton from '@/components/ui/CARButton';
import { CalendarPlus } from 'lucide-react';
import { Link } from 'react-router-dom';


const CallToActions = () => {
    return (
        <div className='md:flex gap-4 justify-around container items-center rounded-b-2xl shadow-md hover:shadow-2xl p-10 border bg-blue-950/5 py-20 2xl:p-20 mx-auto'>
           <div className='max-w-2xl space-y-4 mx-auto 2xl:max-w-4xl'>
           <h2 className='xl:text-5xl text-3xl text-primary font-bold'>
            Best Full-Service Hand Car Wash 
            </h2>
            <p>We strive to give you the best customer experience and the best care for your vehicle. From our excellent
            full-service car wash treatments, to our best-in-class express detailing services.</p>
           </div>
           <div className=''>
         <Link to='/services'>  <CARButton text='Book an Appointment' icon={<CalendarPlus/>} className='xl:text-2xl mt-4 p-2 xl:p-4 2xl:px-16'/></Link>
           </div>
        </div>
    );
};

export default CallToActions;