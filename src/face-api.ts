export interface Face {
    faceId: string;
    faceRectangle?: FaceRectangle;
    faceLandmarks?: { [key: string]: FaceLandmark };
    faceAttributes?: FaceAttributes;
}

export interface FaceAttributes {
    age?: number;
    gender?: string;
    smile?: number;
    facialHair?: FacialHair;
    glasses?: string;
    headPose?: HeadPose;
    emotion?: Emotion;
    hair?: Hair;
    makeup?: Makeup;
    occlusion?: Occlusion;
    accessories?: Accessory[];
    blur?: Blur;
    exposure?: Exposure;
    noise?: Noise;
}

export interface Accessory {
    type?: string;
    confidence?: number;
}

export interface Blur {
    blurLevel?: string;
    value?: number;
}

export interface Emotion {
    anger?: number;
    contempt?: number;
    disgust?: number;
    fear?: number;
    happiness?: number;
    neutral?: number;
    sadness?: number;
    surprise?: number;
}

export interface Exposure {
    exposureLevel?: string;
    value?: number;
}

export interface FacialHair {
    moustache?: number;
    beard?: number;
    sideburns?: number;
}

export interface Hair {
    bald?: number;
    invisible?: boolean;
    hairColor?: HairColor[];
}

export interface HairColor {
    color?: string;
    confidence?: number;
}

export interface HeadPose {
    roll?: number;
    yaw?: number;
    pitch?: number;
}

export interface Makeup {
    eyeMakeup?: boolean;
    lipMakeup?: boolean;
}

export interface Noise {
    noiseLevel?: string;
    value?: number;
}

export interface Occlusion {
    foreheadOccluded?: boolean;
    eyeOccluded?: boolean;
    mouthOccluded?: boolean;
}

export interface FaceLandmark {
    x?: number;
    y?: number;
}

export interface FaceRectangle {
    width?: number;
    height?: number;
    left?: number;
    top?: number;
}

export interface Identity {
    faceId: string;
    candidates?: Candidate[];
}

export interface Candidate {
    personId: string;
    confidence?: number;
}

export interface Person {
    personId: string;
    persistedFaceIds?: string[];
    name?: string;
    userData?: string;
}

export interface DetectedPerson {
    personId: string;
    name?: string;
    emotion: string;
}

export namespace Convert {
    export function toFace(json: string): Face[] {
        return JSON.parse(json);
    }

    export function faceToJson(value: Face[]): string {
        return JSON.stringify(value, null, 2);
    }

    export function toIdentity(json: string): Identity[] {
        return JSON.parse(json);
    }

    export function identityToJson(value: Identity[]): string {
        return JSON.stringify(value, null, 2);
    }

    export function toPerson(json: string): Person {
        return JSON.parse(json);
    }

    export function personToJson(value: Person): string {
        return JSON.stringify(value, null, 2);
    }

    export function emotion(face?: Face): string {
        let ret: string = "unknown";
        var sortable = [];
        if (face && face.faceAttributes && face.faceAttributes.emotion) {
            let emotion: any = face.faceAttributes.emotion;
            for (var prop in emotion) {
                sortable.push([prop, emotion[prop]]);
            }
            sortable.sort(function (a, b) {
                return b[1] - a[1];
            });
            ret = sortable[0][0];
        }
        return ret;
    }
}

export interface FaceAPI {
    detect(buffer: Buffer): Promise<Face[]>;
    identify(personGroupId: string, faceIds: string[]): Promise<Identity[]>;
    person(personGroupId: string, personId: string): Promise<Person>;
    detectPersons(buffer: Buffer,personGroupId: string): Promise<DetectedPerson[]>;
}
