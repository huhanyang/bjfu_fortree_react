import {Polygon} from "../type/Polygon";
import {useHttp} from "./http";
import {useMutation} from "react-query";
import {useNoOpsConfig} from "./use-optimistic-options";
import {getToken} from "../auth-provider";

const apiUrl = process.env.REACT_APP_API_URL;
export const exportWoodlandDetailInfo = (id: number, woodlandName: string) => {
    const link = document.createElement('a');
    link.href = `${apiUrl}/export/exportWoodlandDetailInfo?id=${id}&token=${getToken()}`;
    link.click();
}

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