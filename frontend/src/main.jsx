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

import './index.css';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import configureStore from './store/store';
import * as sessionActions from './store/session';
import { restoreCSRF, csrfFetch } from './store/csrf'
import { Modal, ModalProvider } from './context/Modal';

const store = configureStore();

if (import.meta.env.MODE !== 'production') {
  restoreCSRF();

  window.store = store;
  window.csrfFetch = csrfFetch;
  window.sessionActions = sessionActions;
}


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ModalProvider>
      <Provider store={store}>
        <App />
        <Modal />
      </Provider>
    </ModalProvider>
  </React.StrictMode>
);
