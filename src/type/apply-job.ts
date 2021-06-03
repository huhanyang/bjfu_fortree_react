import {User} from "./user";
import {OssFile} from "./oss-file";

export type ApplyJobType = "CREATE_WOODLAND"|"ADD_RECORD_IN_WOODLAND"|"ADD_TREES_IN_RECORD"|
    "ADD_TREES_BY_EXCEL_IN_RECORD"|"DELETE_WOODLAND"|"DELETE_RECORD_IN_WOODLAND"|
    "DELETE_TREES_IN_RECORD"|"EDIT_WOODLAND"|"EDIT_RECORD"|"EXPORT_WOODLANDS_INFO"|"EXPORT_WOODLANDS_IN_BOUNDS";

export type ApplyJobState = "APPLYING"|"CANCELLED"|"PASSED"|"PASSED_EXECUTION_SUCCESS"|"PASSED_EXECUTION_FAILED"|"NOT_PASSED";

export interface ApplyJob {
    id: number;
    createdTime: string;
    lastModifiedTime: string;
    applyUser?: User;
    type: ApplyJobType;
    applyParam: string;
    uploadFile?: OssFile;
    downloadFile?: OssFile;
    state: ApplyJobState;
    operateUser?: User;
    msg: string;
    operateTime: string;
}

export function getApplyJobStateInfo(state: ApplyJobState) {
    switch(state) {
        case 'APPLYING':
            return '申请中';
        case 'CANCELLED':
            return '申请撤销';
        case 'PASSED':
            return '申请通过';
        case 'PASSED_EXECUTION_SUCCESS':
            return '申请通过执行成功';
        case 'PASSED_EXECUTION_FAILED':
            return '申请通过但执行失败';
        case 'NOT_PASSED':
            return '申请未通过';
        default:
            return state;
    }
}

export function getApplyJobTypeInfo(type: ApplyJobType) {
    switch(type) {
        case 'CREATE_WOODLAND':
            return '创建林地';
        case 'ADD_RECORD_IN_WOODLAND':
            return '为林地添加记录';
        case 'ADD_TREES_IN_RECORD':
            return '为记录添加树木';
        case 'ADD_TREES_BY_EXCEL_IN_RECORD':
            return '通过excel为记录添加树木';
        case 'DELETE_WOODLAND':
            return '删除林地';
        case 'DELETE_RECORD_IN_WOODLAND':
            return '删除林地中的记录';
        case 'DELETE_TREES_IN_RECORD':
            return '删除记录中的树木';
        case 'EDIT_WOODLAND':
            return '编辑林地信息';
        case 'EDIT_RECORD':
            return '编辑记录信息';
        case 'EXPORT_WOODLANDS_INFO':
            return '导出选中林地信息';
        case 'EXPORT_WOODLANDS_IN_BOUNDS':
            return '导出范围内的林地';
        default:
            return type;
    }
}