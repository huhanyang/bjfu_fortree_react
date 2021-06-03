import {Polygon} from "../type/Polygon";
import {useHttp} from "./http";
import {useMutation} from "react-query";
import {useNoOpsConfig} from "./use-optimistic-options";

//todo 导出并下载文件 exportWoodlandDetailInfo 生成a标签直接下载

export interface ExportWoodlandsInfoRequestParams {
    ids: number[];
}

export const useExportWoodlandsInfo = () => {
    const client = useHttp();
    return useMutation(
        (params: ExportWoodlandsInfoRequestParams) =>
            client(`export/exportWoodlandsInfo`, {
                method: "POST",
                data: params
            }),
        useNoOpsConfig(["apply-job"])
    );
}

export interface ExportWoodlandsInBoundsRequestParams {
    polygon: Polygon;
}

export const useExportWoodlandsInBounds = () => {
    const client = useHttp();
    return useMutation(
        (params: ExportWoodlandsInBoundsRequestParams) =>
            client(`export/exportWoodlandsInfoInBounds`, {
                method: "POST",
                data: params
            }),
        useNoOpsConfig(["apply-job"])
    );
}