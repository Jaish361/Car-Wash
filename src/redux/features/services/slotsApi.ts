import { baseApi } from '@/redux/api/baseApi';

const slotsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // addSlots api
    createServiceSlots: builder.mutation({
      query: (data) => ({
        url: '/services/slots',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['slots'],
    }),

    getAllServiceSlots: builder.query({
      query: () => {
        // const params = new URLSearchParams(
        //   payload,
        // );

        // return `/slots?${params}`

        return { url: `/slots`, method: 'GET' };
      },
      providesTags: ['slots'],
    }),

    // updateSlots api
    updateSlots: builder.mutation({
      query: (data) => ({
        url: `/slots/status/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['slots'],
    }),

    // delete slots api
    deleteService: builder.mutation({
      query: (id) => ({
        url: `/services/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['slots'],
    }),
  }),
});

export const {
  useCreateServiceSlotsMutation,
  useGetAllServiceSlotsQuery,
  useUpdateSlotsMutation,
} = slotsApi;
