import {useWoodland} from "../../utils/woodland";
import React, {useEffect, useState} from "react";
import {Record} from "../../type/record";
import {getWoodlandShapeInfo, Woodland} from "../../type/woodland";
import {Descriptions, Divider, Select, Switch} from "antd";
import {UserPopover} from "../../component/user/user-popover";
import {Map, Marker} from "react-bmapgl";

export const WoodlandInfo = ({id}: { id: number }) => {

    const {data: woodland} = useWoodland(Number(id));
    const [showMap, setShowMap] = useState(false);
    const [record, setRecord] = useState<Record | undefined>(undefined);
    useEffect(() => {
        if (woodland && woodland.records && woodland.records.length > 0) {
            setRecord(woodland.records[0]);
        }
    }, [woodland]);


    const WoodlandDetail = ({woodlandInfo}: { woodlandInfo: Woodland }) => {
        return (
            <Descriptions title="申请详情" bordered>
                <Descriptions.Item label="林地名">{woodlandInfo.name}</Descriptions.Item>
                <Descriptions.Item label="创建人">{<UserPopover user={woodlandInfo.creator}/>}</Descriptions.Item>
                <Descriptions.Item
                    label="行政地区">{woodlandInfo.country + '/' + woodlandInfo.province + '/' + woodlandInfo.city}</Descriptions.Item>
                <Descriptions.Item label="详细地址">{woodlandInfo.address}</Descriptions.Item>
                <Descriptions.Item
                    label="坐标">{woodlandInfo.position.longitude + '-' + woodlandInfo.position.latitude}</Descriptions.Item>
                <Descriptions.Item label="形状">{getWoodlandShapeInfo(woodlandInfo.shape)}</Descriptions.Item>
                <Descriptions.Item label="长宽(m)">{woodlandInfo.length + '*' + woodlandInfo.width}</Descriptions.Item>
                <Descriptions.Item label="附加信息">{woodlandInfo.addition}</Descriptions.Item>
            </Descriptions>
        );
    }

    const RecordDetail = ({recordInfo}: { recordInfo: Record }) => {
        return (
            <Descriptions title="林地记录" bordered>
                <Descriptions.Item label="创建人">{<UserPopover user={recordInfo.creator}/>}</Descriptions.Item>
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
            {woodland ? <WoodlandDetail woodlandInfo={woodland}/> : <></>}<Divider/>
            {woodland ? <>
                展示地图:
                <Switch
                    onChange={(checked, event) => {
                        setShowMap(checked)
                    }}
                    checked={showMap}
                />
            </> : <></>}
            {showMap && woodland ? <>
                <Map
                    center={new BMapGL.Point(woodland.position.longitude, woodland.position.latitude)}
                    zoom={20}
                    enableDoubleClickZoom
                    enableScrollWheelZoom
                    enableDragging
                >
                    {
                        // @ts-ignore
                        <Marker position={new BMapGL.Point(woodland.position.longitude, woodland.position.latitude)}/>
                    }
                </Map>
            </> : <></>}
            {
                woodland && woodland.records && woodland.records[0] ? <>
                    <div style={{float: 'right'}}>
                        记录测量时间:
                        <Select
                            defaultValue={0}
                            // @ts-ignore
                            onChange={(value) => setRecord(woodland.records[value])}
                        >
                            {
                                // @ts-ignore
                                woodland.records.map((record) => <Select.Option
                                    value={woodland.records.indexOf(record)}>
                                    {new Date(record.measureTime).toLocaleString()}
                                </Select.Option>)
                            }
                        </Select>
                    </div>
                </> : <></>
            }
            <Divider/>
            {record ? <RecordDetail recordInfo={record}/> : <></>}
        </>
    );
}