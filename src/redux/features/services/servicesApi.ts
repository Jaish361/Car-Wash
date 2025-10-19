import { baseApi } from '@/redux/api/baseApi';

const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query({
      query: (filters) => {
        const params = new URLSearchParams(filters);

        return { url: `/services?${params}`, method: 'GET' };
      },
      providesTags: ['services'],
    }),

    getSingleServices: builder.query({
      query: (id) => ({
        url: `/services/${id}`,
        method: 'GET',
      }),
      providesTags: ['services'],
    }),

    getAvailableServices: builder.query({
      query: (payload) => {
        const params = new URLSearchParams(payload);

        return {
          url: `/slots/availability?${params}`,
          method: 'GET',
        };
      },
      providesTags: ['services'],
    }),

    // addService api
    addService: builder.mutation({
      query: (data) => ({
        url: '/services',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['services'],
    }),

    // updateService api
    updateService: builder.mutation({
      query: (data) => ({
        url: `/services/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['services'],
    }),

    // delete service api
    deleteService: builder.mutation({
      query: (id) => ({
        url: `/services/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['services'],
    }),
  }),
});

export const {
  useGetServicesQuery,
  useAddServiceMutation,
  useGetSingleServicesQuery,
  useGetAvailableServicesQuery,
  useDeleteServiceMutation,
  useUpdateServiceMutation,
} = serviceApi;
