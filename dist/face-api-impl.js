"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const face_api_1 = require("./face-api");
const request_1 = require("./request");
class InMemoryCache {
    constructor() {
        this.cache = {};
    }
    get(key) {
        return this.cache[key];
    }
    has(key) {
        return null != this.cache[key];
    }
    set(key, value) {
        this.cache[key] = value;
    }
}
exports.InMemoryCache = InMemoryCache;
class FaceAPIImpl {
    constructor(conf) {
        this.conf = Object.assign({ detect: {
                endpoint: "detect",
                returnFaceId: true,
                returnFaceLandmarks: true,
                returnFaceAttributes: ["age", "gender", "headPose", "smile", "facialHair", "glasses", "emotion", "hair", "makeup", "occlusion", "accessories", "blur", "exposure", "noise"]
            } }, conf);
        this.conf.detectEndpoint = "detect?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise";
        this.conf.identifyEndpoint = "identify";
        this.requestWrapper = new request_1.RequestWrapper(conf);
    }
    detect(buffer) {
        return this.requestWrapper.send({
            endpoint: this.conf.detectEndpoint,
            method: "POST",
            payload: buffer
        }).then(resp => {
            return resp;
        });
    }
    identify(personGroupId, faceIds) {
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
    person(personGroupId, personId) {
        return this.requestWrapper.send({
            endpoint: `persongroups/${personGroupId}/persons/${personId}`,
            method: "GET",
            payload: {}
        }).then(resp => {
            return resp;
        });
    }
    detectPersons(buffer, personGroupId, cache) {
        return this.detect(buffer).then(faces => {
            if (null == faces || 0 == faces.length) {
                return [];
            }
            else {
                let faceIds = faces.map(face => face.faceId);
                return this.identify(personGroupId, faceIds).then(ids => {
                    let ret = [];
                    let id = ids.find(id => null != id.candidates && 0 < id.candidates.length);
                    let promises = [];
                    ids.forEach(id => {
                        if (null != id.candidates && 0 < id.candidates.length) {
                            const personId = id.candidates[0].personId;
                            ret.push({ personId: personId, emotion: face_api_1.Convert.emotion(faces.find(face => face.faceId == id.faceId)) });
                            promises.push(cache && cache.has(personId) ? cache.get(personId) : this.person(personGroupId, personId));
                        }
                    });
                    return Promise.all(promises).then(values => {
                        values.forEach(person => {
                            let entry = ret.find(entry => entry.personId == person.personId);
                            if (entry) {
                                entry.name = person.name;
                                if (null != cache) {
                                    cache.set(entry.personId, person);
                                }
                            }
                        });
                        return ret;
                    });
                });
            }
        });
    }
}
exports.FaceAPIImpl = FaceAPIImpl;
//# sourceMappingURL=face-api-impl.js.map