import React, {useState} from "react";
import styled from "@emotion/styled";
import {Avatar, Button, Dropdown, Layout, Menu} from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import {Link} from "react-router-dom";
import {generatePath, useNavigate} from "react-router";
import {AuthRoutes} from "./auth-routes";
import {useAuth} from "../../../context/auth-context";
import {AdminSider} from "./admin-sider";
import {UserSider} from "./user-sider";


export const AuthenticatedApp = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const menu = (
        <Menu>
            <Menu.Item key="my-info">
                <Link
                    to={generatePath("/back/user/info/:account", {
                        account: String(user?.account),
                    })}
                >
                    个人信息
                </Link>
            </Menu.Item>
            <Menu.Item key="logout">
                <Button type="link" onClick={()=>{
                    logout().then(()=>{navigate("/back/login", { replace: true });});
                }}>退出登录</Button>
            </Menu.Item>
        </Menu>
    );

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Header>
                <Hover
                    onClick={() => {
                        setCollapsed(!collapsed);
                    }}
                >
                    {React.createElement(
                        collapsed ? MenuUnfoldOutlined : MenuFoldOutlined
                    )}
                </Hover>
                <Link to="/front">树木数据库</Link>
                <AvatarDiv>
                    <Dropdown overlay={menu}>
                        <Avatar size="large">{user?.name}</Avatar>
                    </Dropdown>
                </AvatarDiv>
            </Header>
            <Layout>
                {user?.type === "USER" ? (
                    <UserSider collapsed={collapsed} setCollapsed={setCollapsed} />
                ) : (
                    <></>
                )}
                {user?.type === "ADMIN" ? (
                    <AdminSider collapsed={collapsed} setCollapsed={setCollapsed} />
                ) : (
                    <></>
                )}
                <Layout>
                    <Content>
                        <AuthRoutes />
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

const Hover = styled.div`
  padding: 0 24px;
  font-size: 18px;
  line-height: 64px;
  cursor: pointer;
  float: left;
  transition: color 0.3s;
  &:hover {
    color: #1890ff;
  }
`;
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

const AvatarDiv = styled.div`
  float: right;
  padding: 0 24px;
  font-size: 14px;
`;
