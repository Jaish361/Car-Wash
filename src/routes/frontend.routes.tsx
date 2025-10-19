

import Booking from '@/pages/(Frontend)/(booking)/Booking';
import Compare from '@/pages/(Frontend)/(compare)/Compare';
import HomePage from '@/pages/(Frontend)/(home)/HomePage';
import Reviews from '@/pages/(Frontend)/(reviews)/Reviews';
import ServiceDetails from '@/pages/(Frontend)/(services)/ServiceDetails';
import Services from '@/pages/(Frontend)/(services)/Services';

export const frontendPageRoutes = [
  {
    path: '/',
    element: <HomePage />,
  

    children: [
      {
        path:"reviews",
        element:<Reviews/>
      },
      {
        path:"services",
        element:<Services/>
      },
      {
        path:"services/:id",
        element:<ServiceDetails/>
      },
      {
        path:"booking",
        element:<Booking/>
      },
      {
        path:"compare",
        element:<Compare/>
      },
    ],
  },
];
