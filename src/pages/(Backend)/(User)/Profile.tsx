import CRForm from '@/components/form/CRForm';
import CRInput from '@/components/form/CRInput';
import Loading from '@/components/shared/Loading';
import CARButton from '@/components/ui/CARButton';
import { useGetUserinfoQuery, useUpdateUserInfoMutation } from '@/redux/features/auths/authApi';
import { useCurrentToken } from '@/redux/features/auths/authSlice';
import { useAppSelector } from '@/redux/hook';
import { verifyToken } from '@/utils/verifyToken';
import { Edit, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';


const Profile = () => {
    const [isUpdate,setIsUpdate]=useState(false)
    const [updateUserInfo]= useUpdateUserInfoMutation()
    const token = useAppSelector(useCurrentToken);
    let user;
    if(token){
        user= verifyToken(token);
    }
    
    
    const { data: userData, isLoading } = useGetUserinfoQuery(user?.userEmail);
  
    if (isLoading) {
      return <><Loading/></>;
    }
    const userInfo = userData?.data;

  const userId = userInfo._id;
    

    const handleBookingSubmit =async (data:any) => {
   
   const updateData ={...data,userId}

   console.log(updateData);
   
        const res =await updateUserInfo(updateData);

        if(res.data.success){
            toast.success("User Information Updated Successfully")
        }
       console.log(updateData);
       
    
      };
    
     

    return (
        <div className="2xl:p-10 p-4">
        <div className="2xl:w-[60vw] md:w-[70vw] md:flex mx-auto 2xl:h-[80vh] my-auto rounded-3xl shadow-2xl  bg-primary/5">
          <div className="w-full space-y-6 p-4 md:p-8  2xl:p-10">
            <div className="flex items-center justify-between">
              <h4 className="text-3xl font-bold">Profile Infomation</h4>
              
    <button onClick={()=>setIsUpdate(!isUpdate)}> {isUpdate ? <X/> :  <Edit/>}</button>
           </div>
           {/* main body  */}
  <section>

  <div className="py-10">
                <CRForm onSubmit={handleBookingSubmit}>
                  <CRInput
                    type="text"
                    label="Full Name"
                    readonly={!isUpdate}
                    name="name"
                    defaultValue={userInfo?.name}
                  />

                  <div className="flex gap-4">
                    <CRInput
                      type="email"
                      readonly={!isUpdate}
                      className="w-full"
                      label="email"
                      name="email"
                      defaultValue={userInfo?.email}
                    />
                    <CRInput
                      type="phone"
                      readonly={!isUpdate}
                      className="w-full"
                      label="Mobile"
                      name="phone"
                      defaultValue={userInfo?.phone}
                    />
                  </div>
                  <CRInput
                    type="text"
                    label="Address"
                    readonly={!isUpdate}
                    name="address"
                    defaultValue={userInfo?.address}
                  />
        
                 {isUpdate &&  <CARButton text='Update Now'/> }
                    
                </CRForm>
              </div>
  </section>
          
          </div>
        </div>
      </div>
    );
};

export default Profile;