import React from "react";
import {Drawer} from "antd";
import {WoodlandInfo} from "./woodland-info";

export const WoodlandInfoDrawer = ({id, visible, setVisible}:{
    id: number|undefined,
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {

    return (
        <Drawer
            title="林地详情"
            placement="right"
            width="70%"
            onClose={()=>{setVisible(false);}}
            visible={visible}
        >
            {id?<WoodlandInfo id={id} />:<></>}
        </Drawer>
    );
}