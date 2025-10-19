import { baseApi } from '@/redux/api/baseApi';

const reviewsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReviews: builder.query({
      query: (filters) => {
        const params = new URLSearchParams(filters);
        return { url: `/reviews?${params}`, method: 'GET' };
      },
      providesTags: ['reviews'],
    }),

  
    // addReview api
    addReview: builder.mutation({
      query: (data) => ({
        url: '/reviews',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['reviews'],
    }),



    // delete Review api
    deleteReview: builder.mutation({
      query: (id) => ({
        url: `/reviews/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['reviews'],
    }),
  }),
});

export const {
  useAddReviewMutation,
  useDeleteReviewMutation,
  useGetReviewsQuery,
} = reviewsApi;
