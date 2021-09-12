import {useApplyJob, useApprovalApplyJob, useCancelApplyJob} from "../../utils/apply-job";
import {PageLoading} from "../lib";
import {Button, Descriptions, message} from "antd";
import {useAuth} from "../../context/auth-context";
import {getApplyJobStateInfo, getApplyJobTypeInfo} from "../../type/apply-job";
import {UserPopover} from "../user/user-popover";
import {ApplyJobFile} from "./apply-job-file";


export const ApplyJobInfo = ({applyJobId}: { applyJobId: number }) => {

    const {user: me} = useAuth();
    const {data: applyJob, isLoading: isApplyJobLoading} = useApplyJob(applyJobId);
    const {mutateAsync: approvalApplyJob, isLoading: isApprovalApplyJobLoading} = useApprovalApplyJob();
    const {mutateAsync: cancelApplyJob, isLoading: isCancelApplyJobLoading} = useCancelApplyJob();

    const approval = async (state: "PASSED" | "NOT_PASSED") => {
        try {
            await approvalApplyJob({applyJobId, state, msg: state === "PASSED" ? "审批通过" : "审批不通过"});
        } catch (e) {
            message.error(e.message);
        }
    }

    const cancel = async () => {
        try {
            await cancelApplyJob(applyJobId);
        } catch (e) {
            message.error(e.message);
        }
    }

    return (
        <>
            {isApplyJobLoading ? <PageLoading/> : <>
                {applyJob ? <>
                    <Descriptions
                        bordered
                        title="申请详情"
                        extra={
                            me?.type === "ADMIN" ? <>
                                    <Button
                                        loading={isApprovalApplyJobLoading}
                                        onClick={() => {
                                            approval("PASSED");
                                        }}
                                        disabled={applyJob.state !== "APPLYING"}
                                    >通过</Button>
                                    <Button
                                        loading={isApprovalApplyJobLoading}
                                        onClick={() => {
                                            approval("NOT_PASSED");
                                        }}
                                        disabled={applyJob.state !== "APPLYING"}
                                    >拒绝</Button>
                                </> :
                                <>
                                    {applyJob.applyUser?.account === me?.account ? <>
                                        <Button
                                            loading={isCancelApplyJobLoading}
                                            onClick={cancel}
                                            disabled={applyJob.state !== "APPLYING"}
                                        >撤销申请</Button>
                                    </> : <></>}
                                </>
                        }
                    >
                        <Descriptions.Item label="申请类型">{getApplyJobTypeInfo(applyJob.type)}</Descriptions.Item>
                        <Descriptions.Item label="申请人">{<UserPopover user={applyJob.applyUser}/>}</Descriptions.Item>
                        <Descriptions.Item
                            label="申请时间">{new Date(applyJob.createdTime).toLocaleString()}</Descriptions.Item>
                        <Descriptions.Item label="申请状态">{getApplyJobStateInfo(applyJob.state)}</Descriptions.Item>
                        <Descriptions.Item label="状态信息">{applyJob.msg}</Descriptions.Item>
                        {applyJob.operateUser ? <>
                            <Descriptions.Item label="操作人">{<UserPopover
                                user={applyJob.operateUser}/>}</Descriptions.Item>
                            <Descriptions.Item
                                label="操作时间">{new Date(applyJob.operateTime).toLocaleString()}</Descriptions.Item>
                        </> : <></>}
                        <Descriptions.Item label="申请文件">{<ApplyJobFile applyJobId={applyJobId} isUploadFile={true}
                                                                       file={applyJob.uploadFile}/>}</Descriptions.Item>
                        <Descriptions.Item label="下载文件">{<ApplyJobFile applyJobId={applyJobId} isUploadFile={false}
                                                                       file={applyJob.downloadFile}/>}</Descriptions.Item>
                        <Descriptions.Item span={3} label="申请参数">{applyJob.applyParam}</Descriptions.Item>
                    </Descriptions>
                </> : <></>}
            </>}
        </>
    );
}