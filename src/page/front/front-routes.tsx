import {Navigate, Route, Routes} from "react-router";
import React from "react";
import {FrontMap} from "./map/front-map";

export const FrontRoutes = () => {
    return (
        <Routes>
            <Route path="/map" element={<FrontMap />} />
            <Navigate to="/front/map" />
        </Routes>
    );
}