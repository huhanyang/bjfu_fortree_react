import {useAllWoodlands} from "../../../utils/woodland";
import React, {useState} from "react";
import {getWoodlandShapeInfo, Woodland} from "../../../type/woodland";
import {useDebounce} from "../../../utils";
import {InfoWindow, Map, Marker, ScaleControl} from "react-bmapgl";
import {Drawer, PageHeader} from "antd";
import {WoodlandInfo} from "../woodland-info";


export const FrontMap = () => {

    const {data: woodlands} = useAllWoodlands();
    const [popoverWoodlandState, setPopoverWoodlandState] = useState<Woodland|undefined>();
    const popoverWoodland =useDebounce(popoverWoodlandState, 500);
    const [woodlandDetailVisible, setWoodlandDetailVisible] = useState(false);
    const [woodlandDetailId, setWoodlandDetailId] = useState<number|undefined>();

    return (
        <>
            <PageHeader
                style={{
                    border: "1px solid rgb(235, 237, 240)"
                }}
                title="林地地图"
                subTitle="登录以获取更多功能"
            />
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
            <Drawer
                title="林地详情"
                placement="right"
                width="70%"
                onClose={()=>{setWoodlandDetailVisible(false);}}
                visible={woodlandDetailVisible}
            >
                {woodlandDetailId?<WoodlandInfo id={woodlandDetailId} />:<></>}
            </Drawer>
        </>
    );
}