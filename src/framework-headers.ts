import {
  headerObject,
  Headers,
  setHeaderTuple,
  setCommonHeader,
  setHeader
} from "./headers";
import { SecureHeadersOptions } from "./utils";

export class SecureHeaders {
  options: SecureHeadersOptions;
  constructor(options: SecureHeadersOptions) {
    this.options = options;
  }

  headers() {
    const headers = headerObject(this.options);
    return headers;
  }

  adonis(response: any) {
    setHeaderTuple(response, this.options);
  }

  express(res: any) {
    setCommonHeader(res, this.options);
  }

  fastify(reply: any) {
    setHeaderTuple(reply, this.options);
  }

  hapi(response: any) {
    setHeaderTuple(response, this.options);
  }

  koa(ctx: any) {
    const headers = headerObject(this.options);
    ctx.set(headers);
  }

  meteor(res: any) {
    setHeader(res, this.options);
  }

  nest(res: any) {
    setCommonHeader(res, this.options);
  }

  polka(res: any) {
    setHeader(res, this.options);
  }

  restify(response: any) {
    setHeaderTuple(response, this.options);
  }

  sails(res: any) {
    setCommonHeader(res, this.options);
  }

  total(res: any) {
    setHeaderTuple(res, this.options);
  }
}
