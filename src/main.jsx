import React from "react";
import ReactDOM from 'react-dom/client';
import "./global.css";
import { RouterProvider } from "react-router-dom";
import myRoutes from "./Routes/routes";
import AuthContextApi from "./context/AuthContextApi";
import FetchUserContext from "./context/FetchUserContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <>
        <AuthContextApi>
            <FetchUserContext>
            <RouterProvider router={myRoutes}/>
            </FetchUserContext>
        </AuthContextApi>
    </>
);