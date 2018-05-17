import * as request from "request";

export class RequestWrapper {
  conf: any;
  public constructor(conf: any) {
    this.conf = {
      urlPrefix: `https://${conf.location}.api.cognitive.microsoft.com/face/v1.0/`,
      ...conf
    };

    if (this.conf.httpProxy && "" !== this.conf.httpProxy) {
      console.log("using proxy", this.conf.httpProxy);
    }
  }

  public send(ctx: any): Promise<any> {
    return new Promise((resolve, reject) => {

      let req = <any>{
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
        } else {
          req.json = ctx.payload;
        }
      } else if ("GET" == ctx.method) {
        req.qs = ctx.payload;
      }
      if (this.conf.httpProxy && "" !== this.conf.httpProxy) {
        req.proxy = this.conf.httpProxy;
      }
      request(req, function (error: any, response: request.RequestResponse, body: any) {
        if (error) {
          reject(error);
        } else if (200 == response.statusCode) {
          resolve(typeof body == "string" ? JSON.parse(body) : body);
        } else {
          reject(body);
        }
      });
    });
  };
}
