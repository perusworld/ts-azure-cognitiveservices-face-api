import { FaceAPIImpl, Convert } from "../src/index";
import * as fs from "fs";

let subscriptionKey = process.env.SUBSCRIPTION_KEY;
let location = process.env.LOCATION || "westus";
let personGroupId = process.env.PERSON_GROUP_ID || "testpersongroupid";
let detectImg = process.env.DETECT_TEST_IMAGE || "test/test.jpg";
let identifyImg = process.env.IDENTIFY_TEST_IMAGE || "test/combo.jpg";

function readAsPromise(file: string) : Promise<any> {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, buf) => {
            if (err) {
                reject(err);
            } else {
                resolve(buf);
            }
        });
    });
}

describe('check face-api-impl', () => {

    it('should detect', () => {
        let impl = new FaceAPIImpl({
            location: location,
            subscriptionKey: subscriptionKey
        });
        return readAsPromise(detectImg).then(buf => {
            return impl.detect(buf).then(faces => {
                expect(faces).not.toBeNull();
                expect(faces.length).toBe(1);
                expect(faces[0].faceAttributes.gender).toBe("male");
                expect(Convert.emotion(faces[0])).toBe("neutral");
                console.log(faces[0].faceId);
            })
        });
    });

    it('should identify', () => {
        let impl = new FaceAPIImpl({
            location: location,
            subscriptionKey: subscriptionKey
        });
        return readAsPromise(identifyImg).then(buf => {
            return impl.detect(buf).then(faces => {
                expect(faces).not.toBeNull();
                expect(faces.length).toBe(6);
                expect(faces[0].faceAttributes.gender).toBe("male");
                let faceIds =  faces.map(face => face.faceId);
                return impl.identify(personGroupId, faceIds).then(ids => {
                    expect(ids).not.toBeNull();
                    expect(ids.length).toBe(faces.length);
                });
            })
        });
    });

});