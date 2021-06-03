import {useHttp} from "./http";
import {User, UserState, UserType} from "../type/user";
import {useMutation, useQuery} from "react-query";
import {AuthorityType} from "../type/authority";
import {useNoOpsConfig} from "./use-optimistic-options";
import {PageAndSingleFieldSorterRequest} from "../type/request";

export const useUserInfo = (account?: string) => {
    const client = useHttp();
    return useQuery<User>(
        ["user", "info", account],
        () => client(`user/getUserInfo`, {data: {account}}),
        {enabled: Boolean(account)}
    );
};

export interface GetUsersRequestParams extends PageAndSingleFieldSorterRequest {
    account: string[];
    name: string[];
    organization: string[];
    state: UserState[];
    type: UserType[];
}

export const useUsers = (params: GetUsersRequestParams) => {
    const client = useHttp();
    return useQuery<User>(
        ["user", "users"],
        () => client(`user/getUsers`, {data: params}),
        {enabled: Boolean(params)}
    );
}

export interface ChangeUserPasswordRequestParams {
    oldPassword: string;
    newPassword: string;
}

export const useChangePassword = () => {
    const client = useHttp();
    return useMutation(
        (params: ChangeUserPasswordRequestParams) =>
            client(`user/changePassword`, {
                method: "POST",
                data: params
            }),
        useNoOpsConfig(["user"])
    );
}

export interface GrantUserAuthorityRequestParams {
    account: string;
    authorities: AuthorityType[];
}

export const useGrantUserAuthority = () => {
    const client = useHttp();
    return useMutation(
        (params: GrantUserAuthorityRequestParams) =>
            client(`user/grantUserAuthority`, {
                method: "POST",
                data: params
            }),
        useNoOpsConfig(["user"])
    );
}

export interface RevokeUserAuthorityRequestParams {
    account: string;
    authorities: AuthorityType[];
}

export const useRevokeUserAuthority = () => {
    const client = useHttp();
    return useMutation(
        (params: RevokeUserAuthorityRequestParams) =>
            client(`user/revokeUserAuthority`, {
                method: "POST",
                data: params
            }),
        useNoOpsConfig(["user"])
    );
}

export interface ChangeUserStateRequestParams {
    account: string;
    newState: UserState;
}

export const useChangeUserState = () => {
    const client = useHttp();
    return useMutation(
        (params: ChangeUserStateRequestParams) =>
            client(`user/changeUserState`, {
                method: "POST",
                data: params
            }),
        useNoOpsConfig(["user"])
    );
}

