# Azure Cognitive Services Face API - Node.js TypeScript Module - Base #

## Install
```bash
npm install github:perusworld/ts-azure-cognitiveservices-face-api --save
```

## Usage

## Detect
```javascript
import { FaceAPIImpl, Convert } from "ts-azure-cognitiveservices-face-api";
let faceAPI = new FaceAPIImpl({
    location: location,
    subscriptionKey: subscriptionKey
});
//buf - image file content as Buffer
faceAPI.detect(buf).then(faces => {
    //faces array
});
```

## Identify
```javascript
import { FaceAPIImpl, Convert } from "ts-azure-cognitiveservices-face-api";
let faceAPI = new FaceAPIImpl({
    location: location,
    subscriptionKey: subscriptionKey
});
faceAPI.identify(personGroupId, faceIds).then(ids => {
    //ids array
});
```