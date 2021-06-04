import { Layout, Menu } from "antd";
import {
    LaptopOutlined,
    NotificationOutlined,
    UserOutlined,
} from "@ant-design/icons";
import React from "react";
import { Link } from "react-router-dom";

const { SubMenu } = Menu;
const { Sider } = Layout;

export const UserSider = ({
                              collapsed,
                              setCollapsed,
                          }: {
    collapsed: boolean;
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}) => {

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
                <SubMenu key="sub1" icon={<UserOutlined />} title="林地信息">
                    <Menu.Item key="1">林地地图</Menu.Item>
                    <Menu.Item key="2">林地列表</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<LaptopOutlined />} title="我的申请">
                    <Menu.Item key="5">我的申请</Menu.Item>
                    <Menu.Item key="6">option6</Menu.Item>
                </SubMenu>
                <SubMenu key="sub3" icon={<NotificationOutlined />} title="林地管理">
                    <Menu.Item key="9">我管理的林地</Menu.Item>
                    <Menu.Item key="10">option10</Menu.Item>
                </SubMenu>
            </Menu>
        </Sider>
    );
}