import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserContextProvider from './components/contexts/UserContextProvider';
import TempleContextProvider from './components/contexts/TempleContextProvider'; // Import the TempleContextProvider
import { reduxStore } from "./Store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* providing redux store to app */}
    <Provider store={reduxStore}>
      <UserContextProvider>
        <TempleContextProvider>
          <App />
        </TempleContextProvider>
      </UserContextProvider>
    </Provider>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
