
import CARButton from '@/components/ui/CARButton';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export function Example() {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 2500,
        }),
      ]}
    ></Carousel>
  );
}

const Banner = () => {
  const [isHover, setIsHover] = useState(false);
  const carouselImg = [
    {
      id: 1,
      url: 'https://i.postimg.cc/SK7SGMt0/sign-up.png',
      tagLine: 'Stay Fresh, Drive Clean',
      title: 'The Car Washing Pump Advantage',
    },
    {
      id: 2,
      // url: 'https://i.postimg.cc/hvF6f3TF/Slider-1-1.webp'
      url: 'https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTAzL3Jhd3BpeGVsX29mZmljZV80Ml9waG90b19vZl9zcG9ydF9vcmFuZ2VfY2FyX2luX3dhc2hpbmdfc2VydmljZV83YjI0ZWNlMS02NTBjLTRlOTAtYmM0ZS02NjIzNGQ2YzNiOTBfMS5qcGc.jpg',
      tagLine: 'We Scrub, You Smile',
      title: 'Clean Cars. Happy Hearts',
    },
    {
      id: 3,
      url: 'https://images.pexels.com/photos/6873118/pexels-photo-6873118.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      tagLine: 'Get Your Shine On',
      title: 'Gentle on Your Car, Powerful on Clean',
    },
  ];

  return (
    <Carousel
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      plugins={[
        Autoplay({
          delay: 4000,
        }),
      ]}
    >
      <CarouselContent>
        {carouselImg.map((item) => (
          <CarouselItem className="relative " key={item.id}>
            <img
              className="object-cover w-full  object-center md:h-[400px]  2xl:h-[600px] xl:object-cover"
              src={item.url}
              alt={`slide-${item.id}`}
            />
            <div
              className="absolute md:space-y-6 top-[13%] bg-primary/25 rounded-2xl py-10 text-white  xl:top-[20%] 
           md:px-20 2xl:left-[20%] md:left-[7%] w-[90vw] left-[9%] px-4 md:max-w-7xl  mx-auto flex flex-col   items-center"
            >
              <p className="uppercase text-center text-[8px] md:text-xl">
                {item.tagLine}
              </p>
              <h3 className="2xl:text-6xl text-[14px] md:text-2xl text-center   xl:text-5xl font-bold uppercase">
                {item.title}
              </h3>
              <Link to="/services">
              
                <CARButton
                  text="BOOKED NOW"
                  className="px-4 md:text-xl p-2 md:mt-6"
                />
              </Link>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious
        className={`absolute ${isHover ? 'left-2 bg-primary/20' : 'hidden'}  top-1/2 text-2xl   transform -translate-y-1/2  text-black rounded-full`}
      >
        <ArrowLeft />
      </CarouselPrevious>
      <CarouselNext
        className={`absolute ${isHover ? 'right-2 bg-primary/20' : 'hidden'}  top-1/2 transform -translate-y-1/2  text-black  rounded-full`}
      >
        Next
      </CarouselNext>
    </Carousel>
  );
};

export default Banner;
