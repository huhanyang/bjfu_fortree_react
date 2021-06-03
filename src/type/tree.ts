import {Record} from "./record";

export interface Tree {
    id: number;
    createdTime: string;
    lastModifiedTime: string;
    record?: Record;
    treeId: string;
    species: string;
    height: number;
    dbh: number;
    crownWidth: number;
    addition?: string;
}