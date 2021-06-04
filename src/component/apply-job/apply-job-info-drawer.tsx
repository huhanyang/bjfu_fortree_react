import {ApplyJobInfo} from "./apply-job-info";
import {Drawer} from "antd";
import React from "react";


export const ApplyJobInfoDrawer = ({id, visible, setVisible}:{
    id: number|undefined,
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {

    return (
        <Drawer
            title="申请详情"
            placement="right"
            width="70%"
            onClose={()=>{setVisible(false);}}
            visible={visible}
        >
            {id?<ApplyJobInfo applyJobId={id} />:<></>}
        </Drawer>
    );
}