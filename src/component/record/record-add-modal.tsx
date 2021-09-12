import React from "react";
import {AddRecordRequestParams, useAddRecord} from "../../utils/woodland";
import {Button, DatePicker, Form, Input, message, Modal, Select, Switch} from "antd";
import {getRecordTypeInfo, RecordTypes} from "../../type/record";


export const RecordAddModal = ({
                                   woodlandId,
                                   visible,
                                   setVisible
                               }: {
    woodlandId: number;
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const {mutateAsync: addRecord, isLoading: isAddRecordLoading} = useAddRecord();

    const handleSubmit = async (value: AddRecordRequestParams) => {
        try {
            await addRecord({...value, woodlandId})
                .then(() => {
                    setVisible(false);
                });
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
                initialValues={{isTreeWithId: true}}
                onFinish={handleSubmit}
            >
                <Form.Item
                    name="treeCount"
                    label="树木总数"
                    rules={[
                        {required: true, message: '请输入树木总数!'}
                    ]}
                >
                    <Input type="number" suffix="棵"/>
                </Form.Item>
                <Form.Item
                    name="maxHeight"
                    label="最大树高"
                    rules={[
                        {required: true, message: '请输入最大树高!'}
                    ]}
                >
                    <Input type="number" suffix="厘米"/>
                </Form.Item>
                <Form.Item
                    name="minHeight"
                    label="最小树高"
                    rules={[
                        {required: true, message: '请输入最小树高!'}
                    ]}
                >
                    <Input type="number" suffix="厘米"/>
                </Form.Item>
                <Form.Item
                    name="meanHeight"
                    label="平均树高"
                    rules={[
                        {required: true, message: '请输入平均树高!'}
                    ]}
                >
                    <Input type="number" suffix="厘米"/>
                </Form.Item>
                <Form.Item
                    name="measureTime"
                    label="测量时间"
                    rules={[
                        {required: true, message: '请输入测量时间!'}
                    ]}
                >
                    <DatePicker/>
                </Form.Item>
                <Form.Item
                    name="isTreeWithId"
                    label="树木是否编号"
                >
                    <Switch defaultChecked={true}/>
                </Form.Item>
                <Form.Item
                    name="type"
                    label="类型"
                    rules={[
                        {required: true, message: '请选择记录类型!'}
                    ]}
                >
                    <Select>
                        {RecordTypes.map(type => <Select.Option value={type}>{getRecordTypeInfo(type)}</Select.Option>)}
                    </Select>
                </Form.Item>
                <Form.Item name="measureType" label="测量方式" rules={[
                    {required: true, message: '请输入测量方式!'}
                ]}>
                    <Input maxLength={16}/>
                </Form.Item>
                <Form.Item name="canopyDensity" label="郁闭度" rules={[
                    {required: true, message: '请输入郁闭度!'}
                ]}>
                    <Input type="number" suffix="%"/>
                </Form.Item>
                <Form.Item name="dominantSpecies" label="优势树种" rules={[
                    {required: true, message: '请输入优势树种!'}
                ]}>
                    <Input maxLength={32}/>
                </Form.Item>
                <Form.Item name="ageGroup" label="龄组">
                    <Input maxLength={64}/>
                </Form.Item>
                <Form.Item name="slope" label="坡度">
                    <Input maxLength={64}/>
                </Form.Item>
                <Form.Item name="aspect" label="坡向">
                    <Input maxLength={64}/>
                </Form.Item>
                <Form.Item name="origin" label="起源">
                    <Input maxLength={64}/>
                </Form.Item>
                <Form.Item name="speciesComposition" label="树种组成">
                    <Input maxLength={256}/>
                </Form.Item>
                <Form.Item
                    name="addition"
                    label="附加信息"
                >
                    <Input.TextArea placeholder="请输入附加信息" maxLength={512}/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={isAddRecordLoading}>
                        添加记录
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}