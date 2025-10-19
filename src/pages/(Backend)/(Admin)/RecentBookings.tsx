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

type TUserFilterValue = {
  searchTerm: String;
};

const RecentBookings = () => {
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

  // FIX: Filter out bookings with null service data
  const validBookings = (bookingDatas?.data || []).filter(
    (booked: any) => booked?.service && booked?.customer
  );

  return (
    <div>
      <div className="flex justify-between">
        <h3 className="text-2xl font-bold">Recent Bookings</h3>
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
                <TableHead>Customer info</TableHead>
                <TableHead>Service Details</TableHead>
                <TableHead className="">Slots Details</TableHead>
                <TableHead className="w-[150px]">Payment Details</TableHead>
              </TableRow>
            }
          </TableHeader>
          <TableBody>
            {validBookings.map((booked: any, i: number) => (
              <TableRow key={booked._id}>
                <TableCell className="font-medium">{i + 1}</TableCell>
                <TableCell className="">
                  <p className="text-sm">{booked.customer.name}</p>
                  <p className="text-sm">{booked.customer.email}</p>
                  <p className="text-sm">0{booked.customer.phone}</p>
                </TableCell>
                <TableCell>
                  <div>
                    {/* FIX: Check if service exists before accessing _id */}
                    {booked.service && booked.service._id ? (
                      <Link to={`/services/${booked.service._id}`}>
                        <p className="">{booked.service.name}</p>
                      </Link>
                    ) : (
                      <p className="">{booked.service?.name || "Service Unavailable"}</p>
                    )}
                    {booked.service?.images && (
                      <Image
                        className="max-w-20 rounded-xl"
                        src={booked.service.images}
                        alt=""
                      />
                    )}
                  </div>
                </TableCell>
                <TableCell className="">
                  <p>{booked.slot.date}</p>
                  <p>
                    {booked.slot.startTime} - {booked.slot.endTime}
                  </p>
                </TableCell>
                <TableCell className="">
                  <p className="p-2 bg-button-gradient w-fit text-right rounded-lg text-white">
                    {booked.paymentStatus}
                  </p>
                  <p>{booked.transactionId}</p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default RecentBookings;