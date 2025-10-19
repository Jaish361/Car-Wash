import { baseApi } from '@/redux/api/baseApi';

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBookings: builder.query({
      query: () => ({
        url: `/bookings`,
        method: 'GET',
      }),
      providesTags: ['bookings'],
    }),

    getMyBookings: builder.query({
      query: () => ({
        url: `/my-bookings`,
        method: 'GET',
      }),
      providesTags: ['bookings'],
    }),


    getSingleBooking: builder.query({
      query: (id) => ({
        url: `/bookings/${id}`,
        method: 'GET',
      }),
      providesTags: ['bookings'],
    }),
  

    // addBooking api 
    addBooking: builder.mutation({
      query: (data) => ({
        url: '/bookings',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['bookings'],
    }),

    // updateBooking api 
    updateBooking: builder.mutation({
      query: (data) => ({
        url: `/bookings/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['bookings'],
    }),

    // delete booking api 
    deleteBooking: builder.mutation({
      query: (id) => ({
        url: `/bookings/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['bookings'],
    })
  }),
});

export const {
useAddBookingMutation,
useDeleteBookingMutation,
useGetBookingsQuery,
useGetSingleBookingQuery,
useUpdateBookingMutation,
useGetMyBookingsQuery
} = bookingApi;
