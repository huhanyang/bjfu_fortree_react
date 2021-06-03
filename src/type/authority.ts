import {User} from "./user";

export type AuthorityType = "CREATE_ANY_WOODLAND"|"ADD_RECORD_IN_ANY_WOODLAND"|"ADD_TREES_IN_ANY_RECORD"|"DELETE_ANY_WOODLAND"|
    "DELETE_RECORD_IN_ANY_WOODLAND"|"DELETE_TREES_IN_ANY_RECORD"|"EDIT_ANY_WOODLAND"|
    "EDIT_RECORD_IN_ANY_WOODLAND"|"EXPORT_ANY_INFO";

export interface Authority {
    id: number;
    createdTime: string;
    lastModifiedTime: string;
    user?: User;
    type: AuthorityType;
}

export function getAuthorityTypeInfo(type: AuthorityType) {
    switch(type) {
        case 'CREATE_ANY_WOODLAND':
            return '创建林地无需审批';
        case 'ADD_RECORD_IN_ANY_WOODLAND':
            return '添加任何林地中的记录无需审批';
        case 'ADD_TREES_IN_ANY_RECORD':
            return '添加任何记录中的树木无需审批';
        case 'DELETE_ANY_WOODLAND':
            return '删除所有林地';
        case 'DELETE_RECORD_IN_ANY_WOODLAND':
            return '删除任何林地中的记录无需审批';
        case 'DELETE_TREES_IN_ANY_RECORD':
            return '删除任何记录中的树木无需审批';
        case 'EDIT_ANY_WOODLAND':
            return '编辑任何林地的信息无需审批';
        case 'EDIT_RECORD_IN_ANY_WOODLAND':
            return '编辑任何林地中的记录无需审批';
        case 'EXPORT_ANY_INFO':
            return '导出任何信息无需审批';
        default:
            return type;
    }
}