import { SameSite } from "./cookie";

export interface secureCookieOptions {
  path?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: SameSite | boolean;
  expires?: boolean | number;
  [key: string]: boolean | string | undefined | number | SameSite;
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

const cookieOptions: secureCookieOptions = {
  path: "/",
  secure: true,
  httpOnly: true,
  sameSite: SameSite.Lax,
  expires: false
};

const headerOptions: secureHeadersOptions = {
  server: false,
  hsts: true,
  xfo: true,
  xxp: true,
  content: true,
  csp: false,
  referrer: true,
  cache: true,
  feature: false
};

export function parseHeaderOptions(options: secureHeadersOptions) {
  const defaultOptions: secureHeadersOptions = headerOptions;
  for (let property in options) {
    if (options.hasOwnProperty(property)) {
      defaultOptions[property] = options[property];
    }
  }
  return defaultOptions;
}
export function parseCookieOptions(options: secureCookieOptions) {
  const defaultOptions: secureCookieOptions = cookieOptions;
  for (let property in options) {
    if (options.hasOwnProperty(property)) {
      defaultOptions[property] = options[property];
    }
  }
  return defaultOptions;
}
