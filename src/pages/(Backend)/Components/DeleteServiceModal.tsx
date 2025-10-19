
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


import { useDeleteServiceMutation } from "@/redux/features/services/servicesApi";
import { FC } from "react";

import { toast } from 'sonner';

interface IDeleteModalProps{
  data:any
}

const DeleteServiceModal:FC<IDeleteModalProps> = ({data}) => {
  const [deleteService]= useDeleteServiceMutation()

  
  

  const handleDelete = async (id:string) => {
    

    const res = await deleteService(id)
    if (res?.data?.success) {
      toast.success(res?.data?.message, { duration: 2000 });
      
    }
  };

  return (
    <div>
     <AlertDialog>
  <AlertDialogTrigger className='p-2 text-sm'>Delete</AlertDialogTrigger>
  <AlertDialogContent className="bg-white">
    <AlertDialogHeader >
      <AlertDialogTitle className="text-center text-red-500 text-2xl">Are you sure delete this service?</AlertDialogTitle>
      <AlertDialogDescription className="text-center py-4">
        <h2 className="text-xl font-bold">Service Name: {data.name}</h2>
        <p>Price:  {data.price}  </p>
       
        
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter className=" mx-auto">
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={()=>handleDelete(data.id)} className="text-white">Yes Confirm</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

    </div>
  );
};

export default DeleteServiceModal;
