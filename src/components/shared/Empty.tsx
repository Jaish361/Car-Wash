import { CalendarClock } from 'lucide-react';
import React from 'react';
export interface IEmptyProps{
    text:string;
}
const Empty: React.FC<IEmptyProps>  = ({text}) => {
    return (
        <div className="flex flex-col mt-20 items-center justify-center min-h-[300px] bg-gray-100 rounded-lg p-6">
      <CalendarClock className="text-6xl text-gray-400 mb-4" />
      <h2 className="text-2xl font-semibold text-gray-700">{text}</h2>
      <p className="text-gray-500 mt-2">It looks like you haven't booked anything. Please make a booking to see it here.</p>
    </div>
    );
};

export default Empty;

