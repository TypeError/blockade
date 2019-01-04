import { secureCookieOptions, parseOptions } from "./utils";

export class SecureCookie {
  options: secureCookieOptions;
  constructor(options: secureCookieOptions) {
    this.options = options;
  }

  express(res: any, name: string, value: string) {
    const options: secureCookieOptions = parseOptions("cookie", this.options);
    const expressCookieOptions: ExpressCookie = {
      httpOnly: options.httpOnly,
      path: options.path,
      secure: options.secure,
      sameSite: options.sameSite
    };
    if (options.expires) {
      if (typeof options.expires == "number") {
        const expireDate = new Date();
        expireDate.setHours(expireDate.getHours() + options.expires);
        expressCookieOptions.expires = expireDate;
      }
    }
    res.cookie(name, value, expressCookieOptions);
  }

  hapi(h: any, name: string, value: string) {
    const options: secureCookieOptions = parseOptions("cookie", this.options);
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
    const options: secureCookieOptions = parseOptions("cookie", this.options);
    const koaCookieOptions: KoaCookie = {
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
}

interface ExpressCookie {
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

interface KoaCookie {
  sameSite?: string | boolean;
  expires?: Date | boolean;
  path?: string;
  secure?: boolean;
  httpOnly?: boolean;
  [key: string]: boolean | string | undefined | Date;
}
