import { SecureHeadersOptions, parseHeaderOptions } from "./utils";

class HTTPHeader {
  header: string;
  value: string;
  info: string;
  constructor(header: string, value: string, info: string = "N/A") {
    this.header = header;
    this.value = value;
    this.info = info;
  }
}

export class SecurityHeaders {
  static server = new HTTPHeader("Server", "NULL");

  static httpStrictTransportSecurity = new HTTPHeader(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubdomains",
    "Ensure application communication is sent over HTTPS"
  );

  static xFrameOptions = new HTTPHeader(
    "X-Frame-Options",
    "SAMEORIGIN",
    "Disable framing from different origins (clickjacking defense)"
  );

  static xXssProtection = new HTTPHeader(
    "X-XSS-Protection",
    "1; mode=block",
    "Enable Cross-Site Scripting filters"
  );

  static xContentTypeOptions = new HTTPHeader(
    "X-Content-Type-Options",
    "nosniff",
    "Prevent MIME-sniffing"
  );

  static contentSecurityPolicy = new HTTPHeader(
    "Content-Security-Policy",
    "script-src 'self'; object-src 'self'",
    "Prevent Cross-site injections"
  );

  static referrerPolicy = new HTTPHeader(
    "Referrer-Policy",
    "no-referrer, strict-origin-when-cross-origin",
    "Enable full referrer if same origin, remove path for cross origin and disable referrer in unsupported browsers"
  );

  static cacheControl = new HTTPHeader(
    "Cache-control",
    "no-cache, no-store, must-revalidate, max-age=0",
    "Prevent cacheable HTTPS response"
  );

  static pragma = new HTTPHeader(
    "Pragma",
    "no-cache",
    "Prevent cacheable HTTPS response"
  );

  static expires = new HTTPHeader(
    "Expires",
    "0",
    "Prevent cacheable HTTPS response"
  );

  static featurePolicy = new HTTPHeader(
    "Feature-Policy",
    "accelerometer 'none'; ambient-light-sensor 'none'; autoplay 'none'; camera 'none'; encrypted-media 'none'; fullscreen 'none'; geolocation 'none'; gyroscope 'none'; magnetometer 'none'; microphone 'none'; midi 'none'; payment 'none'; picture-in-picture 'none'; speaker 'none'; sync-xhr 'none'; usb 'none'; vr 'none'",
    "Disable browser features and APIs"
  );

  static secureHeaders(options: SecureHeadersOptions) {
    let headers: Array<HTTPHeader> = [];
    options = parseHeaderOptions(options);

    if (options.server) {
      if (typeof options.server == "string") {
        SecurityHeaders.server.value = options.server;
      }
      headers.push(SecurityHeaders.server);
    }

    if (options.hsts) {
      if (typeof options.hsts == "string") {
        SecurityHeaders.httpStrictTransportSecurity.value = options.hsts;
      }
      headers.push(SecurityHeaders.httpStrictTransportSecurity);
    }

    if (options.xfo) {
      if (typeof options.xfo == "string") {
        SecurityHeaders.xFrameOptions.value = options.xfo;
      }
      headers.push(SecurityHeaders.xFrameOptions);
    }

    if (options.xxp) {
      if (typeof options.xxp == "string") {
        SecurityHeaders.xXssProtection.value = options.xxp;
      }
      headers.push(SecurityHeaders.xXssProtection);
    }

    if (options.content) {
      if (typeof options.content == "string") {
        SecurityHeaders.xContentTypeOptions.value = options.content;
      }
      headers.push(SecurityHeaders.xContentTypeOptions);
    }

    if (options.csp) {
      if (typeof options.csp == "string") {
        SecurityHeaders.contentSecurityPolicy.value = options.csp;
      }
      headers.push(SecurityHeaders.contentSecurityPolicy);
    }

    if (options.referrer) {
      if (typeof options.referrer == "string") {
        SecurityHeaders.referrerPolicy.value = options.referrer;
      }
      headers.push(SecurityHeaders.referrerPolicy);
    }

    if (options.cache) {
      if (typeof options.cache == "string") {
        SecurityHeaders.cacheControl.value = options.cache;
      } else {
        headers.push(SecurityHeaders.pragma);
        headers.push(SecurityHeaders.expires);
      }
      headers.push(SecurityHeaders.cacheControl);
    }

    if (options.feature) {
      if (typeof options.feature == "string") {
        SecurityHeaders.featurePolicy.value = options.feature;
      }
      headers.push(SecurityHeaders.featurePolicy);
    }

    return headers;
  }
}

export function headerObject(options: SecureHeadersOptions) {
  const headers = SecurityHeaders.secureHeaders(options);
  let secureHeaders: Headers = {};
  for (let header of headers) {
    secureHeaders[header.header] = header.value;
  }
  return secureHeaders;
}

export function setCommonHeader(res: any, options: SecureHeadersOptions) {
  const headers = headerObject(options);
  res.set(headers);
}

export function setHeaderTuple(response: any, options: SecureHeadersOptions) {
  const headers = SecurityHeaders.secureHeaders(options);
  for (let header of headers) {
    response.header(header.header, header.value);
  }
}

export function setHeader(res: any, options: SecureHeadersOptions) {
  const headers = SecurityHeaders.secureHeaders(options);
  for (let header of headers) {
    res.setHeader(header.header, header.value);
  }
}

export interface Headers {
  Server?: string;
  "Strict-Transport-Security"?: string;
  "X-Frame-Options"?: string;
  "X-XSS-Protection"?: string;
  "X-Content-Type-Options"?: string;
  "Content-Security-Policy"?: string;
  "Referrer-Policy"?: string;
  Pragma?: string;
  Expires?: string;
  "Cache-control"?: string;
  "Feature-Policy"?: string;
  [key: string]: string | undefined;
}
