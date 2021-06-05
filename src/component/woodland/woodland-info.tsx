import {useDeleteRecord, useDeleteWoodland, useWoodland} from "../../utils/woodland";
import {Button, Descriptions, Divider, message, Popconfirm, Select, Switch} from "antd";
import {getWoodlandShapeInfo, Woodland} from "../../type/woodland";
import {UserPopover} from "../user/user-popover";
import React, {useEffect, useState} from "react";
import {Record} from "../../type/record";
import {TreeList} from "../tree/tree-list";
import {WoodlandEditModal} from "./woodland-edit-modal";
import {RecordAddModal} from "../record/record-add-modal";
import {RecordEditModal} from "../record/record-edit-modal";
import {TreesAddModal} from "../tree/trees-add-modal";
import {TreesAddExcelModal} from "../tree/trees-add-excel-modal";
import {exportWoodlandDetailInfo} from "../../utils/export";
import {Map, Marker} from 'react-bmapgl';


export const WoodlandInfo = ({id}:{id: number}) => {

    const { data: woodland } = useWoodland(Number(id));
    const [showMap, setShowMap] = useState(false);
    const [record, setRecord] = useState<Record | undefined>(undefined);
    useEffect(()=>{
        if(woodland&&woodland.records&&woodland.records.length>0) {
            setRecord(woodland.records[0]);
        }
    },[woodland]);
    const [woodlandEditModalVisible, setWoodlandEditModalVisible] = useState(false);
    const {mutateAsync: deleteWoodland, isLoading: isDeleteWoodlandLoading} = useDeleteWoodland();
    const [recordAddModalVisible, setRecordAddModalVisible] = useState(false);
    const [recordEditModalVisible, setRecordEditModalVisible] = useState(false);
    const [treesAddModalVisible, setTreesAddModalVisible] = useState(false);
    const [treesAddByExcelModalVisible, setTreesAddByExcelModalVisible] = useState(false);
    const {mutateAsync: deleteRecord, isLoading: isDeleteRecordLoading} = useDeleteRecord();



    const WoodlandDetail = ({woodlandInfo}:{woodlandInfo: Woodland}) => {
        return (
            <Descriptions title="申请详情" bordered extra={
                <>
                    <Button onClick={()=>{exportWoodlandDetailInfo(woodlandInfo.id, woodlandInfo.name);}}>导出信息</Button>
                    <Button onClick={()=>{setRecordAddModalVisible(true);}}>添加记录</Button>
                    <Button onClick={()=>{setWoodlandEditModalVisible(true);}}>编辑信息</Button>
                    <Popconfirm
                        onConfirm={async () => {
                            try {
                                await deleteWoodland(id);
                            } catch (e) {
                                message.error(e.message);
                            }
                        }}
                        title="确定要删除么?"
                        okText="删除"
                        cancelText="取消"
                    >
                        <Button
                            loading={isDeleteWoodlandLoading}
                        >删除</Button>
                    </Popconfirm>
                </>
            }>
                <Descriptions.Item label="林地名">{woodlandInfo.name}</Descriptions.Item>
                <Descriptions.Item label="创建人">{<UserPopover user={woodlandInfo.creator} />}</Descriptions.Item>
                <Descriptions.Item label="行政地区">{woodlandInfo.country+'/'+woodlandInfo.province+'/'+woodlandInfo.city}</Descriptions.Item>
                <Descriptions.Item label="详细地址">{woodlandInfo.address}</Descriptions.Item>
                <Descriptions.Item label="坐标">{woodlandInfo.position.longitude+'-'+woodlandInfo.position.latitude}</Descriptions.Item>
                <Descriptions.Item label="形状">{getWoodlandShapeInfo(woodlandInfo.shape)}</Descriptions.Item>
                <Descriptions.Item label="长宽(m)">{woodlandInfo.length+'*'+woodlandInfo.width}</Descriptions.Item>
                <Descriptions.Item label="附加信息">{woodlandInfo.addition}</Descriptions.Item>
            </Descriptions>
        );
    }

    const RecordDetail = ({recordInfo}:{recordInfo: Record}) => {
        return (
            <Descriptions title="林地记录" bordered extra={<>
                <Button onClick={()=>{setTreesAddModalVisible(true);}}>添加树木</Button>
                <Button onClick={()=>{setTreesAddByExcelModalVisible(true);}}>上传树木</Button>
                <Button onClick={()=>{setRecordEditModalVisible(true);}}>修改信息</Button>
                <Popconfirm
                    onConfirm={async () => {
                        try {
                            await deleteRecord(recordInfo.id);
                        } catch (e) {
                            message.error(e.message);
                        }
                    }}
                    title="确定要删除么?"
                    okText="删除"
                    cancelText="取消"
                >
                    <Button
                        loading={isDeleteRecordLoading}
                    >删除</Button>
                </Popconfirm>
            </>}>
                <Descriptions.Item label="创建人">{<UserPopover user={recordInfo.creator} />}</Descriptions.Item>
                <Descriptions.Item label="树木总数(棵)">{recordInfo.treeCount}</Descriptions.Item>
                <Descriptions.Item label="最大树高(cm)">{recordInfo.maxHeight}</Descriptions.Item>
                <Descriptions.Item label="最小树高(cm)">{recordInfo.minHeight}</Descriptions.Item>
                <Descriptions.Item label="平均树高(cm)">{recordInfo.meanHeight}</Descriptions.Item>
                <Descriptions.Item label="测量时间">{new Date(recordInfo.measureTime).toLocaleString()}</Descriptions.Item>
                <Descriptions.Item label="附加信息">{recordInfo.addition}</Descriptions.Item>
            </Descriptions>
        );
    }

    return (
        <>
            {woodland?<WoodlandDetail woodlandInfo={woodland} />:<></>}<Divider />
            {woodland?<>
                展示地图:
                <Switch
                    onChange={(checked, event)=>{setShowMap(checked)}}
                    checked={showMap}
                />
            </>:<></>}
            {showMap&&woodland?<>
                <Map
                    center={new BMapGL.Point(woodland.position.longitude, woodland.position.latitude)}
                    zoom={20}
                    enableDoubleClickZoom
                    enableScrollWheelZoom
                    enableDragging
                >
                    {
                        // @ts-ignore
                        <Marker position={new BMapGL.Point(woodland.position.longitude, woodland.position.latitude)} />
                    }
                </Map>
            </>:<></>}
            {
                woodland&&woodland.records&&woodland.records[0]?<>
                    <div style={{ float: 'right' }}>
                        记录测量时间:
                        <Select
                            defaultValue={0}
                            // @ts-ignore
                            onChange={(value) => setRecord(woodland.records[value])}
                        >
                            {
                                // @ts-ignore
                                woodland.records.map((record) => <Select.Option value={woodland.records.indexOf(record)}>
                                    {new Date(record.measureTime).toLocaleString()}
                                </Select.Option>)
                            }
                        </Select>
                    </div>
                </>:<></>
            }
            <Divider />
            {record?<RecordDetail recordInfo={record} />:<></>}<Divider />
            {record?<TreeList woodlandId={id} recordId={record.id} />:<></>}
            {woodland?<>
                <WoodlandEditModal woodlandId={id} visible={woodlandEditModalVisible} setVisible={setWoodlandEditModalVisible} />
                <RecordAddModal woodlandId={id} visible={recordAddModalVisible} setVisible={setRecordAddModalVisible} />
            </>:<></>}
            {
                record?<>
                    <RecordEditModal record={record} visible={recordEditModalVisible} setVisible={setRecordEditModalVisible} />
                    <TreesAddModal recordId={record.id} visible={treesAddModalVisible} setVisible={setTreesAddModalVisible} />
                    <TreesAddExcelModal recordId={record.id} visible={treesAddByExcelModalVisible} setVisible={setTreesAddByExcelModalVisible} />
                </>:<></>
            }
        </>
    );
}