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
            name:filters.name?String(filters.name[0]):"",
            country:filters.country?String(filters.country[0]):"",
            province:filters.province?String(filters.province[0]):"",
            city:filters.city?String(filters.city[0]):"",
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
        <div style={{ padding: 8 }}>
            <Input
                value={selectedKeys[0]}
                onChange={(e) =>
                    setSelectedKeys(e.target.value ? [e.target.value] : [])
                }
                onPressEnter={() => confirm()}
                style={{ width: 188, marginBottom: 8, display: "block" }}
            />
            <Space>
                <Button
                    type="primary"
                    onClick={() => confirm()}
                    icon={<SearchOutlined />}
                    size="small"
                    style={{ width: 90 }}
                >
                    搜索
                </Button>
                <Button
                    onClick={() => {
                        if (clearFilters) {
                            clearFilters();
                        }
                    }}
                    size="small"
                    style={{ width: 90 }}
                >
                    重置
                </Button>
            </Space>
        </div>
    );

    const hasSelected = selectedWoodlandIds.length > 0;
    return (
        <>
            <div style={{ marginBottom: 16 }}>
                <Button type="primary" onClick={async () => {
                    try {
                        await exportWoodlands({ids: selectedWoodlandIds})
                            .then(()=>{navigate("/back/apply-job/list", { replace: true });});
                    } catch (e) {
                        message.error(e.message);
                    }
                }} disabled={!hasSelected} loading={isExportWoodlandsLoading}>
                    导出林地信息
                </Button>
                <span style={{ marginLeft: 8 }}>{hasSelected ? `选中了 ${selectedWoodlandIds.length} 块林地` : ''}</span>
            </div>
            <Table<Woodland>
                rowKey="id"
                dataSource={woodlands?.content}
                rowSelection={{
                    selectedRowKeys: selectedWoodlandIds,
                    onChange: (selectedRowKeys) => {
                        console.log(selectedRowKeys);
                        setSelectedWoodlandIds(selectedRowKeys.map(key=>Number(key)));
                    }
                }}
                pagination={{...requestParams.pagination, total: woodlands?.totalElements, showSizeChanger: true}}
                loading={isWoodlandsLoading}
                onChange={handleTableChange}
                bordered
                scroll={{ x: "100%" }}
            >
                <Table.Column<Woodland>
                    title="林地名"
                    key="name"
                    dataIndex="name"
                    sorter={{ multiple: 1 }}
                    filterIcon={(filtered: boolean) => (
                        <SearchOutlined
                            style={{ color: filtered ? "#1890ff" : undefined }}
                        />
                    )}
                    filterDropdown={filterDropdown}
                />
                <Table.Column<Woodland>
                    title="创建者"
                    key="creator"
                    dataIndex="creator"
                    render={(value, record) => <UserPopover user={record.creator} />}
                />
                <Table.Column<Woodland>
                    title="国家"
                    key="country"
                    dataIndex="country"
                    sorter={{ multiple: 2 }}
                    filterIcon={(filtered: boolean) => (
                        <SearchOutlined
                            style={{ color: filtered ? "#1890ff" : undefined }}
                        />
                    )}
                    filterDropdown={filterDropdown}
                />
                <Table.Column<User>
                    title="省份"
                    key="province"
                    dataIndex="province"
                    sorter={{ multiple: 3 }}
                    filterIcon={(filtered: boolean) => (
                        <SearchOutlined
                            style={{ color: filtered ? "#1890ff" : undefined }}
                        />
                    )}
                    filterDropdown={filterDropdown}
                />
                <Table.Column<User>
                    title="城市"
                    key="city"
                    dataIndex="city"
                    sorter={{ multiple: 4 }}
                    filterIcon={(filtered: boolean) => (
                        <SearchOutlined
                            style={{ color: filtered ? "#1890ff" : undefined }}
                        />
                    )}
                    filterDropdown={filterDropdown}
                />
                <Table.Column<Woodland>
                    title="形状"
                    key="shape"
                    dataIndex="shape"
                    sorter={{ multiple: 5 }}
                    render={(text, record) => getWoodlandShapeInfo(record.shape)}
                />
                <Table.Column<Woodland>
                    title="长度(M)"
                    key="length"
                    dataIndex="length"
                    sorter={{ multiple: 6 }}
                />
                <Table.Column<Woodland>
                    title="宽度(M)"
                    key="width"
                    dataIndex="width"
                    sorter={{ multiple: 7 }}
                />
                <Table.Column<Woodland>
                    title="创建时间"
                    key="createdTime"
                    dataIndex="createdTime"
                    sorter={{ multiple: 8 }}
                    render={(text, record) => new Date(record.createdTime).toLocaleString()}
                />
                <Table.Column<Woodland>
                    title="操作"
                    key="operate"
                    render={(text, record) => <>
                        <Link
                            to={generatePath("/back/woodland/info/:id", {
                                id: String(record.id),
                            })}
                        >详情</Link>
                    </>}
                />
            </Table>
        </>
    );
}