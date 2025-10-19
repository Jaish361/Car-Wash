import CRForm from "@/components/form/CRForm";
import CRInput from "@/components/form/CRInput";
import CRTextarea from "@/components/form/CRTextarea";
import CARButton from "@/components/ui/CARButton";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
import { IModalProps } from "@/interface/interface";
import { Image } from "antd";
import { FC } from "react";
  


const EditUserModal:FC<IModalProps> = ({isOpen,onClose,data}) => {

  

    const handleEditDataSubmit =(data:any)=>{
        console.log("Click Form",data);
        
    }
    
    return (
        <div>
            <Dialog open={isOpen} onOpenChange={onClose}>

  <DialogContent className="bg-white min-w-[50vw]">
    <DialogHeader>
      <DialogTitle>Profile Update</DialogTitle>
      <DialogDescription>
      <CRForm onSubmit={handleEditDataSubmit}>
                 <div className="flex items-center justify-between gap-4">
                 <CRInput
                    type="text"
                    label="Service Title"
                    name="name"
                    className="w-full"
                    defaultValue={data?.name}
                  />
                
                 </div>
                  <div className="flex gap-6 items-center justify-between">
                  <CRInput
                    type="text"
                    className="w-full"
                    label="Service Title"
                    name="images"
                    defaultValue={data?.images}
                  />
                  <Image className="max-w-40 rounded-md" src={data?.images}/>
                  </div>

                  <div className="flex gap-4">
                    <CRInput
                      type="number"
                      className="w-full"
                      label="Price"
                      name="price"
                      defaultValue={data?.price}
                    />
                    <CRInput
                      type="number"
                      className="w-full"
                      label="Duration"
                      name="duration"
                      defaultValue={data?.duration}
                    />
                    <CRInput
                      type="text"
                      className="w-full"
                      label="Category"
                      name="serviceLevel"
                      defaultValue={data?.serviceLevel}
                    />
                 
                  </div>
                    <CRTextarea type="text" label="Description"
                    name="description"
                    defaultValue={data?.description}
                    />
                  <p className="p-2 bg-slate-50 rounded-sm mb-6">
                    Selected Time Slot: 09:00-10:00
                  </p>
                  <CARButton text="Upadte"/>
               
                </CRForm>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

        </div>
    );
};

export default EditUserModal;