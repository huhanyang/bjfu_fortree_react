import {Route, Routes} from "react-router";
import {UserInfo} from "./user-info";
import {UserList} from "./user-list";
import {useAuth} from "../../../../context/auth-context";

export const UserRoutes = () => {

    const {user: me} = useAuth();

    const AdminRoutes = () => {
        return (
            <Routes>
                <Route path="/info/:account" element={<UserInfo />} />
                <Route path="/list" element={<UserList />} />
            </Routes>
        );
    }

    const UserRoutes = () => {
        return (
            <Routes>
                <Route path="/info/:account" element={<UserInfo />} />
            </Routes>
        );
    }

    return (
        <>
            {me?.type==="ADMIN"?<AdminRoutes/>:<UserRoutes/>}
        </>
    );
}