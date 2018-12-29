import { headerObject, headerObj, setHeaderTuple } from "./headers";

export class SecureHeaders {
  options: secureHeadersOptions;
  constructor(options: secureHeadersOptions) {
    this.options = options;
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

export interface secureHeadersOptions {
  server?: boolean | string;
  hsts?: boolean | string;
  xfo?: boolean | string;
  xxp?: boolean | string;
  content?: boolean | string;
  csp?: boolean | string;
  referrer?: boolean | string;
  cache?: boolean | string;
  feature?: boolean | string;
  [key: string]: boolean | string | undefined;
}
