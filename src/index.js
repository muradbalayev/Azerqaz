import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterApp } from './Components/utils/RouterApp'; 
import { RouterProvider } from 'react-router-dom'; 

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    
    <React.StrictMode> 
<RouterProvider router={RouterApp} />
</React.StrictMode>
)
