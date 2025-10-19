import { Outlet } from 'react-router-dom';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import MobileHeaderMenu from '../shared/MobileHeaderMenu';
import { useEffect, useState } from 'react';
import Loading from '../shared/Loading';

const MainLayout = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500); 
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      
        <div className=" flex flex-col justify-between min-h-screen">
          <div>
            <Navbar />
            <MobileHeaderMenu/>
            <Outlet />
          </div>
          <Footer />
        </div>
      
    </>
  );
};

export default MainLayout;
