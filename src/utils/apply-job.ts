import {PageAndSingleFieldSorterRequest} from "../type/request";
import {ApplyJob, ApplyJobState, ApplyJobType} from "../type/apply-job";
import {useHttp} from "./http";
import {useMutation, useQuery} from "react-query";
import {cleanObject} from "./index";
import {useNoOpsConfig} from "./use-optimistic-options";
import {EditRecordRequestParams} from "./woodland";


export interface GetApplyJobsRequestParams extends PageAndSingleFieldSorterRequest{
    type: ApplyJobType[];
    state: ApplyJobState[];
}

export const useApplyJobs = (params: Partial<GetApplyJobsRequestParams>) => {
    const client = useHttp();
    return useQuery<ApplyJob[]>(
        ["apply-job", "apply-jobs", cleanObject(params)],
        () => client(`applyJob/getApplyJobs`, {data: params, method: "POST"}),
        {enabled: Boolean(params)}
    );
}

export const useApplyJob = (id: number) => {
    const client = useHttp();
    return useQuery<ApplyJob>(
        ["apply-job", id],
        () => client(`applyJob/getApplyJobDetail`, {data: {id}}),
        {enabled: Boolean(id)}
    );
}

export const useMyApplyJobs = (params: Partial<GetApplyJobsRequestParams>) => {
    const client = useHttp();
    return useQuery<ApplyJob[]>(
        ["apply-job", "apply-jobs", cleanObject(params)],
        () => client(`applyJob/getMyApplyJobs`, {data: params, method: "POST"}),
        {enabled: Boolean(params)}
    );
}


export interface ApprovalApplyJobRequestParams {
    applyJobId: number;
    state: ApplyJobState;
    msg: string;
}

export const useApprovalApplyJob = () => {
    const client = useHttp();
    return useMutation(
        (params: ApprovalApplyJobRequestParams) =>
            client(`applyJob/approvalApplyJob`, {
                method: "POST",
                data: params
            }),
        useNoOpsConfig(["apply-job"])
    );
}

export const useCancelApplyJob = () => {
    const client = useHttp();
    return useMutation(
        (id: number) =>
            client(`applyJob/cancelApplyJob`, {
                method: "POST",
                data: {id}
            }),
        useNoOpsConfig(["apply-job"])
    );
}

// todo useDownloadFile 使用getApplyJobDownloadFileUrl接口 并生成a标签 直接进行下载