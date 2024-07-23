// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import Cookies from 'js-cookie'



// export const sessionApi = createApi({
//     reducerPath: 'sessionApi',
//     baseQuery: fetchBaseQuery({
//         baseUrl: '/api/session',
//         prepareHeaders: (headers) => {
//             const token = Cookies.get('XSRF-TOKEN')
//             if(token) {
//                 headers.set('XSRF-TOKEN', token)
//                 headers.set("Content-Type", "application/json")
//             }
//             return headers
//         },
//         credential: 'include',
//     }),
//     endpoints: (build) => ({
//         loginUser: build.mutation({
//             query(body) {
//                 return {
//                     url: '/',
//                     method: 'POST',
//                     body,
//                 };
//             }
//         }),
//         logoutUser: build.mutation({
//             query() {
//                 return {
//                     url: '/',
//                     method: 'DELETE',
//                 }
//             }
//         }),
//         restoreUser: build.query({
//             query: () => {
//                 return {
//                     url: '/',
//                     method: 'GET'
//             }}
//         })
//     })
// })

// export const { useLoginUserMutation, useLogoutUserMutation, useRestoreUserQuery } = sessionApi
