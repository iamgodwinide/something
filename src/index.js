import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import './index3.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import App2 from './App2';
import App3 from './App3';

const options = {
  position: positions.TOP_RIGHT,
  timeout: 5000,
  offset: '30px',
  transition: transitions.SCALE
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <AlertProvider template={AlertTemplate} {...options}>
     <App3/>
   </AlertProvider>
);

