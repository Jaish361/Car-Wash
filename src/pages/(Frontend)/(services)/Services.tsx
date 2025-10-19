
import PageBanner from '@/components/shared/PageBanner';
import { IServices } from '@/interface/interface';
import { useGetServicesQuery } from '@/redux/features/services/servicesApi';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import  { useState } from 'react';
import { Link } from 'react-router-dom';
import Search from '@/components/ui/Search';
import { Clock } from 'lucide-react';

export interface TFilterValues {
  searchTerm: string;
  sortByPrice: string;
  servicelevel:string[];
}

const Services = () => {
  
  const initialFilterValues: TFilterValues = {
    searchTerm: '',
    sortByPrice: '',
    servicelevel: [],
  };
  const [filters, setFilters] = useState<TFilterValues>(initialFilterValues);
  const { data: services } = useGetServicesQuery(filters);

  const servicesData = services?.data;

  const sortOptions = [
    {
      value: 'priceAsc',
      label: 'Price: Low to High',
    },
    {
      value: 'priceDesc',
      label: 'Price: High to Low',
    },
    {
      value: 'durationAsc',
      label: 'Duration: Shortest to Longest',
    },
    {
      value: 'durationDesc',
      label: 'Duration: Longest to Shortest',
    },
  ];

  const handleSortFilter = (value: string) => {
    setFilters((prevValues) => ({
      ...prevValues,
      sortByPrice: value,
    }));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSearterm = (data: any) => {
    const value = data.value;
    setFilters((prevValues) => ({
      ...prevValues,
      searchTerm: value,
    }));
  };
  
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCheckBox = (data: any) => {
   

    setFilters((prevValues) => ({
        ...prevValues,
        servicelevel: prevValues.servicelevel.includes(data.name)
            ? prevValues.servicelevel.filter((lvl) => lvl !== data.name)
            : [...prevValues.servicelevel, data.name],
    }));
}

  const handleReset = () => {
    setFilters({
      searchTerm: '',
      sortByPrice: '',
      servicelevel:[]
    });
  };
  return (
    <div>
      <PageBanner pageName={'All Services'} />
      {/* Serivice  */}
      <div className="md:flex px-6 2xl:px-0 gap-6 my-10 container">
        {/* sidebar */}
        <div className="md:w-72 space-y-6 translate-x-96 md:translate-x-0 fixed  z-50 md:sticky duration-700 md:hover:translate-x-0 hover:translate-x-20">
          <div className=" h-fit text-white p-4 space-y-6 rounded-xl shadow-md hover:shadow-2xl bg-button-gradient">
            <form onChange={(e) => handleSearterm(e.target)} action="">
              <Search />
            </form>
            <div>
              <div>
                <p className="font-semibold text-lg mb-2">
                  Filter by Service Level
                </p>

            <form onChange={(e)=>handleCheckBox(e.target)} action="">
            <div className="flex gap-2 items-center">
                  <input type="checkbox" name="Standard"  id="standard" />
                  <label htmlFor="standard">Standard</label>
                </div>

                <div className="flex gap-2 items-center">
                  <input type="checkbox" name="Premium" id="premium" />
                  <label htmlFor="premium">Premium</label>
                </div>

                <div className="flex gap-2 items-center">
                  <input type="checkbox" name="Deluxe" id="deluxe" />
                  <label htmlFor="deluxe">Deluxe</label>
                </div>

                <div className="flex gap-2 items-center">
                  <input type="checkbox" name="Express" id="express" />
                  <label htmlFor="express">Express</label>
                </div>

                <div className="flex gap-2 items-center">
                  <input type="checkbox" name="Eco" id="eco" />
                  <label htmlFor="eco">Eco-Friendly</label>
                </div>
            </form>
              </div>
              {filters && (
                <button
                  onClick={handleReset}
                  className="p-2 bg-primary/75 rounded-xl mt-5 hover:bg-blue-400"
                  type="button"
                >
                  Clear filter
                </button>
              )}
            </div>
          </div>
          <img
            className="rounded-xl hidden md:block"
            src="https://d3jmn01ri1fzgl.cloudfront.net/photoadking/webp_thumbnail/gradient-free-car-wash-flyer-template-mt0a4t581ce51c.webp"
          />
          <img
            className="rounded-xl  hidden md:block"
            src="https://img.freepik.com/free-vector/24h-car-wash-template_23-2147498052.jpg"
          />
        </div>

        {/* Services all  */}
        <div className='w-full'>
          {/* sort bar  */}
          <div className="flex justify-between items-center my-6 md:my-0 md:pb-6 mb-5">
            <p>Showing 1–8 of 14 results</p>
            <div className="flex gap-2 items-center">
              {filters.sortByPrice && (
                <button
                  onClick={handleReset}
                  className="p-2 bg-primary/5"
                  type="button"
                >
                  Clear filter
                </button>
              )}
              <Select onValueChange={handleSortFilter}>
                <SelectTrigger className="w-40 shadow-lg border-2 border-primary ">
                  <SelectValue placeholder="Sort By Price or Duration" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions?.map((item, i) => (
                    <SelectItem key={i} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 h-fit md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6  items-center">
            {servicesData?.map((service: IServices, i: number) => (
              <div
                className="w-full  h-70 text-center  rounded-bl-[10px] rounded-tl-[80px] rounded-tr-[10px] p-4 shadow-2xl bg-slate-900/15 rounded-br-[20px] "
                key={i}
              >
                <Link to={service._id}>
                  <div
                    className="w-full h-70 relative text-center rounded-bl-[10px] overflow-hidden rounded-tl-[80px] rounded-tr-[10px]  bg-button-gradient  rounded-br-[20px] flex flex-col justify-center"
                    key={i}
                  >
                    <div className="h-48 overflow-hidden">
                      <img
                        className=" object-cover min-h-56 overflow-hidden hover:scale-125 hover:duration-1000 hover:fade-in-35 "
                        src={service.images}
                        alt=""
                      />
                    </div>
                    {service?.serviceLevel && (
                      <p className="absolute rounded-bl-md top-0 right-0   bg-primary/55 p-0.5  text-[14px] w-fit text-center px-2 text-white rounded-tr-xl">
                        {service?.serviceLevel}
                      </p>
                    )}
                    <div className="flex items-center px-2.5 justify-between">
                      <p className="rounded-full flex-col flex justify-center items-center border-none shadow-lg p-2 text-[12px] hover:scale-110 hover:bg-gray-400/50 text-white  bg-primary/65">
                        <span>
                          <Clock />
                        </span>
                        {service.duration}min
                      </p>
                      <div className="py-4 text-right  text-white">
                        <h3 className="text-[14px] font-bold">{service.name}</h3>
                        <p className="xl:text-xl">{service.price}₹</p>
                        
                      </div>
                    </div>
                  <p className='pb-4 text-left px-4 text-white'>    {service.description.slice(0, 35)} {service.description.length > 35 && "..."}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
