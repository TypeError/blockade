import {
  SecureCookieOptions,
  parseCookieOptions,
  sameSiteOptions
} from "./utils";
import { CommonCookie } from "./framework-cookie";

export class Cookie {
  value: string;
  constructor(value: string) {
    this.value = value;
  }

  secureCookie(options: SecureCookieOptions) {
    options = parseCookieOptions(options);
    let cookie_value: string;
    cookie_value = `${this.value}; Path=${options.path}`;
    if (options.secure) {
      cookie_value += "; Secure";
    }
    if (options.httpOnly) {
      cookie_value += "; HttpOnly";
    }
    if (options.sameSite) {
      const sameSiteValue = sameSiteOptions(options.sameSite);
      cookie_value += `; SameSite=${sameSiteValue}`;
    }
    if (options.expires) {
      if (typeof options.expires == "number") {
        cookie_value += `; Expires=${cookieExpiration(options.expires)}`;
      }
    }
    return cookie_value;
  }
}

function cookieExpiration(hours: number, dateObject: boolean = false) {
  const dateNow = new Date();
  let returnObject: string | Date;
  dateNow.setHours(dateNow.getHours() + hours);
  let expire_time = dateNow.toUTCString();
  if (dateObject) {
    returnObject = dateNow;
  } else {
    returnObject = expire_time;
  }
  return returnObject;
}

export function commonCookieOptions(options: SecureCookieOptions) {
  options = parseCookieOptions(options);
  const cookieOptions: CommonCookie = {
    httpOnly: options.httpOnly,
    path: options.path,
    secure: options.secure
  };
  if (options.expires) {
    if (typeof options.expires == "number") {
      const expireDate = new Date();
      expireDate.setHours(expireDate.getHours() + options.expires);
      cookieOptions.expires = expireDate;
    }
  }
  if (options.sameSite) {
    const sameSiteValue = sameSiteOptions(options.sameSite);
    cookieOptions.sameSite = sameSiteValue;
  }
  return cookieOptions;
}

export function setCommonCookie(
  res: any,
  name: string,
  value: string,
  options: SecureCookieOptions
) {
  const cookieOptions = commonCookieOptions(options);
  res.cookie(name, value, cookieOptions);
}
