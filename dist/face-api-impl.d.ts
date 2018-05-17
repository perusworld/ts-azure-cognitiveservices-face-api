/// <reference types="node" />
import { FaceAPI, Face, Identity, Person, DetectedPerson, DataCache } from './face-api';
import { RequestWrapper } from './request';
export declare class InMemoryCache<T> implements DataCache<T> {
    cache: any;
    get(key: string): T;
    has(key: string): boolean;
    set(key: string, value: T): void;
}
export declare class FaceAPIImpl implements FaceAPI {
    conf: any;
    requestWrapper: RequestWrapper;
    constructor(conf: any);
    detect(buffer: Buffer): Promise<Face[]>;
    identify(personGroupId: string, faceIds: string[]): Promise<Identity[]>;
    person(personGroupId: string, personId: string): Promise<Person>;
    detectPersons(buffer: Buffer, personGroupId: string, cache: DataCache<DetectedPerson>): Promise<DetectedPerson[]>;
}
