import {User} from "./user";
import {Record} from "./record";
import {Point} from "./point";

export type WoodlandShape = "SQUARE" | "RECTANGLE" | "CIRCULAR";

export interface Woodland {
    id: number;
    createdTime: string;
    lastModifiedTime: string;
    name: string;
    creator?: User;
    address: string;
    position: Point;
    country: string;
    province: string;
    city: string;
    shape: WoodlandShape;
    length: number;
    width: number;
    addition?: string;
    records?: Record[];
}

export function getWoodlandShapeInfo(shape: WoodlandShape) {
    switch (shape) {
        case 'SQUARE':
            return '正方形';
        case 'RECTANGLE':
            return '长方形';
        case 'CIRCULAR':
            return '圆形';
        default:
            return shape;
    }
}