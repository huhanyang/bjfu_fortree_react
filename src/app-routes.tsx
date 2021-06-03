import React from "react";
import { Navigate, Route, Routes } from "react-router";
import { BackPage } from "./page/back";
import { FrontPage } from "./page/front";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/back/*" element={<BackPage />} />
            <Route path="/front/*" element={<FrontPage />} />
            <Navigate to="/front" />
        </Routes>
    );
}