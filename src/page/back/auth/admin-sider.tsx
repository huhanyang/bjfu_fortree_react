import {Layout, Menu} from "antd";
import {GlobalOutlined, NotificationOutlined, UserOutlined,} from "@ant-design/icons";
import React from "react";
import {Link} from "react-router-dom";
import {generatePath} from "react-router";
import {useAuth} from "../../../context/auth-context";

const { SubMenu } = Menu;
const { Sider } = Layout;

export const AdminSider = ({
                              collapsed,
                              setCollapsed,
                          }: {
    collapsed: boolean;
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}) => {

    const { user: me } = useAuth();

    return (
        <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            breakpoint="md"
            collapsedWidth="0"
            width={200}
            onBreakpoint={(broken) => {
                setCollapsed(broken);
            }}
        >
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                style={{ height: "100%", borderRight: 0 }}
            >
                <SubMenu key="sub1" icon={<UserOutlined />} title="用户">
                    <Menu.Item key="1">
                        <Link to={generatePath("/back/user/info/:account", {account: String(me?.account),})}>
                            个人信息
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2"><Link to="/back/user/list">用户管理</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<GlobalOutlined />} title="林地">
                    <Menu.Item key="3"><Link to="/back/woodland/map">林地地图</Link></Menu.Item>
                    <Menu.Item key="4"><Link to="/back/woodland/list">林地列表</Link></Menu.Item>
                    <Menu.Item key="5"><Link to="/back/woodland/list-created">我的林地</Link></Menu.Item>
                    <Menu.Item key="6"><Link to="/back/woodland/create">创建林地</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="sub3" icon={<NotificationOutlined />} title="申请">
                    <Menu.Item key="7"><Link to="/back/apply-job/list">申请列表</Link></Menu.Item>
                    <Menu.Item key="8"><Link to="/back/apply-job/list-created">我的申请</Link></Menu.Item>
                </SubMenu>
            </Menu>
        </Sider>
    );
}