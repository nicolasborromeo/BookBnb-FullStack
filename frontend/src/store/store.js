import {configureStore} from '@reduxjs/toolkit'
import sessionSlice from '../features/session/sessionSlice'
import { sessionApi } from '../features/session/sessionAPI'

const store = configureStore({
    reducer: {
        session: sessionSlice,
        [sessionApi.reducerPath]: sessionApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sessionApi.middleware)
})

export default store
