"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request");
class RequestWrapper {
    constructor(conf) {
        this.conf = Object.assign({ urlPrefix: `https://${conf.location}.api.cognitive.microsoft.com/face/v1.0/` }, conf);
        if (this.conf.httpProxy && "" !== this.conf.httpProxy) {
            console.log("using proxy", this.conf.httpProxy);
        }
    }
    send(ctx) {
        return new Promise((resolve, reject) => {
            let req = {
                uri: this.conf.urlPrefix + ctx.endpoint,
                method: ctx.method,
                headers: {
                    "Ocp-Apim-Subscription-Key": this.conf.subscriptionKey
                }
            };
            if ("POST" == ctx.method) {
                if (Buffer.isBuffer(ctx.payload)) {
                    req.headers["Content-Type"] = "application/octet-stream";
                    req.body = ctx.payload;
                }
                else {
                    req.json = ctx.payload;
                }
            }
            else if ("GET" == ctx.method) {
                req.qs = ctx.payload;
            }
            if (this.conf.httpProxy && "" !== this.conf.httpProxy) {
                req.proxy = this.conf.httpProxy;
            }
            request(req, function (error, response, body) {
                if (error) {
                    reject(error);
                }
                else if (200 == response.statusCode) {
                    resolve(typeof body == "string" ? JSON.parse(body) : body);
                }
                else {
                    reject(body);
                }
            });
        });
    }
    ;
}
exports.RequestWrapper = RequestWrapper;
//# sourceMappingURL=request.js.map