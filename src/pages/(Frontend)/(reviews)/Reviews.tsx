import Loading from "@/components/shared/Loading";
import PageBanner from "@/components/shared/PageBanner";
import { TReviews } from "@/interface/interface";
import { useGetReviewsQuery } from "@/redux/features/reviews/reviewsApi";
import { Star } from "lucide-react";


const Reviews = () => {
    const {data:reviewsData,isLoading}= useGetReviewsQuery(undefined)
    if (isLoading) {
        return <><Loading/></>;
      }
    return (
        <div>
            <PageBanner pageName="All Reviews"/>

{/* review card */}
<div className="grid md:grid-cols-2 grid-cols-1 xl:grid-cols-4 gap-4 my-20 container mx-auto">
    {
        reviewsData?.data?.map((review:TReviews,i:number)=>(
            <div className="flex flex-col p-5 space-y-3 rounded-lg bg-primary/5 items-center justify-center" key={i}>
                <img className="w-20 h-20 rounded-full object-cover" src={review.profileImg} alt="" />
              <div className="flex gap-2">
              {Array.from({length:review.rating}).map((_,i)=>(
                    <span className="text-rose-600 fill-rose-600 " key={i}><Star/></span>
                ))}
              </div>
                <p>{review.feedback}</p>
            </div>
        ))
    }

</div>
        </div>
    );
};

export default Reviews;