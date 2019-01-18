import {
  Content,
  CSP,
  Cache,
  HSTS,
  XFO,
  XXP,
  Feature,
  Referrer,
  Server
} from "./policies";

export interface SecureCookieOptions {
  path?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: SameSite;
  expires?: boolean | number;
  [key: string]: boolean | string | undefined | number | SameSite;
}

export interface SecureHeadersOptions {
  server?: Server;
  hsts?: HSTS;
  xfo?: XFO;
  xxp?: XXP;
  content?: Content;
  csp?: CSP;
  referrer?: Referrer;
  cache?: Cache;
  feature?: Feature;
  [key: string]:
    | Content
    | CSP
    | Cache
    | HSTS
    | XFO
    | XXP
    | Feature
    | Referrer
    | Server
    | undefined;
}

const cookieOptions: SecureCookieOptions = {
  path: "/",
  secure: true,
  httpOnly: true,
  sameSite: { value: "Lax" },
  expires: false
};

const headerOptions: SecureHeadersOptions = {
  server: new Server().notSet(),
  hsts: new HSTS().default(),
  xfo: new XFO().default(),
  xxp: new XXP().default(),
  content: new Content().default(),
  csp: new CSP().notSet(),
  referrer: new Referrer().default(),
  cache: new Cache().default(),
  feature: new Feature().notSet()
};

export function parseHeaderOptions(options: SecureHeadersOptions) {
  const defaultOptions: SecureHeadersOptions = headerOptions;
  for (let property in options) {
    if (options.hasOwnProperty(property)) {
      defaultOptions[property] = options[property];
    }
  }
  return defaultOptions;
}
export function parseCookieOptions(options: SecureCookieOptions) {
  const defaultOptions: SecureCookieOptions = cookieOptions;
  for (let property in options) {
    if (options.hasOwnProperty(property)) {
      defaultOptions[property] = options[property];
    }
  }
  return defaultOptions;
}

interface Lax {
  value: "Lax";
}
interface NotSet {
  value: 0;
}
interface Strict {
  value: "Strict";
}

export type SameSite = Lax | NotSet | Strict;

export function sameSiteOptions(option: SameSite) {
  switch (option.value) {
    case "Lax":
      return "Lax";
    case "Strict":
      return "Strict";
    case 0:
      return false;
  }
}
