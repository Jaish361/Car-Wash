import { baseApi } from '@/redux/api/baseApi';

const authApi = baseApi.injectEndpoints({
endpoints:(builder)=>({
    login: builder.mutation({
        query:(userInfo)=>({
            url: '/auth/login',
            method:'POST',
            body:userInfo,
        }),
    }),

    signup: builder.mutation({
        query: (userInfo)=>({
            url:"/auth/signup",
            method:"POST",
            body: userInfo,
        })
    }),

    getUserinfo: builder.query({
        query:(userEmail)=>({
            url:`/auth/user?userEmail=${userEmail}`,
            method:"GET",

        }),
        providesTags: ['auth'],
    }),


    getAllUserinfo: builder.query({
        query: (args: any) => {
          const params = new URLSearchParams(args);
      
          return {
            url: `/auth/users?${params.toString()}`,
            method: 'GET', 
          };
        },
        providesTags: ['auth'],
      }),
    
    // update user info 

 updateUserInfo: builder.mutation({
        query: (data) => ({
          url: `/auth/userInfo/${data.userId}`,
          method: 'PUT',
          body: data,
        }),
        invalidatesTags: ['auth'],
      }),


    updateUserRole: builder.mutation({
        query: (data) => ({
          url: `/auth/user/${data.userId}`,
          method: 'PUT',
          body: data,
        }),
        invalidatesTags: ['auth'],
      }),
  
}),

});
 


export const {
 useLoginMutation,
  useSignupMutation,
   useGetUserinfoQuery,
   useGetAllUserinfoQuery,
   useUpdateUserRoleMutation,
   useUpdateUserInfoMutation
} = authApi;
