import CRDatePicker from '@/components/form/CRDatePicker';
import CRForm from '@/components/form/CRForm';
import CRTimePicker from '@/components/form/CRTimePicker';
import CARButton from '@/components/ui/CARButton';
import { useGetServicesQuery } from '@/redux/features/services/servicesApi';

import CRSelectWithWatch from './../../../components/form/CRSelectWithWatch';
import { FC, useState } from 'react';
import { IModalProps, IServices } from '@/interface/interface';
import { Image } from 'antd';
import StartnEndTimeConverter from '../utils/StartnEndTimeConverter';
import { toast } from 'sonner';
import { useCreateServiceSlotsMutation } from '@/redux/features/services/slotsApi';
import { Link } from 'react-router-dom';
import Loading from '@/components/shared/Loading';



const CreateSlots: FC<IModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const [createServiceSlots] = useCreateServiceSlotsMutation();
  const { data: servicesDatas, isLoading } = useGetServicesQuery(undefined);
  const [service, setService] = useState<IServices | null>(null);

  if (isLoading) {
    return <><Loading/></>;
  }

  const services = servicesDatas?.data?.map((service: any) => ({
    value: service._id,
    label: service.name,
  }));

  const handleValueChange = async (data: any) => {
    const serviceData = await servicesDatas?.data?.filter(
      (item: IServices) => item._id === data,
    );
    if (serviceData && serviceData.length > 0) {
      const [service] = serviceData;
      setService(service);
    } else {
      setService(null);
    }
  };

  const handleEditDataSubmit = async (data: any) => {
    const toastId = toast.loading('creating slots');

    try{
      const year = data.date.$y;
    const month = String(data.date.$M + 1).padStart(2, '0');
    const day = String(data.date.$D).padStart(2, '0');

    const formatDate = `${year}-${month}-${day}`;
    const startTime = StartnEndTimeConverter(data?.startTime.$d);
    const endTime = StartnEndTimeConverter(data?.endTime?.$d);

    const soltData = {
      service: data.serviceId,
      serviceDuration: service?.duration,
      date: formatDate,
      startTime: startTime.time,
      endTime: endTime.time,
    };

    const res = await createServiceSlots(soltData);
    if (res.data.success) {
      toast.success(`${res.data.message}`, { id: toastId, duration: 2000 });
      onClose();
    } else {
      toast.error(`${res.data.message}`, { id: toastId, duration: 2000 });
    }
    }catch(err){
      toast.error(`${"Please need all Filup the form "}`, { id: toastId, duration: 2000 });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="relative  bg-white p-14 rounded-2xl shadow-lg max-w-full max-h-full">
        <button
          className="absolute text-2xl hover:bg-primary/20 rounded-full pb-2 text-center px-3.5 hover:text-red-600 text-primary top-4 right-6"
          onClick={onClose}
        >
          x
        </button>
        <h3 className="text-2xl text-center font-bold">Create new slots</h3>

        <div className="flex gap-10 p-5 ">
          <CRForm onSubmit={handleEditDataSubmit}>
            <div className="flex w-full items-center justify-between mt-1  gap-4">
              <CRSelectWithWatch
                label="Select Service"
                name="serviceId"
                className="w-full"
                onValueChange={handleValueChange}
                options={services}
              />
            </div>
            <CRDatePicker label="Select Date" disabled={!service} name="date" />
            <div className="flex gap-6 items-center justify-between">
              <CRTimePicker
                disabled={!service}
                label="Start Time"
                name="startTime"
              />
              <CRTimePicker
                disabled={!service}
                label="End Time"
                name="endTime"
              />
            </div>

            <CARButton text="Create New Slot" />
          </CRForm>

          <div>
            <h3>Service details</h3>
            {service && (
              <div className="p-10 space-y-4">
                <Image className="max-w-60 rounded-lg" src={service?.images} />
                <div className="text-md ">
                  <Link to={`/services/${service._id}`}>
                    <h2 className="text-xl font-bold">{service?.name}</h2>
                  </Link>
                  <p>{service?.serviceLevel}</p>
                  <p>Price: {service?.price}</p>
                  <p>Duration: {service?.duration}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSlots;
