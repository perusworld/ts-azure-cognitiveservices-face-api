import { FaceAPIImpl, Convert } from "../src/index";
import * as fs from "fs";

let subscriptionKey = process.env.SUBSCRIPTION_KEY;
let location = process.env.LOCATION || "westus";
let img = process.env.TEST_IMAGE || "test/test.jpg";

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

describe('check detect', () => {

    it('should detect', () => {
        let impl = new FaceAPIImpl({
            location: location,
            subscriptionKey: subscriptionKey
        });
        return readAsPromise(img).then(buf => {
            return impl.detect(buf).then(faces => {
                expect(faces).not.toBeNull();
                expect(faces.length).toBe(1);
                expect(faces[0].faceAttributes.gender).toBe("male");
                expect(Convert.emotion(faces[0])).toBe("neutral");
                console.log(faces[0].faceId);
            })
        });
    });

});