// import {configureStore} from '@reduxjs/toolkit'
// import sessionSlice from '../features/session/sessionSlice'
// import { sessionApi } from '../features/session/sessionAPI'

// const store = configureStore({
//     reducer: {
//         session: sessionSlice,
//         [sessionApi.reducerPath]: sessionApi.reducer,
//     },
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware().concat(sessionApi.middleware)
// })

// export default store

//////// LEGACY CODE //////////

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import {thunk}  from 'redux-thunk';
import sessionReducer from './session';
import spotsReducer from './spots';


const rootReducer = combineReducers({
  session: sessionReducer,
  spots: spotsReducer,
})

let enhancer;
if (import.meta.env.MODE === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
