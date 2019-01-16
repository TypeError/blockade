import { SecurityHeaders } from "./headers";

export const defaultValue = "default";

export class Content {
  policy: string = "";

  default() {
    this.policy = defaultValue;
    return this;
  }

  notSet() {
    return undefined;
  }

  get value() {
    return this.policy;
  }
}

export class CSP {
  policy: HeaderOptions[] = [];
  defaultValue?: string;

  default() {
    this.defaultValue = defaultValue;
    return this;
  }

  notSet() {
    return undefined;
  }

  baseUri(...sources: string[]) {
    this.policy.push({ directive: "base-uri", sources: sources });
    return this;
  }

  blockAllMixedContent() {
    this.policy.push({ directive: "block-all-mixed-content" });
    return this;
  }

  connectSrc(...sources: string[]) {
    this.policy.push({ directive: "connect-src", sources: sources });
    return this;
  }

  defaultSrc(...sources: string[]) {
    this.policy.push({ directive: "default-src", sources: sources });
    return this;
  }

  fontSrc(...sources: string[]) {
    this.policy.push({ directive: "font-src", sources: sources });
    return this;
  }

  formAction(...sources: string[]) {
    this.policy.push({ directive: "form-action", sources: sources });
    return this;
  }

  frameAncestors(...sources: string[]) {
    this.policy.push({ directive: "frame-ancestors", sources: sources });
    return this;
  }

  frameSrc(...sources: string[]) {
    this.policy.push({ directive: "frame-src", sources: sources });
    return this;
  }

  imgSrc(...sources: string[]) {
    this.policy.push({ directive: "img-src", sources: sources });
    return this;
  }

  manifestSrc(...sources: string[]) {
    this.policy.push({ directive: "manifest-src", sources: sources });
    return this;
  }

  mediaSrc(...sources: string[]) {
    this.policy.push({ directive: "media-src", sources: sources });
    return this;
  }

  objectSrc(...sources: string[]) {
    this.policy.push({ directive: "object-src", sources: sources });
    return this;
  }

  pluginTypes(...types: string[]) {
    this.policy.push({ directive: "plugin-types", sources: types });
    return self;
  }

  requireSriFor(...values: string[]) {
    this.policy.push({ directive: "require-sri-for", sources: values });
    return this;
  }

  reportTo(json_object: object) {
    this.policy.push({ directive: "report-to", sources: json_object });
    return this;
  }

  reportUri(uri: string) {
    this.policy.push({ directive: "report-uri", sources: uri });
    return this;
  }

  sandbox(...values: string[]) {
    this.policy.push({ directive: "sandbox", sources: values });
    return this;
  }

  scriptSrc(...sources: string[]) {
    this.policy.push({ directive: "script-src", sources: sources });
    return this;
  }

  styleSrc(...sources: string[]) {
    this.policy.push({ directive: "style-src", sources: sources });
    return self;
  }

  upgradeInsecureRequests() {
    this.policy.push({ directive: "upgrade-insecure-requests" });
    return self;
  }

  workerSrc(...sources: string[]) {
    this.policy.push({ directive: "worker-src", sources: sources });
    return this;
  }

  get value() {
    if (this.defaultValue) {
      return this.defaultValue;
    } else {
      return getPolicyMultiOpt(this.policy);
    }
  }
}

export class XFO {
  policy: string = "";

  default() {
    this.policy = defaultValue;
    return this;
  }

  notSet() {
    return undefined;
  }

  allowFrom(uri: string) {
    this.policy = `allow-from ${uri}`;
    return this;
  }

  deny() {
    this.policy = "deny";
    return this;
  }

  sameorigin() {
    this.policy = "sameorigin";
    return this;
  }

  get value() {
    const headerValue = this.policy;
    return headerValue;
  }
}

export class XXP {
  policy: string = "";

  default() {
    this.policy = defaultValue;
    return this;
  }

  notSet() {
    return undefined;
  }

  disabled() {
    this.policy = "0";
    return this;
  }

  enabled() {
    this.policy = "1";
    return this;
  }

  enabledBlock() {
    this.policy = "1; mode=block";
    return this;
  }

  enabledReport(uri: string) {
    this.policy = `1; report=${uri}`;
    return this;
  }

  get value() {
    const headerValue = this.policy;
    return headerValue;
  }
}

export class Referrer {
  policy: string[] = [];
  defaultValue?: string;

  default() {
    this.defaultValue = defaultValue;
    return this;
  }

  notSet() {
    return undefined;
  }

  noReferrer() {
    this.policy.push("no-referrer");
    return this;
  }

  noReferrerWhenDowngrade() {
    this.policy.push("no-referrer-when-downgrade");
    return this;
  }

  origin() {
    this.policy.push("origin");
    return this;
  }

  originWhenCrossOrigin() {
    this.policy.push("origin-when-cross-origin");
    return this;
  }

  sameOrigin() {
    this.policy.push("same-origin");
    return this;
  }

  strictOrigin() {
    this.policy.push("strict-origin");
    return this;
  }

  strictOriginWhenCrossOrigin() {
    this.policy.push("strict-origin-when-cross-origin");
    return this;
  }

  unsafeUrl() {
    this.policy.push("unsafe-url");
    return this;
  }

  get value() {
    if (this.defaultValue) {
      return this.defaultValue;
    } else {
      return getPolicy(this.policy, ", ");
    }
  }
}

export class HSTS {
  policy: string[] = [];
  defaultValue?: string;

  default() {
    this.defaultValue = defaultValue;
    return this;
  }

  notSet() {
    return undefined;
  }

  includeSubdomains() {
    this.policy.push("includeSubDomains");
    return this;
  }

  maxAge(seconds: string) {
    this.policy.push(`max-age=${seconds}`);
    return this;
  }

  preload() {
    this.policy.push("preload");
    return this;
  }

  get value() {
    if (this.defaultValue) {
      return this.defaultValue;
    } else {
      return getPolicy(this.policy, "; ");
    }
  }
}

export class Cache {
  policy: string[] = [];
  defaultValue?: string;

  default() {
    this.defaultValue = defaultValue;
    return this;
  }

  notSet() {
    return undefined;
  }

  immutable() {
    this.policy.push("immutable");
    return this;
  }

  maxAge(seconds: string) {
    this.policy.push(`max-age=${seconds}`);
    return this;
  }

  maxStale(seconds: string) {
    this.policy.push(`max-stale=${seconds}`);
    return this;
  }

  minFresh(seconds: string) {
    this.policy.push(`min-fresh=${seconds}`);
    return this;
  }

  mustRevalidate() {
    this.policy.push("must-revalidate");
    return this;
  }

  noCache() {
    this.policy.push("no-cache");
    return this;
  }

  noStore() {
    this.policy.push("no-store");
    return this;
  }

  noTransform() {
    this.policy.push("no-transform");
    return this;
  }

  onlyIfCached() {
    this.policy.push("only-if-cached");
    return this;
  }

  private() {
    this.policy.push("private");
    return this;
  }

  proxyRevalidate() {
    this.policy.push("proxy-revalidate");
    return this;
  }

  public() {
    this.policy.push("public");
    return this;
  }

  sMaxage(seconds: string) {
    this.policy.push(`s-maxage=${seconds}`);
    return this;
  }

  staleIfError(seconds: string) {
    this.policy.push(`stale-if-error=${seconds}`);
    return this;
  }

  staleWhileRevalidate(seconds: string) {
    this.policy.push(`stale-while-revalidate=${seconds}`);
    return this;
  }

  get value() {
    if (this.defaultValue) {
      return this.defaultValue;
    } else {
      return getPolicy(this.policy, ", ");
    }
  }
}

export class Feature {
  policy: HeaderOptions[] = [];
  defaultValue?: string;

  default() {
    this.defaultValue = defaultValue;
    return this;
  }

  notSet() {
    return undefined;
  }

  accelerometer(...allowlist: string[]) {
    this.policy.push({ directive: "accelerometer", sources: allowlist });
    return this;
  }

  ambientLightSensor(...allowlist: string[]) {
    this.policy.push({
      directive: "ambient-light-sensor ",
      sources: allowlist
    });
    return this;
  }

  autoplay(...allowlist: string[]) {
    this.policy.push({ directive: "autoplay", sources: allowlist });
    return this;
  }

  camera(...allowlist: string[]) {
    this.policy.push({ directive: "camera", sources: allowlist });
    return this;
  }

  documentDomain(...allowlist: string[]) {
    this.policy.push({ directive: "document-domain", sources: allowlist });
    return this;
  }

  encryptedMedia(...allowlist: string[]) {
    this.policy.push({ directive: "encrypted-media", sources: allowlist });
    return this;
  }

  fullscreen(...allowlist: string[]) {
    this.policy.push({ directive: "fullscreen", sources: allowlist });
    return this;
  }

  geolocation(...allowlist: string[]) {
    this.policy.push({ directive: "geolocation", sources: allowlist });
    return this;
  }

  gyroscope(...allowlist: string[]) {
    this.policy.push({ directive: "gyroscope", sources: allowlist });
    return this;
  }

  magnetometer(...allowlist: string[]) {
    this.policy.push({ directive: "magnetometer", sources: allowlist });
    return this;
  }

  microphone(...allowlist: string[]) {
    this.policy.push({ directive: "microphone", sources: allowlist });
    return this;
  }

  midi(...allowlist: string[]) {
    this.policy.push({ directive: "midi", sources: allowlist });
    return this;
  }

  payment(...allowlist: string[]) {
    this.policy.push({ directive: "payment", sources: allowlist });
    return this;
  }

  pictureInPicture(...allowlist: string[]) {
    this.policy.push({ directive: "picture-in-picture", sources: allowlist });
    return this;
  }

  speaker(...allowlist: string[]) {
    this.policy.push({ directive: "speaker", sources: allowlist });
    return this;
  }

  syncXhr(...allowlist: string[]) {
    this.policy.push({ directive: "sync-xhr", sources: allowlist });
    return this;
  }

  usb(...allowlist: string[]) {
    this.policy.push({ directive: "usb", sources: allowlist });
    return this;
  }

  vibrate(...allowlist: string[]) {
    this.policy.push({ directive: "vibrate", sources: allowlist });
    return this;
  }

  vr(...allowlist: string[]) {
    this.policy.push({ directive: "vr", sources: allowlist });
    return this;
  }

  get value() {
    if (this.defaultValue) {
      return this.defaultValue;
    } else {
      return getPolicyMultiOpt(this.policy);
    }
  }
}

export class Server {
  policy: string = "";

  set(value: string) {
    this.policy = value;
    return this;
  }

  notSet() {
    return undefined;
  }

  get value() {
    return this.policy;
  }
}

export const values = {
  all: "*",
  none: "'none'",
  self: "'self'",
  src: "'src'",
  strictDynamic: "'strict-dynamic'",
  unsafeEval: "'unsafe-eval'",
  unsafeInline: "'unsafe-inline'"
};

export const seconds = {
  fiveMinutes: "300",
  oneWeek: "604800",
  oneMonth: "2592000",
  oneYear: "31536000",
  twoYears: "63072000"
};

function getPolicyMultiOpt(policy: HeaderOptions[]) {
  const values: string[] = [];
  let resouces: string | object;
  for (let option of policy) {
    if (option.sources) {
      if (Array.isArray(option.sources)) {
        resouces = option.sources.join(" ");
      } else {
        resouces = option.sources;
      }
      values.push(`${option.directive} ${resouces}`);
    } else {
      values.push(option.directive);
    }
  }
  return values.join("; ");
}

function getPolicy(policy: string[], separator: string) {
  let value: string;
  if (Array.isArray(policy)) {
    value = policy.join(separator);
  } else {
    value = policy;
  }
  return value;
}

interface HeaderOptions {
  directive: string;
  sources?: string[] | string | object;
}
