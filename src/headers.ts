import { SecureHeadersOptions, parseHeaderOptions } from "./utils";
import { PolicyOptions } from "./policies";

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
      if (
        options.server.option === PolicyOptions.CustomValue &&
        options.server.value
      ) {
        SecurityHeaders.server.value = options.server.value;
        headers.push(SecurityHeaders.server);
      } else if (options.server.option === PolicyOptions.DefaultHeader) {
        headers.push(SecurityHeaders.server);
      }
    }

    if (options.hsts) {
      if (
        options.hsts.option === PolicyOptions.CustomValue &&
        options.hsts.value
      ) {
        SecurityHeaders.httpStrictTransportSecurity.value = options.hsts.value;
        headers.push(SecurityHeaders.httpStrictTransportSecurity);
      } else if (options.hsts.option === PolicyOptions.DefaultHeader) {
        headers.push(SecurityHeaders.httpStrictTransportSecurity);
      }
    }

    if (options.xfo) {
      if (
        options.xfo.option === PolicyOptions.CustomValue &&
        options.xfo.value
      ) {
        SecurityHeaders.xFrameOptions.value = options.xfo.value;
        headers.push(SecurityHeaders.xFrameOptions);
      } else if (options.xfo.option === PolicyOptions.DefaultHeader) {
        headers.push(SecurityHeaders.xFrameOptions);
      }
    }

    if (options.xxp) {
      if (
        options.xxp.option === PolicyOptions.CustomValue &&
        options.xxp.value
      ) {
        SecurityHeaders.xXssProtection.value = options.xxp.value;
        headers.push(SecurityHeaders.xXssProtection);
      } else if (options.xxp.option === PolicyOptions.DefaultHeader) {
        headers.push(SecurityHeaders.xXssProtection);
      }
    }

    if (options.content) {
      if (
        options.content.option === PolicyOptions.CustomValue &&
        options.content.value
      ) {
        SecurityHeaders.xContentTypeOptions.value = options.content.value;
        headers.push(SecurityHeaders.xContentTypeOptions);
      } else if (options.content.option === PolicyOptions.DefaultHeader) {
        headers.push(SecurityHeaders.xContentTypeOptions);
      }
    }

    if (options.csp) {
      if (
        options.csp.option === PolicyOptions.CustomValue &&
        options.csp.value
      ) {
        SecurityHeaders.contentSecurityPolicy.value = options.csp.value;
        headers.push(SecurityHeaders.contentSecurityPolicy);
      } else if (options.csp.option === PolicyOptions.DefaultHeader) {
        headers.push(SecurityHeaders.contentSecurityPolicy);
      }
    }

    if (options.referrer) {
      if (
        options.referrer.option === PolicyOptions.CustomValue &&
        options.referrer.value
      ) {
        SecurityHeaders.referrerPolicy.value = options.referrer.value;
        headers.push(SecurityHeaders.referrerPolicy);
      } else if (options.referrer.option === PolicyOptions.DefaultHeader) {
        headers.push(SecurityHeaders.referrerPolicy);
      }
    }

    if (options.cache) {
      if (
        options.cache.option === PolicyOptions.CustomValue &&
        options.cache.value
      ) {
        SecurityHeaders.cacheControl.value = options.cache.value;
        headers.push(SecurityHeaders.cacheControl);
      } else if (options.cache.option === PolicyOptions.DefaultHeader) {
        headers.push(SecurityHeaders.cacheControl);
        headers.push(SecurityHeaders.pragma);
        headers.push(SecurityHeaders.expires);
      }
    }

    if (options.feature) {
      if (
        options.feature.option === PolicyOptions.CustomValue &&
        options.feature.value
      ) {
        SecurityHeaders.featurePolicy.value = options.feature.value;
        headers.push(SecurityHeaders.featurePolicy);
      } else if (options.feature.option === PolicyOptions.DefaultHeader) {
        headers.push(SecurityHeaders.featurePolicy);
      }
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
