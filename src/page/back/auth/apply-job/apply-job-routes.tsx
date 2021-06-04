import {useAuth} from "../../../../context/auth-context";
import {Route, Routes} from "react-router";
import {ApplyJobInfo} from "./apply-job-info";
import {ApplyJobListCreated} from "./apply-job-list-created";
import {ApplyJobList} from "./apply-job-list";

export const ApplyJobRoutes = () => {

    const {user: me} = useAuth();

    const AdminRoutes = () => {
        return (
            <Routes>
                <Route path="/info/:id" element={<ApplyJobInfo />} />
                <Route path="/list-created" element={<ApplyJobListCreated />} />
                <Route path="/list" element={<ApplyJobList />} />
            </Routes>
        );
    }

    const UserRoutes = () => {
        return (
            <Routes>
                <Route path="/info/:id" element={<ApplyJobInfo />} />
                <Route path="/list-created" element={<ApplyJobListCreated />} />
            </Routes>
        );
    }

    return (
        <>
            {me?.type==="ADMIN"?<AdminRoutes/>:<UserRoutes/>}
        </>
    );
}