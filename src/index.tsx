import React from 'react';
import ReactDOM from 'react-dom';
import {ConfigProvider} from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import "antd/dist/antd.less";
import {AppProviders} from './context';
import {App} from "./app";

ReactDOM.render(
    <React.StrictMode>
        <ConfigProvider locale={zhCN}>
            <AppProviders>
                <App/>
            </AppProviders>
        </ConfigProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// todo 范围导出
