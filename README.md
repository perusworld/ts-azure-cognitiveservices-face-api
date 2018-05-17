# Azure Cognitive Services Face API - Node.js TypeScript Module - Base #

## Install
```bash
npm install github:perusworld/ts-azure-cognitiveservices-face-api --save
```

## Usage

## Detect
```javascript
import { FaceAPIImpl } from "ts-azure-cognitiveservices-face-api";
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
import { FaceAPIImpl } from "ts-azure-cognitiveservices-face-api";
let faceAPI = new FaceAPIImpl({
    location: location,
    subscriptionKey: subscriptionKey
});
faceAPI.identify(personGroupId, faceIds).then(ids => {
    //ids array
});
```

## Get Person
```javascript
import { FaceAPIImpl } from "ts-azure-cognitiveservices-face-api";
let faceAPI = new FaceAPIImpl({
    location: location,
    subscriptionKey: subscriptionKey
});
faceAPI.person(personGroupId, personId).then(person => {
    //person
});
```