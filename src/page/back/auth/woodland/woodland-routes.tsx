import {Route, Routes} from "react-router";
import {useAuth} from "../../../../context/auth-context";
import {WoodlandInfo} from "./woodland-info";
import {WoodlandCreate} from "./woodland-create";
import {WoodlandList} from "./woodland-list";
import {WoodlandListCreated} from "./woodland-list-created";
import {WoodlandMap} from "./woodland-map";

export const WoodlandRoutes = () => {

    const {user: me} = useAuth();

    const AdminRoutes = () => {
        return (
            <Routes>
                <Route path="/map" element={<WoodlandMap/>}/>
                <Route path="/create" element={<WoodlandCreate/>}/>
                <Route path="/info/:id" element={<WoodlandInfo/>}/>
                <Route path="/list" element={<WoodlandList/>}/>
                <Route path="/list-created" element={<WoodlandListCreated/>}/>
            </Routes>
        );
    }

    const UserRoutes = () => {
        return (
            <Routes>
                <Route path="/map" element={<WoodlandMap/>}/>
                <Route path="/create" element={<WoodlandCreate/>}/>
                <Route path="/info/:id" element={<WoodlandInfo/>}/>
                <Route path="/list" element={<WoodlandList/>}/>
                <Route path="/list-created" element={<WoodlandListCreated/>}/>
            </Routes>
        );
    }

    return (
        <>
            {me?.type === "ADMIN" ? <AdminRoutes/> : <UserRoutes/>}
        </>
    );
}