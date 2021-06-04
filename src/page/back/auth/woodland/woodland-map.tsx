import {useAllWoodlands} from "../../../../utils/woodland";
import {InfoWindow, Map, Marker, ScaleControl} from "react-bmapgl";
import React, {useState} from "react";
import {getWoodlandShapeInfo, Woodland} from "../../../../type/woodland";
import {useDebounce} from "../../../../utils";
import {WoodlandInfoDrawer} from "../../../../component/woodland/woodland-info-drawer";


export const WoodlandMap = () => {

    const {data: woodlands} = useAllWoodlands();
    const [popoverWoodlandState, setPopoverWoodlandState] = useState<Woodland|undefined>();
    const popoverWoodland =useDebounce(popoverWoodlandState, 500);
    const [woodlandDetailVisible, setWoodlandDetailVisible] = useState(false);
    const [woodlandDetailId, setWoodlandDetailId] = useState<number|undefined>();

    return (
        <>
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