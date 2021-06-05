import {OssFile} from "../../type/oss-file";
import {Button, message, Popover} from "antd";
import {useDownloadApplyJobFile} from "../../utils/apply-job";


export const ApplyJobFile = ({file, applyJobId, isUploadFile}:{file: OssFile|undefined; applyJobId: number; isUploadFile: boolean;}) => {

    const {mutateAsync: downloadFile, isLoading: isDownloadFileLoading} = useDownloadApplyJobFile();

    return (
        <>
            {file?<>
                <Popover
                    content={
                        <div>
                            文件名:{file.fileName}
                            <br />
                            创建时间:{new Date(file.createdTime).toLocaleString()}
                            {file.expiresTime?<>
                                <br />
                                过期时间:{new Date(file.expiresTime).toLocaleString()}
                            </>:<></>}
                        </div>
                    }
                    title="申请详情"
                >
                    <Button loading={isDownloadFileLoading} onClick={async () => {
                        try {
                            await downloadFile({id: applyJobId, isUploadFile});
                        } catch (e) {
                            message.error(e.message);
                        }
                    }}>下载文件</Button>
                </Popover>
            </>:<>无文件</>}
        </>
    );
}