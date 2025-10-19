import PageBanner from "@/components/shared/PageBanner";
import { clearCompare, removeCompareServices, useSelectedCompare } from "@/redux/features/compare/compareSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { Image } from "antd";
import { Delete } from "lucide-react";
import { Link } from "react-router-dom";

const Compare = () => {
    const selectedServices = useAppSelector(useSelectedCompare)
    const dispatch = useAppDispatch()
   
    const tableHeader = [
        {
            label: "Services"
        },
        {
            label: "Level"
        },
        {
            label: "Duration"
        },
        {
            label: "Price"
        },
        {
            label: "Action"
        },
    ]
    return (
        <div>
            <PageBanner pageName="Comparison"/>
            <div className="container mx-auto p-4">
                <div className="flex justify-end gap-4 py-4 ">
                    <Link to="/services"><button className="bg-button-gradient px-2 p-1 rounded-md text-white">Add More</button></Link>
                <button onClick={()=>dispatch(clearCompare())} className="bg-button-gradient px-2 p-1 rounded-md text-white">Clear</button>
                </div>
  <div className="overflow-x-auto">
    <table className="min-w-full border-collapse block md:table">
      <thead className="block md:table-header-group">
        <tr className="border border-gray-300 bg-primary/10 rounded-md md:border-none block md:table-row">
        {
            tableHeader.map((item)=>(
                <th key={item.label} className="p-4 text-left text-sm font-semibold text-gray-600 block md:table-cell">{item.label}</th>
            ))
        }
        
        </tr>
      </thead>
      <tbody className="block md:table-row-group">

        {
            selectedServices?.map((service, i)=>(
<tr key={i} className="border  hover:bg-primary/5 hover:translate-x-2 duration-1000  md:border-none block md:table-row">
          <td className="p-4 text-left  flex gap-4 items-center text-sm text-gray-700 bg-primary/5 shadow-lg  ">
<Image className="max-w-12 min-h-12 rounded-full" src={service.images} />
           <Link to={`/services/${service._id}`}> <p className="text-md font-bold">{service.name}</p></Link>
          </td>
          <td className="p-4 text-left text-sm text-gray-700 block md:table-cell">{service.serviceLevel}</td>
          <td className="p-4 text-left text-sm text-gray-700 block md:table-cell">{service.duration} Minute</td>
          <td className="p-4 text-left text-sm text-gray-700 block md:table-cell">₹{service.price}</td>
          <td className="p-4 text-left text-sm text-gray-700 block md:table-cell">
            <button onClick={()=>dispatch(removeCompareServices(service._id))}><Delete/></button>
          </td>
        </tr>
            ))
        }
        
       
      </tbody>
    </table>
  </div>
</div>

        </div>
    );
};

export default Compare;