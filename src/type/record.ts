import {Woodland} from "./woodland";
import {User} from "./user";
import {Tree} from "./tree";

export type RecordType = "AUTO_CAL" | "USER_EDIT";
export const RecordTypes = ["AUTO_CAL", "USER_EDIT"] as RecordType[];
export const getRecordTypeInfo = (type: RecordType) => {
    switch (type) {
        case "AUTO_CAL":
            return "自动计算";
        case "USER_EDIT":
            return "自行编辑";
        default:
            return type;
    }
}

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
    type: RecordType;
    measureType: string;
    canopyDensity: number;
    dominantSpecies: string;
    ageGroup?: string
    slope?: string
    aspect?: string
    origin?: string
    speciesComposition?: string
    trees?: Tree[];
}