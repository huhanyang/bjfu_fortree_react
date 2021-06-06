import qs from "qs";
import {useCallback} from "react";
import {message} from "antd";
import {useAuth} from "../context/auth-context";
import * as auth from "../auth-provider";

const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
    token?: string;
    data?: object;
    isFile?: boolean;
}

export const http = async (
    endpoint: string,
    { data, token, headers, ...customConfig }: Config = {}
) => {
    // 兼容上传文件时不需要设置content-type 由fetch自动设置
    const contentType = customConfig.isFile?{}:{
        "Content-Type": data ? "application/json" : ""
    } as {}

    const config = {
        method: "GET",
        headers: {
            Authorization: token ? `Bearer ${token}` : "",
            ...contentType
        },
        ...customConfig,
    };
    if (config.method.toUpperCase() === "GET") {
        endpoint += `?${qs.stringify(data)}`;
    } else if (config.method.toUpperCase() === "DELETE") {
        endpoint += `?${qs.stringify(data)}`;
    } else if(config.isFile) {
        // @ts-ignore
        config.body = data;
    } else {
        config.body = JSON.stringify(data || {});
    }

    // axios 和 fetch 的表现不一样，axios可以直接在返回状态不为2xx的时候抛出异常
    return window
        .fetch(`${apiUrl}/${endpoint}`, config)
        .then(async (response) => {
            const data = await response.json();
            if(data&&data.code&&response.ok) {
                if(data.code === 202 || data.code === 303 || data.code === 304 || data.code === 305) {
                    // token出错
                    await auth.logout();
                    message.error("请重新登录");
                    window.location.reload();
                    return Promise.reject({ message: "请重新登录" });
                }
                if (data.code === 101) {
                    return data.object;
                } else {
                    message.error(data.msg);
                }
            }
            return Promise.reject(response.statusText);
        });
};

// JS 中的typeof，是在runtime时运行的
// return typeof 1 === 'number'

// TS 中的typeof，是在静态环境运行的
// return (...[endpoint, config]: Parameters<typeof http>) =>
export const useHttp = () => {
    const { user } = useAuth();
    // utility type 的用法：用泛型给它传入一个其他类型，然后utility type对这个类型进行某种操作
    return useCallback(
        (...[endpoint, config]: Parameters<typeof http>) =>
            http(endpoint, { ...config, token: user?.token }),
        [user?.token]
    );
};
