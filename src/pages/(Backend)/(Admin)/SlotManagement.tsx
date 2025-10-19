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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { EllipsisVertical, Plus } from 'lucide-react';
import { Button, Image } from 'antd';
import { TFilterValues } from '@/pages/(Frontend)/(services)/Services';

import Search from '@/components/ui/Search';
import EditModal from '../Components/EditModal';
import { Link } from 'react-router-dom';
import {
  useGetAllServiceSlotsQuery,
  useUpdateSlotsMutation,
} from '@/redux/features/services/slotsApi';
import { toast } from 'sonner';
import CreateSlots from '../Components/CreateSlots';
import Loading from '@/components/shared/Loading';

const SlotManagement = () => {
  const initialFilterValues: TFilterValues = {
    searchTerm: '',
    sortByPrice: '',
    servicelevel: [],
  };
  const [filters, setFilters] = useState<TFilterValues>(initialFilterValues);

  const { data: serviceSlots, isLoading } =
    useGetAllServiceSlotsQuery(filters);
  const [updateSlots] = useUpdateSlotsMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setAddModal] = useState(false);
  const [editServiceData, setServiceData] = useState(null);
  const [slotStatus, setSlotStatus] = useState(true);

  const openModal = (data: any) => {
    setServiceData(data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setAddModal(false);
  };

  if (isLoading) {
    return <><Loading/></>;
  }

  const handleSlotStatus = async (data: { id: string; status: string }) => {
    const toastId = toast.loading('updating slots');

    let isBooked;
    if (data.status === 'available') {
      isBooked = 'canceled';
    } else {
      isBooked = 'available';
    }

    const payload = {
      id: data.id,
      isBooked,
    };
    const res = await updateSlots(payload);
    if (res.data.success) {
      toast.success(`${res.data.message}`, { id: toastId, duration: 2000 });
    }

    setSlotStatus(!slotStatus);
  };

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
        <h3 className="text-2xl font-bold">Slots Management</h3>
        <Button
          className="bg-button-gradient hover:bg-primary text-white "
          onClick={() => setAddModal(true)}
        >
          <Plus />
          Create New Service Slots
        </Button>
      </div>

      {/* //service table */}
      <div>
        <div className="border w-60 my-5 rounded-lg">
          <form onChange={(e) => handleSearterm(e.target)} action="">
            <Search />
          </form>
        </div>

        <Table>
          <TableCaption>List of your recent booked service.</TableCaption>
          <TableHeader>
            {
              <TableRow>
                <TableHead className="w-[100px]">#</TableHead>
                <TableHead>Service Details</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Slot Time</TableHead>
                <TableHead className="text-right">Slot Status</TableHead>
                <TableHead className="w-[100px]">Action</TableHead>
              </TableRow>
            }
          </TableHeader>
          <TableBody>
            {serviceSlots?.data?.map((slots: any, i: number) => (
              <TableRow key={slots._id}>
                <TableCell className="font-medium">{i + 1}</TableCell>
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
                  <p className="text-sm">{slots.date}</p>
                </TableCell>
                <TableCell className="text-right">
                  {slots.startTime} - {slots.endTime}
                </TableCell>
                <TableCell className="text-right">
                  {slots.isBooked === 'booked' ? (
                    <button
                      disabled
                      className="border bg-primary/20 p-1 px-2 rounded-md "
                    >
                      Booked
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        handleSlotStatus({
                          id: slots?._id,
                          status: slots.isBooked,
                        })
                      }
                      className={`border ${slots.isBooked === 'canceled' ? 'bg-red-700' : 'bg-button-gradient'} text-white p-1 px-2 rounded-md `}
                    >
                      {slots.isBooked}
                    </button>
                  )}
                </TableCell>
                <TableCell className="font-medium  text-right ">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <EllipsisVertical />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Action Menu</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => openModal(slots)}>
                        update Slot
                      </DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {isModalOpen && (
          <EditModal
            data={editServiceData}
            isOpen={!!editServiceData}
            onClose={closeModal}
          />
        )}

        {isAddModalOpen && (
          <CreateSlots isOpen={isAddModalOpen} onClose={closeModal} />
        )}
      </div>
    </div>
  );
};

export default SlotManagement;
