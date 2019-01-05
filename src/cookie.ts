import { secureCookieOptions, parseCookieOptions } from "./utils";

export enum SameSite {
  Lax = "lax",
  Strict = "strict"
}

export class Cookie {
  value: string;
  constructor(value: string) {
    this.value = value;
  }

  secureCookie(options: secureCookieOptions) {
    options = parseCookieOptions(options);
    let cookie_value: string;
    cookie_value = `${this.value}; Path=${options.path}`;
    if (options.secure) {
      cookie_value += "; Secure";
    }
    if (options.httponly) {
      cookie_value += "; HttpOnly";
    }
    if (options.samesite) {
      cookie_value += `; SameSite=${options.samesite}`;
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
