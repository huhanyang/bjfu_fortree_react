import {Woodland} from "./woodland";
import {User} from "./user";
import {Tree} from "./tree";


export interface Record {
    id: number;
    createdTime: string;
    lastModifiedTime: string;
    woodland?: Woodland;
    creator?: User;
    treeCount: number;
    maxHeight: number;
    minHeight: number;
    meanHeight: number;
    measureTime: string;
    addition?: string;
    isTreeWithId: boolean;
    trees?: Tree[];
}