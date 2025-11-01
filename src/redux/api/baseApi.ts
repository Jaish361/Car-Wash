import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { toast } from 'sonner';
import { logout, setUser } from '../features/auths/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://car-wash-backend-v2.vercel.app/api',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
     
      
    }
 

    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);

  
  if (result?.error?.status === 404) {
    const errorMsg =(result.error.data as {message:string}).message;
    toast.error(errorMsg)
  }
  if (result?.error?.status === 403) {
    const errorMsg =(result.error.data as {message:string}).message;
    toast.error(errorMsg)
  }
  if (result?.error?.status === 401) {
    

    const res = await fetch('https://car-wash-backend-v2.vercel.app/api/auth/refresh-token', {
      method: 'POST',
      credentials: 'include',
    });

    const data = await res.json();

    if (data?.data?.accessToken) {
      const user = (api.getState() as RootState).auth.user;

      api.dispatch(
        setUser({
          user,
          token: data.data.accessToken,
        })
      );

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};


export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ['bookings', 'services', 'auth','slots',"reviews"],
  endpoints: () => ({}),
});
