# Azure Cognitive Services Face API - Node.js TypeScript Module - Base #

## Install
```bash
npm install github:perusworld/ts-azure-cognitiveservices-face-api --save
```

## Usage
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