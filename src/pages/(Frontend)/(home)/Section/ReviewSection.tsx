import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Star } from 'lucide-react';
import ReviewForm from './comp/ReviewForm';
import CARButton from '@/components/ui/CARButton';
import { Link } from 'react-router-dom';
import { useAppSelector } from '@/redux/hook';
import { useCurrentToken } from '@/redux/features/auths/authSlice';
import { verifyToken } from '@/utils/verifyToken';
import OverlayReviewForm from './comp/OverlayReviewForm';
import { useGetReviewsQuery } from '@/redux/features/reviews/reviewsApi';
import { TReviews } from '@/interface/interface';
import Loading from '@/components/shared/Loading';

const ReviewSection = () => {
  const { data: reviewData, isLoading } = useGetReviewsQuery(undefined);
  const token = useAppSelector(useCurrentToken);

  let user;
  if (token) {
    user = verifyToken(token);
  }

  if (isLoading) {
    return <><Loading/></>;
  }

  // FIX: Access the nested data correctly
  const reviews = reviewData?.data?.data || [];
  const averageReview = reviews.length 
    ? reviews.reduce(
        (acc: any, review: TReviews) => acc + review.rating,
        0,
      ) / reviews.length
    : 0;

  return (
    <div className="my-20 ">
      <div
        className="relative overflow-hidden min-h-[800px] xl:min-h-[650px]"
        style={{
          backgroundImage: "url('/svg/testimonial_bg.png')",
          backgroundRepeat: 'repeat',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute top-1 px-4 md:px-0 md:left-[5%] 2xl:left-[0%] xl:px-8  w-full 2xl:container 2xl:mx-auto ">
          <h3 className="text-center relative xl:right-0 text-primary font-bold md:text-4xl 2xl:text-6xl">
            What Our Clients Say
          </h3>

          <div className="py-10 w-full md:flex items-center   2xl:justify-around   md:gap-20">
            <div className="  rounded-lg">
              {user ? <ReviewForm></ReviewForm> : <OverlayReviewForm />}
            </div>
            <div className=" flex flex-col space-y-6 justify-center items-center p-6">
              <h3 className="text-3xl font-bold">Overall Rating:</h3>
              <div className="flex justify-center">
                {Array.from({ length: Math.round(averageReview) }).map((_, i) => (
                  <span className="text-rose-600 fill-rose-600 " key={i}>
                    <Star />
                  </span>
                ))}
              </div>
              <h2 className="text-6xl text-primary font-bold">
                {averageReview.toFixed(1)}
                <span className="text-[11px] text-gray-600">
                  {reviews.length} reviews
                </span>
              </h2>

              <Link className="flex justify-center" to={'/reviews'}>
                <CARButton text="See all feedback" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div
        className="relative  overflow-hidden min-h-[800px] xl:min-h-[650px]"
        style={{
          backgroundImage: "url('/svg/testimonial_bg.png')",
          backgroundRepeat: 'repeat',
          backgroundAttachment: 'fixed',
        }}
      >
        <Carousel className=" max-w-md mx-auto    ">
          <CarouselContent>
            {reviews.map((item: TReviews, index: number) => (
              <CarouselItem key={index}>
                <div className="mt-10 md:mt-0">
                  <Card className="rounded-t-[100px] max-w-md mx-auto rounded-b-[150px] bg-primary/80 text-white">
                    {
                      <CardContent className="flex flex-col p-6 gap-4 aspect-square items-center justify-center ">
                        <div className="flex">
                          {Array.from({ length: item.rating }).map((_, i) => (
                            <Star className="text-rose-600 " key={i} />
                          ))}
                        </div>
                        <span className="xl:text-xl text-[14px] text-center font-semibold">
                          {item.feedback.slice(0,150)}
                        </span>
                        <div className="w-28 h-28 rounded-full">
                          <img
                            className="object-cover min-h-28  rounded-full"
                            src={item.profileImg}
                            alt=""
                          />
                        </div>
                        <p className="xl:text-md  text-[14px]">
                          {item?.user?.name}
                        </p>
                      </CardContent>
                    }
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default ReviewSection;