import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import isLoaggedReducer from './Components/reducer/isLogged';
import Footer from './Components/Footer/Footer'
const store = createStore(
  isLoaggedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  // <Footer />
  ,
  document.getElementById('root')
);