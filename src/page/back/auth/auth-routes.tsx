import React from "react";
import {Navigate, Route, Routes} from "react-router";
import {UserRoutes} from "./user/user-routes";
import {WoodlandRoutes} from "./woodland/woodland-routes";
import {ApplyJobRoutes} from "./apply-job/apply-job-routes";

export const AuthRoutes = () => {

    return (
        <>
            <Routes>
                <Route path="/user/*" element={<UserRoutes />} />
                <Route path="/woodland/*" element={<WoodlandRoutes />} />
                <Route path="/apply-job/*" element={<ApplyJobRoutes />} />
                <Navigate to="/back/woodland/map" />
            </Routes>
        </>
    );
}