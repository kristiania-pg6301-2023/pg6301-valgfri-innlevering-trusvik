import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import {ApplicationRoutes} from "./application";
import "./application.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <ApplicationRoutes />
    </BrowserRouter>
    );

