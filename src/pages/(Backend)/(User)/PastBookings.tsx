import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import {  Image } from 'antd';
import { Link } from 'react-router-dom';
import { useGetMyBookingsQuery } from '@/redux/features/bookings/BookingApi';
import Empty from '@/components/shared/Empty';


const PastBookings = () => {
 

  const {data:usersBookings}= useGetMyBookingsQuery(undefined)


  


  return (
    <div>
      <div className="flex justify-between">
        <h3 className="text-2xl font-bold">Past Bookings </h3>
       
      </div>
{/* //service table */}
      {
        usersBookings ? 
        <div>
        
  
          <Table>
            <TableCaption>List of your recent booked service.</TableCaption>
            <TableHeader>
              {
                <TableRow>
                  <TableHead className="w-[100px]">#</TableHead>
                  <TableHead>Booking Date</TableHead>
                  <TableHead>Service Details</TableHead>
                  <TableHead className="">Slot Time</TableHead>
                  <TableHead className="text-right">Slot Status</TableHead>
                  <TableHead className="text-right">Payment Status</TableHead>
                 
                </TableRow>
              }
            </TableHeader>
            <TableBody>
              {usersBookings?.data?.map((slots: any, i: number) => (
                <TableRow key={slots._id}>
                  <TableCell className="font-medium">{i + 1}</TableCell>
                  <TableCell className="font-medium">
                     <p> {new Date(slots.createdAt).toISOString().split("T")[0]}</p>
                     <p>
                      {new Date(slots.createdAt).toTimeString().split(" ")[0]}
  
                     </p>
  
  
                  </TableCell>
                  <TableCell className="flex gap-2">
                    <Image
                      className="max-w-28 rounded-xl"
                      src={slots?.service?.images}
                      alt=""
                    />
                    <div>
                      <Link to={`/services/${slots?.service?._id}`}>
                        <p className="text-md">{slots?.service?.name}</p>
                      </Link>
                      <p className="text-sm">{slots?.service?.serviceLevel}</p>
                      <p className="text-sm">Price: {slots?.service?.price}</p>
                      <p className="text-sm">
                        Duration: {slots?.service?.duration}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm">Date:{slots?.slot?.date}</p>
                    <p className="text-sm">Slot Time: {slots?.slot?.startTime} - {slots?.slot?.endTime}</p>
                   
                  </TableCell>
                  <TableCell className="text-right">
                    {slots?.slot?.isBooked}
                  </TableCell>
                  <TableCell className="text-right">
                 {slots.paymentStatus}
                  </TableCell>
                 
                </TableRow>
              ))}
            </TableBody>
          </Table>
         
        </div> : <Empty text='Past Booking slot Empty'/>
      }
    </div>
  );
};

export default PastBookings;
