import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Image } from 'antd';
import Search from '@/components/ui/Search';

import { useGetBookingsQuery } from '@/redux/features/bookings/BookingApi';
import { Link } from 'react-router-dom';
import Loading from '@/components/shared/Loading';



type TUserFilterValue={
    searchTerm:String;
}
const UserBookings = () => {
  const initialFilterValues: TUserFilterValue = {
    searchTerm: '',
    
  };
  const [filters, setFilters] = useState<TUserFilterValue>(initialFilterValues);
  const { data: bookingDatas, isLoading } = useGetBookingsQuery(filters);

  if (isLoading) {
    return <><Loading/></>;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSearterm = (data: any) => {
    const value = data.value;
    setFilters((prevValues) => ({
      ...prevValues,
      searchTerm: value,
    }));
  };
  return (
    <div>
      <div className="flex justify-between">
        <h3 className="text-2xl font-bold">User Bookings</h3>
        <div className="border w-60 my-5 rounded-lg">
          <form onChange={(e) => handleSearterm(e.target)} action="">
            <Search />
          </form>
        </div>
      </div>

      {/* //User table */}
      <div>
     

        <Table>
          <TableCaption>List of your recent booked service.</TableCaption>
          <TableHeader>
            {
              <TableRow>
                <TableHead className="w-[100px]">#</TableHead>
                <TableHead >Created at</TableHead>
                <TableHead>User Name</TableHead>
                <TableHead>Contact Info</TableHead>
                <TableHead className="text-right">Service Title</TableHead>
              </TableRow>
            }
          </TableHeader>
          <TableBody>
            {bookingDatas?.data?.map((usData:any, i:number) => (
              <TableRow key={usData._id}>
                <TableCell className="font-medium">{i + 1}</TableCell>
                <TableCell className="font-medium">
                  <p>{usData.createdAt.slice(0,10)}</p>
                  Time: {usData.createdAt.slice(11,16)}

                </TableCell>
                <TableCell className="flex gap-2">
                  <Image
                    className="max-w-32 rounded-xl"
                    src={usData.images}
                    alt=""
                  />
                  <div>
                    <p className="text-xl">{usData.customer.name}</p>
                
                  </div>
                </TableCell>
                <TableCell>
                  <p className="text-sm">{usData.customer.email}</p>
                  <p className="text-sm">0{usData.customer.phone}</p>
                </TableCell>
                <TableCell className="text-right">
                  <Link to={`/services/${usData.service._id}`}>{usData.service.name}</Link>
                </TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
    
      </div>
    </div>
  );
};

export default UserBookings;
