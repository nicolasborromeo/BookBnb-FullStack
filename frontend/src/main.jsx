// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// import './index.css';
// import { Provider } from 'react-redux'
// import store from './store/store';
// import {restoreCSRF, csrfFetch} from './store/csrf'
// import { sessionApi } from './features/session/sessionAPI';

// if(import.meta.env.MODE !== 'production') {
//   restoreCSRF();

//   window.csrfFetch = csrfFetch;
//   window.store = store
//   window.sessionApi = sessionApi
// }

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>
// );



/////////LEGACY CODE////////////////////////

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {restoreCSRF, csrfFetch} from './store/csrf'
import './index.css';
import { Provider } from 'react-redux';
import configureStore from './store/store';
import * as sessionActions from './store/session';


const store = configureStore();

if (import.meta.env.MODE !== 'production') {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
