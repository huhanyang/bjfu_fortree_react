import {message, Modal, Transfer} from "antd";
import React from "react";
import {useGrantUserAuthority, useRevokeUserAuthority, useUserInfo} from "../../../../utils/user";
import {AuthorityType, AuthorityTypes, getAuthorityTypeInfo} from "../../../../type/authority";

export const UserAuthoritiesManageModal = ({
                                               account,
                                               visible,
                                               setVisible
                                           }: {
    account: string;
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {

    const {data: user, isLoading: isUserLoading} = useUserInfo(account);
    const {mutateAsync: grantAuthorities} = useGrantUserAuthority();
    const {mutateAsync: revokeAuthorities} = useRevokeUserAuthority();

    return (
        <Modal
            width="90%"
            title="管理用户权限"
            footer={null}
            visible={visible}
            onCancel={() => {
                setVisible(false);
            }}
        >
            <Transfer<{ key: AuthorityType }>
                listStyle={{
                    width: "100%",
                    height: "100%",
                }}
                disabled={isUserLoading}
                titles={['未拥有的', '拥有的']}
                dataSource={AuthorityTypes.map(type => {
                    return {key: type};
                })}
                targetKeys={user?.authorities?.map(authority => authority.type)}
                onChange={async (targetKeys, direction, moveKeys) => {
                    try {
                        if (direction === "right") {
                            await grantAuthorities({account, authorities: moveKeys as AuthorityType[]});
                        } else {
                            await revokeAuthorities({account, authorities: moveKeys as AuthorityType[]});
                        }
                    } catch (e) {
                        message.error(e.message);
                    }
                }}
                showSearch
                render={item => getAuthorityTypeInfo(item.key)}
            />
        </Modal>
    );
}