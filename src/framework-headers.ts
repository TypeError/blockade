import { headerObject, headerObj, setHeaderTuple } from "./headers";
import { secureHeadersOptions } from "./utils";

export class SecureHeaders {
  options: secureHeadersOptions;
  constructor(options: secureHeadersOptions) {
    this.options = options;
  }

  headers() {
    const headers = headerObject(this.options);
    return headers;
  }

  express(res: any) {
    const headers = headerObject(this.options);
    res.set(headers);
  }

  hapi(response: any) {
    setHeaderTuple(response, this.options);
  }

  koa(ctx: any) {
    const headers = headerObject(this.options);
    ctx.set(headers);
  }
}
