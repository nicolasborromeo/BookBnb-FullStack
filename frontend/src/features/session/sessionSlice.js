import { createSlice } from '@reduxjs/toolkit'
import { sessionApi } from './sessionAPI'


/*{
  user: {
    id,
    email,
    username,
    firstName,
    lastName
  }
} */
const initialState = {user: null}
const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        setUserState(state, action) {
            state = {user: action.payload}
        }
    },
    extraReducers: (builder) => {
        builder
        .addMatcher(
            sessionApi.endpoints.loginUser.matchFulfilled,
            (state, { payload }) => {
              state.user = payload.user
            },
          )
        .addMatcher(
            sessionApi.endpoints.logoutUser.matchFulfilled,
            (state) => {
              state.user = null
            }
        )
        .addMatcher(
          sessionApi.endpoints.restoreUser.matchFulfilled,
          (state, {payload}) => {
            state.user = payload.user
          }
        )

    }
})

export const {setuserState} = sessionSlice.actions
export default sessionSlice.reducer
