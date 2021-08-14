import {useAuth} from "../../context/auth-context";
import {GetTreesRequestParams, useDeleteTrees, useTrees, useWoodland} from "../../utils/woodland";
import {useState} from "react";
import {Button, Input, message, Space, Table} from "antd";
import {Tree} from "../../type/tree";
import {SearchOutlined} from "@ant-design/icons";
import {
    FilterConfirmProps,
    FilterValue,
    SorterResult,
    TableCurrentDataSource,
    TablePaginationConfig
} from "antd/lib/table/interface";
import {SingleFieldSorter} from "../../type/request";

export const TreeList = ({woodlandId, recordId}:{woodlandId: number, recordId: number}) => {

    // todo recordId 变更 trees没有动作

    const [requestParams, setRequestParams] = useState<GetTreesRequestParams>({
        recordId,
        pagination: {
            current: 1,
            pageSize: 10,
        }
    });

    const {user: me} = useAuth();
    const { data: woodland } = useWoodland(woodlandId);
    const { data: trees, isLoading: isTreesLoading } = useTrees({...requestParams, recordId});
    const [selectedTreeIds, setSelectedTreeIds] = useState<number[]>([]);
    const {mutateAsync: deleteTrees, isLoading: isDeleteTreesLoading} = useDeleteTrees();


    const deleteTreesRequest = async () => {
        try {
            await deleteTrees({recordId, treeIds: selectedTreeIds}).then(()=>{
                setSelectedTreeIds([]);
            });
        } catch (e) {
            message.error(e.message);
        }
    }

    const handleTableChange = (
        pagination: TablePaginationConfig,
        filters: Record<string, FilterValue | null>,
        sorter: SorterResult<Tree> | SorterResult<Tree>[],
        extra: TableCurrentDataSource<Tree>
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
            treeId:filters.treeId?String(filters.treeId[0]):"",
            species:filters.species?String(filters.species[0]):"",
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

    const hasSelected = selectedTreeIds.length > 0;
    return (
        <>
            <div style={{ marginBottom: 16 }}>
                <Button type="primary" onClick={deleteTreesRequest} disabled={!hasSelected} loading={isDeleteTreesLoading}>
                    删除
                </Button>
                <span style={{ marginLeft: 8 }}>{hasSelected ? `选中了 ${selectedTreeIds.length} 棵树木` : ''}</span>
            </div>
            <Table<Tree>
                rowKey="id"
                dataSource={trees?.content}
                loading={isTreesLoading}
                pagination={{...requestParams.pagination, total: trees?.totalElements, showSizeChanger: true}}
                onChange={handleTableChange}
                rowSelection={
                    woodland?.creator?.account === me?.account ||
                    woodland?.records?.find((value)=>{return value.creator?.account === me?.account;}) ||
                    me?.authorities?.find((value)=>{return value.type === "DELETE_TREES_IN_ANY_RECORD";})?{
                        selectedRowKeys: selectedTreeIds,
                        onChange: (selectedRowKeys) => {
                            setSelectedTreeIds(selectedRowKeys.map(key=>Number(key)));
                        }
                    }:{}
                }
                bordered
                scroll={{ x: "100%" }}
            >
                <Table.Column<Tree>
                    title="编号"
                    key="treeId"
                    dataIndex="treeId"
                    sorter={{ multiple: 1 }}
                    filterIcon={(filtered: boolean) => (
                        <SearchOutlined
                            style={{ color: filtered ? "#1890ff" : undefined }}
                        />
                    )}
                    filterDropdown={filterDropdown}
                />
                <Table.Column<Tree>
                    title="树种"
                    key="species"
                    dataIndex="species"
                    sorter={{ multiple: 2 }}
                    filterIcon={(filtered: boolean) => (
                        <SearchOutlined
                            style={{ color: filtered ? "#1890ff" : undefined }}
                        />
                    )}
                    filterDropdown={filterDropdown}
                />
                <Table.Column<Tree>
                    title="高度(cm)"
                    key="height"
                    dataIndex="height"
                    sorter={{ multiple: 3 }}
                />
                <Table.Column<Tree>
                    title="胸径(cm)"
                    key="dbh"
                    dataIndex="dbh"
                    sorter={{ multiple: 4 }}
                />
                <Table.Column<Tree>
                    title="冠幅(cm)"
                    key="crownWidth"
                    dataIndex="crownWidth"
                    sorter={{ multiple: 5 }}
                />
                <Table.Column<Tree>
                    title="枝下高(cm)"
                    key="subbranchHeight"
                    dataIndex="subbranchHeight"
                />
                <Table.Column<Tree>
                    title="经度"
                    key="absolutePosition"
                    dataIndex={["absolutePosition", "longitude"]}
                />
                <Table.Column<Tree>
                    title="纬度"
                    key="absolutePosition"
                    dataIndex={["absolutePosition", "latitude"]}
                />
                <Table.Column<Tree>
                    title="附加信息"
                    key="addition"
                    dataIndex="addition"
                />
            </Table>

        </>
    );
}