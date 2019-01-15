export interface SecureCookieOptions {
  path?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: SameSite;
  expires?: boolean | number;
  [key: string]: boolean | string | undefined | number | SameSite;
}

export interface SecureHeadersOptions {
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

const cookieOptions: SecureCookieOptions = {
  path: "/",
  secure: true,
  httpOnly: true,
  sameSite: { value: "Lax" },
  expires: false
};

const headerOptions: SecureHeadersOptions = {
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
