import {GetWoodlandsRequestParams, useWoodlands} from "../../../../utils/woodland";
import {useState} from "react";
import {
    FilterConfirmProps,
    FilterValue,
    SorterResult,
    TableCurrentDataSource,
    TablePaginationConfig
} from "antd/lib/table/interface";
import {SingleFieldSorter} from "../../../../type/request";
import {Button, Input, message, Space, Table} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import {getWoodlandShapeInfo, Woodland} from "../../../../type/woodland";
import {User} from "../../../../type/user";
import {UserPopover} from "../../../../component/user/user-popover";
import {generatePath, useNavigate} from "react-router";
import {Link} from "react-router-dom";
import {useExportWoodlandsInfo} from "../../../../utils/export";


export const WoodlandList = () => {

    const [requestParams, setRequestParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    } as GetWoodlandsRequestParams);
    const {data: woodlands, isLoading: isWoodlandsLoading} = useWoodlands(requestParams);
    const [selectedWoodlandIds, setSelectedWoodlandIds] = useState<number[]>([]);
    const {mutateAsync: exportWoodlands, isLoading: isExportWoodlandsLoading} = useExportWoodlandsInfo();
    const navigate = useNavigate();


    const handleTableChange = (
        pagination: TablePaginationConfig,
        filters: Record<string, FilterValue | null>,
        sorter: SorterResult<Woodland> | SorterResult<Woodland>[],
        extra: TableCurrentDataSource<Woodland>
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
            name: filters.name ? String(filters.name[0]) : "",
            country: filters.country ? String(filters.country[0]) : "",
            province: filters.province ? String(filters.province[0]) : "",
            city: filters.city ? String(filters.city[0]) : "",
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

    const hasSelected = selectedWoodlandIds.length > 0;
    return (
        <>
            <div style={{marginBottom: 16}}>
                <Button type="primary" onClick={async () => {
                    try {
                        await exportWoodlands({ids: selectedWoodlandIds})
                            .then(() => {
                                navigate("/back/apply-job/list-created", {replace: true});
                            });
                    } catch (e) {
                        message.error(e.message);
                    }
                }} disabled={!hasSelected} loading={isExportWoodlandsLoading}>
                    ??????????????????
                </Button>
                <span style={{marginLeft: 8}}>{hasSelected ? `????????? ${selectedWoodlandIds.length} ?????????` : ''}</span>
            </div>
            <Table<Woodland>
                rowKey="id"
                dataSource={woodlands?.content}
                rowSelection={{
                    selectedRowKeys: selectedWoodlandIds,
                    onChange: (selectedRowKeys) => {
                        console.log(selectedRowKeys);
                        setSelectedWoodlandIds(selectedRowKeys.map(key => Number(key)));
                    }
                }}
                pagination={{...requestParams.pagination, total: woodlands?.totalElements, showSizeChanger: true}}
                loading={isWoodlandsLoading}
                onChange={handleTableChange}
                bordered
                scroll={{x: "100%"}}
            >
                <Table.Column<Woodland>
                    title="?????????"
                    key="name"
                    dataIndex="name"
                    sorter={{multiple: 1}}
                    filterIcon={(filtered: boolean) => (
                        <SearchOutlined
                            style={{color: filtered ? "#1890ff" : undefined}}
                        />
                    )}
                    filterDropdown={filterDropdown}
                />
                <Table.Column<Woodland>
                    title="?????????"
                    key="creator"
                    dataIndex="creator"
                    render={(value, record) => <UserPopover user={record.creator}/>}
                />
                <Table.Column<Woodland>
                    title="??????"
                    key="country"
                    dataIndex="country"
                    sorter={{multiple: 2}}
                    filterIcon={(filtered: boolean) => (
                        <SearchOutlined
                            style={{color: filtered ? "#1890ff" : undefined}}
                        />
                    )}
                    filterDropdown={filterDropdown}
                />
                <Table.Column<User>
                    title="??????"
                    key="province"
                    dataIndex="province"
                    sorter={{multiple: 3}}
                    filterIcon={(filtered: boolean) => (
                        <SearchOutlined
                            style={{color: filtered ? "#1890ff" : undefined}}
                        />
                    )}
                    filterDropdown={filterDropdown}
                />
                <Table.Column<User>
                    title="??????"
                    key="city"
                    dataIndex="city"
                    sorter={{multiple: 4}}
                    filterIcon={(filtered: boolean) => (
                        <SearchOutlined
                            style={{color: filtered ? "#1890ff" : undefined}}
                        />
                    )}
                    filterDropdown={filterDropdown}
                />
                <Table.Column<Woodland>
                    title="??????"
                    key="shape"
                    dataIndex="shape"
                    sorter={{multiple: 5}}
                    render={(text, record) => getWoodlandShapeInfo(record.shape)}
                />
                <Table.Column<Woodland>
                    title="??????(M)"
                    key="length"
                    dataIndex="length"
                    sorter={{multiple: 6}}
                />
                <Table.Column<Woodland>
                    title="??????(M)"
                    key="width"
                    dataIndex="width"
                    sorter={{multiple: 7}}
                />
                <Table.Column<Woodland>
                    title="????????????"
                    key="createdTime"
                    dataIndex="createdTime"
                    sorter={{multiple: 8}}
                    render={(text, record) => new Date(record.createdTime).toLocaleString()}
                />
                <Table.Column<Woodland>
                    title="??????"
                    key="operate"
                    render={(text, record) => <>
                        <Link
                            to={generatePath("/back/woodland/info/:id", {
                                id: String(record.id),
                            })}
                        >??????</Link>
                    </>}
                />
            </Table>
        </>
    );
}