import {
  SecureCookieOptions,
  parseCookieOptions,
  sameSiteOptions
} from "./utils";
import { setCommonCookie, commonCookieOptions, Cookie } from "./cookie";

export class SecureCookie {
  options: SecureCookieOptions;
  constructor(options: SecureCookieOptions) {
    this.options = options;
  }

  adonis(response: any, name: string, value: string) {
    setCommonCookie(response, name, value, this.options);
  }

  express(res: any, name: string, value: string) {
    setCommonCookie(res, name, value, this.options);
  }

  fastify(res: any, name: string, value: string) {
    const cookieValue = new Cookie(value).secureCookie(this.options);
    res.header("Set-Cookie", `${name}=${cookieValue}`);
  }

  hapi(h: any, name: string, value: string) {
    const options: SecureCookieOptions = parseCookieOptions(this.options);
    const cookieOptions: HapiCookie = {
      isSecure: options.secure,
      isHttpOnly: options.httpOnly,
      path: options.path
    };
    if (options.expires) {
      if (typeof options.expires == "number") {
        const expireMilliseconds = options.expires * 60 * 60 * 1000;
        cookieOptions.ttl = expireMilliseconds;
      }
    }
    if (options.sameSite) {
      const sameSiteValue = sameSiteOptions(options.sameSite);
      cookieOptions.isSameSite = sameSiteValue;
    }
    h.state(name, value, cookieOptions);
  }

  koa(ctx: any, name: string, value: string) {
    const options: SecureCookieOptions = parseCookieOptions(this.options);
    const cookieOptions: CommonCookie = commonCookieOptions(options);
    ctx.cookies.set(name, value, cookieOptions);
  }

  polka(res: any, name: string, value: string) {
    const cookieValue = new Cookie(value).secureCookie(this.options);
    res.setHeader("Set-Cookie", `${name}=${cookieValue}`);
  }

  nest(res: any, name: string, value: string) {
    setCommonCookie(res, name, value, this.options);
  }

  restify(res: any, name: string, value: string) {
    const cookieValue = new Cookie(value).secureCookie(this.options);
    res.header("Set-Cookie", `${name}=${cookieValue}`);
  }

  sails(res: any, name: string, value: string) {
    setCommonCookie(res, name, value, this.options);
  }

  total(res: any, name: string, value: string) {
    setCommonCookie(res, name, value, this.options);
  }
}

export interface CommonCookie {
  expires?: Date;
  httpOnly?: boolean;
  path?: string;
  secure?: boolean;
  sameSite?: boolean | string;
  [key: string]: boolean | string | undefined | Date;
}

interface HapiCookie {
  isSecure?: boolean;
  isHttpOnly?: boolean;
  isSameSite?: string | boolean;
  path?: string;
  ttl?: number;
  [key: string]: boolean | string | undefined | number;
}
