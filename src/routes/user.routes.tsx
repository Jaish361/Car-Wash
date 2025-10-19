import PastBookings from "@/pages/(Backend)/(User)/PastBookings";
import Profile from "@/pages/(Backend)/(User)/Profile";
import UserDashboard from "@/pages/(Backend)/(User)/UserDashboard";

export const userPaths =[
    {
        name:"Dashboard",
        path:'dashboard',
        element:<UserDashboard/>
    },
    {
        name:"Up Coming Booking",
        path:'up-coming-booking',
        element:<UserDashboard/>
    },
    {
        name:"Profile",
        path:'profile',
        element:<Profile/>
    },
    {
        name:"Past Booking",
        path:'past-booking',
        element:<PastBookings/>
    },
  
]