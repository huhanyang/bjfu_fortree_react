import {useParams} from "react-router";
import {ApplyJobInfo as ApplyJobInfoComponent} from "../../../../component/apply-job/apply-job-info"


export const ApplyJobInfo = () => {

    const { id } = useParams();

    return (
       <>
           {id?<ApplyJobInfoComponent applyJobId={Number(id)} />:<></>}
       </>
    );
}