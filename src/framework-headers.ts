import {
  headerObject,
  headerObj,
  setHeaderTuple,
  setCommonHeader
} from "./headers";
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
    setCommonHeader(res, this.options);
  }

  hapi(response: any) {
    setHeaderTuple(response, this.options);
  }

  koa(ctx: any) {
    const headers = headerObject(this.options);
    ctx.set(headers);
  }

  nest(res: any) {
    setCommonHeader(res, this.options);
  }

  sails(res: any) {
    setCommonHeader(res, this.options);
  }
}
