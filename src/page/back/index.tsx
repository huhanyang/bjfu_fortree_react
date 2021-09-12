import React from 'react';
import {useAuth} from "../../context/auth-context";
import {UnAuthenticatedApp} from "./unauth";
import {AuthenticatedApp} from "./auth";

/**
 * 判断是否登录
 * @constructor
 */
export const BackPage = () => {
    const {user} = useAuth();
    return <>{user ? <AuthenticatedApp/> : <UnAuthenticatedApp/>}</>;
};
