import {GetAllWoodlandsRequestParams, useAllWoodlands, useAllWoodlandsByFilter} from "../../../../utils/woodland";
import {InfoWindow, Map, Marker, ScaleControl} from "react-bmapgl";
import React, {useState} from "react";
import {getWoodlandShapeInfo, Woodland} from "../../../../type/woodland";
import {useDebounce} from "../../../../utils";
import {WoodlandInfoDrawer} from "../../../../component/woodland/woodland-info-drawer";
import {AutoComplete, Button, Form, Input, InputNumber, Select} from "antd";


export const WoodlandMap = () => {

    const [request, setRequest] = useState<GetAllWoodlandsRequestParams>({});
    const {data: woodlands, isLoading} = useAllWoodlandsByFilter(request);
    const [popoverWoodlandState, setPopoverWoodlandState] = useState<Woodland|undefined>();
    const popoverWoodland =useDebounce(popoverWoodlandState, 500);
    const [woodlandDetailVisible, setWoodlandDetailVisible] = useState(false);
    const [woodlandDetailId, setWoodlandDetailId] = useState<number|undefined>();

    const onFinish = (params: GetAllWoodlandsRequestParams) => {
        console.log(params);
        setRequest(params);
    }

    return (
        <>
            <Form
                initialValues={{
                    areaDirection: "MIN",
                    treeCountDirection: "MIN",
                    treeMeanHeightDirection: "MIN"
                }} layout="inline" onFinish={onFinish}>
                <Form.Item name="name" label="林地名称">
                    <Input placeholder="输入林地名"/>
                </Form.Item>
                <Form.Item label="行政地区">
                    <Input.Group compact>
                        <Form.Item name="country" >
                            <Input placeholder="输入国家"/>
                        </Form.Item>
                        <Form.Item name="province">
                            <Input placeholder="输入省份"/>
                        </Form.Item>
                        <Form.Item name="city">
                            <Input placeholder="输入城市"/>
                        </Form.Item>
                    </Input.Group>
                </Form.Item>
                <Form.Item label="林地面积">
                    <Input.Group compact>
                        <Form.Item name="areaDirection">
                            <Select defaultValue="MIN">
                                <Select.Option value="MIN">最小值</Select.Option>
                                <Select.Option value="MAX">最大值</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="area">
                            <Input type="number" placeholder="输入林地面积" suffix="平方米" />
                        </Form.Item>
                    </Input.Group>
                </Form.Item>
                <Form.Item label="树木总数">
                    <Input.Group compact>
                        <Form.Item name="treeCountDirection">
                            <Select defaultValue="MIN">
                                <Select.Option value="MIN">最小值</Select.Option>
                                <Select.Option value="MAX">最大值</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="treeCount">
                            <Input type="number" placeholder="输入树木总数" suffix="棵" />
                        </Form.Item>
                    </Input.Group>
                </Form.Item>
                <Form.Item label="平均树高">
                    <Input.Group compact>
                        <Form.Item name="treeMeanHeightDirection">
                            <Select defaultValue="MIN">
                                <Select.Option value="MIN">最小值</Select.Option>
                                <Select.Option value="MAX">最大值</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="treeMeanHeight">
                            <Input type="number" placeholder="输入平均树高" suffix="厘米" />
                        </Form.Item>
                    </Input.Group>
                </Form.Item>
                <Form.Item>
                    <Button loading={isLoading} htmlType={"submit"} type={"primary"}>
                        查询
                    </Button>
                </Form.Item>
            </Form>
            {woodlands?<Map
                center={new BMapGL.Point(116.40345879918985, 39.92396687340759)}
                zoom={5}
                enableDoubleClickZoom
                enableScrollWheelZoom
                enableDragging
                onClick={()=>{
                    setPopoverWoodlandState(undefined);
                }}
            >
                {
                    // @ts-ignore
                    <ScaleControl />
                }
                {
                    // @ts-ignore
                    woodlands.map(woodland=> <Marker
                        position={new BMapGL.Point(woodland.position.longitude, woodland.position.latitude)}
                        onClick={()=>{
                            // 打开林地详情
                            setWoodlandDetailId(woodland.id);
                            setWoodlandDetailVisible(true);
                        }}
                        onMouseover={() => {
                            // 打开简介
                            setPopoverWoodlandState(woodland);
                        }}
                    />)
                }
                {
                    popoverWoodland?
                        // @ts-ignore
                    <InfoWindow
                        position={new BMapGL.Point(popoverWoodland.position.longitude, popoverWoodland.position.latitude)}
                        title={popoverWoodland.name}
                        text={
                            `
                                ${popoverWoodland.country}/${popoverWoodland.province}/${popoverWoodland.city}\n
                                ${popoverWoodland.address}\n
                                ${getWoodlandShapeInfo(popoverWoodland.shape)} ${popoverWoodland.length}(M)x${popoverWoodland.width}(M)
                            `
                        }
                        onClickclose={() => {setPopoverWoodlandState(undefined);}}
                    />:<></>
                }
            </Map>:<></>}
            <WoodlandInfoDrawer id={woodlandDetailId} visible={woodlandDetailVisible} setVisible={setWoodlandDetailVisible}/>
        </>
    );
}