import React, {useState} from 'react';

import {Button, Layout, Menu, message} from 'antd';
import 'antd/dist/antd.css';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import {BackRoutes} from "./back-routes";
import {useAuth} from "../../context/auth-context";

import '../common.css';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

export const BackPage = () => {

    const { user, logout } = useAuth();

    const HeaderMenu = () => {
        return (
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                <Menu.Item key="1"><Link to="/back/backMap">林地地图</Link></Menu.Item>
                <Menu.Item key="2"><Link to="/back/woodlandList">林地列表</Link></Menu.Item>
                {
                    user?.type === "ADMIN"? <Menu.Item key="3"><Link to="/back/applyJobManage">申请管理</Link></Menu.Item>: <></>
                }
            </Menu>
        );
    }
    const SiderMenu = () => {
        return (
            <Menu
                mode="inline"
                style={{ height: '100%', borderRight: 0 }}
            >
                <SubMenu key="sub1" icon={<UserOutlined />} title="账户管理">
                    <Menu.Item key="1"><Link to="/back/userInfo">个人信息</Link></Menu.Item>
                    <Menu.Item key="2"><Link to="/back/changePassword">修改密码</Link></Menu.Item>
                    <Menu.Item key="3"><Button type="link" onClick={logout}>退出登录</Button></Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<LaptopOutlined />} title="林地管理">
                    <Menu.Item key="4"><Link to="/back/createWoodland">创建林地</Link></Menu.Item>
                    <Menu.Item key="5"><Link to="/back/woodlandList">林地列表</Link></Menu.Item>
                    <Menu.Item key="6"><Link to="/back/woodlandManage">管理林地</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="sub3" icon={<NotificationOutlined />} title="申请与权限">
                    <Menu.Item key="7"><Link to="/back/myApply">我的申请</Link></Menu.Item>
                    <Menu.Item key="8"><Link to="/back/myAuthority">我的权限</Link></Menu.Item>
                    {
                        user?.type==="ADMIN"?
                            <Menu.Item key="9"><Link to="/back/applyJobManage">申请管理</Link></Menu.Item>:
                            <></>
                    }
                    {
                        user?.type==="ADMIN"?
                            <Menu.Item key="10"><Link to='/back/authorityManage'>用户管理</Link></Menu.Item>:
                            <></>
                    }
                </SubMenu>
            </Menu>
        );
    }

    return (
        <>
            <Layout>
                <Header className="header">
                    <div className="logo">
                        <h1 style={{color: 'green'}}><img src="/icon/tree.svg" style={{paddingBottom: '8px'}} />树木数据库</h1>
                    </div>
                    <HeaderMenu />
                </Header>
                <Layout>
                    <Sider
                        className="site-layout-background"
                        breakpoint="lg"
                        collapsedWidth="0"
                    >
                        <SiderMenu/>
                    </Sider>
                    <Layout>
                        <Content style={{ margin: '24px 16px 0', minHeight: '80vh' }}>
                            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                                <BackRoutes />
                            </div>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>Ant Design React ©2018 Created by Ant UED</Footer>
                    </Layout>
                </Layout>
            </Layout>
        </>
    );
}