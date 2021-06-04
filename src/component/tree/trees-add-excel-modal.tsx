import React, {useState} from "react";
import {
    useAddTreesByExcel
} from "../../utils/woodland";
import {Button, message, Modal, Upload} from "antd";
import { UploadOutlined } from '@ant-design/icons';
import {RcFile} from "antd/lib/upload";


export const TreesAddExcelModal = ({
                                       recordId,
                                       visible,
                                       setVisible
                                   }: {
    recordId: number;
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const [file, setFile] = useState<RcFile|undefined>();
    const {mutateAsync: addTrees, isLoading: isAddTreesLoading} = useAddTreesByExcel();
    const submit = async () => {
        if(file) {
            try {
                await addTrees({file, fileName: file.name, recordId})
                    .then(()=>{setVisible(false);});
            } catch (e) {
                message.error(e.message);
            }
        } else {
            message.error("请上传文件！");
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
        >
            <Upload beforeUpload={file => {
                setFile(file);
                return false;
            }}>
                <Button icon={<UploadOutlined />}>选择文件</Button>
            </Upload>
            <Button onClick={() => {submit();}} disabled={!file} loading={isAddTreesLoading}>提交</Button>
        </Modal>
    );
}