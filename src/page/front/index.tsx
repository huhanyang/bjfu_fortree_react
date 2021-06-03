import {Link} from "react-router-dom";
import { Layout, Menu } from 'antd';
import {FrontRoutes} from "./front-routes";
import '../common.css';
const { Header, Content, Footer } = Layout;

export const FrontPage = () => {

    return (
        <Layout style={{ height: '100%'}}>
            <Header className="header">
                <div className="logo">
                    <h1 style={{color: 'green'}}><img src="/icon/tree.svg" style={{paddingBottom: '8px'}} />树木数据库</h1>
                </div>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1"><Link to="/front/index">主页</Link></Menu.Item>
                    <Menu.Item key="2"><Link to="/front/login">登录</Link></Menu.Item>
                </Menu>
            </Header>
            <Layout>
                <Content style={{ margin: '24px 16px 0', height: '100%' }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        <FrontRoutes />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design React ©2018 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    );
}