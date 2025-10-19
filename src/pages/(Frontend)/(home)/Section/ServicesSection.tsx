import CARButton from "@/components/ui/CARButton";
import { IServices } from "@/interface/interface";
import { useGetServicesQuery } from "@/redux/features/services/servicesApi";
import { Link } from "react-router-dom";


const ServicesSection = () => {
    const filters = {
        searchTerm: '',
        sortByPrice: '',
        servicelevel:[]
    }
    const { data: services } = useGetServicesQuery(filters);

    const servicesData = services?.data
   
    
    
    return (
        <div  className="2xl:container md:mx-6 mx-4 2xl:mx-auto ">
            <div className="mb-10 space-y-4 max-w-4xl text-center mx-auto">
                <h3 className="text-center text-primary font-bold text-4xl">Most Popular Features Services</h3>
                <p className="text-justify md:text-center">Experience a spotless shine with our top-rated services—express washes, premium detailing, eco-friendly products, and convenient online booking. Whether it’s a quick clean or a full-service pampering, we’ve got your car covered, inside and out.</p>
            </div>
            

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6  items-center">
            {
                servicesData?.slice(0,6).map((service: IServices,i:number)=>(
                    <div  className='w-full hover:shadow-2xl h-70 text-center  rounded-bl-[80px] rounded-tl-[80px] rounded-tr-[10px] p-4 shadow-md bg-slate-900/15 rounded-br-[20px] ' key={i}>
                  <Link to={`/services/${service._id}`}>
                  <div  className='w-full h-70 text-center rounded-bl-[80px] overflow-hidden rounded-tl-[80px] rounded-tr-[10px]  bg-button-gradient  rounded-br-[20px] flex flex-col justify-center' key={i}>
                      
                      <div className='h-60 overflow-hidden'>
                       <img className=" object-cover overflow-hidden hover:scale-125 hover:duration-1000 hover:fade-in-35 "
                        src={service.images} alt="" />
                        
                       </div>
                         <div className="py-4 text-right px-4 text-white">
                         <h3 className="xl:text-2xl text-xl font-bold">{service.name}</h3>
                         <p className="xl:text-md">{service?.description?.slice(0,40)} <span>{service?.description?.length >40 && "..."}</span></p>
                       
                         </div>
                      </div>
                  </Link>
                    </div>
                ))
            }
            </div>
            <div className="flex justify-center py-10">
                 <Link to='/services'><CARButton className="md:text-2xl px-2 p-2" text="Explore More"/></Link>
            </div>
        </div>
    );
};

export default ServicesSection;