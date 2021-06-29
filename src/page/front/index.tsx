import {Link} from "react-router-dom";
import {Layout, Menu} from 'antd';
import React from "react";
import {FrontRoutes} from "./front-routes";
import styled from "@emotion/styled";
import {useAuth} from "../../context/auth-context";

export const FrontPage = () => {

    const { user, logout } = useAuth();

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Header>
                <Menu mode="horizontal" defaultSelectedKeys={['1']} style={{float: "left"}}>
                    <Menu.Item key="1"><Link to="/front/map">地图</Link></Menu.Item>
                    {user?<>
                        <Menu.Item key="2"><Link to="/back/login">进入后台</Link></Menu.Item>
                        <Menu.Item key="3">
                            <a href={"/front/map"} onClick={()=>{logout();}}>退出登录</a>
                        </Menu.Item>
                    </>:<>
                        <Menu.Item key="2"><Link to="/back/login">登录</Link></Menu.Item>
                        <Menu.Item key="3"><Link to="/back/register">注册</Link></Menu.Item>
                    </>}
                </Menu>
                <LogoDiv><Link to="/front">树木数据库</Link></LogoDiv>
            </Header>
            <Layout>
                <Layout>
                    <Content>
                        <FrontRoutes />
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
}

const Header = styled(Layout.Header)`
  background: #fff;
  padding: 0;
  text-align: center;
  font-size: 30px;
  font-weight: bold;
`;

const Content = styled(Layout.Content)`
  background: #fff;
  margin: 24px 16px;
  padding: 24px;
`;

const LogoDiv = styled.div`
  float: right;
  padding: 0 24px;
`;