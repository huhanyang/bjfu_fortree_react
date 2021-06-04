import React, {ReactNode} from "react";
import {User} from "../type/user";
import {http} from "../utils/http";
import {useMount} from "../utils";
import {useAsync} from "../utils/use-async";
import * as auth from "../auth-provider";
import {localStorageKey, LoginRequestParams, RegisterRequestParams} from "../auth-provider";
import {useQueryClient} from "react-query";
import {message} from "antd";

const bootstrapUser = async () => {
    let user = null;
    const token = auth.getToken();
    if (token) {
        // 刷新token
        user = await http("user/me", {token});
        if(user&&user.token&&user.token.length>10) {
            window.localStorage.setItem(localStorageKey, user.token || "");
        }
    }
    return user;
};

const AuthContext = React.createContext<
    | {
    user: User | null;
    login: (params: LoginRequestParams) => Promise<void>;
    register: (params: RegisterRequestParams) => Promise<void>;
    logout: () => Promise<void>;
}
    | undefined
    >(undefined);
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const {
        data: user,
        error,
        isLoading,
        isIdle,
        isError,
        run,
        setData: setUser,
    } = useAsync<User | null>();
    const queryClient = useQueryClient();

    const login = (params: LoginRequestParams) => auth.login(params).then(setUser);
    const register = (params: RegisterRequestParams) => auth.register(params).then(setUser);
    const logout = () => auth.logout().then(() => {
        setUser(null);
        queryClient.clear();
    });

    useMount(() => {
        run(bootstrapUser());
    });

    if (isIdle || isLoading) {
        return <>loading...</>;
    }

    if (isError) {
        return <>error occur:{error?.message}</>;
    }

    return (
        <AuthContext.Provider
            children={children}
            value={{ user, login, register, logout }}
        />
    );
};

export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth必须在AuthProvider中使用");
    }
    return context;
};
