import {Woodland, WoodlandShape} from "../type/woodland";
import {Page, PageAndSingleFieldSorterRequest} from "../type/request";
import {useHttp} from "./http";
import {useMutation, useQuery} from "react-query";
import {useNoOpsConfig} from "./use-optimistic-options";
import {cleanObject} from "./index";
import {Tree} from "../type/tree";
import {Point} from "../type/point";
import {ApplyJob} from "../type/apply-job";
import {message} from "antd";
import {RecordType} from "../type/record";

export interface CreateWoodlandRequestParams {
    name: string;
    address: string;
    position: Point;
    country: string;
    province: string;
    city: string;
    shape: WoodlandShape;
    length: number;
    width: number;
    addition?: string;
}

export const useCreateWoodland = () => {
    const client = useHttp();
    return useMutation(
        (params: CreateWoodlandRequestParams) =>
            client(`woodland/createWoodland`, {
                method: "POST",
                data: params
            }).then((applyJob: ApplyJob)=>{
                if(applyJob.state==="APPLYING") {
                    message.success("申请成功, 等待审批！", 3);
                }
            }),
        useNoOpsConfig(["woodland"])
    );
}

export interface AddRecordRequestParams {
    woodlandId: number;
    treeCount: number;
    maxHeight: number;
    minHeight: number;
    meanHeight: number;
    measureTime: string;
    addition?: string;
    isTreeWithId: boolean;
    type: RecordType;
    measureType: string;
    canopyDensity: number;
    dominantSpecies: string;
    ageGroup?: string
    slope?: string
    aspect?: string
    origin?: string
    speciesComposition?: string
}

export const useAddRecord = () => {
    const client = useHttp();
    return useMutation(
        (params: AddRecordRequestParams) =>
            client(`woodland/addRecord`, {
                method: "POST",
                data: params
            }).then((applyJob: ApplyJob)=>{
                if(applyJob.state==="APPLYING") {
                    message.success("申请成功, 等待审批！", 3);
                }
            }),
        useNoOpsConfig(["woodland"])
    );
}

export interface AddTreeParams {
    treeId?: string;
    species: string;
    height: number;
    dbh?: number;
    crownWidth?: number;
    subbranchHeight?: number;
    absolutePosition?: Point
    addition?: string;
}

export interface AddTreesRequestParams {
    recordId: number;
    trees: AddTreeParams[];
}

export const useAddTrees = () => {
    const client = useHttp();
    return useMutation(
        (params: AddTreesRequestParams) =>
            client(`woodland/addTrees`, {
                method: "POST",
                data: params
            }).then((applyJob: ApplyJob)=>{
                if(applyJob.state==="APPLYING") {
                    message.success("申请成功, 等待审批！", 3);
                }
            }),
        useNoOpsConfig(["woodland"])
    );
}

export interface AddTreesByExcelRequestParams {
    recordId: number;
    fileName: string;
    file: File
}

export const useAddTreesByExcel = () => {
    const client = useHttp();
    return useMutation(
        (params: AddTreesByExcelRequestParams) =>{
            const formData = new FormData();
            formData.append("recordId", String(params.recordId));
            formData.append("fileName", String(params.file.name));
            formData.append("file", params.file);
            return client(`woodland/addTreesByExcel`, {
                method: "POST",
                data: formData,
                isFile: true
            }).then((applyJob: ApplyJob)=>{
                if(applyJob.state==="APPLYING") {
                    message.success("申请成功, 等待审批！", 3);
                }
            })
        },
        useNoOpsConfig(["woodland"])
    );
}

export const useDeleteWoodland = () => {
    const client = useHttp();
    return useMutation(
        (id: number) =>
            client(`woodland/deleteWoodland`, {
                method: "DELETE",
                data: {id}
            }).then((applyJob: ApplyJob)=>{
                if(applyJob.state==="APPLYING") {
                    message.success("申请成功, 等待审批！", 3);
                }
            }),
        useNoOpsConfig(["woodland"])
    );
}

export const useDeleteRecord = () => {
    const client = useHttp();
    return useMutation(
        (id: number) =>
            client(`woodland/deleteRecord`, {
                method: "DELETE",
                data: {id}
            }).then((applyJob: ApplyJob)=>{
                if(applyJob.state==="APPLYING") {
                    message.success("申请成功, 等待审批！", 3);
                }
            }),
        useNoOpsConfig(["woodland"])
    );
}

export interface DeleteTreesRequestParams {
    recordId: number;
    treeIds: number[];
}

export const useDeleteTrees = () => {
    const client = useHttp();
    return useMutation(
        (params: DeleteTreesRequestParams) =>
            client(`woodland/deleteTrees`, {
                method: "POST",
                data: params
            }).then((applyJob: ApplyJob)=>{
                if(applyJob.state==="APPLYING") {
                    message.success("申请成功, 等待审批！", 3);
                }
            }),
        useNoOpsConfig(["woodland"])
    );
}

export interface EditWoodlandRequestParams {
    woodlandId: number;
    name: string;
    address: string;
    position: Point;
    country: string;
    province: string;
    city: string;
    shape: WoodlandShape;
    length: number;
    width: number;
    addition?: string;
}

export const useEditWoodland = () => {
    const client = useHttp();
    return useMutation(
        (params: EditWoodlandRequestParams) =>
            client(`woodland/editWoodland`, {
                method: "POST",
                data: params
            }).then((applyJob: ApplyJob)=>{
                if(applyJob.state==="APPLYING") {
                    message.success("申请成功, 等待审批！", 3);
                }
            }),
        useNoOpsConfig(["woodland"])
    );
}

export interface EditRecordRequestParams {
    recordId: number;
    treeCount: number;
    maxHeight: number;
    minHeight: number;
    meanHeight: number;
    measureTime: string;
    addition?: string;
    type: RecordType;measureType: string;
    canopyDensity: number;
    dominantSpecies: string;
    ageGroup?: string
    slope?: string
    aspect?: string
    origin?: string
    speciesComposition?: string
}

export const useEditRecord = () => {
    const client = useHttp();
    return useMutation(
        (params: EditRecordRequestParams) =>
            client(`woodland/editRecord`, {
                method: "POST",
                data: params
            }).then((applyJob: ApplyJob)=>{
                if(applyJob.state==="APPLYING") {
                    message.success("申请成功, 等待审批！", 3);
                }
            }),
        useNoOpsConfig(["woodland"])
    );
}

export interface GetWoodlandsRequestParams extends PageAndSingleFieldSorterRequest {
    name: string;
    country: string;
    province: string;
    city: string;
}

export const useWoodlands = (params: Partial<GetWoodlandsRequestParams>) => {
    const client = useHttp();
    return useQuery<Page<Woodland>>(
        ["woodland", "woodlands", cleanObject(params)],
        () => client(`woodland/getWoodlands`, {data: params, method: "POST"}),
        {enabled: Boolean(params)}
    );
}

export const useAllWoodlands = () => {
    const client = useHttp();
    return useQuery<Woodland[]>(
        ["woodland", "all-woodlands"],
        () => client(`woodland/getAllWoodlands`)
    );
}

export interface GetAllWoodlandsRequestParams {
    name?: string;
    country?: string;
    province?: string;
    city?: string;
    area?: number;
    areaDirection?: "MIN"|"MAX";
    treeCount?: number;
    treeCountDirection?: "MIN"|"MAX";
    treeMeanHeight?: number;
    treeMeanHeightDirection?: "MIN"|"MAX";
}

export const useAllWoodlandsByFilter = (params: GetAllWoodlandsRequestParams) => {
    const client = useHttp();
    return useQuery<Woodland[]>(
        ["woodland", "all-woodlands-by-filter", params],
        () => client(`woodland/getAllWoodlands`, {method: "POST", data: params})
    );
}

export const useWoodlandsByCreator = (params: Partial<GetWoodlandsRequestParams>) => {
    const client = useHttp();
    return useQuery<Page<Woodland>>(
        ["woodland", "created-woodlands", cleanObject(params)],
        () => client(`woodland/getWoodlandsByCreator`, {data: params, method: "POST"}),
        {enabled: Boolean(params)}
    );
}

export const useWoodland = (id: number) => {
    const client = useHttp();
    return useQuery<Woodland>(
        ["woodland", id],
        () => client(`woodland/getWoodlandDetail`, {data: {id}}),
    {enabled: Boolean(id)}
    );
}

export interface GetTreesRequestParams extends PageAndSingleFieldSorterRequest {
    recordId: number;
    treeId?: string;
    species?: string;
}

export const useTrees = (params: Partial<GetTreesRequestParams>) => {
    const client = useHttp();
    return useQuery<Page<Tree>>(
        ["woodland", "trees", cleanObject(params)],
        () => client(`woodland/getTrees`, {data: params, method: "POST"}),
        {enabled: Boolean(params)}
    );
}