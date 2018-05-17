"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Convert;
(function (Convert) {
    function toFace(json) {
        return JSON.parse(json);
    }
    Convert.toFace = toFace;
    function faceToJson(value) {
        return JSON.stringify(value, null, 2);
    }
    Convert.faceToJson = faceToJson;
    function toIdentity(json) {
        return JSON.parse(json);
    }
    Convert.toIdentity = toIdentity;
    function identityToJson(value) {
        return JSON.stringify(value, null, 2);
    }
    Convert.identityToJson = identityToJson;
    function toPerson(json) {
        return JSON.parse(json);
    }
    Convert.toPerson = toPerson;
    function personToJson(value) {
        return JSON.stringify(value, null, 2);
    }
    Convert.personToJson = personToJson;
    function emotion(face) {
        let ret = "unknown";
        var sortable = [];
        if (face && face.faceAttributes && face.faceAttributes.emotion) {
            let emotion = face.faceAttributes.emotion;
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
    Convert.emotion = emotion;
})(Convert = exports.Convert || (exports.Convert = {}));
//# sourceMappingURL=face-api.js.map