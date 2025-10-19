import CARButton from "@/components/ui/CARButton";
import ReviewForm from "./ReviewForm";
import { Link } from "react-router-dom";

const OverlayReviewForm = () => {
    return (
        <div>
          <div className="relative bg-white">  <ReviewForm/>
          
            <div className="absolute top-0 h-full w-full flex flex-col justify-center items-center bg-primary/85">

                <h3 className="text-3xl text-white font-Jost font-bold">Please Login..</h3>
               <Link to={'/login'}><CARButton text="Login" className="text-xl mt-10"/></Link>
          </div>


            </div>
        </div>
    );
};

export default OverlayReviewForm;