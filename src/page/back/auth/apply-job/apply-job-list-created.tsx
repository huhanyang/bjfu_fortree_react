import {GetApplyJobsRequestParams, useCancelApplyJob, useMyApplyJobs} from "../../../../utils/apply-job";
import {useState} from "react";
import {FilterValue, SorterResult, TableCurrentDataSource, TablePaginationConfig} from "antd/lib/table/interface";
import {SingleFieldSorter} from "../../../../type/request";
import {Button, message, Table} from "antd";
import {
    ApplyJob,
    ApplyJobStates,
    ApplyJobTypes,
    getApplyJobStateInfo,
    getApplyJobTypeInfo
} from "../../../../type/apply-job";
import {UserPopover} from "../../../../component/user/user-popover";
import {Link} from "react-router-dom";
import {generatePath} from "react-router";


export const ApplyJobListCreated = () => {

    const [requestParams, setRequestParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    } as GetApplyJobsRequestParams);
    const {data: applyJobs, isLoading: isApplyJobsLoading} = useMyApplyJobs(requestParams);
    const {mutateAsync: cancelApplyJob, isLoading: isCancelApplyJobLoading} = useCancelApplyJob();

    const handleTableChange = (
        pagination: TablePaginationConfig,
        filters: Record<string, FilterValue | null>,
        sorter: SorterResult<ApplyJob> | SorterResult<ApplyJob>[],
        extra: TableCurrentDataSource<ApplyJob>
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
            pagination: pagination,
            sorter: newSorter,
        });

    };

    return (
        <>
            <Table<ApplyJob>
                rowKey="account"
                dataSource={applyJobs?.content}
                pagination={{...requestParams.pagination, total: applyJobs?.totalElements}}
                loading={isApplyJobsLoading}
                onChange={handleTableChange}
                bordered
                scroll={{ x: "100%" }}
            >
                <Table.Column<ApplyJob>
                    title="类型"
                    key="type"
                    dataIndex="type"
                    sorter={{ multiple: 1 }}
                    filters={ApplyJobTypes.map(type=>{
                        return { text: getApplyJobTypeInfo(type), value: type };
                    })}
                    render={(text, record) => getApplyJobTypeInfo(record.type)}
                />
                <Table.Column<ApplyJob>
                    title="状态"
                    key="state"
                    dataIndex="state"
                    sorter={{ multiple: 2 }}
                    filters={ApplyJobStates.map(state=>{
                        return { text: getApplyJobStateInfo(state), value: state };
                    })}
                    render={(text, record) => getApplyJobStateInfo(record.state)}
                />
                <Table.Column<ApplyJob>
                    title="申请时间"
                    key="createdTime"
                    dataIndex="createdTime"
                    sorter={{ multiple: 3 }}
                    render={(text, record) => new Date(record.createdTime).toLocaleString()}
                />
                <Table.Column<ApplyJob>
                    title="操作人"
                    key="operateUser"
                    dataIndex="operateUser"
                    render={(text, record) => <UserPopover user={record.operateUser} />}
                />
                <Table.Column<ApplyJob>
                    title="操作时间"
                    key="operateTime"
                    dataIndex="operateTime"
                    sorter={{ multiple: 4 }}
                    render={(text, record) => new Date(record.operateTime).toLocaleString()}
                />
                <Table.Column<ApplyJob>
                    title="操作"
                    key="operate"
                    dataIndex="operate"
                    render={(text, record) => <>
                        <Button
                            type="link"
                            loading={isCancelApplyJobLoading}
                            disabled={record.state!=="APPLYING"}
                            onClick={async () => {
                                try {
                                    await cancelApplyJob(record.id);
                                } catch (e) {
                                    message.error(e.message);
                                }}}
                        >撤销</Button>
                        <Link
                            to={generatePath("/back/apply-job/info/:id", {
                                id: String(record.id)
                            })}
                        >详情</Link>
                    </>}
                />
            </Table>
        </>
    );
}