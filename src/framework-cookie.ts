import { secureCookieOptions, parseCookieOptions } from "./utils";
import { setCommonCookie } from "./cookie";

export class SecureCookie {
  options: secureCookieOptions;
  constructor(options: secureCookieOptions) {
    this.options = options;
  }

  adonis(response: any, name: string, value: string) {
    setCommonCookie(response, name, value, this.options);
  }

  express(res: any, name: string, value: string) {
    setCommonCookie(res, name, value, this.options);
  }

  hapi(h: any, name: string, value: string) {
    const options: secureCookieOptions = parseCookieOptions(this.options);
    const hapiCookieOptions: HapiCookie = {
      isSecure: options.secure,
      isHttpOnly: options.httpOnly,
      isSameSite: options.sameSite,
      path: options.path
    };
    if (options.expires) {
      if (typeof options.expires == "number") {
        const expireMilliseconds = options.expires * 60 * 60 * 1000;
        hapiCookieOptions.ttl = expireMilliseconds;
      }
    }
    h.state(name, value, hapiCookieOptions);
  }

  koa(ctx: any, name: string, value: string) {
    const options: secureCookieOptions = parseCookieOptions(this.options);
    const koaCookieOptions: CommonCookie = {
      sameSite: options.sameSite,
      path: options.path,
      secure: options.secure,
      httpOnly: options.httpOnly
    };
    if (options.expires) {
      if (typeof options.expires == "number") {
        const expireDate = new Date();
        expireDate.setHours(expireDate.getHours() + options.expires);
        koaCookieOptions.expires = expireDate;
      }

      ctx.cookies.set(name, value, koaCookieOptions);
    }
  }

  nest(res: any, name: string, value: string) {
    setCommonCookie(res, name, value, this.options);
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
