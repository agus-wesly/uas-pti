import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, logout } from '../features/userSlice'
// const baseUrl = "https://gentle-gainful-tin.glitch.me";
const baseUrl = 'http://localhost:4173'

const baseQuery = fetchBaseQuery({
  baseUrl,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    headers.set('Content-Type', 'application/json')
    headers.set('Access-Control-Allow-Credentials', true)
    return headers
  },
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let response = await baseQuery(args, api, extraOptions)
  if (response?.error?.originalStatus === 403) {
    const refreshResult = await baseQuery('/refresh', api, extraOptions)
    if (refreshResult?.data) {
      api.dispatch(setCredentials({ ...refreshResult.data }))
      response = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(logout())
    }
  }
  return response
}

export const apiSlice = createApi({
  reducerPath: 'api',
  tagTypes: ['Message'],
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
})
