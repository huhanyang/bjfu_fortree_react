import {useAuth} from "../../../../context/auth-context";
import {getUserStateInfo, getUserTypeInfo, User} from "../../../../type/user";
import {
    FilterConfirmProps,
    FilterValue,
    SorterResult,
    TableCurrentDataSource,
    TablePaginationConfig,
} from "antd/lib/table/interface";
import {Button, Input, message, Popconfirm, Space, Table} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import {SingleFieldSorter} from "../../../../type/request";
import {GetUsersRequestParams, useChangeUserState, useUsers} from "../../../../utils/user";
import {useState} from "react";
import {Link} from "react-router-dom";
import {generatePath} from "react-router";
import {UserAuthoritiesManageModal} from "./user-authorities-manage-modal";


export const UserList = () => {

    const [requestParams, setRequestParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    } as GetUsersRequestParams);
    const {user: me} = useAuth();
    const {mutateAsync: changeUserState, isLoading: isChangeUserStateLoading} = useChangeUserState();
    const {data: users, isLoading: isUsersLoading} = useUsers(requestParams);
    const [authorityManageModalVisible, setAuthorityManageModalVisible] = useState(false);
    const [authorityManageAccount, setAuthorityManageAccount] = useState("");

    const handleTableChange = (
        pagination: TablePaginationConfig,
        filters: Record<string, FilterValue | null>,
        sorter: SorterResult<User> | SorterResult<User>[],
        extra: TableCurrentDataSource<User>
    ) => {
        if (!Array.isArray(sorter)) {
            sorter = [sorter];
        }
        const newSorter = sorter.map((s) => {
            return {
                ...s,
                order: s.order === "descend" ? "DESC" : "ASC",
            } as SingleFieldSorter;
        });
        setRequestParams({
            ...requestParams,
            ...filters,
            account: filters.account ? String(filters.account[0]) : "",
            name: filters.name ? String(filters.name[0]) : "",
            organization: filters.organization ? String(filters.organization[0]) : "",
            pagination: pagination,
            sorter: newSorter,
        });

    };

    const filterDropdown = ({
                                setSelectedKeys,
                                selectedKeys,
                                confirm,
                                clearFilters,
                            }: {
        setSelectedKeys: (selectedKeys: React.Key[]) => void;
        selectedKeys: React.Key[];
        confirm: (param?: FilterConfirmProps) => void;
        clearFilters?: () => void;
    }) => (
        <div style={{padding: 8}}>
            <Input
                value={selectedKeys[0]}
                onChange={(e) =>
                    setSelectedKeys(e.target.value ? [e.target.value] : [])
                }
                onPressEnter={() => confirm()}
                style={{width: 188, marginBottom: 8, display: "block"}}
            />
            <Space>
                <Button
                    type="primary"
                    onClick={() => confirm()}
                    icon={<SearchOutlined/>}
                    size="small"
                    style={{width: 90}}
                >
                    ??????
                </Button>
                <Button
                    onClick={() => {
                        if (clearFilters) {
                            clearFilters();
                        }
                    }}
                    size="small"
                    style={{width: 90}}
                >
                    ??????
                </Button>
            </Space>
        </div>
    );

    return (
        <>
            <Table<User>
                rowKey="account"
                dataSource={users?.content}
                pagination={{...requestParams.pagination, total: users?.totalElements}}
                loading={isUsersLoading}
                onChange={handleTableChange}
                bordered
                scroll={{x: "100%"}}
            >
                <Table.Column<User>
                    title="??????"
                    key="account"
                    dataIndex="account"
                    sorter={{multiple: 1}}
                    filterIcon={(filtered: boolean) => (
                        <SearchOutlined
                            style={{color: filtered ? "#1890ff" : undefined}}
                        />
                    )}
                    filterDropdown={filterDropdown}
                />
                <Table.Column<User>
                    title="??????"
                    dataIndex="type"
                    key="type"
                    sorter={{multiple: 2}}
                    filters={[
                        {text: "??????", value: "USER"},
                        {text: "?????????", value: "ADMIN"}
                    ]}
                    render={(text, record) => getUserTypeInfo(record.type)}
                />
                <Table.Column<User>
                    title="??????"
                    dataIndex="state"
                    key="state"
                    sorter={{multiple: 3}}
                    filters={[
                        {text: "??????", value: "ACTIVE"},
                        {text: "??????", value: "BANNED"}
                    ]}
                    render={(text, record) => getUserStateInfo(record.state)}
                />
                <Table.Column<User>
                    title="??????"
                    key="name"
                    dataIndex="name"
                    sorter={{multiple: 4}}
                    filterIcon={(filtered: boolean) => (
                        <SearchOutlined
                            style={{color: filtered ? "#1890ff" : undefined}}
                        />
                    )}
                    filterDropdown={filterDropdown}
                />
                <Table.Column<User>
                    title="??????"
                    key="organization"
                    dataIndex="organization"
                    sorter={{multiple: 5}}
                    filterIcon={(filtered: boolean) => (
                        <SearchOutlined
                            style={{color: filtered ? "#1890ff" : undefined}}
                        />
                    )}
                    filterDropdown={filterDropdown}
                />
                <Table.Column<User>
                    title="??????"
                    key="phone"
                    dataIndex="phone"
                />
                <Table.Column<User>
                    title="??????"
                    key="email"
                    dataIndex="email"
                />
                <Table.Column<User>
                    title="????????????"
                    key="createdTime"
                    dataIndex="createdTime"
                    sorter={{multiple: 6}}
                    render={(text, record) => new Date(record.createdTime).toLocaleString()}
                />
                <Table.Column<User>
                    title="??????"
                    key="operate"
                    render={(text, record) => {
                        return (
                            <>
                                <Popconfirm
                                    onConfirm={async () => {
                                        try {
                                            await changeUserState({
                                                account: record.account,
                                                newState: record.state === "ACTIVE" ? "BANNED" : "ACTIVE"
                                            });
                                        } catch (e) {
                                            message.error(e.message);
                                        }
                                    }}
                                    title="?????????????????????????"
                                    okText="??????"
                                    cancelText="??????"
                                >
                                    <Button
                                        type="link"
                                        loading={isChangeUserStateLoading}
                                    >{record.state === "ACTIVE" ? "??????" : "??????"}</Button>
                                </Popconfirm>
                                <Link
                                    to={generatePath("/back/user/info/:account", {
                                        account: record.account,
                                    })}
                                >??????</Link>
                                <Button
                                    type="link"
                                    onClick={() => {
                                        setAuthorityManageAccount(record.account);
                                        setAuthorityManageModalVisible(true);
                                    }}
                                >????????????</Button>
                            </>
                        );
                    }}
                />
            </Table>
            {
                me?.type === "ADMIN" ? <>
                    <UserAuthoritiesManageModal
                        account={authorityManageAccount}
                        visible={authorityManageModalVisible}
                        setVisible={setAuthorityManageModalVisible}
                    />
                </> : <></>
            }
        </>
    );
}