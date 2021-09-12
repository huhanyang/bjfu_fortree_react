import {Popover} from "antd";
import {Link} from "react-router-dom";
import {generatePath} from "react-router";
import {ApplyJob, getApplyJobStateInfo, getApplyJobTypeInfo} from "../../type/apply-job";
import {UserPopover} from "../user/user-popover";


export const ApplyJobPopover = ({applyJob}: { applyJob: ApplyJob | undefined }) => {
    return (
        <>
            {applyJob ? (
                <Popover
                    content={
                        <div>
                            申请类型:{getApplyJobTypeInfo(applyJob.type)}
                            <br/>
                            申请时间:{new Date(applyJob.createdTime).toLocaleString()}
                            <br/>
                            申请状态:{getApplyJobStateInfo(applyJob.state)}
                            <br/>
                            申请信息:{applyJob.msg}
                            {applyJob.operateUser ? <>
                                <br/>
                                操作人:{<UserPopover user={applyJob.operateUser}/>}
                                <br/>
                                操作时间:{new Date(applyJob.operateTime).toLocaleString()}
                            </> : <></>}
                        </div>
                    }
                    title="申请详情"
                >
                    <Link
                        to={generatePath("/back/apply-job/info/:id", {
                            id: String(applyJob.id),
                        })}
                    >
                        {getApplyJobTypeInfo(applyJob.type)}
                    </Link>
                </Popover>
            ) : (
                <></>
            )}
        </>
    );
}