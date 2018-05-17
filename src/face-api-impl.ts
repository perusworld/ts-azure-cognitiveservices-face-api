import { FaceAPI, Face, Identity, Person, DetectedPerson, Convert } from './face-api';
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
        this.conf.identifyEndpoint = "identify";
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

    public identify(personGroupId: string, faceIds: string[]): Promise<Identity[]> {
        return this.requestWrapper.send({
            endpoint: this.conf.identifyEndpoint,
            method: "POST",
            payload: {
                personGroupId: personGroupId,
                faceIds: faceIds,
                maxNumOfCandidatesReturned: 1
            }
        }).then(resp => {
            return resp;
        });
    }

    public person(personGroupId: string, personId: string): Promise<Person> {
        return this.requestWrapper.send({
            endpoint: `persongroups/${personGroupId}/persons/${personId}`,
            method: "GET",
            payload: {}
        }).then(resp => {
            return resp;
        });
    }

    public detectPersons(buffer: Buffer, personGroupId: string): Promise<DetectedPerson[]> {
        return this.detect(buffer).then(faces => {
            if (null == faces || 0 == faces.length) {
                return [];
            } else {
                let faceIds = faces.map(face => face.faceId);
                return this.identify(personGroupId, faceIds).then(ids => {
                    let ret: DetectedPerson[] = [];
                    let id = ids.find(id => null != id.candidates && 0 < id.candidates.length);
                    let promises: any[] = [];
                    ids.forEach(id => {
                        if (null != id.candidates && 0 < id.candidates.length) {
                            ret.push({ personId: id.candidates[0].personId, emotion: Convert.emotion(faces.find(face => face.faceId == id.faceId)) })
                            promises.push(this.person(personGroupId, id.candidates[0].personId));
                        }
                    });
                    return Promise.all(promises).then(values => {
                        values.forEach(person => {
                            let entry = ret.find(entry => entry.personId == person.personId);
                            if (entry) {
                                entry.name = person.name;
                            }
                        });
                        return ret;
                    });
                });
            }
        })
    }

}