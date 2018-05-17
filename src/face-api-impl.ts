import { FaceAPI, Face, Convert } from './face-api';
import { RequestWrapper } from './request';

export class FaceAPIImpl implements FaceAPI {
    conf: any;
    requestWrapper: RequestWrapper;
    public constructor(conf: any) {
        this.conf = {
            detect: {
                endpoint: "detect",
                returnFaceId: true,
                returnFaceLandmarks: true,
                returnFaceAttributes: ["age", "gender", "headPose", "smile", "facialHair", "glasses", "emotion", "hair", "makeup", "occlusion", "accessories", "blur", "exposure", "noise"]
            },
            ...conf
        };
        this.conf.detectEndpoint = "detect?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise";
        this.requestWrapper = new RequestWrapper(conf);
    }

    public detect(buffer: Buffer): Promise<Face[]> {
        return this.requestWrapper.send({
            endpoint: this.conf.detectEndpoint,
            method: "POST",
            payload: buffer
        }).then(resp => {
            return resp;
        });
    }
}