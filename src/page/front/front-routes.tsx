import {Navigate, Route, Routes} from "react-router";
import React from "react";
import {FrontMap} from "./map";
import {Login} from "./login";
import {Register} from "./register";

export const FrontRoutes = () => {
    return (
        <Routes>
            <Route path="/map" element={<FrontMap />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Navigate to="/front/map" />
        </Routes>
    );
}