import { Routes, Route, Navigate } from "react-router";
import {Login} from "./login";
import {Register} from "./register";

export const UnAuthRoutes = () => {
    return (
        <Routes>
            <Route path={"/login/*"} element={<Login />} />
            <Route path={"/register/*"} element={<Register />} />
            <Navigate to={"login"} />
        </Routes>
    );
}