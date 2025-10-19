import CRForm from '@/components/form/CRForm';
import CRInput from '@/components/form/CRInput';
import CRTextarea from '@/components/form/CRTextarea';
import Loading from '@/components/shared/Loading';
import CARButton from '@/components/ui/CARButton';
import { useGetUserinfoQuery } from '@/redux/features/auths/authApi';
import { useCurrentToken } from '@/redux/features/auths/authSlice';
import { useAddReviewMutation } from '@/redux/features/reviews/reviewsApi';
import { useAppSelector } from '@/redux/hook';
import { verifyToken } from '@/utils/verifyToken';
import { Star, Stars } from 'lucide-react';
import { useState } from 'react';
import Rating from 'react-rating';
import { toast } from 'sonner';

const ReviewForm = () => {
  const [addReview] = useAddReviewMutation();
  const token = useAppSelector(useCurrentToken);
  let user;
  if (token) {
    user = verifyToken(token);
  }
  const { data: userData, isLoading } = useGetUserinfoQuery(user?.userEmail);
  const [rating, setRating] = useState(3);

  if (isLoading) {
    return <><Loading/></>;
  }

  const RatingComponent = Rating as any;

  const handleReviewSubmit = async (data: any) => {
    const ratingData = {
      user: userData?.data?._id,
      feedback: data.feedback,
      rating: rating,
      profileImg:
        data.profileImg ||
        'https://cdn3.pixelcut.app/1/3/profile_picture_1728ecf2bd.jpg',
    };

    const res = await addReview(ratingData);

    if (res?.data?.success) {
      toast('Thanks for give feedback!');
    }
  };
  return (
    <div className="w-full bg-primary/25  rounded-xl p-6 2xl:p-10">
      <div className="text-4xl flex justify-center  py-4 text-primary">
        <RatingComponent
          emptySymbol={<Star />}
          fullSymbol={<Stars className="text-red-500 fill-red-500" />}
          initialRating={rating}
          onClick={(rate: number) => setRating(rate)}
        />
      </div>

      <div className="w-full md:p-10">
        <CRForm onSubmit={handleReviewSubmit}>
          <div className="flex gap-4 ">
            <CRInput
              type="text"
              className="w-full"
              readonly
              defaultValue={userData?.data?.name}
              name={'name'}
            />
            <CRInput
              type="text"
              className="w-full"
              readonly
              defaultValue={userData?.data?.email}
              name={'email'}
            />
          </div>
          <CRInput
            type="text"
            className="w-full"
            placeholder="profile image url"
            name={'profileImg'}
          />
          <CRTextarea type="text" name="feedback" />
          <CARButton text="Give your feedback" />
        </CRForm>
      </div>
    </div>
  );
};

export default ReviewForm;
