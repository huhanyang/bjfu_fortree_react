import {useChangeUserState, useUserInfo} from "../../utils/user";
import {PageLoading} from "../lib";
import {Button, Descriptions, message, Popconfirm} from "antd";
import {getUserStateInfo, getUserTypeInfo} from "../../type/user";
import {useAuth} from "../../context/auth-context";
import {UserAuthoritiesManageModal} from "../../page/back/auth/user/user-authorities-manage-modal";
import {useState} from "react";
import {getAuthorityTypeInfo} from "../../type/authority";
import {WoodlandPopover} from "../woodland/woodland-popover";

export const UserInfo = ({account}:{account: string}) => {

    const { user: me } = useAuth();
    const {data: user, isLoading: isUserLoading} = useUserInfo(account);
    const {mutateAsync: changeUserState, isLoading: isChangeUserStateLoading} = useChangeUserState();
    const [authorityManageModalVisible, setAuthorityManageModalVisible] = useState(false);

    return (
        <>
            {isUserLoading ? (
                <PageLoading />
            ) : (
                <Descriptions
                    title="个人信息"
                    extra={me?.type==="ADMIN"&&user?<>
                        <Button onClick={()=>{setAuthorityManageModalVisible(true);}}>管理权限</Button>
                        <Popconfirm
                            onConfirm={async () => {
                                try {
                                    await changeUserState({
                                        account: account,
                                        newState: user.state === "ACTIVE"?"BANNED":"ACTIVE"
                                    });
                                } catch (e) {
                                    message.error(e.message);
                                }
                            }}
                            title="确定进行此操作么?"
                            okText="确定"
                            cancelText="取消"
                        >
                            <Button loading={isChangeUserStateLoading}>{user.state==="ACTIVE"?"封禁":"解封"}</Button>
                        </Popconfirm>
                    </>:<></>}
                >
                    <Descriptions.Item label="账号">{user?.account}</Descriptions.Item>
                    <Descriptions.Item label="姓名">{user?.account}</Descriptions.Item>
                    <Descriptions.Item label="组织">{user?.name}</Descriptions.Item>
                    <Descriptions.Item label="类型">{user?getUserTypeInfo(user.type):""}</Descriptions.Item>
                    <Descriptions.Item label="状态">{user?getUserStateInfo(user.state):""}</Descriptions.Item>
                    <Descriptions.Item label="注册时间">{user?new Date(user?.createdTime).toLocaleDateString():""}</Descriptions.Item>
                    <Descriptions.Item span={2} label="权限">{user?.authorities?.map(authority=><>{getAuthorityTypeInfo(authority.type)}<br/></>)}</Descriptions.Item>
                    <Descriptions.Item span={2} label="林地">{user?.woodlands?.map(woodland=><WoodlandPopover woodland={woodland} />)}</Descriptions.Item>
                </Descriptions>
            )}
            {
                me?.type==="ADMIN"&&user?<>
                    <UserAuthoritiesManageModal
                        account={account}
                        visible={authorityManageModalVisible}
                        setVisible={setAuthorityManageModalVisible}
                    />
                </>:<></>
            }
        </>
    );
}