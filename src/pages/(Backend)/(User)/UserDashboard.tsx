import { useGetMyBookingsQuery } from '@/redux/features/bookings/BookingApi';
import Countdown from './components/CountdownTimer';
import { Link } from 'react-router-dom';
import Empty from '@/components/shared/Empty';
import Loading from '@/components/shared/Loading';

const UserDashboard = () => {
  const { data: usersBookings, isLoading } = useGetMyBookingsQuery(undefined);

  if (isLoading) {
    return <><Loading/></>;
  }

  const parseDateTime = (date: string, time: string) => new Date(`${date}T${time}`);

  // FIX: Add null checks and filter out invalid bookings
  const validBookings = (usersBookings?.data || []).filter(
    (booked: any) => booked?.service && booked?.slot
  );

  const sortedBookings = [...validBookings].sort((a, b) => {
    const dateTimeA = parseDateTime(a.slot.date, a.slot.startTime);
    const dateTimeB = parseDateTime(b.slot.date, b.slot.startTime);
    return dateTimeA.getTime() - dateTimeB.getTime();
  });

  return (
    <div>
      <h4 className="text-3xl font-bold">Up Coming Bookings Slots</h4>

      {sortedBookings.length > 0 ? (
        <div className="grid grid-cols-3 my-10 gap-6">
          {sortedBookings.map((booked, i) => (
            <div
              className="space-y-3 justify-between bg-primary/5 hover:scale-105 hover:duration-1000 rounded-md hover:shadow-xl border p-6 shadow-md items-center"
              key={i}
            >
              <div>
                {/* FIX: Check if service exists before accessing _id */}
                {booked.service && booked.service._id ? (
                  <Link to={`/services/${booked.service._id}`}>
                    <p>{booked.service.name}</p>
                  </Link>
                ) : (
                  <p>Service information unavailable</p>
                )}
              </div>
              <div className="flex items-center justify-between gap-1.5">
                <div className="bg-primary/5 px-3 rounded-lg p-1">
                  <p>Slot Date</p>
                  <p className="text-red-600">{booked.slot.date}</p>
                </div>
                <div className="flex gap-4 text-center">
                  <div className="bg-primary/5 px-3 rounded-lg p-1">
                    <p>Start Time</p>
                    <p className="text-red-600">{booked.slot.startTime}</p>
                  </div>
                  <div className="bg-primary/5 px-3 rounded-lg p-1">
                    <p>End Time</p>
                    <p className="text-red-600">{booked.slot.endTime}</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <Countdown countdownTargetDate={new Date(`${booked.slot.date}T${booked.slot.startTime}`)} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Empty text={"Your Booking slot is empty"}/>
      )}
    </div>
  );
};

export default UserDashboard;