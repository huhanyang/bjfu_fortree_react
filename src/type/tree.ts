import {Record} from "./record";
import {Point} from "./point";

export interface Tree {
    id: number;
    createdTime: string;
    lastModifiedTime: string;
    record?: Record;
    treeId?: string;
    species: string;
    height: number;
    dbh?: number;
    crownWidth?: number;
    subbranchHeight?: number;
    absolutePosition?: Point
    addition?: string;
}