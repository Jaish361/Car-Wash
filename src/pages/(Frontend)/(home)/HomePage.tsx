
import Banner from './Section/Banner';
import CallToActions from './Section/CallToActions';
import FeaturesSection from './Section/FeaturesSection';
import ReviewSection from './Section/ReviewSection';
import ServicesSection from './Section/ServicesSection';


const HomePage = () => {


 

  return (
    <div className="space-y-20  ">
      <Banner />
      <ServicesSection/>
      <CallToActions/>
      <FeaturesSection/>
      <ReviewSection/>
      
    </div>
  );
};

export default HomePage;
