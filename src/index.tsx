import React from 'react';
import ReactDOM from 'react-dom';
import {ConfigProvider} from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import './index.css';
import {AppRoutes} from "./app-routes";
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from "./context/auth-context";
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";

ReactDOM.render(
  <React.StrictMode>
      <ConfigProvider locale={zhCN}>
          <QueryClientProvider client={new QueryClient()}>
              <BrowserRouter>
                  <AuthProvider>
                    <AppRoutes />
                  </AuthProvider>
              </BrowserRouter>
              <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
      </ConfigProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
