import React from "react";
import {EditRecordRequestParams, useEditRecord} from "../../utils/woodland";
import {Button, DatePicker, Form, Input, message, Modal, Select, Switch} from "antd";
import {getRecordTypeInfo, Record, RecordTypes} from "../../type/record";
import moment from "moment";


export const RecordEditModal = ({
                                   record,
                                   visible,
                                   setVisible
                               }: {
    record: Record;
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const {mutateAsync: editRecord, isLoading: isEditRecordLoading} = useEditRecord();

    const handleSubmit = async (value: EditRecordRequestParams) => {
        try {
            await editRecord({...value, recordId: record.id})
                .then(()=>{setVisible(false);});
        } catch (e) {
            message.error(e.message);
        }
    }

    return (
        <Modal
            title="添加记录"
            footer={null}
            visible={visible}
            onCancel={() => {
                setVisible(false);
            }}
        >
            <Form
                initialValues={{...record, measureTime: moment(record.measureTime)}}
                onFinish={handleSubmit}
            >
                <Form.Item
                    name="treeCount"
                    label="树木总数"
                    rules={[
                        { required: true, message: '请输入树木总数!' }
                    ]}
                >
                    <Input type="number" suffix="棵" />
                </Form.Item>
                <Form.Item
                    name="maxHeight"
                    label="最大树高"
                    rules={[
                        { required: true, message: '请输入最大树高!' }
                    ]}
                >
                    <Input type="number" suffix="厘米" />
                </Form.Item>
                <Form.Item
                    name="minHeight"
                    label="最小树高"
                    rules={[
                        { required: true, message: '请输入最小树高!' }
                    ]}
                >
                    <Input type="number" suffix="厘米" />
                </Form.Item>
                <Form.Item
                    name="meanHeight"
                    label="平均树高"
                    rules={[
                        { required: true, message: '请输入平均树高!' }
                    ]}
                >
                    <Input type="number" suffix="厘米" />
                </Form.Item>
                <Form.Item
                    name="measureTime"
                    label="测量时间"
                    rules={[
                        { required: true, message: '请输入测量时间!' }
                    ]}
                >
                    <DatePicker />
                </Form.Item>
                <Form.Item
                    name="isTreeWithId"
                    label="树木是否编号"
                >
                    <Switch defaultChecked={record.isTreeWithId} />
                </Form.Item>
                <Form.Item
                    name="type"
                    label="类型"
                    rules={[
                        { required: true, message: '请选择记录类型!' }
                    ]}
                >
                    <Select>
                        {RecordTypes.map(type => <Select.Option value={type}>{getRecordTypeInfo(type)}</Select.Option>)}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="addition"
                    label="附加信息"
                >
                    <Input placeholder="请输入附加信息" maxLength={512} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={isEditRecordLoading} >
                        修改记录
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}