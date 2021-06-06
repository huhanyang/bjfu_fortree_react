import {AddTreesRequestParams, useAddTrees} from "../../utils/woodland";
import React from "react";
import {Button, Form, Input, message, Modal, Space} from "antd";
import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';


export const TreesAddModal = ({
                                  recordId,
                                  visible,
                                  setVisible
                              }: {
    recordId: number;
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {

    const {mutateAsync: addTrees, isLoading: isAddTreesLoading} = useAddTrees();
    const handleSubmit = async (value: AddTreesRequestParams) => {
        try {
            await addTrees({...value, recordId})
                .then(()=>{setVisible(false);});
        } catch (e) {
            message.error(e.message);
        }
    }

    return (
        <Modal
            title="添加树木"
            footer={null}
            visible={visible}
            onCancel={() => {
                setVisible(false);
            }}
            width="70%"
        >
            <Form
                onFinish={handleSubmit}
            >
                <Form.List name="trees">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(field => (
                                <>
                                    <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'treeId']}
                                            fieldKey={[field.fieldKey, 'treeId']}
                                        >
                                            <Input placeholder="输入树木编号" maxLength={32} />
                                        </Form.Item>
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'species']}
                                            fieldKey={[field.fieldKey, 'species']}
                                            rules={[
                                                { required: true, message: '请输入树种!' }
                                            ]}
                                        >
                                            <Input placeholder="输入树种" maxLength={32} />
                                        </Form.Item>
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'height']}
                                            fieldKey={[field.fieldKey, 'height']}
                                            rules={[
                                                { required: true, message: '请输入树高!' }
                                            ]}
                                        >
                                            <Input type="number" placeholder="输入树高" suffix="厘米" />
                                        </Form.Item>
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'dbh']}
                                            fieldKey={[field.fieldKey, 'dbh']}
                                            rules={[
                                                { required: true, message: '请输入胸径!' }
                                            ]}
                                        >
                                            <Input type="number" placeholder="输入胸径" suffix="厘米" />
                                        </Form.Item>
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'crownWidth']}
                                            fieldKey={[field.fieldKey, 'crownWidth']}
                                            rules={[
                                                { required: true, message: '请输入冠幅!' }
                                            ]}
                                        >
                                            <Input type="number" placeholder="输入冠幅" suffix="厘米" />
                                        </Form.Item>
                                        <MinusCircleOutlined onClick={() => remove(field.name)} />
                                    </Space>
                                </>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    添加一条
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={isAddTreesLoading}>
                        添加树木
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}