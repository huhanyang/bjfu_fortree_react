import {Record} from "./record";
import {Woodland} from "./woodland";
import {Authority} from "./authority";
import {ApplyJob} from "./apply-job";

export type UserType = "USER" | "ADMIN";
export type UserState = "ACTIVE" | "BANNED" | "UNACTIVE";

export interface User {
    id: number;
    createdTime: string;
    lastModifiedTime: string;
    account: string;
    name: string;
    organization: string;
    type: UserType;
    state: UserState;
    authorities?: Authority[];
    woodlands?: Woodland[];
    records?: Record[];
    applyJobs?: ApplyJob[];
    phone: string;
    email: string;
    token?: string;
}

export function getUserTypeInfo(type: UserType) {
    switch(type) {
        case 'USER':
            return '普通用户';
        case 'ADMIN':
            return '管理员';
        default:
            return type;
    }
}

export function getUserStateInfo(state: UserState) {
    switch(state) {
        case 'ACTIVE':
            return '活跃';
        case 'BANNED':
            return '封禁';
        case "UNACTIVE":
            return '未激活';
        default:
            return state;
    }
}