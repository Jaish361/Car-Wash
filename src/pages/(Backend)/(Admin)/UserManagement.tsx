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
import { EllipsisVertical } from 'lucide-react';
import { Image } from 'antd';
import Search from '@/components/ui/Search';
import { useGetAllUserinfoQuery } from '@/redux/features/auths/authApi';
import ChangeRoleModal from '../Components/ChangeRoleModal';
import Loading from '@/components/shared/Loading';



type TUserFilterValue={
    searchTerm:String;
}
const UserManagement = () => {
  const initialFilterValues: TUserFilterValue = {
    searchTerm: '',
    
  };
  const [filters, setFilters] = useState<TUserFilterValue>(initialFilterValues);
  const {data:userDatas ,isLoading}= useGetAllUserinfoQuery(filters)
  const [isModalOpen, setIsModalOpen] = useState(false);
   const [editUserData, setServiceData] = useState(null);

  const openModal = (data:any) => {
    setServiceData(data)
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
        <h3 className="text-2xl font-bold">User Management</h3>
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
                <TableHead>User Name</TableHead>
                <TableHead>Contact Info</TableHead>
                <TableHead className="text-right">Role</TableHead>
                <TableHead className="w-[100px]">Action</TableHead>
              </TableRow>
            }
          </TableHeader>
          <TableBody>
            {userDatas?.data?.map((usData:any, i:number) => (
              <TableRow key={usData._id}>
                <TableCell className="font-medium">{i + 1}</TableCell>
                <TableCell className="flex gap-2">
                  <Image
                    className="max-w-32 rounded-xl"
                    src={usData.images}
                    alt=""
                  />
                  <div>
                    <p className="text-xl">{usData.name}</p>
                
                  </div>
                </TableCell>
                <TableCell>
                  <p className="text-sm">{usData.email}</p>
                  <p className="text-sm">0{usData.phone}</p>
                </TableCell>
                <TableCell className="text-right">{usData.role}</TableCell>
                <TableCell className="font-medium  text-right ">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <EllipsisVertical />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Action Menu</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={()=>openModal(usData)}>
                        Change user role
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
        <ChangeRoleModal
          data={editUserData}
          isOpen={!!editUserData}
          onClose={closeModal}
        />
      )}
      </div>
    </div>
  );
};

export default UserManagement;
