import {User} from "./type/user";
import {Result} from "./type/result";
import {message} from "antd";

const apiUrl = process.env.REACT_APP_API_URL;

export const localStorageKey = "__auth_provider_token__";

export const getToken = () => window.localStorage.getItem(localStorageKey);

const handleUserResponse = (result: Result<User>) => {
    if (result.code !== 101) {
        message.error(result.msg);
        return null;
    }
    if (result.object.token) {
        window.localStorage.setItem(localStorageKey, result.object.token);
    }
    return result.object;
};

export interface LoginRequestParams {
    account: string;
    password: string;
}

export const login = (data: LoginRequestParams) => {
    return fetch(`${apiUrl}/user/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then(async (response) => {
        if (response.ok) {
            return handleUserResponse(await response.json());
        } else {
            return Promise.reject(await response.json());
        }
    });
};

export interface RegisterRequestParams {
    account: string;
    password: string;
    name: string;
    organization: string;
}

export const register = (data: RegisterRequestParams) => {
    return fetch(`${apiUrl}/user/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then(async (response) => {
        if (response.ok) {
            message.warn("请等待管理员审批")
            return handleUserResponse(await response.json());
        } else {
            return Promise.reject(await response.json());
        }
    });
};

export const refresh = () => {
    return fetch(`${apiUrl}/user/me`, {
        headers: {
            Authorization: getToken() ? `Bearer ${getToken()}` : "",
        },
    }).then(async (response) => {
        if (response.ok) {
            return handleUserResponse(await response.json());
        } else {
            return Promise.reject(await response.json());
        }
    });
};

export const logout = async () => window.localStorage.removeItem(localStorageKey);
