import { apiSlice } from '../api/apiSlice'

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserMsg: builder.query({
      query: (userId) => `/messages?id=${userId}`,
      providesTags: ['Message'],
    }),
    getUserData: builder.query({
      query: (userId) => `/user?id=${userId}`,
    }),
    getRefresh: builder.query({
      query: () => `/refresh`,
    }),
    registerUser: builder.mutation({
      query: (data) => ({
        url: '/register',
        method: 'POST',
        body: { ...data },
      }),
    }),
    authUser: builder.mutation({
      query: (data) => ({
        url: '/login',
        method: 'POST',
        body: { ...data },
      }),
    }),
    sendMsg: builder.mutation({
      query: (data) => ({
        url: '/send',
        method: 'POST',
        body: { ...data },
      }),
    }),
    getMsg: builder.query({
      query: (id) => {
        console.log({ id })
        return {
          url: `/messages/detail?id=${id}`,
          method: 'GET',
        }
      },
    }),
    delMsg: builder.mutation({
      query: ({ id }) => ({
        url: '/messages',
        method: 'DELETE',
        body: { id },
      }),
      invalidatesTags: ['Message'],
    }),
  }),
})

export const {
  useGetUserMsgQuery,
  useGetRefreshQuery,
  useGetUserDataQuery,
  useSendMsgMutation,
  useRegisterUserMutation,
  useAuthUserMutation,
  useDelMsgMutation,
  useGetMsgQuery,
} = extendedApiSlice
