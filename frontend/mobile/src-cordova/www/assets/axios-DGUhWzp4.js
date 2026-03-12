import { au as defineBoot } from "./index-D97wSuWx.js";
function bind(fn, thisArg) {
  return function wrap() {
    return fn.apply(thisArg, arguments);
  };
}
const { toString } = Object.prototype;
const { getPrototypeOf } = Object;
const { iterator, toStringTag } = Symbol;
const kindOf = /* @__PURE__ */ ((cache) => (thing) => {
  const str = toString.call(thing);
  return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null));
const kindOfTest = (type) => {
  type = type.toLowerCase();
  return (thing) => kindOf(thing) === type;
};
const typeOfTest = (type) => (thing) => typeof thing === type;
const { isArray } = Array;
const isUndefined = typeOfTest("undefined");
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && isFunction$1(val.constructor.isBuffer) && val.constructor.isBuffer(val);
}
const isArrayBuffer = kindOfTest("ArrayBuffer");
function isArrayBufferView(val) {
  let result;
  if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && isArrayBuffer(val.buffer);
  }
  return result;
}
const isString = typeOfTest("string");
const isFunction$1 = typeOfTest("function");
const isNumber = typeOfTest("number");
const isObject = (thing) => thing !== null && typeof thing === "object";
const isBoolean = (thing) => thing === true || thing === false;
const isPlainObject = (val) => {
  if (kindOf(val) !== "object") {
    return false;
  }
  const prototype2 = getPrototypeOf(val);
  return (prototype2 === null || prototype2 === Object.prototype || Object.getPrototypeOf(prototype2) === null) && !(toStringTag in val) && !(iterator in val);
};
const isEmptyObject = (val) => {
  if (!isObject(val) || isBuffer(val)) {
    return false;
  }
  try {
    return Object.keys(val).length === 0 && Object.getPrototypeOf(val) === Object.prototype;
  } catch (e) {
    return false;
  }
};
const isDate = kindOfTest("Date");
const isFile = kindOfTest("File");
const isReactNativeBlob = (value) => {
  return !!(value && typeof value.uri !== "undefined");
};
const isReactNative = (formData) => formData && typeof formData.getParts !== "undefined";
const isBlob = kindOfTest("Blob");
const isFileList = kindOfTest("FileList");
const isStream = (val) => isObject(val) && isFunction$1(val.pipe);
function getGlobal() {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  return {};
}
const G = getGlobal();
const FormDataCtor = typeof G.FormData !== "undefined" ? G.FormData : void 0;
const isFormData = (thing) => {
  let kind;
  return thing && (FormDataCtor && thing instanceof FormDataCtor || isFunction$1(thing.append) && ((kind = kindOf(thing)) === "formdata" || // detect form-data instance
  kind === "object" && isFunction$1(thing.toString) && thing.toString() === "[object FormData]"));
};
const isURLSearchParams = kindOfTest("URLSearchParams");
const [isReadableStream, isRequest, isResponse, isHeaders] = [
  "ReadableStream",
  "Request",
  "Response",
  "Headers"
].map(kindOfTest);
const trim = (str) => {
  return str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
};
function forEach(obj, fn, { allOwnKeys = false } = {}) {
  if (obj === null || typeof obj === "undefined") {
    return;
  }
  let i;
  let l;
  if (typeof obj !== "object") {
    obj = [obj];
  }
  if (isArray(obj)) {
    for (i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    if (isBuffer(obj)) {
      return;
    }
    const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
    const len = keys.length;
    let key;
    for (i = 0; i < len; i++) {
      key = keys[i];
      fn.call(null, obj[key], key, obj);
    }
  }
}
function findKey(obj, key) {
  if (isBuffer(obj)) {
    return null;
  }
  key = key.toLowerCase();
  const keys = Object.keys(obj);
  let i = keys.length;
  let _key;
  while (i-- > 0) {
    _key = keys[i];
    if (key === _key.toLowerCase()) {
      return _key;
    }
  }
  return null;
}
const _global = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  return typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : global;
})();
const isContextDefined = (context) => !isUndefined(context) && context !== _global;
function merge() {
  const { caseless, skipUndefined } = isContextDefined(this) && this || {};
  const result = {};
  const assignValue = (val, key) => {
    if (key === "__proto__" || key === "constructor" || key === "prototype") {
      return;
    }
    const targetKey = caseless && findKey(result, key) || key;
    if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
      result[targetKey] = merge(result[targetKey], val);
    } else if (isPlainObject(val)) {
      result[targetKey] = merge({}, val);
    } else if (isArray(val)) {
      result[targetKey] = val.slice();
    } else if (!skipUndefined || !isUndefined(val)) {
      result[targetKey] = val;
    }
  };
  for (let i = 0, l = arguments.length; i < l; i++) {
    arguments[i] && forEach(arguments[i], assignValue);
  }
  return result;
}
const extend = (a, b, thisArg, { allOwnKeys } = {}) => {
  forEach(
    b,
    (val, key) => {
      if (thisArg && isFunction$1(val)) {
        Object.defineProperty(a, key, {
          value: bind(val, thisArg),
          writable: true,
          enumerable: true,
          configurable: true
        });
      } else {
        Object.defineProperty(a, key, {
          value: val,
          writable: true,
          enumerable: true,
          configurable: true
        });
      }
    },
    { allOwnKeys }
  );
  return a;
};
const stripBOM = (content) => {
  if (content.charCodeAt(0) === 65279) {
    content = content.slice(1);
  }
  return content;
};
const inherits = (constructor, superConstructor, props, descriptors) => {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors);
  Object.defineProperty(constructor.prototype, "constructor", {
    value: constructor,
    writable: true,
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(constructor, "super", {
    value: superConstructor.prototype
  });
  props && Object.assign(constructor.prototype, props);
};
const toFlatObject = (sourceObj, destObj, filter2, propFilter) => {
  let props;
  let i;
  let prop;
  const merged = {};
  destObj = destObj || {};
  if (sourceObj == null) return destObj;
  do {
    props = Object.getOwnPropertyNames(sourceObj);
    i = props.length;
    while (i-- > 0) {
      prop = props[i];
      if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
        destObj[prop] = sourceObj[prop];
        merged[prop] = true;
      }
    }
    sourceObj = filter2 !== false && getPrototypeOf(sourceObj);
  } while (sourceObj && (!filter2 || filter2(sourceObj, destObj)) && sourceObj !== Object.prototype);
  return destObj;
};
const endsWith = (str, searchString, position) => {
  str = String(str);
  if (position === void 0 || position > str.length) {
    position = str.length;
  }
  position -= searchString.length;
  const lastIndex = str.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
};
const toArray = (thing) => {
  if (!thing) return null;
  if (isArray(thing)) return thing;
  let i = thing.length;
  if (!isNumber(i)) return null;
  const arr = new Array(i);
  while (i-- > 0) {
    arr[i] = thing[i];
  }
  return arr;
};
const isTypedArray = /* @__PURE__ */ ((TypedArray) => {
  return (thing) => {
    return TypedArray && thing instanceof TypedArray;
  };
})(typeof Uint8Array !== "undefined" && getPrototypeOf(Uint8Array));
const forEachEntry = (obj, fn) => {
  const generator = obj && obj[iterator];
  const _iterator = generator.call(obj);
  let result;
  while ((result = _iterator.next()) && !result.done) {
    const pair = result.value;
    fn.call(obj, pair[0], pair[1]);
  }
};
const matchAll = (regExp, str) => {
  let matches;
  const arr = [];
  while ((matches = regExp.exec(str)) !== null) {
    arr.push(matches);
  }
  return arr;
};
const isHTMLForm = kindOfTest("HTMLFormElement");
const toCamelCase = (str) => {
  return str.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function replacer(m, p1, p2) {
    return p1.toUpperCase() + p2;
  });
};
const hasOwnProperty = (({ hasOwnProperty: hasOwnProperty2 }) => (obj, prop) => hasOwnProperty2.call(obj, prop))(Object.prototype);
const isRegExp = kindOfTest("RegExp");
const reduceDescriptors = (obj, reducer) => {
  const descriptors = Object.getOwnPropertyDescriptors(obj);
  const reducedDescriptors = {};
  forEach(descriptors, (descriptor, name) => {
    let ret;
    if ((ret = reducer(descriptor, name, obj)) !== false) {
      reducedDescriptors[name] = ret || descriptor;
    }
  });
  Object.defineProperties(obj, reducedDescriptors);
};
const freezeMethods = (obj) => {
  reduceDescriptors(obj, (descriptor, name) => {
    if (isFunction$1(obj) && ["arguments", "caller", "callee"].indexOf(name) !== -1) {
      return false;
    }
    const value = obj[name];
    if (!isFunction$1(value)) return;
    descriptor.enumerable = false;
    if ("writable" in descriptor) {
      descriptor.writable = false;
      return;
    }
    if (!descriptor.set) {
      descriptor.set = () => {
        throw Error("Can not rewrite read-only method '" + name + "'");
      };
    }
  });
};
const toObjectSet = (arrayOrString, delimiter) => {
  const obj = {};
  const define = (arr) => {
    arr.forEach((value) => {
      obj[value] = true;
    });
  };
  isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));
  return obj;
};
const noop = () => {
};
const toFiniteNumber = (value, defaultValue) => {
  return value != null && Number.isFinite(value = +value) ? value : defaultValue;
};
function isSpecCompliantForm(thing) {
  return !!(thing && isFunction$1(thing.append) && thing[toStringTag] === "FormData" && thing[iterator]);
}
const toJSONObject = (obj) => {
  const stack = new Array(10);
  const visit = (source, i) => {
    if (isObject(source)) {
      if (stack.indexOf(source) >= 0) {
        return;
      }
      if (isBuffer(source)) {
        return source;
      }
      if (!("toJSON" in source)) {
        stack[i] = source;
        const target = isArray(source) ? [] : {};
        forEach(source, (value, key) => {
          const reducedValue = visit(value, i + 1);
          !isUndefined(reducedValue) && (target[key] = reducedValue);
        });
        stack[i] = void 0;
        return target;
      }
    }
    return source;
  };
  return visit(obj, 0);
};
const isAsyncFn = kindOfTest("AsyncFunction");
const isThenable = (thing) => thing && (isObject(thing) || isFunction$1(thing)) && isFunction$1(thing.then) && isFunction$1(thing.catch);
const _setImmediate = ((setImmediateSupported, postMessageSupported) => {
  if (setImmediateSupported) {
    return setImmediate;
  }
  return postMessageSupported ? ((token, callbacks) => {
    _global.addEventListener(
      "message",
      ({ source, data }) => {
        if (source === _global && data === token) {
          callbacks.length && callbacks.shift()();
        }
      },
      false
    );
    return (cb) => {
      callbacks.push(cb);
      _global.postMessage(token, "*");
    };
  })(`axios@${Math.random()}`, []) : (cb) => setTimeout(cb);
})(typeof setImmediate === "function", isFunction$1(_global.postMessage));
const asap = typeof queueMicrotask !== "undefined" ? queueMicrotask.bind(_global) : typeof process !== "undefined" && process.nextTick || _setImmediate;
const isIterable = (thing) => thing != null && isFunction$1(thing[iterator]);
const utils$1 = {
  isArray,
  isArrayBuffer,
  isBuffer,
  isFormData,
  isArrayBufferView,
  isString,
  isNumber,
  isBoolean,
  isObject,
  isPlainObject,
  isEmptyObject,
  isReadableStream,
  isRequest,
  isResponse,
  isHeaders,
  isUndefined,
  isDate,
  isFile,
  isReactNativeBlob,
  isReactNative,
  isBlob,
  isRegExp,
  isFunction: isFunction$1,
  isStream,
  isURLSearchParams,
  isTypedArray,
  isFileList,
  forEach,
  merge,
  extend,
  trim,
  stripBOM,
  inherits,
  toFlatObject,
  kindOf,
  kindOfTest,
  endsWith,
  toArray,
  forEachEntry,
  matchAll,
  isHTMLForm,
  hasOwnProperty,
  hasOwnProp: hasOwnProperty,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors,
  freezeMethods,
  toObjectSet,
  toCamelCase,
  noop,
  toFiniteNumber,
  findKey,
  global: _global,
  isContextDefined,
  isSpecCompliantForm,
  toJSONObject,
  isAsyncFn,
  isThenable,
  setImmediate: _setImmediate,
  asap,
  isIterable
};
let AxiosError$1 = class AxiosError extends Error {
  static from(error, code, config, request, response, customProps) {
    const axiosError = new AxiosError(error.message, code || error.code, config, request, response);
    axiosError.cause = error;
    axiosError.name = error.name;
    if (error.status != null && axiosError.status == null) {
      axiosError.status = error.status;
    }
    customProps && Object.assign(axiosError, customProps);
    return axiosError;
  }
  /**
   * Create an Error with the specified message, config, error code, request and response.
   *
   * @param {string} message The error message.
   * @param {string} [code] The error code (for example, 'ECONNABORTED').
   * @param {Object} [config] The config.
   * @param {Object} [request] The request.
   * @param {Object} [response] The response.
   *
   * @returns {Error} The created error.
   */
  constructor(message, code, config, request, response) {
    super(message);
    Object.defineProperty(this, "message", {
      value: message,
      enumerable: true,
      writable: true,
      configurable: true
    });
    this.name = "AxiosError";
    this.isAxiosError = true;
    code && (this.code = code);
    config && (this.config = config);
    request && (this.request = request);
    if (response) {
      this.response = response;
      this.status = response.status;
    }
  }
  toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: utils$1.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
};
AxiosError$1.ERR_BAD_OPTION_VALUE = "ERR_BAD_OPTION_VALUE";
AxiosError$1.ERR_BAD_OPTION = "ERR_BAD_OPTION";
AxiosError$1.ECONNABORTED = "ECONNABORTED";
AxiosError$1.ETIMEDOUT = "ETIMEDOUT";
AxiosError$1.ERR_NETWORK = "ERR_NETWORK";
AxiosError$1.ERR_FR_TOO_MANY_REDIRECTS = "ERR_FR_TOO_MANY_REDIRECTS";
AxiosError$1.ERR_DEPRECATED = "ERR_DEPRECATED";
AxiosError$1.ERR_BAD_RESPONSE = "ERR_BAD_RESPONSE";
AxiosError$1.ERR_BAD_REQUEST = "ERR_BAD_REQUEST";
AxiosError$1.ERR_CANCELED = "ERR_CANCELED";
AxiosError$1.ERR_NOT_SUPPORT = "ERR_NOT_SUPPORT";
AxiosError$1.ERR_INVALID_URL = "ERR_INVALID_URL";
const httpAdapter = null;
function isVisitable(thing) {
  return utils$1.isPlainObject(thing) || utils$1.isArray(thing);
}
function removeBrackets(key) {
  return utils$1.endsWith(key, "[]") ? key.slice(0, -2) : key;
}
function renderKey(path, key, dots) {
  if (!path) return key;
  return path.concat(key).map(function each(token, i) {
    token = removeBrackets(token);
    return !dots && i ? "[" + token + "]" : token;
  }).join(dots ? "." : "");
}
function isFlatArray(arr) {
  return utils$1.isArray(arr) && !arr.some(isVisitable);
}
const predicates = utils$1.toFlatObject(utils$1, {}, null, function filter(prop) {
  return /^is[A-Z]/.test(prop);
});
function toFormData$1(obj, formData, options) {
  if (!utils$1.isObject(obj)) {
    throw new TypeError("target must be an object");
  }
  formData = formData || new FormData();
  options = utils$1.toFlatObject(
    options,
    {
      metaTokens: true,
      dots: false,
      indexes: false
    },
    false,
    function defined(option, source) {
      return !utils$1.isUndefined(source[option]);
    }
  );
  const metaTokens = options.metaTokens;
  const visitor = options.visitor || defaultVisitor;
  const dots = options.dots;
  const indexes = options.indexes;
  const _Blob = options.Blob || typeof Blob !== "undefined" && Blob;
  const useBlob = _Blob && utils$1.isSpecCompliantForm(formData);
  if (!utils$1.isFunction(visitor)) {
    throw new TypeError("visitor must be a function");
  }
  function convertValue(value) {
    if (value === null) return "";
    if (utils$1.isDate(value)) {
      return value.toISOString();
    }
    if (utils$1.isBoolean(value)) {
      return value.toString();
    }
    if (!useBlob && utils$1.isBlob(value)) {
      throw new AxiosError$1("Blob is not supported. Use a Buffer instead.");
    }
    if (utils$1.isArrayBuffer(value) || utils$1.isTypedArray(value)) {
      return useBlob && typeof Blob === "function" ? new Blob([value]) : Buffer.from(value);
    }
    return value;
  }
  function defaultVisitor(value, key, path) {
    let arr = value;
    if (utils$1.isReactNative(formData) && utils$1.isReactNativeBlob(value)) {
      formData.append(renderKey(path, key, dots), convertValue(value));
      return false;
    }
    if (value && !path && typeof value === "object") {
      if (utils$1.endsWith(key, "{}")) {
        key = metaTokens ? key : key.slice(0, -2);
        value = JSON.stringify(value);
      } else if (utils$1.isArray(value) && isFlatArray(value) || (utils$1.isFileList(value) || utils$1.endsWith(key, "[]")) && (arr = utils$1.toArray(value))) {
        key = removeBrackets(key);
        arr.forEach(function each(el, index) {
          !(utils$1.isUndefined(el) || el === null) && formData.append(
            // eslint-disable-next-line no-nested-ternary
            indexes === true ? renderKey([key], index, dots) : indexes === null ? key : key + "[]",
            convertValue(el)
          );
        });
        return false;
      }
    }
    if (isVisitable(value)) {
      return true;
    }
    formData.append(renderKey(path, key, dots), convertValue(value));
    return false;
  }
  const stack = [];
  const exposedHelpers = Object.assign(predicates, {
    defaultVisitor,
    convertValue,
    isVisitable
  });
  function build(value, path) {
    if (utils$1.isUndefined(value)) return;
    if (stack.indexOf(value) !== -1) {
      throw Error("Circular reference detected in " + path.join("."));
    }
    stack.push(value);
    utils$1.forEach(value, function each(el, key) {
      const result = !(utils$1.isUndefined(el) || el === null) && visitor.call(formData, el, utils$1.isString(key) ? key.trim() : key, path, exposedHelpers);
      if (result === true) {
        build(el, path ? path.concat(key) : [key]);
      }
    });
    stack.pop();
  }
  if (!utils$1.isObject(obj)) {
    throw new TypeError("data must be an object");
  }
  build(obj);
  return formData;
}
function encode$1(str) {
  const charMap = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
    return charMap[match];
  });
}
function AxiosURLSearchParams(params, options) {
  this._pairs = [];
  params && toFormData$1(params, this, options);
}
const prototype = AxiosURLSearchParams.prototype;
prototype.append = function append(name, value) {
  this._pairs.push([name, value]);
};
prototype.toString = function toString2(encoder) {
  const _encode = encoder ? function(value) {
    return encoder.call(this, value, encode$1);
  } : encode$1;
  return this._pairs.map(function each(pair) {
    return _encode(pair[0]) + "=" + _encode(pair[1]);
  }, "").join("&");
};
function encode(val) {
  return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+");
}
function buildURL(url, params, options) {
  if (!params) {
    return url;
  }
  const _encode = options && options.encode || encode;
  const _options = utils$1.isFunction(options) ? {
    serialize: options
  } : options;
  const serializeFn = _options && _options.serialize;
  let serializedParams;
  if (serializeFn) {
    serializedParams = serializeFn(params, _options);
  } else {
    serializedParams = utils$1.isURLSearchParams(params) ? params.toString() : new AxiosURLSearchParams(params, _options).toString(_encode);
  }
  if (serializedParams) {
    const hashmarkIndex = url.indexOf("#");
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }
    url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
  }
  return url;
}
class InterceptorManager {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   * @param {Object} options The options for the interceptor, synchronous and runWhen
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(fulfilled, rejected, options) {
    this.handlers.push({
      fulfilled,
      rejected,
      synchronous: options ? options.synchronous : false,
      runWhen: options ? options.runWhen : null
    });
    return this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {void}
   */
  eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    if (this.handlers) {
      this.handlers = [];
    }
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(fn) {
    utils$1.forEach(this.handlers, function forEachHandler(h) {
      if (h !== null) {
        fn(h);
      }
    });
  }
}
const transitionalDefaults = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false,
  legacyInterceptorReqResOrdering: true
};
const URLSearchParams$1 = typeof URLSearchParams !== "undefined" ? URLSearchParams : AxiosURLSearchParams;
const FormData$1 = typeof FormData !== "undefined" ? FormData : null;
const Blob$1 = typeof Blob !== "undefined" ? Blob : null;
const platform$1 = {
  isBrowser: true,
  classes: {
    URLSearchParams: URLSearchParams$1,
    FormData: FormData$1,
    Blob: Blob$1
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
};
const hasBrowserEnv = typeof window !== "undefined" && typeof document !== "undefined";
const _navigator = typeof navigator === "object" && navigator || void 0;
const hasStandardBrowserEnv = hasBrowserEnv && (!_navigator || ["ReactNative", "NativeScript", "NS"].indexOf(_navigator.product) < 0);
const hasStandardBrowserWebWorkerEnv = (() => {
  return typeof WorkerGlobalScope !== "undefined" && // eslint-disable-next-line no-undef
  self instanceof WorkerGlobalScope && typeof self.importScripts === "function";
})();
const origin = hasBrowserEnv && window.location.href || "http://localhost";
const utils = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv,
  hasStandardBrowserEnv,
  hasStandardBrowserWebWorkerEnv,
  navigator: _navigator,
  origin
}, Symbol.toStringTag, { value: "Module" }));
const platform = {
  ...utils,
  ...platform$1
};
function toURLEncodedForm(data, options) {
  return toFormData$1(data, new platform.classes.URLSearchParams(), {
    visitor: function(value, key, path, helpers) {
      if (platform.isNode && utils$1.isBuffer(value)) {
        this.append(key, value.toString("base64"));
        return false;
      }
      return helpers.defaultVisitor.apply(this, arguments);
    },
    ...options
  });
}
function parsePropPath(name) {
  return utils$1.matchAll(/\w+|\[(\w*)]/g, name).map((match) => {
    return match[0] === "[]" ? "" : match[1] || match[0];
  });
}
function arrayToObject(arr) {
  const obj = {};
  const keys = Object.keys(arr);
  let i;
  const len = keys.length;
  let key;
  for (i = 0; i < len; i++) {
    key = keys[i];
    obj[key] = arr[key];
  }
  return obj;
}
function formDataToJSON(formData) {
  function buildPath(path, value, target, index) {
    let name = path[index++];
    if (name === "__proto__") return true;
    const isNumericKey = Number.isFinite(+name);
    const isLast = index >= path.length;
    name = !name && utils$1.isArray(target) ? target.length : name;
    if (isLast) {
      if (utils$1.hasOwnProp(target, name)) {
        target[name] = [target[name], value];
      } else {
        target[name] = value;
      }
      return !isNumericKey;
    }
    if (!target[name] || !utils$1.isObject(target[name])) {
      target[name] = [];
    }
    const result = buildPath(path, value, target[name], index);
    if (result && utils$1.isArray(target[name])) {
      target[name] = arrayToObject(target[name]);
    }
    return !isNumericKey;
  }
  if (utils$1.isFormData(formData) && utils$1.isFunction(formData.entries)) {
    const obj = {};
    utils$1.forEachEntry(formData, (name, value) => {
      buildPath(parsePropPath(name), value, obj, 0);
    });
    return obj;
  }
  return null;
}
function stringifySafely(rawValue, parser, encoder) {
  if (utils$1.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils$1.trim(rawValue);
    } catch (e) {
      if (e.name !== "SyntaxError") {
        throw e;
      }
    }
  }
  return (encoder || JSON.stringify)(rawValue);
}
const defaults = {
  transitional: transitionalDefaults,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [
    function transformRequest(data, headers) {
      const contentType = headers.getContentType() || "";
      const hasJSONContentType = contentType.indexOf("application/json") > -1;
      const isObjectPayload = utils$1.isObject(data);
      if (isObjectPayload && utils$1.isHTMLForm(data)) {
        data = new FormData(data);
      }
      const isFormData2 = utils$1.isFormData(data);
      if (isFormData2) {
        return hasJSONContentType ? JSON.stringify(formDataToJSON(data)) : data;
      }
      if (utils$1.isArrayBuffer(data) || utils$1.isBuffer(data) || utils$1.isStream(data) || utils$1.isFile(data) || utils$1.isBlob(data) || utils$1.isReadableStream(data)) {
        return data;
      }
      if (utils$1.isArrayBufferView(data)) {
        return data.buffer;
      }
      if (utils$1.isURLSearchParams(data)) {
        headers.setContentType("application/x-www-form-urlencoded;charset=utf-8", false);
        return data.toString();
      }
      let isFileList2;
      if (isObjectPayload) {
        if (contentType.indexOf("application/x-www-form-urlencoded") > -1) {
          return toURLEncodedForm(data, this.formSerializer).toString();
        }
        if ((isFileList2 = utils$1.isFileList(data)) || contentType.indexOf("multipart/form-data") > -1) {
          const _FormData = this.env && this.env.FormData;
          return toFormData$1(
            isFileList2 ? { "files[]": data } : data,
            _FormData && new _FormData(),
            this.formSerializer
          );
        }
      }
      if (isObjectPayload || hasJSONContentType) {
        headers.setContentType("application/json", false);
        return stringifySafely(data);
      }
      return data;
    }
  ],
  transformResponse: [
    function transformResponse(data) {
      const transitional2 = this.transitional || defaults.transitional;
      const forcedJSONParsing = transitional2 && transitional2.forcedJSONParsing;
      const JSONRequested = this.responseType === "json";
      if (utils$1.isResponse(data) || utils$1.isReadableStream(data)) {
        return data;
      }
      if (data && utils$1.isString(data) && (forcedJSONParsing && !this.responseType || JSONRequested)) {
        const silentJSONParsing = transitional2 && transitional2.silentJSONParsing;
        const strictJSONParsing = !silentJSONParsing && JSONRequested;
        try {
          return JSON.parse(data, this.parseReviver);
        } catch (e) {
          if (strictJSONParsing) {
            if (e.name === "SyntaxError") {
              throw AxiosError$1.from(e, AxiosError$1.ERR_BAD_RESPONSE, this, null, this.response);
            }
            throw e;
          }
        }
      }
      return data;
    }
  ],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: platform.classes.FormData,
    Blob: platform.classes.Blob
  },
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
utils$1.forEach(["delete", "get", "head", "post", "put", "patch"], (method) => {
  defaults.headers[method] = {};
});
const ignoreDuplicateOf = utils$1.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]);
const parseHeaders = (rawHeaders) => {
  const parsed = {};
  let key;
  let val;
  let i;
  rawHeaders && rawHeaders.split("\n").forEach(function parser(line) {
    i = line.indexOf(":");
    key = line.substring(0, i).trim().toLowerCase();
    val = line.substring(i + 1).trim();
    if (!key || parsed[key] && ignoreDuplicateOf[key]) {
      return;
    }
    if (key === "set-cookie") {
      if (parsed[key]) {
        parsed[key].push(val);
      } else {
        parsed[key] = [val];
      }
    } else {
      parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
    }
  });
  return parsed;
};
const $internals = /* @__PURE__ */ Symbol("internals");
function normalizeHeader(header) {
  return header && String(header).trim().toLowerCase();
}
function normalizeValue(value) {
  if (value === false || value == null) {
    return value;
  }
  return utils$1.isArray(value) ? value.map(normalizeValue) : String(value);
}
function parseTokens(str) {
  const tokens = /* @__PURE__ */ Object.create(null);
  const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let match;
  while (match = tokensRE.exec(str)) {
    tokens[match[1]] = match[2];
  }
  return tokens;
}
const isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());
function matchHeaderValue(context, value, header, filter2, isHeaderNameFilter) {
  if (utils$1.isFunction(filter2)) {
    return filter2.call(this, value, header);
  }
  if (isHeaderNameFilter) {
    value = header;
  }
  if (!utils$1.isString(value)) return;
  if (utils$1.isString(filter2)) {
    return value.indexOf(filter2) !== -1;
  }
  if (utils$1.isRegExp(filter2)) {
    return filter2.test(value);
  }
}
function formatHeader(header) {
  return header.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
    return char.toUpperCase() + str;
  });
}
function buildAccessors(obj, header) {
  const accessorName = utils$1.toCamelCase(" " + header);
  ["get", "set", "has"].forEach((methodName) => {
    Object.defineProperty(obj, methodName + accessorName, {
      value: function(arg1, arg2, arg3) {
        return this[methodName].call(this, header, arg1, arg2, arg3);
      },
      configurable: true
    });
  });
}
let AxiosHeaders$1 = class AxiosHeaders {
  constructor(headers) {
    headers && this.set(headers);
  }
  set(header, valueOrRewrite, rewrite) {
    const self2 = this;
    function setHeader(_value, _header, _rewrite) {
      const lHeader = normalizeHeader(_header);
      if (!lHeader) {
        throw new Error("header name must be a non-empty string");
      }
      const key = utils$1.findKey(self2, lHeader);
      if (!key || self2[key] === void 0 || _rewrite === true || _rewrite === void 0 && self2[key] !== false) {
        self2[key || _header] = normalizeValue(_value);
      }
    }
    const setHeaders = (headers, _rewrite) => utils$1.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));
    if (utils$1.isPlainObject(header) || header instanceof this.constructor) {
      setHeaders(header, valueOrRewrite);
    } else if (utils$1.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
      setHeaders(parseHeaders(header), valueOrRewrite);
    } else if (utils$1.isObject(header) && utils$1.isIterable(header)) {
      let obj = {}, dest, key;
      for (const entry of header) {
        if (!utils$1.isArray(entry)) {
          throw TypeError("Object iterator must return a key-value pair");
        }
        obj[key = entry[0]] = (dest = obj[key]) ? utils$1.isArray(dest) ? [...dest, entry[1]] : [dest, entry[1]] : entry[1];
      }
      setHeaders(obj, valueOrRewrite);
    } else {
      header != null && setHeader(valueOrRewrite, header, rewrite);
    }
    return this;
  }
  get(header, parser) {
    header = normalizeHeader(header);
    if (header) {
      const key = utils$1.findKey(this, header);
      if (key) {
        const value = this[key];
        if (!parser) {
          return value;
        }
        if (parser === true) {
          return parseTokens(value);
        }
        if (utils$1.isFunction(parser)) {
          return parser.call(this, value, key);
        }
        if (utils$1.isRegExp(parser)) {
          return parser.exec(value);
        }
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(header, matcher) {
    header = normalizeHeader(header);
    if (header) {
      const key = utils$1.findKey(this, header);
      return !!(key && this[key] !== void 0 && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
    }
    return false;
  }
  delete(header, matcher) {
    const self2 = this;
    let deleted = false;
    function deleteHeader(_header) {
      _header = normalizeHeader(_header);
      if (_header) {
        const key = utils$1.findKey(self2, _header);
        if (key && (!matcher || matchHeaderValue(self2, self2[key], key, matcher))) {
          delete self2[key];
          deleted = true;
        }
      }
    }
    if (utils$1.isArray(header)) {
      header.forEach(deleteHeader);
    } else {
      deleteHeader(header);
    }
    return deleted;
  }
  clear(matcher) {
    const keys = Object.keys(this);
    let i = keys.length;
    let deleted = false;
    while (i--) {
      const key = keys[i];
      if (!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
        delete this[key];
        deleted = true;
      }
    }
    return deleted;
  }
  normalize(format) {
    const self2 = this;
    const headers = {};
    utils$1.forEach(this, (value, header) => {
      const key = utils$1.findKey(headers, header);
      if (key) {
        self2[key] = normalizeValue(value);
        delete self2[header];
        return;
      }
      const normalized = format ? formatHeader(header) : String(header).trim();
      if (normalized !== header) {
        delete self2[header];
      }
      self2[normalized] = normalizeValue(value);
      headers[normalized] = true;
    });
    return this;
  }
  concat(...targets) {
    return this.constructor.concat(this, ...targets);
  }
  toJSON(asStrings) {
    const obj = /* @__PURE__ */ Object.create(null);
    utils$1.forEach(this, (value, header) => {
      value != null && value !== false && (obj[header] = asStrings && utils$1.isArray(value) ? value.join(", ") : value);
    });
    return obj;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([header, value]) => header + ": " + value).join("\n");
  }
  getSetCookie() {
    return this.get("set-cookie") || [];
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(thing) {
    return thing instanceof this ? thing : new this(thing);
  }
  static concat(first, ...targets) {
    const computed = new this(first);
    targets.forEach((target) => computed.set(target));
    return computed;
  }
  static accessor(header) {
    const internals = this[$internals] = this[$internals] = {
      accessors: {}
    };
    const accessors = internals.accessors;
    const prototype2 = this.prototype;
    function defineAccessor(_header) {
      const lHeader = normalizeHeader(_header);
      if (!accessors[lHeader]) {
        buildAccessors(prototype2, _header);
        accessors[lHeader] = true;
      }
    }
    utils$1.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);
    return this;
  }
};
AxiosHeaders$1.accessor([
  "Content-Type",
  "Content-Length",
  "Accept",
  "Accept-Encoding",
  "User-Agent",
  "Authorization"
]);
utils$1.reduceDescriptors(AxiosHeaders$1.prototype, ({ value }, key) => {
  let mapped = key[0].toUpperCase() + key.slice(1);
  return {
    get: () => value,
    set(headerValue) {
      this[mapped] = headerValue;
    }
  };
});
utils$1.freezeMethods(AxiosHeaders$1);
function transformData(fns, response) {
  const config = this || defaults;
  const context = response || config;
  const headers = AxiosHeaders$1.from(context.headers);
  let data = context.data;
  utils$1.forEach(fns, function transform(fn) {
    data = fn.call(config, data, headers.normalize(), response ? response.status : void 0);
  });
  headers.normalize();
  return data;
}
function isCancel$1(value) {
  return !!(value && value.__CANCEL__);
}
let CanceledError$1 = class CanceledError extends AxiosError$1 {
  /**
   * A `CanceledError` is an object that is thrown when an operation is canceled.
   *
   * @param {string=} message The message.
   * @param {Object=} config The config.
   * @param {Object=} request The request.
   *
   * @returns {CanceledError} The created error.
   */
  constructor(message, config, request) {
    super(message == null ? "canceled" : message, AxiosError$1.ERR_CANCELED, config, request);
    this.name = "CanceledError";
    this.__CANCEL__ = true;
  }
};
function settle(resolve, reject, response) {
  const validateStatus2 = response.config.validateStatus;
  if (!response.status || !validateStatus2 || validateStatus2(response.status)) {
    resolve(response);
  } else {
    reject(
      new AxiosError$1(
        "Request failed with status code " + response.status,
        [AxiosError$1.ERR_BAD_REQUEST, AxiosError$1.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
        response.config,
        response.request,
        response
      )
    );
  }
}
function parseProtocol(url) {
  const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
  return match && match[1] || "";
}
function speedometer(samplesCount, min) {
  samplesCount = samplesCount || 10;
  const bytes = new Array(samplesCount);
  const timestamps = new Array(samplesCount);
  let head = 0;
  let tail = 0;
  let firstSampleTS;
  min = min !== void 0 ? min : 1e3;
  return function push(chunkLength) {
    const now = Date.now();
    const startedAt = timestamps[tail];
    if (!firstSampleTS) {
      firstSampleTS = now;
    }
    bytes[head] = chunkLength;
    timestamps[head] = now;
    let i = tail;
    let bytesCount = 0;
    while (i !== head) {
      bytesCount += bytes[i++];
      i = i % samplesCount;
    }
    head = (head + 1) % samplesCount;
    if (head === tail) {
      tail = (tail + 1) % samplesCount;
    }
    if (now - firstSampleTS < min) {
      return;
    }
    const passed = startedAt && now - startedAt;
    return passed ? Math.round(bytesCount * 1e3 / passed) : void 0;
  };
}
function throttle(fn, freq) {
  let timestamp = 0;
  let threshold = 1e3 / freq;
  let lastArgs;
  let timer;
  const invoke = (args, now = Date.now()) => {
    timestamp = now;
    lastArgs = null;
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    fn(...args);
  };
  const throttled = (...args) => {
    const now = Date.now();
    const passed = now - timestamp;
    if (passed >= threshold) {
      invoke(args, now);
    } else {
      lastArgs = args;
      if (!timer) {
        timer = setTimeout(() => {
          timer = null;
          invoke(lastArgs);
        }, threshold - passed);
      }
    }
  };
  const flush = () => lastArgs && invoke(lastArgs);
  return [throttled, flush];
}
const progressEventReducer = (listener, isDownloadStream, freq = 3) => {
  let bytesNotified = 0;
  const _speedometer = speedometer(50, 250);
  return throttle((e) => {
    const loaded = e.loaded;
    const total = e.lengthComputable ? e.total : void 0;
    const progressBytes = loaded - bytesNotified;
    const rate = _speedometer(progressBytes);
    const inRange = loaded <= total;
    bytesNotified = loaded;
    const data = {
      loaded,
      total,
      progress: total ? loaded / total : void 0,
      bytes: progressBytes,
      rate: rate ? rate : void 0,
      estimated: rate && total && inRange ? (total - loaded) / rate : void 0,
      event: e,
      lengthComputable: total != null,
      [isDownloadStream ? "download" : "upload"]: true
    };
    listener(data);
  }, freq);
};
const progressEventDecorator = (total, throttled) => {
  const lengthComputable = total != null;
  return [
    (loaded) => throttled[0]({
      lengthComputable,
      total,
      loaded
    }),
    throttled[1]
  ];
};
const asyncDecorator = (fn) => (...args) => utils$1.asap(() => fn(...args));
const isURLSameOrigin = platform.hasStandardBrowserEnv ? /* @__PURE__ */ ((origin2, isMSIE) => (url) => {
  url = new URL(url, platform.origin);
  return origin2.protocol === url.protocol && origin2.host === url.host && (isMSIE || origin2.port === url.port);
})(
  new URL(platform.origin),
  platform.navigator && /(msie|trident)/i.test(platform.navigator.userAgent)
) : () => true;
const cookies = platform.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(name, value, expires, path, domain, secure, sameSite) {
      if (typeof document === "undefined") return;
      const cookie = [`${name}=${encodeURIComponent(value)}`];
      if (utils$1.isNumber(expires)) {
        cookie.push(`expires=${new Date(expires).toUTCString()}`);
      }
      if (utils$1.isString(path)) {
        cookie.push(`path=${path}`);
      }
      if (utils$1.isString(domain)) {
        cookie.push(`domain=${domain}`);
      }
      if (secure === true) {
        cookie.push("secure");
      }
      if (utils$1.isString(sameSite)) {
        cookie.push(`SameSite=${sameSite}`);
      }
      document.cookie = cookie.join("; ");
    },
    read(name) {
      if (typeof document === "undefined") return null;
      const match = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
      return match ? decodeURIComponent(match[1]) : null;
    },
    remove(name) {
      this.write(name, "", Date.now() - 864e5, "/");
    }
  }
) : (
  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {
    },
    read() {
      return null;
    },
    remove() {
    }
  }
);
function isAbsoluteURL(url) {
  if (typeof url !== "string") {
    return false;
  }
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}
function combineURLs(baseURL, relativeURL) {
  return relativeURL ? baseURL.replace(/\/?\/$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
}
function buildFullPath(baseURL, requestedURL, allowAbsoluteUrls) {
  let isRelativeUrl = !isAbsoluteURL(requestedURL);
  if (baseURL && (isRelativeUrl || allowAbsoluteUrls == false)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
}
const headersToObject = (thing) => thing instanceof AxiosHeaders$1 ? { ...thing } : thing;
function mergeConfig$1(config1, config2) {
  config2 = config2 || {};
  const config = {};
  function getMergedValue(target, source, prop, caseless) {
    if (utils$1.isPlainObject(target) && utils$1.isPlainObject(source)) {
      return utils$1.merge.call({ caseless }, target, source);
    } else if (utils$1.isPlainObject(source)) {
      return utils$1.merge({}, source);
    } else if (utils$1.isArray(source)) {
      return source.slice();
    }
    return source;
  }
  function mergeDeepProperties(a, b, prop, caseless) {
    if (!utils$1.isUndefined(b)) {
      return getMergedValue(a, b, prop, caseless);
    } else if (!utils$1.isUndefined(a)) {
      return getMergedValue(void 0, a, prop, caseless);
    }
  }
  function valueFromConfig2(a, b) {
    if (!utils$1.isUndefined(b)) {
      return getMergedValue(void 0, b);
    }
  }
  function defaultToConfig2(a, b) {
    if (!utils$1.isUndefined(b)) {
      return getMergedValue(void 0, b);
    } else if (!utils$1.isUndefined(a)) {
      return getMergedValue(void 0, a);
    }
  }
  function mergeDirectKeys(a, b, prop) {
    if (prop in config2) {
      return getMergedValue(a, b);
    } else if (prop in config1) {
      return getMergedValue(void 0, a);
    }
  }
  const mergeMap = {
    url: valueFromConfig2,
    method: valueFromConfig2,
    data: valueFromConfig2,
    baseURL: defaultToConfig2,
    transformRequest: defaultToConfig2,
    transformResponse: defaultToConfig2,
    paramsSerializer: defaultToConfig2,
    timeout: defaultToConfig2,
    timeoutMessage: defaultToConfig2,
    withCredentials: defaultToConfig2,
    withXSRFToken: defaultToConfig2,
    adapter: defaultToConfig2,
    responseType: defaultToConfig2,
    xsrfCookieName: defaultToConfig2,
    xsrfHeaderName: defaultToConfig2,
    onUploadProgress: defaultToConfig2,
    onDownloadProgress: defaultToConfig2,
    decompress: defaultToConfig2,
    maxContentLength: defaultToConfig2,
    maxBodyLength: defaultToConfig2,
    beforeRedirect: defaultToConfig2,
    transport: defaultToConfig2,
    httpAgent: defaultToConfig2,
    httpsAgent: defaultToConfig2,
    cancelToken: defaultToConfig2,
    socketPath: defaultToConfig2,
    responseEncoding: defaultToConfig2,
    validateStatus: mergeDirectKeys,
    headers: (a, b, prop) => mergeDeepProperties(headersToObject(a), headersToObject(b), prop, true)
  };
  utils$1.forEach(Object.keys({ ...config1, ...config2 }), function computeConfigValue(prop) {
    if (prop === "__proto__" || prop === "constructor" || prop === "prototype") return;
    const merge2 = utils$1.hasOwnProp(mergeMap, prop) ? mergeMap[prop] : mergeDeepProperties;
    const configValue = merge2(config1[prop], config2[prop], prop);
    utils$1.isUndefined(configValue) && merge2 !== mergeDirectKeys || (config[prop] = configValue);
  });
  return config;
}
const resolveConfig = (config) => {
  const newConfig = mergeConfig$1({}, config);
  let { data, withXSRFToken, xsrfHeaderName, xsrfCookieName, headers, auth } = newConfig;
  newConfig.headers = headers = AxiosHeaders$1.from(headers);
  newConfig.url = buildURL(
    buildFullPath(newConfig.baseURL, newConfig.url, newConfig.allowAbsoluteUrls),
    config.params,
    config.paramsSerializer
  );
  if (auth) {
    headers.set(
      "Authorization",
      "Basic " + btoa(
        (auth.username || "") + ":" + (auth.password ? unescape(encodeURIComponent(auth.password)) : "")
      )
    );
  }
  if (utils$1.isFormData(data)) {
    if (platform.hasStandardBrowserEnv || platform.hasStandardBrowserWebWorkerEnv) {
      headers.setContentType(void 0);
    } else if (utils$1.isFunction(data.getHeaders)) {
      const formHeaders = data.getHeaders();
      const allowedHeaders = ["content-type", "content-length"];
      Object.entries(formHeaders).forEach(([key, val]) => {
        if (allowedHeaders.includes(key.toLowerCase())) {
          headers.set(key, val);
        }
      });
    }
  }
  if (platform.hasStandardBrowserEnv) {
    withXSRFToken && utils$1.isFunction(withXSRFToken) && (withXSRFToken = withXSRFToken(newConfig));
    if (withXSRFToken || withXSRFToken !== false && isURLSameOrigin(newConfig.url)) {
      const xsrfValue = xsrfHeaderName && xsrfCookieName && cookies.read(xsrfCookieName);
      if (xsrfValue) {
        headers.set(xsrfHeaderName, xsrfValue);
      }
    }
  }
  return newConfig;
};
const isXHRAdapterSupported = typeof XMLHttpRequest !== "undefined";
const xhrAdapter = isXHRAdapterSupported && function(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    const _config = resolveConfig(config);
    let requestData = _config.data;
    const requestHeaders = AxiosHeaders$1.from(_config.headers).normalize();
    let { responseType, onUploadProgress, onDownloadProgress } = _config;
    let onCanceled;
    let uploadThrottled, downloadThrottled;
    let flushUpload, flushDownload;
    function done() {
      flushUpload && flushUpload();
      flushDownload && flushDownload();
      _config.cancelToken && _config.cancelToken.unsubscribe(onCanceled);
      _config.signal && _config.signal.removeEventListener("abort", onCanceled);
    }
    let request = new XMLHttpRequest();
    request.open(_config.method.toUpperCase(), _config.url, true);
    request.timeout = _config.timeout;
    function onloadend() {
      if (!request) {
        return;
      }
      const responseHeaders = AxiosHeaders$1.from(
        "getAllResponseHeaders" in request && request.getAllResponseHeaders()
      );
      const responseData = !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response;
      const response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      };
      settle(
        function _resolve(value) {
          resolve(value);
          done();
        },
        function _reject(err) {
          reject(err);
          done();
        },
        response
      );
      request = null;
    }
    if ("onloadend" in request) {
      request.onloadend = onloadend;
    } else {
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) {
          return;
        }
        setTimeout(onloadend);
      };
    }
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }
      reject(new AxiosError$1("Request aborted", AxiosError$1.ECONNABORTED, config, request));
      request = null;
    };
    request.onerror = function handleError(event) {
      const msg = event && event.message ? event.message : "Network Error";
      const err = new AxiosError$1(msg, AxiosError$1.ERR_NETWORK, config, request);
      err.event = event || null;
      reject(err);
      request = null;
    };
    request.ontimeout = function handleTimeout() {
      let timeoutErrorMessage = _config.timeout ? "timeout of " + _config.timeout + "ms exceeded" : "timeout exceeded";
      const transitional2 = _config.transitional || transitionalDefaults;
      if (_config.timeoutErrorMessage) {
        timeoutErrorMessage = _config.timeoutErrorMessage;
      }
      reject(
        new AxiosError$1(
          timeoutErrorMessage,
          transitional2.clarifyTimeoutError ? AxiosError$1.ETIMEDOUT : AxiosError$1.ECONNABORTED,
          config,
          request
        )
      );
      request = null;
    };
    requestData === void 0 && requestHeaders.setContentType(null);
    if ("setRequestHeader" in request) {
      utils$1.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
        request.setRequestHeader(key, val);
      });
    }
    if (!utils$1.isUndefined(_config.withCredentials)) {
      request.withCredentials = !!_config.withCredentials;
    }
    if (responseType && responseType !== "json") {
      request.responseType = _config.responseType;
    }
    if (onDownloadProgress) {
      [downloadThrottled, flushDownload] = progressEventReducer(onDownloadProgress, true);
      request.addEventListener("progress", downloadThrottled);
    }
    if (onUploadProgress && request.upload) {
      [uploadThrottled, flushUpload] = progressEventReducer(onUploadProgress);
      request.upload.addEventListener("progress", uploadThrottled);
      request.upload.addEventListener("loadend", flushUpload);
    }
    if (_config.cancelToken || _config.signal) {
      onCanceled = (cancel) => {
        if (!request) {
          return;
        }
        reject(!cancel || cancel.type ? new CanceledError$1(null, config, request) : cancel);
        request.abort();
        request = null;
      };
      _config.cancelToken && _config.cancelToken.subscribe(onCanceled);
      if (_config.signal) {
        _config.signal.aborted ? onCanceled() : _config.signal.addEventListener("abort", onCanceled);
      }
    }
    const protocol = parseProtocol(_config.url);
    if (protocol && platform.protocols.indexOf(protocol) === -1) {
      reject(
        new AxiosError$1(
          "Unsupported protocol " + protocol + ":",
          AxiosError$1.ERR_BAD_REQUEST,
          config
        )
      );
      return;
    }
    request.send(requestData || null);
  });
};
const composeSignals = (signals, timeout) => {
  const { length } = signals = signals ? signals.filter(Boolean) : [];
  if (timeout || length) {
    let controller = new AbortController();
    let aborted;
    const onabort = function(reason) {
      if (!aborted) {
        aborted = true;
        unsubscribe();
        const err = reason instanceof Error ? reason : this.reason;
        controller.abort(
          err instanceof AxiosError$1 ? err : new CanceledError$1(err instanceof Error ? err.message : err)
        );
      }
    };
    let timer = timeout && setTimeout(() => {
      timer = null;
      onabort(new AxiosError$1(`timeout of ${timeout}ms exceeded`, AxiosError$1.ETIMEDOUT));
    }, timeout);
    const unsubscribe = () => {
      if (signals) {
        timer && clearTimeout(timer);
        timer = null;
        signals.forEach((signal2) => {
          signal2.unsubscribe ? signal2.unsubscribe(onabort) : signal2.removeEventListener("abort", onabort);
        });
        signals = null;
      }
    };
    signals.forEach((signal2) => signal2.addEventListener("abort", onabort));
    const { signal } = controller;
    signal.unsubscribe = () => utils$1.asap(unsubscribe);
    return signal;
  }
};
const streamChunk = function* (chunk, chunkSize) {
  let len = chunk.byteLength;
  if (len < chunkSize) {
    yield chunk;
    return;
  }
  let pos = 0;
  let end;
  while (pos < len) {
    end = pos + chunkSize;
    yield chunk.slice(pos, end);
    pos = end;
  }
};
const readBytes = async function* (iterable, chunkSize) {
  for await (const chunk of readStream(iterable)) {
    yield* streamChunk(chunk, chunkSize);
  }
};
const readStream = async function* (stream) {
  if (stream[Symbol.asyncIterator]) {
    yield* stream;
    return;
  }
  const reader = stream.getReader();
  try {
    for (; ; ) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      yield value;
    }
  } finally {
    await reader.cancel();
  }
};
const trackStream = (stream, chunkSize, onProgress, onFinish) => {
  const iterator2 = readBytes(stream, chunkSize);
  let bytes = 0;
  let done;
  let _onFinish = (e) => {
    if (!done) {
      done = true;
      onFinish && onFinish(e);
    }
  };
  return new ReadableStream(
    {
      async pull(controller) {
        try {
          const { done: done2, value } = await iterator2.next();
          if (done2) {
            _onFinish();
            controller.close();
            return;
          }
          let len = value.byteLength;
          if (onProgress) {
            let loadedBytes = bytes += len;
            onProgress(loadedBytes);
          }
          controller.enqueue(new Uint8Array(value));
        } catch (err) {
          _onFinish(err);
          throw err;
        }
      },
      cancel(reason) {
        _onFinish(reason);
        return iterator2.return();
      }
    },
    {
      highWaterMark: 2
    }
  );
};
const DEFAULT_CHUNK_SIZE = 64 * 1024;
const { isFunction } = utils$1;
const globalFetchAPI = (({ Request, Response }) => ({
  Request,
  Response
}))(utils$1.global);
const { ReadableStream: ReadableStream$1, TextEncoder } = utils$1.global;
const test = (fn, ...args) => {
  try {
    return !!fn(...args);
  } catch (e) {
    return false;
  }
};
const factory = (env) => {
  env = utils$1.merge.call(
    {
      skipUndefined: true
    },
    globalFetchAPI,
    env
  );
  const { fetch: envFetch, Request, Response } = env;
  const isFetchSupported = envFetch ? isFunction(envFetch) : typeof fetch === "function";
  const isRequestSupported = isFunction(Request);
  const isResponseSupported = isFunction(Response);
  if (!isFetchSupported) {
    return false;
  }
  const isReadableStreamSupported = isFetchSupported && isFunction(ReadableStream$1);
  const encodeText = isFetchSupported && (typeof TextEncoder === "function" ? /* @__PURE__ */ ((encoder) => (str) => encoder.encode(str))(new TextEncoder()) : async (str) => new Uint8Array(await new Request(str).arrayBuffer()));
  const supportsRequestStream = isRequestSupported && isReadableStreamSupported && test(() => {
    let duplexAccessed = false;
    const hasContentType = new Request(platform.origin, {
      body: new ReadableStream$1(),
      method: "POST",
      get duplex() {
        duplexAccessed = true;
        return "half";
      }
    }).headers.has("Content-Type");
    return duplexAccessed && !hasContentType;
  });
  const supportsResponseStream = isResponseSupported && isReadableStreamSupported && test(() => utils$1.isReadableStream(new Response("").body));
  const resolvers = {
    stream: supportsResponseStream && ((res) => res.body)
  };
  isFetchSupported && (() => {
    ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((type) => {
      !resolvers[type] && (resolvers[type] = (res, config) => {
        let method = res && res[type];
        if (method) {
          return method.call(res);
        }
        throw new AxiosError$1(
          `Response type '${type}' is not supported`,
          AxiosError$1.ERR_NOT_SUPPORT,
          config
        );
      });
    });
  })();
  const getBodyLength = async (body) => {
    if (body == null) {
      return 0;
    }
    if (utils$1.isBlob(body)) {
      return body.size;
    }
    if (utils$1.isSpecCompliantForm(body)) {
      const _request = new Request(platform.origin, {
        method: "POST",
        body
      });
      return (await _request.arrayBuffer()).byteLength;
    }
    if (utils$1.isArrayBufferView(body) || utils$1.isArrayBuffer(body)) {
      return body.byteLength;
    }
    if (utils$1.isURLSearchParams(body)) {
      body = body + "";
    }
    if (utils$1.isString(body)) {
      return (await encodeText(body)).byteLength;
    }
  };
  const resolveBodyLength = async (headers, body) => {
    const length = utils$1.toFiniteNumber(headers.getContentLength());
    return length == null ? getBodyLength(body) : length;
  };
  return async (config) => {
    let {
      url,
      method,
      data,
      signal,
      cancelToken,
      timeout,
      onDownloadProgress,
      onUploadProgress,
      responseType,
      headers,
      withCredentials = "same-origin",
      fetchOptions
    } = resolveConfig(config);
    let _fetch = envFetch || fetch;
    responseType = responseType ? (responseType + "").toLowerCase() : "text";
    let composedSignal = composeSignals(
      [signal, cancelToken && cancelToken.toAbortSignal()],
      timeout
    );
    let request = null;
    const unsubscribe = composedSignal && composedSignal.unsubscribe && (() => {
      composedSignal.unsubscribe();
    });
    let requestContentLength;
    try {
      if (onUploadProgress && supportsRequestStream && method !== "get" && method !== "head" && (requestContentLength = await resolveBodyLength(headers, data)) !== 0) {
        let _request = new Request(url, {
          method: "POST",
          body: data,
          duplex: "half"
        });
        let contentTypeHeader;
        if (utils$1.isFormData(data) && (contentTypeHeader = _request.headers.get("content-type"))) {
          headers.setContentType(contentTypeHeader);
        }
        if (_request.body) {
          const [onProgress, flush] = progressEventDecorator(
            requestContentLength,
            progressEventReducer(asyncDecorator(onUploadProgress))
          );
          data = trackStream(_request.body, DEFAULT_CHUNK_SIZE, onProgress, flush);
        }
      }
      if (!utils$1.isString(withCredentials)) {
        withCredentials = withCredentials ? "include" : "omit";
      }
      const isCredentialsSupported = isRequestSupported && "credentials" in Request.prototype;
      const resolvedOptions = {
        ...fetchOptions,
        signal: composedSignal,
        method: method.toUpperCase(),
        headers: headers.normalize().toJSON(),
        body: data,
        duplex: "half",
        credentials: isCredentialsSupported ? withCredentials : void 0
      };
      request = isRequestSupported && new Request(url, resolvedOptions);
      let response = await (isRequestSupported ? _fetch(request, fetchOptions) : _fetch(url, resolvedOptions));
      const isStreamResponse = supportsResponseStream && (responseType === "stream" || responseType === "response");
      if (supportsResponseStream && (onDownloadProgress || isStreamResponse && unsubscribe)) {
        const options = {};
        ["status", "statusText", "headers"].forEach((prop) => {
          options[prop] = response[prop];
        });
        const responseContentLength = utils$1.toFiniteNumber(response.headers.get("content-length"));
        const [onProgress, flush] = onDownloadProgress && progressEventDecorator(
          responseContentLength,
          progressEventReducer(asyncDecorator(onDownloadProgress), true)
        ) || [];
        response = new Response(
          trackStream(response.body, DEFAULT_CHUNK_SIZE, onProgress, () => {
            flush && flush();
            unsubscribe && unsubscribe();
          }),
          options
        );
      }
      responseType = responseType || "text";
      let responseData = await resolvers[utils$1.findKey(resolvers, responseType) || "text"](
        response,
        config
      );
      !isStreamResponse && unsubscribe && unsubscribe();
      return await new Promise((resolve, reject) => {
        settle(resolve, reject, {
          data: responseData,
          headers: AxiosHeaders$1.from(response.headers),
          status: response.status,
          statusText: response.statusText,
          config,
          request
        });
      });
    } catch (err) {
      unsubscribe && unsubscribe();
      if (err && err.name === "TypeError" && /Load failed|fetch/i.test(err.message)) {
        throw Object.assign(
          new AxiosError$1(
            "Network Error",
            AxiosError$1.ERR_NETWORK,
            config,
            request,
            err && err.response
          ),
          {
            cause: err.cause || err
          }
        );
      }
      throw AxiosError$1.from(err, err && err.code, config, request, err && err.response);
    }
  };
};
const seedCache = /* @__PURE__ */ new Map();
const getFetch = (config) => {
  let env = config && config.env || {};
  const { fetch: fetch2, Request, Response } = env;
  const seeds = [Request, Response, fetch2];
  let len = seeds.length, i = len, seed, target, map = seedCache;
  while (i--) {
    seed = seeds[i];
    target = map.get(seed);
    target === void 0 && map.set(seed, target = i ? /* @__PURE__ */ new Map() : factory(env));
    map = target;
  }
  return target;
};
getFetch();
const knownAdapters = {
  http: httpAdapter,
  xhr: xhrAdapter,
  fetch: {
    get: getFetch
  }
};
utils$1.forEach(knownAdapters, (fn, value) => {
  if (fn) {
    try {
      Object.defineProperty(fn, "name", { value });
    } catch (e) {
    }
    Object.defineProperty(fn, "adapterName", { value });
  }
});
const renderReason = (reason) => `- ${reason}`;
const isResolvedHandle = (adapter) => utils$1.isFunction(adapter) || adapter === null || adapter === false;
function getAdapter$1(adapters2, config) {
  adapters2 = utils$1.isArray(adapters2) ? adapters2 : [adapters2];
  const { length } = adapters2;
  let nameOrAdapter;
  let adapter;
  const rejectedReasons = {};
  for (let i = 0; i < length; i++) {
    nameOrAdapter = adapters2[i];
    let id;
    adapter = nameOrAdapter;
    if (!isResolvedHandle(nameOrAdapter)) {
      adapter = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];
      if (adapter === void 0) {
        throw new AxiosError$1(`Unknown adapter '${id}'`);
      }
    }
    if (adapter && (utils$1.isFunction(adapter) || (adapter = adapter.get(config)))) {
      break;
    }
    rejectedReasons[id || "#" + i] = adapter;
  }
  if (!adapter) {
    const reasons = Object.entries(rejectedReasons).map(
      ([id, state]) => `adapter ${id} ` + (state === false ? "is not supported by the environment" : "is not available in the build")
    );
    let s = length ? reasons.length > 1 ? "since :\n" + reasons.map(renderReason).join("\n") : " " + renderReason(reasons[0]) : "as no adapter specified";
    throw new AxiosError$1(
      `There is no suitable adapter to dispatch the request ` + s,
      "ERR_NOT_SUPPORT"
    );
  }
  return adapter;
}
const adapters = {
  /**
   * Resolve an adapter from a list of adapter names or functions.
   * @type {Function}
   */
  getAdapter: getAdapter$1,
  /**
   * Exposes all known adapters
   * @type {Object<string, Function|Object>}
   */
  adapters: knownAdapters
};
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
  if (config.signal && config.signal.aborted) {
    throw new CanceledError$1(null, config);
  }
}
function dispatchRequest(config) {
  throwIfCancellationRequested(config);
  config.headers = AxiosHeaders$1.from(config.headers);
  config.data = transformData.call(config, config.transformRequest);
  if (["post", "put", "patch"].indexOf(config.method) !== -1) {
    config.headers.setContentType("application/x-www-form-urlencoded", false);
  }
  const adapter = adapters.getAdapter(config.adapter || defaults.adapter, config);
  return adapter(config).then(
    function onAdapterResolution(response) {
      throwIfCancellationRequested(config);
      response.data = transformData.call(config, config.transformResponse, response);
      response.headers = AxiosHeaders$1.from(response.headers);
      return response;
    },
    function onAdapterRejection(reason) {
      if (!isCancel$1(reason)) {
        throwIfCancellationRequested(config);
        if (reason && reason.response) {
          reason.response.data = transformData.call(
            config,
            config.transformResponse,
            reason.response
          );
          reason.response.headers = AxiosHeaders$1.from(reason.response.headers);
        }
      }
      return Promise.reject(reason);
    }
  );
}
const VERSION$1 = "1.13.6";
const validators$1 = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((type, i) => {
  validators$1[type] = function validator2(thing) {
    return typeof thing === type || "a" + (i < 1 ? "n " : " ") + type;
  };
});
const deprecatedWarnings = {};
validators$1.transitional = function transitional(validator2, version, message) {
  function formatMessage(opt, desc) {
    return "[Axios v" + VERSION$1 + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
  }
  return (value, opt, opts) => {
    if (validator2 === false) {
      throw new AxiosError$1(
        formatMessage(opt, " has been removed" + (version ? " in " + version : "")),
        AxiosError$1.ERR_DEPRECATED
      );
    }
    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      console.warn(
        formatMessage(
          opt,
          " has been deprecated since v" + version + " and will be removed in the near future"
        )
      );
    }
    return validator2 ? validator2(value, opt, opts) : true;
  };
};
validators$1.spelling = function spelling(correctSpelling) {
  return (value, opt) => {
    console.warn(`${opt} is likely a misspelling of ${correctSpelling}`);
    return true;
  };
};
function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== "object") {
    throw new AxiosError$1("options must be an object", AxiosError$1.ERR_BAD_OPTION_VALUE);
  }
  const keys = Object.keys(options);
  let i = keys.length;
  while (i-- > 0) {
    const opt = keys[i];
    const validator2 = schema[opt];
    if (validator2) {
      const value = options[opt];
      const result = value === void 0 || validator2(value, opt, options);
      if (result !== true) {
        throw new AxiosError$1(
          "option " + opt + " must be " + result,
          AxiosError$1.ERR_BAD_OPTION_VALUE
        );
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw new AxiosError$1("Unknown option " + opt, AxiosError$1.ERR_BAD_OPTION);
    }
  }
}
const validator = {
  assertOptions,
  validators: validators$1
};
const validators = validator.validators;
let Axios$1 = class Axios {
  constructor(instanceConfig) {
    this.defaults = instanceConfig || {};
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(configOrUrl, config) {
    try {
      return await this._request(configOrUrl, config);
    } catch (err) {
      if (err instanceof Error) {
        let dummy = {};
        Error.captureStackTrace ? Error.captureStackTrace(dummy) : dummy = new Error();
        const stack = dummy.stack ? dummy.stack.replace(/^.+\n/, "") : "";
        try {
          if (!err.stack) {
            err.stack = stack;
          } else if (stack && !String(err.stack).endsWith(stack.replace(/^.+\n.+\n/, ""))) {
            err.stack += "\n" + stack;
          }
        } catch (e) {
        }
      }
      throw err;
    }
  }
  _request(configOrUrl, config) {
    if (typeof configOrUrl === "string") {
      config = config || {};
      config.url = configOrUrl;
    } else {
      config = configOrUrl || {};
    }
    config = mergeConfig$1(this.defaults, config);
    const { transitional: transitional2, paramsSerializer, headers } = config;
    if (transitional2 !== void 0) {
      validator.assertOptions(
        transitional2,
        {
          silentJSONParsing: validators.transitional(validators.boolean),
          forcedJSONParsing: validators.transitional(validators.boolean),
          clarifyTimeoutError: validators.transitional(validators.boolean),
          legacyInterceptorReqResOrdering: validators.transitional(validators.boolean)
        },
        false
      );
    }
    if (paramsSerializer != null) {
      if (utils$1.isFunction(paramsSerializer)) {
        config.paramsSerializer = {
          serialize: paramsSerializer
        };
      } else {
        validator.assertOptions(
          paramsSerializer,
          {
            encode: validators.function,
            serialize: validators.function
          },
          true
        );
      }
    }
    if (config.allowAbsoluteUrls !== void 0) ;
    else if (this.defaults.allowAbsoluteUrls !== void 0) {
      config.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls;
    } else {
      config.allowAbsoluteUrls = true;
    }
    validator.assertOptions(
      config,
      {
        baseUrl: validators.spelling("baseURL"),
        withXsrfToken: validators.spelling("withXSRFToken")
      },
      true
    );
    config.method = (config.method || this.defaults.method || "get").toLowerCase();
    let contextHeaders = headers && utils$1.merge(headers.common, headers[config.method]);
    headers && utils$1.forEach(["delete", "get", "head", "post", "put", "patch", "common"], (method) => {
      delete headers[method];
    });
    config.headers = AxiosHeaders$1.concat(contextHeaders, headers);
    const requestInterceptorChain = [];
    let synchronousRequestInterceptors = true;
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
        return;
      }
      synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
      const transitional3 = config.transitional || transitionalDefaults;
      const legacyInterceptorReqResOrdering = transitional3 && transitional3.legacyInterceptorReqResOrdering;
      if (legacyInterceptorReqResOrdering) {
        requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
      } else {
        requestInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
      }
    });
    const responseInterceptorChain = [];
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
    });
    let promise;
    let i = 0;
    let len;
    if (!synchronousRequestInterceptors) {
      const chain = [dispatchRequest.bind(this), void 0];
      chain.unshift(...requestInterceptorChain);
      chain.push(...responseInterceptorChain);
      len = chain.length;
      promise = Promise.resolve(config);
      while (i < len) {
        promise = promise.then(chain[i++], chain[i++]);
      }
      return promise;
    }
    len = requestInterceptorChain.length;
    let newConfig = config;
    while (i < len) {
      const onFulfilled = requestInterceptorChain[i++];
      const onRejected = requestInterceptorChain[i++];
      try {
        newConfig = onFulfilled(newConfig);
      } catch (error) {
        onRejected.call(this, error);
        break;
      }
    }
    try {
      promise = dispatchRequest.call(this, newConfig);
    } catch (error) {
      return Promise.reject(error);
    }
    i = 0;
    len = responseInterceptorChain.length;
    while (i < len) {
      promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
    }
    return promise;
  }
  getUri(config) {
    config = mergeConfig$1(this.defaults, config);
    const fullPath = buildFullPath(config.baseURL, config.url, config.allowAbsoluteUrls);
    return buildURL(fullPath, config.params, config.paramsSerializer);
  }
};
utils$1.forEach(["delete", "get", "head", "options"], function forEachMethodNoData(method) {
  Axios$1.prototype[method] = function(url, config) {
    return this.request(
      mergeConfig$1(config || {}, {
        method,
        url,
        data: (config || {}).data
      })
    );
  };
});
utils$1.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
  function generateHTTPMethod(isForm) {
    return function httpMethod(url, data, config) {
      return this.request(
        mergeConfig$1(config || {}, {
          method,
          headers: isForm ? {
            "Content-Type": "multipart/form-data"
          } : {},
          url,
          data
        })
      );
    };
  }
  Axios$1.prototype[method] = generateHTTPMethod();
  Axios$1.prototype[method + "Form"] = generateHTTPMethod(true);
});
let CancelToken$1 = class CancelToken {
  constructor(executor) {
    if (typeof executor !== "function") {
      throw new TypeError("executor must be a function.");
    }
    let resolvePromise;
    this.promise = new Promise(function promiseExecutor(resolve) {
      resolvePromise = resolve;
    });
    const token = this;
    this.promise.then((cancel) => {
      if (!token._listeners) return;
      let i = token._listeners.length;
      while (i-- > 0) {
        token._listeners[i](cancel);
      }
      token._listeners = null;
    });
    this.promise.then = (onfulfilled) => {
      let _resolve;
      const promise = new Promise((resolve) => {
        token.subscribe(resolve);
        _resolve = resolve;
      }).then(onfulfilled);
      promise.cancel = function reject() {
        token.unsubscribe(_resolve);
      };
      return promise;
    };
    executor(function cancel(message, config, request) {
      if (token.reason) {
        return;
      }
      token.reason = new CanceledError$1(message, config, request);
      resolvePromise(token.reason);
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(listener) {
    if (this.reason) {
      listener(this.reason);
      return;
    }
    if (this._listeners) {
      this._listeners.push(listener);
    } else {
      this._listeners = [listener];
    }
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(listener) {
    if (!this._listeners) {
      return;
    }
    const index = this._listeners.indexOf(listener);
    if (index !== -1) {
      this._listeners.splice(index, 1);
    }
  }
  toAbortSignal() {
    const controller = new AbortController();
    const abort = (err) => {
      controller.abort(err);
    };
    this.subscribe(abort);
    controller.signal.unsubscribe = () => this.unsubscribe(abort);
    return controller.signal;
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let cancel;
    const token = new CancelToken(function executor(c) {
      cancel = c;
    });
    return {
      token,
      cancel
    };
  }
};
function spread$1(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
}
function isAxiosError$1(payload) {
  return utils$1.isObject(payload) && payload.isAxiosError === true;
}
const HttpStatusCode$1 = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
  WebServerIsDown: 521,
  ConnectionTimedOut: 522,
  OriginIsUnreachable: 523,
  TimeoutOccurred: 524,
  SslHandshakeFailed: 525,
  InvalidSslCertificate: 526
};
Object.entries(HttpStatusCode$1).forEach(([key, value]) => {
  HttpStatusCode$1[value] = key;
});
function createInstance(defaultConfig) {
  const context = new Axios$1(defaultConfig);
  const instance = bind(Axios$1.prototype.request, context);
  utils$1.extend(instance, Axios$1.prototype, context, { allOwnKeys: true });
  utils$1.extend(instance, context, null, { allOwnKeys: true });
  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig$1(defaultConfig, instanceConfig));
  };
  return instance;
}
const axios$1 = createInstance(defaults);
axios$1.Axios = Axios$1;
axios$1.CanceledError = CanceledError$1;
axios$1.CancelToken = CancelToken$1;
axios$1.isCancel = isCancel$1;
axios$1.VERSION = VERSION$1;
axios$1.toFormData = toFormData$1;
axios$1.AxiosError = AxiosError$1;
axios$1.Cancel = axios$1.CanceledError;
axios$1.all = function all(promises) {
  return Promise.all(promises);
};
axios$1.spread = spread$1;
axios$1.isAxiosError = isAxiosError$1;
axios$1.mergeConfig = mergeConfig$1;
axios$1.AxiosHeaders = AxiosHeaders$1;
axios$1.formToJSON = (thing) => formDataToJSON(utils$1.isHTMLForm(thing) ? new FormData(thing) : thing);
axios$1.getAdapter = adapters.getAdapter;
axios$1.HttpStatusCode = HttpStatusCode$1;
axios$1.default = axios$1;
const {
  Axios: Axios2,
  AxiosError: AxiosError2,
  CanceledError: CanceledError2,
  isCancel,
  CancelToken: CancelToken2,
  VERSION,
  all: all2,
  Cancel,
  isAxiosError,
  spread,
  toFormData,
  AxiosHeaders: AxiosHeaders2,
  HttpStatusCode,
  formToJSON,
  getAdapter,
  mergeConfig
} = axios$1;
const axiosInstance = axios$1.create({
  //Use the IP 10.0.2.2 to access the host your emulator is running on
  //Read more https://developer.android.com/studio/run/emulator-networking#networkaddresses
  //baseURL: "http://10.0.2.2:9100/",
  baseURL: "http://localhost:9100/",
  timeout: 5e3,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  }
});
const axios = defineBoot(({ app }) => {
  app.config.globalProperties.$axios = axios$1;
  app.config.globalProperties.$api = axiosInstance;
});
export {
  axiosInstance,
  axios as default
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXhpb3MtREdVaFd6cDQuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9iaW5kLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi91dGlscy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9BeGlvc0Vycm9yLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL251bGwuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvdG9Gb3JtRGF0YS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9BeGlvc1VSTFNlYXJjaFBhcmFtcy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9idWlsZFVSTC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9JbnRlcmNlcHRvck1hbmFnZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2RlZmF1bHRzL3RyYW5zaXRpb25hbC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvcGxhdGZvcm0vYnJvd3Nlci9jbGFzc2VzL1VSTFNlYXJjaFBhcmFtcy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvcGxhdGZvcm0vYnJvd3Nlci9jbGFzc2VzL0Zvcm1EYXRhLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9wbGF0Zm9ybS9icm93c2VyL2NsYXNzZXMvQmxvYi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvcGxhdGZvcm0vYnJvd3Nlci9pbmRleC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvcGxhdGZvcm0vY29tbW9uL3V0aWxzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9wbGF0Zm9ybS9pbmRleC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy90b1VSTEVuY29kZWRGb3JtLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2Zvcm1EYXRhVG9KU09OLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9kZWZhdWx0cy9pbmRleC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9wYXJzZUhlYWRlcnMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvQXhpb3NIZWFkZXJzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3RyYW5zZm9ybURhdGEuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9pc0NhbmNlbC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbGVkRXJyb3IuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvc2V0dGxlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3BhcnNlUHJvdG9jb2wuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvc3BlZWRvbWV0ZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvdGhyb3R0bGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvcHJvZ3Jlc3NFdmVudFJlZHVjZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2Nvb2tpZXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNBYnNvbHV0ZVVSTC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb21iaW5lVVJMcy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9idWlsZEZ1bGxQYXRoLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL21lcmdlQ29uZmlnLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3Jlc29sdmVDb25maWcuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2FkYXB0ZXJzL3hoci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb21wb3NlU2lnbmFscy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy90cmFja1N0cmVhbS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYWRhcHRlcnMvZmV0Y2guanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2FkYXB0ZXJzL2FkYXB0ZXJzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2Rpc3BhdGNoUmVxdWVzdC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvZW52L2RhdGEuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvdmFsaWRhdG9yLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0F4aW9zLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsVG9rZW4uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvc3ByZWFkLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzQXhpb3NFcnJvci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9IdHRwU3RhdHVzQ29kZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYXhpb3MuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvaW5kZXguanMiLCIuLi8uLi8uLi9zcmMvYm9vdC9heGlvcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQ3JlYXRlIGEgYm91bmQgdmVyc2lvbiBvZiBhIGZ1bmN0aW9uIHdpdGggYSBzcGVjaWZpZWQgYHRoaXNgIGNvbnRleHRcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiAtIFRoZSBmdW5jdGlvbiB0byBiaW5kXG4gKiBAcGFyYW0geyp9IHRoaXNBcmcgLSBUaGUgdmFsdWUgdG8gYmUgcGFzc2VkIGFzIHRoZSBgdGhpc2AgcGFyYW1ldGVyXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IEEgbmV3IGZ1bmN0aW9uIHRoYXQgd2lsbCBjYWxsIHRoZSBvcmlnaW5hbCBmdW5jdGlvbiB3aXRoIHRoZSBzcGVjaWZpZWQgYHRoaXNgIGNvbnRleHRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYmluZChmbiwgdGhpc0FyZykge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcCgpIHtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhpc0FyZywgYXJndW1lbnRzKTtcbiAgfTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGJpbmQgZnJvbSAnLi9oZWxwZXJzL2JpbmQuanMnO1xuXG4vLyB1dGlscyBpcyBhIGxpYnJhcnkgb2YgZ2VuZXJpYyBoZWxwZXIgZnVuY3Rpb25zIG5vbi1zcGVjaWZpYyB0byBheGlvc1xuXG5jb25zdCB7IHRvU3RyaW5nIH0gPSBPYmplY3QucHJvdG90eXBlO1xuY29uc3QgeyBnZXRQcm90b3R5cGVPZiB9ID0gT2JqZWN0O1xuY29uc3QgeyBpdGVyYXRvciwgdG9TdHJpbmdUYWcgfSA9IFN5bWJvbDtcblxuY29uc3Qga2luZE9mID0gKChjYWNoZSkgPT4gKHRoaW5nKSA9PiB7XG4gIGNvbnN0IHN0ciA9IHRvU3RyaW5nLmNhbGwodGhpbmcpO1xuICByZXR1cm4gY2FjaGVbc3RyXSB8fCAoY2FjaGVbc3RyXSA9IHN0ci5zbGljZSg4LCAtMSkudG9Mb3dlckNhc2UoKSk7XG59KShPYmplY3QuY3JlYXRlKG51bGwpKTtcblxuY29uc3Qga2luZE9mVGVzdCA9ICh0eXBlKSA9PiB7XG4gIHR5cGUgPSB0eXBlLnRvTG93ZXJDYXNlKCk7XG4gIHJldHVybiAodGhpbmcpID0+IGtpbmRPZih0aGluZykgPT09IHR5cGU7XG59O1xuXG5jb25zdCB0eXBlT2ZUZXN0ID0gKHR5cGUpID0+ICh0aGluZykgPT4gdHlwZW9mIHRoaW5nID09PSB0eXBlO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgbm9uLW51bGwgb2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEFycmF5LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgeyBpc0FycmF5IH0gPSBBcnJheTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyB1bmRlZmluZWRcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSB2YWx1ZSBpcyB1bmRlZmluZWQsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc1VuZGVmaW5lZCA9IHR5cGVPZlRlc3QoJ3VuZGVmaW5lZCcpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQnVmZmVyXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQnVmZmVyKHZhbCkge1xuICByZXR1cm4gKFxuICAgIHZhbCAhPT0gbnVsbCAmJlxuICAgICFpc1VuZGVmaW5lZCh2YWwpICYmXG4gICAgdmFsLmNvbnN0cnVjdG9yICE9PSBudWxsICYmXG4gICAgIWlzVW5kZWZpbmVkKHZhbC5jb25zdHJ1Y3RvcikgJiZcbiAgICBpc0Z1bmN0aW9uKHZhbC5jb25zdHJ1Y3Rvci5pc0J1ZmZlcikgJiZcbiAgICB2YWwuY29uc3RydWN0b3IuaXNCdWZmZXIodmFsKVxuICApO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzQXJyYXlCdWZmZXIgPSBraW5kT2ZUZXN0KCdBcnJheUJ1ZmZlcicpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSB2aWV3IG9uIGFuIEFycmF5QnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUJ1ZmZlclZpZXcodmFsKSB7XG4gIGxldCByZXN1bHQ7XG4gIGlmICh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmIEFycmF5QnVmZmVyLmlzVmlldykge1xuICAgIHJlc3VsdCA9IEFycmF5QnVmZmVyLmlzVmlldyh2YWwpO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdCA9IHZhbCAmJiB2YWwuYnVmZmVyICYmIGlzQXJyYXlCdWZmZXIodmFsLmJ1ZmZlcik7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmluZ1xuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJpbmcsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc1N0cmluZyA9IHR5cGVPZlRlc3QoJ3N0cmluZycpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGdW5jdGlvbiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzRnVuY3Rpb24gPSB0eXBlT2ZUZXN0KCdmdW5jdGlvbicpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgTnVtYmVyXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIE51bWJlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzTnVtYmVyID0gdHlwZU9mVGVzdCgnbnVtYmVyJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gT2JqZWN0XG4gKlxuICogQHBhcmFtIHsqfSB0aGluZyBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIE9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzT2JqZWN0ID0gKHRoaW5nKSA9PiB0aGluZyAhPT0gbnVsbCAmJiB0eXBlb2YgdGhpbmcgPT09ICdvYmplY3QnO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQm9vbGVhblxuICpcbiAqIEBwYXJhbSB7Kn0gdGhpbmcgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgQm9vbGVhbiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzQm9vbGVhbiA9ICh0aGluZykgPT4gdGhpbmcgPT09IHRydWUgfHwgdGhpbmcgPT09IGZhbHNlO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgcGxhaW4gT2JqZWN0XG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIHBsYWluIE9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzUGxhaW5PYmplY3QgPSAodmFsKSA9PiB7XG4gIGlmIChraW5kT2YodmFsKSAhPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjb25zdCBwcm90b3R5cGUgPSBnZXRQcm90b3R5cGVPZih2YWwpO1xuICByZXR1cm4gKFxuICAgIChwcm90b3R5cGUgPT09IG51bGwgfHxcbiAgICAgIHByb3RvdHlwZSA9PT0gT2JqZWN0LnByb3RvdHlwZSB8fFxuICAgICAgT2JqZWN0LmdldFByb3RvdHlwZU9mKHByb3RvdHlwZSkgPT09IG51bGwpICYmXG4gICAgISh0b1N0cmluZ1RhZyBpbiB2YWwpICYmXG4gICAgIShpdGVyYXRvciBpbiB2YWwpXG4gICk7XG59O1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIGVtcHR5IG9iamVjdCAoc2FmZWx5IGhhbmRsZXMgQnVmZmVycylcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIGVtcHR5IG9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzRW1wdHlPYmplY3QgPSAodmFsKSA9PiB7XG4gIC8vIEVhcmx5IHJldHVybiBmb3Igbm9uLW9iamVjdHMgb3IgQnVmZmVycyB0byBwcmV2ZW50IFJhbmdlRXJyb3JcbiAgaWYgKCFpc09iamVjdCh2YWwpIHx8IGlzQnVmZmVyKHZhbCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB0cnkge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyh2YWwpLmxlbmd0aCA9PT0gMCAmJiBPYmplY3QuZ2V0UHJvdG90eXBlT2YodmFsKSA9PT0gT2JqZWN0LnByb3RvdHlwZTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIC8vIEZhbGxiYWNrIGZvciBhbnkgb3RoZXIgb2JqZWN0cyB0aGF0IG1pZ2h0IGNhdXNlIFJhbmdlRXJyb3Igd2l0aCBPYmplY3Qua2V5cygpXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59O1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRGF0ZVxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBEYXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNEYXRlID0ga2luZE9mVGVzdCgnRGF0ZScpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRmlsZVxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGaWxlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNGaWxlID0ga2luZE9mVGVzdCgnRmlsZScpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgUmVhY3QgTmF0aXZlIEJsb2JcbiAqIFJlYWN0IE5hdGl2ZSBcImJsb2JcIjogYW4gb2JqZWN0IHdpdGggYSBgdXJpYCBhdHRyaWJ1dGUuIE9wdGlvbmFsbHksIGl0IGNhblxuICogYWxzbyBoYXZlIGEgYG5hbWVgIGFuZCBgdHlwZWAgYXR0cmlidXRlIHRvIHNwZWNpZnkgZmlsZW5hbWUgYW5kIGNvbnRlbnQgdHlwZVxuICpcbiAqIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0LW5hdGl2ZS9ibG9iLzI2Njg0Y2YzYWRmNDA5NGViNmM0MDVkMzQ1YTc1YmY4YzdjMGJmODgvTGlicmFyaWVzL05ldHdvcmsvRm9ybURhdGEuanMjTDY4LUw3MVxuICogXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgUmVhY3QgTmF0aXZlIEJsb2IsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc1JlYWN0TmF0aXZlQmxvYiA9ICh2YWx1ZSkgPT4ge1xuICByZXR1cm4gISEodmFsdWUgJiYgdHlwZW9mIHZhbHVlLnVyaSAhPT0gJ3VuZGVmaW5lZCcpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBlbnZpcm9ubWVudCBpcyBSZWFjdCBOYXRpdmVcbiAqIFJlYWN0TmF0aXZlIGBGb3JtRGF0YWAgaGFzIGEgbm9uLXN0YW5kYXJkIGBnZXRQYXJ0cygpYCBtZXRob2RcbiAqIFxuICogQHBhcmFtIHsqfSBmb3JtRGF0YSBUaGUgZm9ybURhdGEgdG8gdGVzdFxuICogXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiBlbnZpcm9ubWVudCBpcyBSZWFjdCBOYXRpdmUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc1JlYWN0TmF0aXZlID0gKGZvcm1EYXRhKSA9PiBmb3JtRGF0YSAmJiB0eXBlb2YgZm9ybURhdGEuZ2V0UGFydHMgIT09ICd1bmRlZmluZWQnO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQmxvYlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCbG9iLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNCbG9iID0ga2luZE9mVGVzdCgnQmxvYicpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRmlsZUxpc3RcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRmlsZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzRmlsZUxpc3QgPSBraW5kT2ZUZXN0KCdGaWxlTGlzdCcpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyZWFtXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmVhbSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzU3RyZWFtID0gKHZhbCkgPT4gaXNPYmplY3QodmFsKSAmJiBpc0Z1bmN0aW9uKHZhbC5waXBlKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZvcm1EYXRhXG4gKlxuICogQHBhcmFtIHsqfSB0aGluZyBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEZvcm1EYXRhLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gZ2V0R2xvYmFsKCkge1xuICBpZiAodHlwZW9mIGdsb2JhbFRoaXMgIT09ICd1bmRlZmluZWQnKSByZXR1cm4gZ2xvYmFsVGhpcztcbiAgaWYgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJykgcmV0dXJuIHNlbGY7XG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykgcmV0dXJuIHdpbmRvdztcbiAgaWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSByZXR1cm4gZ2xvYmFsO1xuICByZXR1cm4ge307XG59XG5cbmNvbnN0IEcgPSBnZXRHbG9iYWwoKTtcbmNvbnN0IEZvcm1EYXRhQ3RvciA9IHR5cGVvZiBHLkZvcm1EYXRhICE9PSAndW5kZWZpbmVkJyA/IEcuRm9ybURhdGEgOiB1bmRlZmluZWQ7XG5cbmNvbnN0IGlzRm9ybURhdGEgPSAodGhpbmcpID0+IHtcbiAgbGV0IGtpbmQ7XG4gIHJldHVybiB0aGluZyAmJiAoXG4gICAgKEZvcm1EYXRhQ3RvciAmJiB0aGluZyBpbnN0YW5jZW9mIEZvcm1EYXRhQ3RvcikgfHwgKFxuICAgICAgaXNGdW5jdGlvbih0aGluZy5hcHBlbmQpICYmIChcbiAgICAgICAgKGtpbmQgPSBraW5kT2YodGhpbmcpKSA9PT0gJ2Zvcm1kYXRhJyB8fFxuICAgICAgICAvLyBkZXRlY3QgZm9ybS1kYXRhIGluc3RhbmNlXG4gICAgICAgIChraW5kID09PSAnb2JqZWN0JyAmJiBpc0Z1bmN0aW9uKHRoaW5nLnRvU3RyaW5nKSAmJiB0aGluZy50b1N0cmluZygpID09PSAnW29iamVjdCBGb3JtRGF0YV0nKVxuICAgICAgKVxuICAgIClcbiAgKTtcbn07XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0XG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc1VSTFNlYXJjaFBhcmFtcyA9IGtpbmRPZlRlc3QoJ1VSTFNlYXJjaFBhcmFtcycpO1xuXG5jb25zdCBbaXNSZWFkYWJsZVN0cmVhbSwgaXNSZXF1ZXN0LCBpc1Jlc3BvbnNlLCBpc0hlYWRlcnNdID0gW1xuICAnUmVhZGFibGVTdHJlYW0nLFxuICAnUmVxdWVzdCcsXG4gICdSZXNwb25zZScsXG4gICdIZWFkZXJzJyxcbl0ubWFwKGtpbmRPZlRlc3QpO1xuXG4vKipcbiAqIFRyaW0gZXhjZXNzIHdoaXRlc3BhY2Ugb2ZmIHRoZSBiZWdpbm5pbmcgYW5kIGVuZCBvZiBhIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgVGhlIFN0cmluZyB0byB0cmltXG4gKlxuICogQHJldHVybnMge1N0cmluZ30gVGhlIFN0cmluZyBmcmVlZCBvZiBleGNlc3Mgd2hpdGVzcGFjZVxuICovXG5jb25zdCB0cmltID0gKHN0cikgPT4ge1xuICByZXR1cm4gc3RyLnRyaW0gPyBzdHIudHJpbSgpIDogc3RyLnJlcGxhY2UoL15bXFxzXFx1RkVGRlxceEEwXSt8W1xcc1xcdUZFRkZcXHhBMF0rJC9nLCAnJyk7XG59O1xuLyoqXG4gKiBJdGVyYXRlIG92ZXIgYW4gQXJyYXkgb3IgYW4gT2JqZWN0IGludm9raW5nIGEgZnVuY3Rpb24gZm9yIGVhY2ggaXRlbS5cbiAqXG4gKiBJZiBgb2JqYCBpcyBhbiBBcnJheSBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGluZGV4LCBhbmQgY29tcGxldGUgYXJyYXkgZm9yIGVhY2ggaXRlbS5cbiAqXG4gKiBJZiAnb2JqJyBpcyBhbiBPYmplY3QgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBrZXksIGFuZCBjb21wbGV0ZSBvYmplY3QgZm9yIGVhY2ggcHJvcGVydHkuXG4gKlxuICogQHBhcmFtIHtPYmplY3R8QXJyYXk8dW5rbm93bj59IG9iaiBUaGUgb2JqZWN0IHRvIGl0ZXJhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBjYWxsYmFjayB0byBpbnZva2UgZm9yIGVhY2ggaXRlbVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuYWxsT3duS2V5cyA9IGZhbHNlXVxuICogQHJldHVybnMge2FueX1cbiAqL1xuZnVuY3Rpb24gZm9yRWFjaChvYmosIGZuLCB7IGFsbE93bktleXMgPSBmYWxzZSB9ID0ge30pIHtcbiAgLy8gRG9uJ3QgYm90aGVyIGlmIG5vIHZhbHVlIHByb3ZpZGVkXG4gIGlmIChvYmogPT09IG51bGwgfHwgdHlwZW9mIG9iaiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBsZXQgaTtcbiAgbGV0IGw7XG5cbiAgLy8gRm9yY2UgYW4gYXJyYXkgaWYgbm90IGFscmVhZHkgc29tZXRoaW5nIGl0ZXJhYmxlXG4gIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIG9iaiA9IFtvYmpdO1xuICB9XG5cbiAgaWYgKGlzQXJyYXkob2JqKSkge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBhcnJheSB2YWx1ZXNcbiAgICBmb3IgKGkgPSAwLCBsID0gb2JqLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgZm4uY2FsbChudWxsLCBvYmpbaV0sIGksIG9iaik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIEJ1ZmZlciBjaGVja1xuICAgIGlmIChpc0J1ZmZlcihvYmopKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gSXRlcmF0ZSBvdmVyIG9iamVjdCBrZXlzXG4gICAgY29uc3Qga2V5cyA9IGFsbE93bktleXMgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmopIDogT2JqZWN0LmtleXMob2JqKTtcbiAgICBjb25zdCBsZW4gPSBrZXlzLmxlbmd0aDtcbiAgICBsZXQga2V5O1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBrZXkgPSBrZXlzW2ldO1xuICAgICAgZm4uY2FsbChudWxsLCBvYmpba2V5XSwga2V5LCBvYmopO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEZpbmRzIGEga2V5IGluIGFuIG9iamVjdCwgY2FzZS1pbnNlbnNpdGl2ZSwgcmV0dXJuaW5nIHRoZSBhY3R1YWwga2V5IG5hbWUuXG4gKiBSZXR1cm5zIG51bGwgaWYgdGhlIG9iamVjdCBpcyBhIEJ1ZmZlciBvciBpZiBubyBtYXRjaCBpcyBmb3VuZC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIC0gVGhlIG9iamVjdCB0byBzZWFyY2guXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IC0gVGhlIGtleSB0byBmaW5kIChjYXNlLWluc2Vuc2l0aXZlKS5cbiAqIEByZXR1cm5zIHs/c3RyaW5nfSBUaGUgYWN0dWFsIGtleSBuYW1lIGlmIGZvdW5kLCBvdGhlcndpc2UgbnVsbC5cbiAqL1xuZnVuY3Rpb24gZmluZEtleShvYmosIGtleSkge1xuICBpZiAoaXNCdWZmZXIob2JqKSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAga2V5ID0ga2V5LnRvTG93ZXJDYXNlKCk7XG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuICBsZXQgaSA9IGtleXMubGVuZ3RoO1xuICBsZXQgX2tleTtcbiAgd2hpbGUgKGktLSA+IDApIHtcbiAgICBfa2V5ID0ga2V5c1tpXTtcbiAgICBpZiAoa2V5ID09PSBfa2V5LnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgIHJldHVybiBfa2V5O1xuICAgIH1cbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuY29uc3QgX2dsb2JhbCA9ICgoKSA9PiB7XG4gIC8qZXNsaW50IG5vLXVuZGVmOjAqL1xuICBpZiAodHlwZW9mIGdsb2JhbFRoaXMgIT09ICd1bmRlZmluZWQnKSByZXR1cm4gZ2xvYmFsVGhpcztcbiAgcmV0dXJuIHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6IGdsb2JhbDtcbn0pKCk7XG5cbmNvbnN0IGlzQ29udGV4dERlZmluZWQgPSAoY29udGV4dCkgPT4gIWlzVW5kZWZpbmVkKGNvbnRleHQpICYmIGNvbnRleHQgIT09IF9nbG9iYWw7XG5cbi8qKlxuICogQWNjZXB0cyB2YXJhcmdzIGV4cGVjdGluZyBlYWNoIGFyZ3VtZW50IHRvIGJlIGFuIG9iamVjdCwgdGhlblxuICogaW1tdXRhYmx5IG1lcmdlcyB0aGUgcHJvcGVydGllcyBvZiBlYWNoIG9iamVjdCBhbmQgcmV0dXJucyByZXN1bHQuXG4gKlxuICogV2hlbiBtdWx0aXBsZSBvYmplY3RzIGNvbnRhaW4gdGhlIHNhbWUga2V5IHRoZSBsYXRlciBvYmplY3QgaW5cbiAqIHRoZSBhcmd1bWVudHMgbGlzdCB3aWxsIHRha2UgcHJlY2VkZW5jZS5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIGBgYGpzXG4gKiBjb25zdCByZXN1bHQgPSBtZXJnZSh7Zm9vOiAxMjN9LCB7Zm9vOiA0NTZ9KTtcbiAqIGNvbnNvbGUubG9nKHJlc3VsdC5mb28pOyAvLyBvdXRwdXRzIDQ1NlxuICogYGBgXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iajEgT2JqZWN0IHRvIG1lcmdlXG4gKlxuICogQHJldHVybnMge09iamVjdH0gUmVzdWx0IG9mIGFsbCBtZXJnZSBwcm9wZXJ0aWVzXG4gKi9cbmZ1bmN0aW9uIG1lcmdlKC8qIG9iajEsIG9iajIsIG9iajMsIC4uLiAqLykge1xuICBjb25zdCB7IGNhc2VsZXNzLCBza2lwVW5kZWZpbmVkIH0gPSAoaXNDb250ZXh0RGVmaW5lZCh0aGlzKSAmJiB0aGlzKSB8fCB7fTtcbiAgY29uc3QgcmVzdWx0ID0ge307XG4gIGNvbnN0IGFzc2lnblZhbHVlID0gKHZhbCwga2V5KSA9PiB7XG4gICAgLy8gU2tpcCBkYW5nZXJvdXMgcHJvcGVydHkgbmFtZXMgdG8gcHJldmVudCBwcm90b3R5cGUgcG9sbHV0aW9uXG4gICAgaWYgKGtleSA9PT0gJ19fcHJvdG9fXycgfHwga2V5ID09PSAnY29uc3RydWN0b3InIHx8IGtleSA9PT0gJ3Byb3RvdHlwZScpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB0YXJnZXRLZXkgPSAoY2FzZWxlc3MgJiYgZmluZEtleShyZXN1bHQsIGtleSkpIHx8IGtleTtcbiAgICBpZiAoaXNQbGFpbk9iamVjdChyZXN1bHRbdGFyZ2V0S2V5XSkgJiYgaXNQbGFpbk9iamVjdCh2YWwpKSB7XG4gICAgICByZXN1bHRbdGFyZ2V0S2V5XSA9IG1lcmdlKHJlc3VsdFt0YXJnZXRLZXldLCB2YWwpO1xuICAgIH0gZWxzZSBpZiAoaXNQbGFpbk9iamVjdCh2YWwpKSB7XG4gICAgICByZXN1bHRbdGFyZ2V0S2V5XSA9IG1lcmdlKHt9LCB2YWwpO1xuICAgIH0gZWxzZSBpZiAoaXNBcnJheSh2YWwpKSB7XG4gICAgICByZXN1bHRbdGFyZ2V0S2V5XSA9IHZhbC5zbGljZSgpO1xuICAgIH0gZWxzZSBpZiAoIXNraXBVbmRlZmluZWQgfHwgIWlzVW5kZWZpbmVkKHZhbCkpIHtcbiAgICAgIHJlc3VsdFt0YXJnZXRLZXldID0gdmFsO1xuICAgIH1cbiAgfTtcblxuICBmb3IgKGxldCBpID0gMCwgbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBhcmd1bWVudHNbaV0gJiYgZm9yRWFjaChhcmd1bWVudHNbaV0sIGFzc2lnblZhbHVlKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEV4dGVuZHMgb2JqZWN0IGEgYnkgbXV0YWJseSBhZGRpbmcgdG8gaXQgdGhlIHByb3BlcnRpZXMgb2Ygb2JqZWN0IGIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGEgVGhlIG9iamVjdCB0byBiZSBleHRlbmRlZFxuICogQHBhcmFtIHtPYmplY3R9IGIgVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgZnJvbVxuICogQHBhcmFtIHtPYmplY3R9IHRoaXNBcmcgVGhlIG9iamVjdCB0byBiaW5kIGZ1bmN0aW9uIHRvXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5hbGxPd25LZXlzXVxuICogQHJldHVybnMge09iamVjdH0gVGhlIHJlc3VsdGluZyB2YWx1ZSBvZiBvYmplY3QgYVxuICovXG5jb25zdCBleHRlbmQgPSAoYSwgYiwgdGhpc0FyZywgeyBhbGxPd25LZXlzIH0gPSB7fSkgPT4ge1xuICBmb3JFYWNoKFxuICAgIGIsXG4gICAgKHZhbCwga2V5KSA9PiB7XG4gICAgICBpZiAodGhpc0FyZyAmJiBpc0Z1bmN0aW9uKHZhbCkpIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGEsIGtleSwge1xuICAgICAgICAgIHZhbHVlOiBiaW5kKHZhbCwgdGhpc0FyZyksXG4gICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGEsIGtleSwge1xuICAgICAgICAgIHZhbHVlOiB2YWwsXG4gICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sXG4gICAgeyBhbGxPd25LZXlzIH1cbiAgKTtcbiAgcmV0dXJuIGE7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBieXRlIG9yZGVyIG1hcmtlci4gVGhpcyBjYXRjaGVzIEVGIEJCIEJGICh0aGUgVVRGLTggQk9NKVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb250ZW50IHdpdGggQk9NXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gY29udGVudCB2YWx1ZSB3aXRob3V0IEJPTVxuICovXG5jb25zdCBzdHJpcEJPTSA9IChjb250ZW50KSA9PiB7XG4gIGlmIChjb250ZW50LmNoYXJDb2RlQXQoMCkgPT09IDB4ZmVmZikge1xuICAgIGNvbnRlbnQgPSBjb250ZW50LnNsaWNlKDEpO1xuICB9XG4gIHJldHVybiBjb250ZW50O1xufTtcblxuLyoqXG4gKiBJbmhlcml0IHRoZSBwcm90b3R5cGUgbWV0aG9kcyBmcm9tIG9uZSBjb25zdHJ1Y3RvciBpbnRvIGFub3RoZXJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBzdXBlckNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge29iamVjdH0gW3Byb3BzXVxuICogQHBhcmFtIHtvYmplY3R9IFtkZXNjcmlwdG9yc11cbiAqXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuY29uc3QgaW5oZXJpdHMgPSAoY29uc3RydWN0b3IsIHN1cGVyQ29uc3RydWN0b3IsIHByb3BzLCBkZXNjcmlwdG9ycykgPT4ge1xuICBjb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ29uc3RydWN0b3IucHJvdG90eXBlLCBkZXNjcmlwdG9ycyk7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb25zdHJ1Y3Rvci5wcm90b3R5cGUsICdjb25zdHJ1Y3RvcicsIHtcbiAgICB2YWx1ZTogY29uc3RydWN0b3IsXG4gICAgd3JpdGFibGU6IHRydWUsXG4gICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICB9KTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvbnN0cnVjdG9yLCAnc3VwZXInLCB7XG4gICAgdmFsdWU6IHN1cGVyQ29uc3RydWN0b3IucHJvdG90eXBlLFxuICB9KTtcbiAgcHJvcHMgJiYgT2JqZWN0LmFzc2lnbihjb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3BzKTtcbn07XG5cbi8qKlxuICogUmVzb2x2ZSBvYmplY3Qgd2l0aCBkZWVwIHByb3RvdHlwZSBjaGFpbiB0byBhIGZsYXQgb2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlT2JqIHNvdXJjZSBvYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBbZGVzdE9ial1cbiAqIEBwYXJhbSB7RnVuY3Rpb258Qm9vbGVhbn0gW2ZpbHRlcl1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtwcm9wRmlsdGVyXVxuICpcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKi9cbmNvbnN0IHRvRmxhdE9iamVjdCA9IChzb3VyY2VPYmosIGRlc3RPYmosIGZpbHRlciwgcHJvcEZpbHRlcikgPT4ge1xuICBsZXQgcHJvcHM7XG4gIGxldCBpO1xuICBsZXQgcHJvcDtcbiAgY29uc3QgbWVyZ2VkID0ge307XG5cbiAgZGVzdE9iaiA9IGRlc3RPYmogfHwge307XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lcS1udWxsLGVxZXFlcVxuICBpZiAoc291cmNlT2JqID09IG51bGwpIHJldHVybiBkZXN0T2JqO1xuXG4gIGRvIHtcbiAgICBwcm9wcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHNvdXJjZU9iaik7XG4gICAgaSA9IHByb3BzLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tID4gMCkge1xuICAgICAgcHJvcCA9IHByb3BzW2ldO1xuICAgICAgaWYgKCghcHJvcEZpbHRlciB8fCBwcm9wRmlsdGVyKHByb3AsIHNvdXJjZU9iaiwgZGVzdE9iaikpICYmICFtZXJnZWRbcHJvcF0pIHtcbiAgICAgICAgZGVzdE9ialtwcm9wXSA9IHNvdXJjZU9ialtwcm9wXTtcbiAgICAgICAgbWVyZ2VkW3Byb3BdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgc291cmNlT2JqID0gZmlsdGVyICE9PSBmYWxzZSAmJiBnZXRQcm90b3R5cGVPZihzb3VyY2VPYmopO1xuICB9IHdoaWxlIChzb3VyY2VPYmogJiYgKCFmaWx0ZXIgfHwgZmlsdGVyKHNvdXJjZU9iaiwgZGVzdE9iaikpICYmIHNvdXJjZU9iaiAhPT0gT2JqZWN0LnByb3RvdHlwZSk7XG5cbiAgcmV0dXJuIGRlc3RPYmo7XG59O1xuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciBhIHN0cmluZyBlbmRzIHdpdGggdGhlIGNoYXJhY3RlcnMgb2YgYSBzcGVjaWZpZWQgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHBhcmFtIHtTdHJpbmd9IHNlYXJjaFN0cmluZ1xuICogQHBhcmFtIHtOdW1iZXJ9IFtwb3NpdGlvbj0gMF1cbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuY29uc3QgZW5kc1dpdGggPSAoc3RyLCBzZWFyY2hTdHJpbmcsIHBvc2l0aW9uKSA9PiB7XG4gIHN0ciA9IFN0cmluZyhzdHIpO1xuICBpZiAocG9zaXRpb24gPT09IHVuZGVmaW5lZCB8fCBwb3NpdGlvbiA+IHN0ci5sZW5ndGgpIHtcbiAgICBwb3NpdGlvbiA9IHN0ci5sZW5ndGg7XG4gIH1cbiAgcG9zaXRpb24gLT0gc2VhcmNoU3RyaW5nLmxlbmd0aDtcbiAgY29uc3QgbGFzdEluZGV4ID0gc3RyLmluZGV4T2Yoc2VhcmNoU3RyaW5nLCBwb3NpdGlvbik7XG4gIHJldHVybiBsYXN0SW5kZXggIT09IC0xICYmIGxhc3RJbmRleCA9PT0gcG9zaXRpb247XG59O1xuXG4vKipcbiAqIFJldHVybnMgbmV3IGFycmF5IGZyb20gYXJyYXkgbGlrZSBvYmplY3Qgb3IgbnVsbCBpZiBmYWlsZWRcbiAqXG4gKiBAcGFyYW0geyp9IFt0aGluZ11cbiAqXG4gKiBAcmV0dXJucyB7P0FycmF5fVxuICovXG5jb25zdCB0b0FycmF5ID0gKHRoaW5nKSA9PiB7XG4gIGlmICghdGhpbmcpIHJldHVybiBudWxsO1xuICBpZiAoaXNBcnJheSh0aGluZykpIHJldHVybiB0aGluZztcbiAgbGV0IGkgPSB0aGluZy5sZW5ndGg7XG4gIGlmICghaXNOdW1iZXIoaSkpIHJldHVybiBudWxsO1xuICBjb25zdCBhcnIgPSBuZXcgQXJyYXkoaSk7XG4gIHdoaWxlIChpLS0gPiAwKSB7XG4gICAgYXJyW2ldID0gdGhpbmdbaV07XG4gIH1cbiAgcmV0dXJuIGFycjtcbn07XG5cbi8qKlxuICogQ2hlY2tpbmcgaWYgdGhlIFVpbnQ4QXJyYXkgZXhpc3RzIGFuZCBpZiBpdCBkb2VzLCBpdCByZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCBjaGVja3MgaWYgdGhlXG4gKiB0aGluZyBwYXNzZWQgaW4gaXMgYW4gaW5zdGFuY2Ugb2YgVWludDhBcnJheVxuICpcbiAqIEBwYXJhbSB7VHlwZWRBcnJheX1cbiAqXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKi9cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5jb25zdCBpc1R5cGVkQXJyYXkgPSAoKFR5cGVkQXJyYXkpID0+IHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgcmV0dXJuICh0aGluZykgPT4ge1xuICAgIHJldHVybiBUeXBlZEFycmF5ICYmIHRoaW5nIGluc3RhbmNlb2YgVHlwZWRBcnJheTtcbiAgfTtcbn0pKHR5cGVvZiBVaW50OEFycmF5ICE9PSAndW5kZWZpbmVkJyAmJiBnZXRQcm90b3R5cGVPZihVaW50OEFycmF5KSk7XG5cbi8qKlxuICogRm9yIGVhY2ggZW50cnkgaW4gdGhlIG9iamVjdCwgY2FsbCB0aGUgZnVuY3Rpb24gd2l0aCB0aGUga2V5IGFuZCB2YWx1ZS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdDxhbnksIGFueT59IG9iaiAtIFRoZSBvYmplY3QgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gLSBUaGUgZnVuY3Rpb24gdG8gY2FsbCBmb3IgZWFjaCBlbnRyeS5cbiAqXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuY29uc3QgZm9yRWFjaEVudHJ5ID0gKG9iaiwgZm4pID0+IHtcbiAgY29uc3QgZ2VuZXJhdG9yID0gb2JqICYmIG9ialtpdGVyYXRvcl07XG5cbiAgY29uc3QgX2l0ZXJhdG9yID0gZ2VuZXJhdG9yLmNhbGwob2JqKTtcblxuICBsZXQgcmVzdWx0O1xuXG4gIHdoaWxlICgocmVzdWx0ID0gX2l0ZXJhdG9yLm5leHQoKSkgJiYgIXJlc3VsdC5kb25lKSB7XG4gICAgY29uc3QgcGFpciA9IHJlc3VsdC52YWx1ZTtcbiAgICBmbi5jYWxsKG9iaiwgcGFpclswXSwgcGFpclsxXSk7XG4gIH1cbn07XG5cbi8qKlxuICogSXQgdGFrZXMgYSByZWd1bGFyIGV4cHJlc3Npb24gYW5kIGEgc3RyaW5nLCBhbmQgcmV0dXJucyBhbiBhcnJheSBvZiBhbGwgdGhlIG1hdGNoZXNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVnRXhwIC0gVGhlIHJlZ3VsYXIgZXhwcmVzc2lvbiB0byBtYXRjaCBhZ2FpbnN0LlxuICogQHBhcmFtIHtzdHJpbmd9IHN0ciAtIFRoZSBzdHJpbmcgdG8gc2VhcmNoLlxuICpcbiAqIEByZXR1cm5zIHtBcnJheTxib29sZWFuPn1cbiAqL1xuY29uc3QgbWF0Y2hBbGwgPSAocmVnRXhwLCBzdHIpID0+IHtcbiAgbGV0IG1hdGNoZXM7XG4gIGNvbnN0IGFyciA9IFtdO1xuXG4gIHdoaWxlICgobWF0Y2hlcyA9IHJlZ0V4cC5leGVjKHN0cikpICE9PSBudWxsKSB7XG4gICAgYXJyLnB1c2gobWF0Y2hlcyk7XG4gIH1cblxuICByZXR1cm4gYXJyO1xufTtcblxuLyogQ2hlY2tpbmcgaWYgdGhlIGtpbmRPZlRlc3QgZnVuY3Rpb24gcmV0dXJucyB0cnVlIHdoZW4gcGFzc2VkIGFuIEhUTUxGb3JtRWxlbWVudC4gKi9cbmNvbnN0IGlzSFRNTEZvcm0gPSBraW5kT2ZUZXN0KCdIVE1MRm9ybUVsZW1lbnQnKTtcblxuY29uc3QgdG9DYW1lbENhc2UgPSAoc3RyKSA9PiB7XG4gIHJldHVybiBzdHIudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9bLV9cXHNdKFthLXpcXGRdKShcXHcqKS9nLCBmdW5jdGlvbiByZXBsYWNlcihtLCBwMSwgcDIpIHtcbiAgICByZXR1cm4gcDEudG9VcHBlckNhc2UoKSArIHAyO1xuICB9KTtcbn07XG5cbi8qIENyZWF0aW5nIGEgZnVuY3Rpb24gdGhhdCB3aWxsIGNoZWNrIGlmIGFuIG9iamVjdCBoYXMgYSBwcm9wZXJ0eS4gKi9cbmNvbnN0IGhhc093blByb3BlcnR5ID0gKFxuICAoeyBoYXNPd25Qcm9wZXJ0eSB9KSA9PlxuICAob2JqLCBwcm9wKSA9PlxuICAgIGhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKVxuKShPYmplY3QucHJvdG90eXBlKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFJlZ0V4cCBvYmplY3RcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgUmVnRXhwIG9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzUmVnRXhwID0ga2luZE9mVGVzdCgnUmVnRXhwJyk7XG5cbmNvbnN0IHJlZHVjZURlc2NyaXB0b3JzID0gKG9iaiwgcmVkdWNlcikgPT4ge1xuICBjb25zdCBkZXNjcmlwdG9ycyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKG9iaik7XG4gIGNvbnN0IHJlZHVjZWREZXNjcmlwdG9ycyA9IHt9O1xuXG4gIGZvckVhY2goZGVzY3JpcHRvcnMsIChkZXNjcmlwdG9yLCBuYW1lKSA9PiB7XG4gICAgbGV0IHJldDtcbiAgICBpZiAoKHJldCA9IHJlZHVjZXIoZGVzY3JpcHRvciwgbmFtZSwgb2JqKSkgIT09IGZhbHNlKSB7XG4gICAgICByZWR1Y2VkRGVzY3JpcHRvcnNbbmFtZV0gPSByZXQgfHwgZGVzY3JpcHRvcjtcbiAgICB9XG4gIH0pO1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKG9iaiwgcmVkdWNlZERlc2NyaXB0b3JzKTtcbn07XG5cbi8qKlxuICogTWFrZXMgYWxsIG1ldGhvZHMgcmVhZC1vbmx5XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKi9cblxuY29uc3QgZnJlZXplTWV0aG9kcyA9IChvYmopID0+IHtcbiAgcmVkdWNlRGVzY3JpcHRvcnMob2JqLCAoZGVzY3JpcHRvciwgbmFtZSkgPT4ge1xuICAgIC8vIHNraXAgcmVzdHJpY3RlZCBwcm9wcyBpbiBzdHJpY3QgbW9kZVxuICAgIGlmIChpc0Z1bmN0aW9uKG9iaikgJiYgWydhcmd1bWVudHMnLCAnY2FsbGVyJywgJ2NhbGxlZSddLmluZGV4T2YobmFtZSkgIT09IC0xKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgdmFsdWUgPSBvYmpbbmFtZV07XG5cbiAgICBpZiAoIWlzRnVuY3Rpb24odmFsdWUpKSByZXR1cm47XG5cbiAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBmYWxzZTtcblxuICAgIGlmICgnd3JpdGFibGUnIGluIGRlc2NyaXB0b3IpIHtcbiAgICAgIGRlc2NyaXB0b3Iud3JpdGFibGUgPSBmYWxzZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIWRlc2NyaXB0b3Iuc2V0KSB7XG4gICAgICBkZXNjcmlwdG9yLnNldCA9ICgpID0+IHtcbiAgICAgICAgdGhyb3cgRXJyb3IoXCJDYW4gbm90IHJld3JpdGUgcmVhZC1vbmx5IG1ldGhvZCAnXCIgKyBuYW1lICsgXCInXCIpO1xuICAgICAgfTtcbiAgICB9XG4gIH0pO1xufTtcblxuLyoqXG4gKiBDb252ZXJ0cyBhbiBhcnJheSBvciBhIGRlbGltaXRlZCBzdHJpbmcgaW50byBhbiBvYmplY3Qgc2V0IHdpdGggdmFsdWVzIGFzIGtleXMgYW5kIHRydWUgYXMgdmFsdWVzLlxuICogVXNlZnVsIGZvciBmYXN0IG1lbWJlcnNoaXAgY2hlY2tzLlxuICpcbiAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSBhcnJheU9yU3RyaW5nIC0gVGhlIGFycmF5IG9yIHN0cmluZyB0byBjb252ZXJ0LlxuICogQHBhcmFtIHtzdHJpbmd9IGRlbGltaXRlciAtIFRoZSBkZWxpbWl0ZXIgdG8gdXNlIGlmIGlucHV0IGlzIGEgc3RyaW5nLlxuICogQHJldHVybnMge09iamVjdH0gQW4gb2JqZWN0IHdpdGgga2V5cyBmcm9tIHRoZSBhcnJheSBvciBzdHJpbmcsIHZhbHVlcyBzZXQgdG8gdHJ1ZS5cbiAqL1xuY29uc3QgdG9PYmplY3RTZXQgPSAoYXJyYXlPclN0cmluZywgZGVsaW1pdGVyKSA9PiB7XG4gIGNvbnN0IG9iaiA9IHt9O1xuXG4gIGNvbnN0IGRlZmluZSA9IChhcnIpID0+IHtcbiAgICBhcnIuZm9yRWFjaCgodmFsdWUpID0+IHtcbiAgICAgIG9ialt2YWx1ZV0gPSB0cnVlO1xuICAgIH0pO1xuICB9O1xuXG4gIGlzQXJyYXkoYXJyYXlPclN0cmluZykgPyBkZWZpbmUoYXJyYXlPclN0cmluZykgOiBkZWZpbmUoU3RyaW5nKGFycmF5T3JTdHJpbmcpLnNwbGl0KGRlbGltaXRlcikpO1xuXG4gIHJldHVybiBvYmo7XG59O1xuXG5jb25zdCBub29wID0gKCkgPT4ge307XG5cbmNvbnN0IHRvRmluaXRlTnVtYmVyID0gKHZhbHVlLCBkZWZhdWx0VmFsdWUpID0+IHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgTnVtYmVyLmlzRmluaXRlKCh2YWx1ZSA9ICt2YWx1ZSkpID8gdmFsdWUgOiBkZWZhdWx0VmFsdWU7XG59O1xuXG4vKipcbiAqIElmIHRoZSB0aGluZyBpcyBhIEZvcm1EYXRhIG9iamVjdCwgcmV0dXJuIHRydWUsIG90aGVyd2lzZSByZXR1cm4gZmFsc2UuXG4gKlxuICogQHBhcmFtIHt1bmtub3dufSB0aGluZyAtIFRoZSB0aGluZyB0byBjaGVjay5cbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaXNTcGVjQ29tcGxpYW50Rm9ybSh0aGluZykge1xuICByZXR1cm4gISEoXG4gICAgdGhpbmcgJiZcbiAgICBpc0Z1bmN0aW9uKHRoaW5nLmFwcGVuZCkgJiZcbiAgICB0aGluZ1t0b1N0cmluZ1RhZ10gPT09ICdGb3JtRGF0YScgJiZcbiAgICB0aGluZ1tpdGVyYXRvcl1cbiAgKTtcbn1cblxuLyoqXG4gKiBSZWN1cnNpdmVseSBjb252ZXJ0cyBhbiBvYmplY3QgdG8gYSBKU09OLWNvbXBhdGlibGUgb2JqZWN0LCBoYW5kbGluZyBjaXJjdWxhciByZWZlcmVuY2VzIGFuZCBCdWZmZXJzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogLSBUaGUgb2JqZWN0IHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgSlNPTi1jb21wYXRpYmxlIG9iamVjdC5cbiAqL1xuY29uc3QgdG9KU09OT2JqZWN0ID0gKG9iaikgPT4ge1xuICBjb25zdCBzdGFjayA9IG5ldyBBcnJheSgxMCk7XG5cbiAgY29uc3QgdmlzaXQgPSAoc291cmNlLCBpKSA9PiB7XG4gICAgaWYgKGlzT2JqZWN0KHNvdXJjZSkpIHtcbiAgICAgIGlmIChzdGFjay5pbmRleE9mKHNvdXJjZSkgPj0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vQnVmZmVyIGNoZWNrXG4gICAgICBpZiAoaXNCdWZmZXIoc291cmNlKSkge1xuICAgICAgICByZXR1cm4gc291cmNlO1xuICAgICAgfVxuXG4gICAgICBpZiAoISgndG9KU09OJyBpbiBzb3VyY2UpKSB7XG4gICAgICAgIHN0YWNrW2ldID0gc291cmNlO1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBpc0FycmF5KHNvdXJjZSkgPyBbXSA6IHt9O1xuXG4gICAgICAgIGZvckVhY2goc291cmNlLCAodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICAgIGNvbnN0IHJlZHVjZWRWYWx1ZSA9IHZpc2l0KHZhbHVlLCBpICsgMSk7XG4gICAgICAgICAgIWlzVW5kZWZpbmVkKHJlZHVjZWRWYWx1ZSkgJiYgKHRhcmdldFtrZXldID0gcmVkdWNlZFZhbHVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc3RhY2tbaV0gPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc291cmNlO1xuICB9O1xuXG4gIHJldHVybiB2aXNpdChvYmosIDApO1xufTtcblxuLyoqXG4gKiBEZXRlcm1pbmVzIGlmIGEgdmFsdWUgaXMgYW4gYXN5bmMgZnVuY3Rpb24uXG4gKlxuICogQHBhcmFtIHsqfSB0aGluZyAtIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gYXN5bmMgZnVuY3Rpb24sIG90aGVyd2lzZSBmYWxzZS5cbiAqL1xuY29uc3QgaXNBc3luY0ZuID0ga2luZE9mVGVzdCgnQXN5bmNGdW5jdGlvbicpO1xuXG4vKipcbiAqIERldGVybWluZXMgaWYgYSB2YWx1ZSBpcyB0aGVuYWJsZSAoaGFzIHRoZW4gYW5kIGNhdGNoIG1ldGhvZHMpLlxuICpcbiAqIEBwYXJhbSB7Kn0gdGhpbmcgLSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIHRoZW5hYmxlLCBvdGhlcndpc2UgZmFsc2UuXG4gKi9cbmNvbnN0IGlzVGhlbmFibGUgPSAodGhpbmcpID0+XG4gIHRoaW5nICYmXG4gIChpc09iamVjdCh0aGluZykgfHwgaXNGdW5jdGlvbih0aGluZykpICYmXG4gIGlzRnVuY3Rpb24odGhpbmcudGhlbikgJiZcbiAgaXNGdW5jdGlvbih0aGluZy5jYXRjaCk7XG5cbi8vIG9yaWdpbmFsIGNvZGVcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9EaWdpdGFsQnJhaW5KUy9BeGlvc1Byb21pc2UvYmxvYi8xNmRlYWIxMzcxMGVjMDk3Nzk5MjIxMzFmM2ZhNTk1NDMyMGY4M2FiL2xpYi91dGlscy5qcyNMMTEtTDM0XG5cbi8qKlxuICogUHJvdmlkZXMgYSBjcm9zcy1wbGF0Zm9ybSBzZXRJbW1lZGlhdGUgaW1wbGVtZW50YXRpb24uXG4gKiBVc2VzIG5hdGl2ZSBzZXRJbW1lZGlhdGUgaWYgYXZhaWxhYmxlLCBvdGhlcndpc2UgZmFsbHMgYmFjayB0byBwb3N0TWVzc2FnZSBvciBzZXRUaW1lb3V0LlxuICpcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gc2V0SW1tZWRpYXRlU3VwcG9ydGVkIC0gV2hldGhlciBzZXRJbW1lZGlhdGUgaXMgc3VwcG9ydGVkLlxuICogQHBhcmFtIHtib29sZWFufSBwb3N0TWVzc2FnZVN1cHBvcnRlZCAtIFdoZXRoZXIgcG9zdE1lc3NhZ2UgaXMgc3VwcG9ydGVkLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBBIGZ1bmN0aW9uIHRvIHNjaGVkdWxlIGEgY2FsbGJhY2sgYXN5bmNocm9ub3VzbHkuXG4gKi9cbmNvbnN0IF9zZXRJbW1lZGlhdGUgPSAoKHNldEltbWVkaWF0ZVN1cHBvcnRlZCwgcG9zdE1lc3NhZ2VTdXBwb3J0ZWQpID0+IHtcbiAgaWYgKHNldEltbWVkaWF0ZVN1cHBvcnRlZCkge1xuICAgIHJldHVybiBzZXRJbW1lZGlhdGU7XG4gIH1cblxuICByZXR1cm4gcG9zdE1lc3NhZ2VTdXBwb3J0ZWRcbiAgICA/ICgodG9rZW4sIGNhbGxiYWNrcykgPT4ge1xuICAgICAgICBfZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgJ21lc3NhZ2UnLFxuICAgICAgICAgICh7IHNvdXJjZSwgZGF0YSB9KSA9PiB7XG4gICAgICAgICAgICBpZiAoc291cmNlID09PSBfZ2xvYmFsICYmIGRhdGEgPT09IHRva2VuKSB7XG4gICAgICAgICAgICAgIGNhbGxiYWNrcy5sZW5ndGggJiYgY2FsbGJhY2tzLnNoaWZ0KCkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhbHNlXG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIChjYikgPT4ge1xuICAgICAgICAgIGNhbGxiYWNrcy5wdXNoKGNiKTtcbiAgICAgICAgICBfZ2xvYmFsLnBvc3RNZXNzYWdlKHRva2VuLCAnKicpO1xuICAgICAgICB9O1xuICAgICAgfSkoYGF4aW9zQCR7TWF0aC5yYW5kb20oKX1gLCBbXSlcbiAgICA6IChjYikgPT4gc2V0VGltZW91dChjYik7XG59KSh0eXBlb2Ygc2V0SW1tZWRpYXRlID09PSAnZnVuY3Rpb24nLCBpc0Z1bmN0aW9uKF9nbG9iYWwucG9zdE1lc3NhZ2UpKTtcblxuLyoqXG4gKiBTY2hlZHVsZXMgYSBtaWNyb3Rhc2sgb3IgYXN5bmNocm9ub3VzIGNhbGxiYWNrIGFzIHNvb24gYXMgcG9zc2libGUuXG4gKiBVc2VzIHF1ZXVlTWljcm90YXNrIGlmIGF2YWlsYWJsZSwgb3RoZXJ3aXNlIGZhbGxzIGJhY2sgdG8gcHJvY2Vzcy5uZXh0VGljayBvciBfc2V0SW1tZWRpYXRlLlxuICpcbiAqIEB0eXBlIHtGdW5jdGlvbn1cbiAqL1xuY29uc3QgYXNhcCA9XG4gIHR5cGVvZiBxdWV1ZU1pY3JvdGFzayAhPT0gJ3VuZGVmaW5lZCdcbiAgICA/IHF1ZXVlTWljcm90YXNrLmJpbmQoX2dsb2JhbClcbiAgICA6ICh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgcHJvY2Vzcy5uZXh0VGljaykgfHwgX3NldEltbWVkaWF0ZTtcblxuLy8gKioqKioqKioqKioqKioqKioqKioqXG5cbmNvbnN0IGlzSXRlcmFibGUgPSAodGhpbmcpID0+IHRoaW5nICE9IG51bGwgJiYgaXNGdW5jdGlvbih0aGluZ1tpdGVyYXRvcl0pO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGlzQXJyYXksXG4gIGlzQXJyYXlCdWZmZXIsXG4gIGlzQnVmZmVyLFxuICBpc0Zvcm1EYXRhLFxuICBpc0FycmF5QnVmZmVyVmlldyxcbiAgaXNTdHJpbmcsXG4gIGlzTnVtYmVyLFxuICBpc0Jvb2xlYW4sXG4gIGlzT2JqZWN0LFxuICBpc1BsYWluT2JqZWN0LFxuICBpc0VtcHR5T2JqZWN0LFxuICBpc1JlYWRhYmxlU3RyZWFtLFxuICBpc1JlcXVlc3QsXG4gIGlzUmVzcG9uc2UsXG4gIGlzSGVhZGVycyxcbiAgaXNVbmRlZmluZWQsXG4gIGlzRGF0ZSxcbiAgaXNGaWxlLFxuICBpc1JlYWN0TmF0aXZlQmxvYixcbiAgaXNSZWFjdE5hdGl2ZSxcbiAgaXNCbG9iLFxuICBpc1JlZ0V4cCxcbiAgaXNGdW5jdGlvbixcbiAgaXNTdHJlYW0sXG4gIGlzVVJMU2VhcmNoUGFyYW1zLFxuICBpc1R5cGVkQXJyYXksXG4gIGlzRmlsZUxpc3QsXG4gIGZvckVhY2gsXG4gIG1lcmdlLFxuICBleHRlbmQsXG4gIHRyaW0sXG4gIHN0cmlwQk9NLFxuICBpbmhlcml0cyxcbiAgdG9GbGF0T2JqZWN0LFxuICBraW5kT2YsXG4gIGtpbmRPZlRlc3QsXG4gIGVuZHNXaXRoLFxuICB0b0FycmF5LFxuICBmb3JFYWNoRW50cnksXG4gIG1hdGNoQWxsLFxuICBpc0hUTUxGb3JtLFxuICBoYXNPd25Qcm9wZXJ0eSxcbiAgaGFzT3duUHJvcDogaGFzT3duUHJvcGVydHksIC8vIGFuIGFsaWFzIHRvIGF2b2lkIEVTTGludCBuby1wcm90b3R5cGUtYnVpbHRpbnMgZGV0ZWN0aW9uXG4gIHJlZHVjZURlc2NyaXB0b3JzLFxuICBmcmVlemVNZXRob2RzLFxuICB0b09iamVjdFNldCxcbiAgdG9DYW1lbENhc2UsXG4gIG5vb3AsXG4gIHRvRmluaXRlTnVtYmVyLFxuICBmaW5kS2V5LFxuICBnbG9iYWw6IF9nbG9iYWwsXG4gIGlzQ29udGV4dERlZmluZWQsXG4gIGlzU3BlY0NvbXBsaWFudEZvcm0sXG4gIHRvSlNPTk9iamVjdCxcbiAgaXNBc3luY0ZuLFxuICBpc1RoZW5hYmxlLFxuICBzZXRJbW1lZGlhdGU6IF9zZXRJbW1lZGlhdGUsXG4gIGFzYXAsXG4gIGlzSXRlcmFibGUsXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuXG5jbGFzcyBBeGlvc0Vycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBzdGF0aWMgZnJvbShlcnJvciwgY29kZSwgY29uZmlnLCByZXF1ZXN0LCByZXNwb25zZSwgY3VzdG9tUHJvcHMpIHtcbiAgICBjb25zdCBheGlvc0Vycm9yID0gbmV3IEF4aW9zRXJyb3IoZXJyb3IubWVzc2FnZSwgY29kZSB8fCBlcnJvci5jb2RlLCBjb25maWcsIHJlcXVlc3QsIHJlc3BvbnNlKTtcbiAgICBheGlvc0Vycm9yLmNhdXNlID0gZXJyb3I7XG4gICAgYXhpb3NFcnJvci5uYW1lID0gZXJyb3IubmFtZTtcblxuICAgIC8vIFByZXNlcnZlIHN0YXR1cyBmcm9tIHRoZSBvcmlnaW5hbCBlcnJvciBpZiBub3QgYWxyZWFkeSBzZXQgZnJvbSByZXNwb25zZVxuICAgIGlmIChlcnJvci5zdGF0dXMgIT0gbnVsbCAmJiBheGlvc0Vycm9yLnN0YXR1cyA9PSBudWxsKSB7XG4gICAgICBheGlvc0Vycm9yLnN0YXR1cyA9IGVycm9yLnN0YXR1cztcbiAgICB9XG5cbiAgICBjdXN0b21Qcm9wcyAmJiBPYmplY3QuYXNzaWduKGF4aW9zRXJyb3IsIGN1c3RvbVByb3BzKTtcbiAgICByZXR1cm4gYXhpb3NFcnJvcjtcbiAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGFuIEVycm9yIHdpdGggdGhlIHNwZWNpZmllZCBtZXNzYWdlLCBjb25maWcsIGVycm9yIGNvZGUsIHJlcXVlc3QgYW5kIHJlc3BvbnNlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgVGhlIGVycm9yIG1lc3NhZ2UuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtjb2RlXSBUaGUgZXJyb3IgY29kZSAoZm9yIGV4YW1wbGUsICdFQ09OTkFCT1JURUQnKS5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW2NvbmZpZ10gVGhlIGNvbmZpZy5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW3JlcXVlc3RdIFRoZSByZXF1ZXN0LlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzcG9uc2VdIFRoZSByZXNwb25zZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtFcnJvcn0gVGhlIGNyZWF0ZWQgZXJyb3IuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IobWVzc2FnZSwgY29kZSwgY29uZmlnLCByZXF1ZXN0LCByZXNwb25zZSkge1xuICAgICAgc3VwZXIobWVzc2FnZSk7XG4gICAgICBcbiAgICAgIC8vIE1ha2UgbWVzc2FnZSBlbnVtZXJhYmxlIHRvIG1haW50YWluIGJhY2t3YXJkIGNvbXBhdGliaWxpdHlcbiAgICAgIC8vIFRoZSBuYXRpdmUgRXJyb3IgY29uc3RydWN0b3Igc2V0cyBtZXNzYWdlIGFzIG5vbi1lbnVtZXJhYmxlLFxuICAgICAgLy8gYnV0IGF4aW9zIDwgdjEuMTMuMyBoYWQgaXQgYXMgZW51bWVyYWJsZVxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdtZXNzYWdlJywge1xuICAgICAgICAgIHZhbHVlOiBtZXNzYWdlLFxuICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICB9KTtcbiAgICAgIFxuICAgICAgdGhpcy5uYW1lID0gJ0F4aW9zRXJyb3InO1xuICAgICAgdGhpcy5pc0F4aW9zRXJyb3IgPSB0cnVlO1xuICAgICAgY29kZSAmJiAodGhpcy5jb2RlID0gY29kZSk7XG4gICAgICBjb25maWcgJiYgKHRoaXMuY29uZmlnID0gY29uZmlnKTtcbiAgICAgIHJlcXVlc3QgJiYgKHRoaXMucmVxdWVzdCA9IHJlcXVlc3QpO1xuICAgICAgaWYgKHJlc3BvbnNlKSB7XG4gICAgICAgICAgdGhpcy5yZXNwb25zZSA9IHJlc3BvbnNlO1xuICAgICAgICAgIHRoaXMuc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzO1xuICAgICAgfVxuICAgIH1cblxuICB0b0pTT04oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC8vIFN0YW5kYXJkXG4gICAgICBtZXNzYWdlOiB0aGlzLm1lc3NhZ2UsXG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICAvLyBNaWNyb3NvZnRcbiAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLmRlc2NyaXB0aW9uLFxuICAgICAgbnVtYmVyOiB0aGlzLm51bWJlcixcbiAgICAgIC8vIE1vemlsbGFcbiAgICAgIGZpbGVOYW1lOiB0aGlzLmZpbGVOYW1lLFxuICAgICAgbGluZU51bWJlcjogdGhpcy5saW5lTnVtYmVyLFxuICAgICAgY29sdW1uTnVtYmVyOiB0aGlzLmNvbHVtbk51bWJlcixcbiAgICAgIHN0YWNrOiB0aGlzLnN0YWNrLFxuICAgICAgLy8gQXhpb3NcbiAgICAgIGNvbmZpZzogdXRpbHMudG9KU09OT2JqZWN0KHRoaXMuY29uZmlnKSxcbiAgICAgIGNvZGU6IHRoaXMuY29kZSxcbiAgICAgIHN0YXR1czogdGhpcy5zdGF0dXMsXG4gICAgfTtcbiAgfVxufVxuXG4vLyBUaGlzIGNhbiBiZSBjaGFuZ2VkIHRvIHN0YXRpYyBwcm9wZXJ0aWVzIGFzIHNvb24gYXMgdGhlIHBhcnNlciBvcHRpb25zIGluIC5lc2xpbnQuY2pzIGFyZSB1cGRhdGVkLlxuQXhpb3NFcnJvci5FUlJfQkFEX09QVElPTl9WQUxVRSA9ICdFUlJfQkFEX09QVElPTl9WQUxVRSc7XG5BeGlvc0Vycm9yLkVSUl9CQURfT1BUSU9OID0gJ0VSUl9CQURfT1BUSU9OJztcbkF4aW9zRXJyb3IuRUNPTk5BQk9SVEVEID0gJ0VDT05OQUJPUlRFRCc7XG5BeGlvc0Vycm9yLkVUSU1FRE9VVCA9ICdFVElNRURPVVQnO1xuQXhpb3NFcnJvci5FUlJfTkVUV09SSyA9ICdFUlJfTkVUV09SSyc7XG5BeGlvc0Vycm9yLkVSUl9GUl9UT09fTUFOWV9SRURJUkVDVFMgPSAnRVJSX0ZSX1RPT19NQU5ZX1JFRElSRUNUUyc7XG5BeGlvc0Vycm9yLkVSUl9ERVBSRUNBVEVEID0gJ0VSUl9ERVBSRUNBVEVEJztcbkF4aW9zRXJyb3IuRVJSX0JBRF9SRVNQT05TRSA9ICdFUlJfQkFEX1JFU1BPTlNFJztcbkF4aW9zRXJyb3IuRVJSX0JBRF9SRVFVRVNUID0gJ0VSUl9CQURfUkVRVUVTVCc7XG5BeGlvc0Vycm9yLkVSUl9DQU5DRUxFRCA9ICdFUlJfQ0FOQ0VMRUQnO1xuQXhpb3NFcnJvci5FUlJfTk9UX1NVUFBPUlQgPSAnRVJSX05PVF9TVVBQT1JUJztcbkF4aW9zRXJyb3IuRVJSX0lOVkFMSURfVVJMID0gJ0VSUl9JTlZBTElEX1VSTCc7XG5cbmV4cG9ydCBkZWZhdWx0IEF4aW9zRXJyb3I7XG4iLCIvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgc3RyaWN0XG5leHBvcnQgZGVmYXVsdCBudWxsO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSAnLi4vY29yZS9BeGlvc0Vycm9yLmpzJztcbi8vIHRlbXBvcmFyeSBob3RmaXggdG8gYXZvaWQgY2lyY3VsYXIgcmVmZXJlbmNlcyB1bnRpbCBBeGlvc1VSTFNlYXJjaFBhcmFtcyBpcyByZWZhY3RvcmVkXG5pbXBvcnQgUGxhdGZvcm1Gb3JtRGF0YSBmcm9tICcuLi9wbGF0Zm9ybS9ub2RlL2NsYXNzZXMvRm9ybURhdGEuanMnO1xuXG4vKipcbiAqIERldGVybWluZXMgaWYgdGhlIGdpdmVuIHRoaW5nIGlzIGEgYXJyYXkgb3IganMgb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0aGluZyAtIFRoZSBvYmplY3Qgb3IgYXJyYXkgdG8gYmUgdmlzaXRlZC5cbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaXNWaXNpdGFibGUodGhpbmcpIHtcbiAgcmV0dXJuIHV0aWxzLmlzUGxhaW5PYmplY3QodGhpbmcpIHx8IHV0aWxzLmlzQXJyYXkodGhpbmcpO1xufVxuXG4vKipcbiAqIEl0IHJlbW92ZXMgdGhlIGJyYWNrZXRzIGZyb20gdGhlIGVuZCBvZiBhIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgLSBUaGUga2V5IG9mIHRoZSBwYXJhbWV0ZXIuXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gdGhlIGtleSB3aXRob3V0IHRoZSBicmFja2V0cy5cbiAqL1xuZnVuY3Rpb24gcmVtb3ZlQnJhY2tldHMoa2V5KSB7XG4gIHJldHVybiB1dGlscy5lbmRzV2l0aChrZXksICdbXScpID8ga2V5LnNsaWNlKDAsIC0yKSA6IGtleTtcbn1cblxuLyoqXG4gKiBJdCB0YWtlcyBhIHBhdGgsIGEga2V5LCBhbmQgYSBib29sZWFuLCBhbmQgcmV0dXJucyBhIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIC0gVGhlIHBhdGggdG8gdGhlIGN1cnJlbnQga2V5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSAtIFRoZSBrZXkgb2YgdGhlIGN1cnJlbnQgb2JqZWN0IGJlaW5nIGl0ZXJhdGVkIG92ZXIuXG4gKiBAcGFyYW0ge3N0cmluZ30gZG90cyAtIElmIHRydWUsIHRoZSBrZXkgd2lsbCBiZSByZW5kZXJlZCB3aXRoIGRvdHMgaW5zdGVhZCBvZiBicmFja2V0cy5cbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgcGF0aCB0byB0aGUgY3VycmVudCBrZXkuXG4gKi9cbmZ1bmN0aW9uIHJlbmRlcktleShwYXRoLCBrZXksIGRvdHMpIHtcbiAgaWYgKCFwYXRoKSByZXR1cm4ga2V5O1xuICByZXR1cm4gcGF0aFxuICAgIC5jb25jYXQoa2V5KVxuICAgIC5tYXAoZnVuY3Rpb24gZWFjaCh0b2tlbiwgaSkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICB0b2tlbiA9IHJlbW92ZUJyYWNrZXRzKHRva2VuKTtcbiAgICAgIHJldHVybiAhZG90cyAmJiBpID8gJ1snICsgdG9rZW4gKyAnXScgOiB0b2tlbjtcbiAgICB9KVxuICAgIC5qb2luKGRvdHMgPyAnLicgOiAnJyk7XG59XG5cbi8qKlxuICogSWYgdGhlIGFycmF5IGlzIGFuIGFycmF5IGFuZCBub25lIG9mIGl0cyBlbGVtZW50cyBhcmUgdmlzaXRhYmxlLCB0aGVuIGl0J3MgYSBmbGF0IGFycmF5LlxuICpcbiAqIEBwYXJhbSB7QXJyYXk8YW55Pn0gYXJyIC0gVGhlIGFycmF5IHRvIGNoZWNrXG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGlzRmxhdEFycmF5KGFycikge1xuICByZXR1cm4gdXRpbHMuaXNBcnJheShhcnIpICYmICFhcnIuc29tZShpc1Zpc2l0YWJsZSk7XG59XG5cbmNvbnN0IHByZWRpY2F0ZXMgPSB1dGlscy50b0ZsYXRPYmplY3QodXRpbHMsIHt9LCBudWxsLCBmdW5jdGlvbiBmaWx0ZXIocHJvcCkge1xuICByZXR1cm4gL15pc1tBLVpdLy50ZXN0KHByb3ApO1xufSk7XG5cbi8qKlxuICogQ29udmVydCBhIGRhdGEgb2JqZWN0IHRvIEZvcm1EYXRhXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHBhcmFtIHs/T2JqZWN0fSBbZm9ybURhdGFdXG4gKiBAcGFyYW0gez9PYmplY3R9IFtvcHRpb25zXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMudmlzaXRvcl1cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMubWV0YVRva2VucyA9IHRydWVdXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmRvdHMgPSBmYWxzZV1cbiAqIEBwYXJhbSB7P0Jvb2xlYW59IFtvcHRpb25zLmluZGV4ZXMgPSBmYWxzZV1cbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICoqL1xuXG4vKipcbiAqIEl0IGNvbnZlcnRzIGFuIG9iamVjdCBpbnRvIGEgRm9ybURhdGEgb2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3Q8YW55LCBhbnk+fSBvYmogLSBUaGUgb2JqZWN0IHRvIGNvbnZlcnQgdG8gZm9ybSBkYXRhLlxuICogQHBhcmFtIHtzdHJpbmd9IGZvcm1EYXRhIC0gVGhlIEZvcm1EYXRhIG9iamVjdCB0byBhcHBlbmQgdG8uXG4gKiBAcGFyYW0ge09iamVjdDxzdHJpbmcsIGFueT59IG9wdGlvbnNcbiAqXG4gKiBAcmV0dXJuc1xuICovXG5mdW5jdGlvbiB0b0Zvcm1EYXRhKG9iaiwgZm9ybURhdGEsIG9wdGlvbnMpIHtcbiAgaWYgKCF1dGlscy5pc09iamVjdChvYmopKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcigndGFyZ2V0IG11c3QgYmUgYW4gb2JqZWN0Jyk7XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgZm9ybURhdGEgPSBmb3JtRGF0YSB8fCBuZXcgKFBsYXRmb3JtRm9ybURhdGEgfHwgRm9ybURhdGEpKCk7XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gIG9wdGlvbnMgPSB1dGlscy50b0ZsYXRPYmplY3QoXG4gICAgb3B0aW9ucyxcbiAgICB7XG4gICAgICBtZXRhVG9rZW5zOiB0cnVlLFxuICAgICAgZG90czogZmFsc2UsXG4gICAgICBpbmRleGVzOiBmYWxzZSxcbiAgICB9LFxuICAgIGZhbHNlLFxuICAgIGZ1bmN0aW9uIGRlZmluZWQob3B0aW9uLCBzb3VyY2UpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lcS1udWxsLGVxZXFlcVxuICAgICAgcmV0dXJuICF1dGlscy5pc1VuZGVmaW5lZChzb3VyY2Vbb3B0aW9uXSk7XG4gICAgfVxuICApO1xuXG4gIGNvbnN0IG1ldGFUb2tlbnMgPSBvcHRpb25zLm1ldGFUb2tlbnM7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11c2UtYmVmb3JlLWRlZmluZVxuICBjb25zdCB2aXNpdG9yID0gb3B0aW9ucy52aXNpdG9yIHx8IGRlZmF1bHRWaXNpdG9yO1xuICBjb25zdCBkb3RzID0gb3B0aW9ucy5kb3RzO1xuICBjb25zdCBpbmRleGVzID0gb3B0aW9ucy5pbmRleGVzO1xuICBjb25zdCBfQmxvYiA9IG9wdGlvbnMuQmxvYiB8fCAodHlwZW9mIEJsb2IgIT09ICd1bmRlZmluZWQnICYmIEJsb2IpO1xuICBjb25zdCB1c2VCbG9iID0gX0Jsb2IgJiYgdXRpbHMuaXNTcGVjQ29tcGxpYW50Rm9ybShmb3JtRGF0YSk7XG5cbiAgaWYgKCF1dGlscy5pc0Z1bmN0aW9uKHZpc2l0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcigndmlzaXRvciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbnZlcnRWYWx1ZSh2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSA9PT0gbnVsbCkgcmV0dXJuICcnO1xuXG4gICAgaWYgKHV0aWxzLmlzRGF0ZSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB2YWx1ZS50b0lTT1N0cmluZygpO1xuICAgIH1cblxuICAgIGlmICh1dGlscy5pc0Jvb2xlYW4odmFsdWUpKSB7XG4gICAgICByZXR1cm4gdmFsdWUudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICBpZiAoIXVzZUJsb2IgJiYgdXRpbHMuaXNCbG9iKHZhbHVlKSkge1xuICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoJ0Jsb2IgaXMgbm90IHN1cHBvcnRlZC4gVXNlIGEgQnVmZmVyIGluc3RlYWQuJyk7XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzLmlzQXJyYXlCdWZmZXIodmFsdWUpIHx8IHV0aWxzLmlzVHlwZWRBcnJheSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB1c2VCbG9iICYmIHR5cGVvZiBCbG9iID09PSAnZnVuY3Rpb24nID8gbmV3IEJsb2IoW3ZhbHVlXSkgOiBCdWZmZXIuZnJvbSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIERlZmF1bHQgdmlzaXRvci5cbiAgICpcbiAgICogQHBhcmFtIHsqfSB2YWx1ZVxuICAgKiBAcGFyYW0ge1N0cmluZ3xOdW1iZXJ9IGtleVxuICAgKiBAcGFyYW0ge0FycmF5PFN0cmluZ3xOdW1iZXI+fSBwYXRoXG4gICAqIEB0aGlzIHtGb3JtRGF0YX1cbiAgICpcbiAgICogQHJldHVybnMge2Jvb2xlYW59IHJldHVybiB0cnVlIHRvIHZpc2l0IHRoZSBlYWNoIHByb3Agb2YgdGhlIHZhbHVlIHJlY3Vyc2l2ZWx5XG4gICAqL1xuICBmdW5jdGlvbiBkZWZhdWx0VmlzaXRvcih2YWx1ZSwga2V5LCBwYXRoKSB7XG4gICAgbGV0IGFyciA9IHZhbHVlO1xuXG4gICAgaWYgKHV0aWxzLmlzUmVhY3ROYXRpdmUoZm9ybURhdGEpICYmIHV0aWxzLmlzUmVhY3ROYXRpdmVCbG9iKHZhbHVlKSkge1xuICAgICAgZm9ybURhdGEuYXBwZW5kKHJlbmRlcktleShwYXRoLCBrZXksIGRvdHMpLCBjb252ZXJ0VmFsdWUodmFsdWUpKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAodmFsdWUgJiYgIXBhdGggJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgaWYgKHV0aWxzLmVuZHNXaXRoKGtleSwgJ3t9JykpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgIGtleSA9IG1ldGFUb2tlbnMgPyBrZXkgOiBrZXkuc2xpY2UoMCwgLTIpO1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAgdmFsdWUgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAodXRpbHMuaXNBcnJheSh2YWx1ZSkgJiYgaXNGbGF0QXJyYXkodmFsdWUpKSB8fFxuICAgICAgICAoKHV0aWxzLmlzRmlsZUxpc3QodmFsdWUpIHx8IHV0aWxzLmVuZHNXaXRoKGtleSwgJ1tdJykpICYmIChhcnIgPSB1dGlscy50b0FycmF5KHZhbHVlKSkpXG4gICAgICApIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgIGtleSA9IHJlbW92ZUJyYWNrZXRzKGtleSk7XG5cbiAgICAgICAgYXJyLmZvckVhY2goZnVuY3Rpb24gZWFjaChlbCwgaW5kZXgpIHtcbiAgICAgICAgICAhKHV0aWxzLmlzVW5kZWZpbmVkKGVsKSB8fCBlbCA9PT0gbnVsbCkgJiZcbiAgICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZChcbiAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5lc3RlZC10ZXJuYXJ5XG4gICAgICAgICAgICAgIGluZGV4ZXMgPT09IHRydWVcbiAgICAgICAgICAgICAgICA/IHJlbmRlcktleShba2V5XSwgaW5kZXgsIGRvdHMpXG4gICAgICAgICAgICAgICAgOiBpbmRleGVzID09PSBudWxsXG4gICAgICAgICAgICAgICAgICA/IGtleVxuICAgICAgICAgICAgICAgICAgOiBrZXkgKyAnW10nLFxuICAgICAgICAgICAgICBjb252ZXJ0VmFsdWUoZWwpXG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpc1Zpc2l0YWJsZSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGZvcm1EYXRhLmFwcGVuZChyZW5kZXJLZXkocGF0aCwga2V5LCBkb3RzKSwgY29udmVydFZhbHVlKHZhbHVlKSk7XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjb25zdCBzdGFjayA9IFtdO1xuXG4gIGNvbnN0IGV4cG9zZWRIZWxwZXJzID0gT2JqZWN0LmFzc2lnbihwcmVkaWNhdGVzLCB7XG4gICAgZGVmYXVsdFZpc2l0b3IsXG4gICAgY29udmVydFZhbHVlLFxuICAgIGlzVmlzaXRhYmxlLFxuICB9KTtcblxuICBmdW5jdGlvbiBidWlsZCh2YWx1ZSwgcGF0aCkge1xuICAgIGlmICh1dGlscy5pc1VuZGVmaW5lZCh2YWx1ZSkpIHJldHVybjtcblxuICAgIGlmIChzdGFjay5pbmRleE9mKHZhbHVlKSAhPT0gLTEpIHtcbiAgICAgIHRocm93IEVycm9yKCdDaXJjdWxhciByZWZlcmVuY2UgZGV0ZWN0ZWQgaW4gJyArIHBhdGguam9pbignLicpKTtcbiAgICB9XG5cbiAgICBzdGFjay5wdXNoKHZhbHVlKTtcblxuICAgIHV0aWxzLmZvckVhY2godmFsdWUsIGZ1bmN0aW9uIGVhY2goZWwsIGtleSkge1xuICAgICAgY29uc3QgcmVzdWx0ID1cbiAgICAgICAgISh1dGlscy5pc1VuZGVmaW5lZChlbCkgfHwgZWwgPT09IG51bGwpICYmXG4gICAgICAgIHZpc2l0b3IuY2FsbChmb3JtRGF0YSwgZWwsIHV0aWxzLmlzU3RyaW5nKGtleSkgPyBrZXkudHJpbSgpIDoga2V5LCBwYXRoLCBleHBvc2VkSGVscGVycyk7XG5cbiAgICAgIGlmIChyZXN1bHQgPT09IHRydWUpIHtcbiAgICAgICAgYnVpbGQoZWwsIHBhdGggPyBwYXRoLmNvbmNhdChrZXkpIDogW2tleV0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgc3RhY2sucG9wKCk7XG4gIH1cblxuICBpZiAoIXV0aWxzLmlzT2JqZWN0KG9iaikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdkYXRhIG11c3QgYmUgYW4gb2JqZWN0Jyk7XG4gIH1cblxuICBidWlsZChvYmopO1xuXG4gIHJldHVybiBmb3JtRGF0YTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdG9Gb3JtRGF0YTtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHRvRm9ybURhdGEgZnJvbSAnLi90b0Zvcm1EYXRhLmpzJztcblxuLyoqXG4gKiBJdCBlbmNvZGVzIGEgc3RyaW5nIGJ5IHJlcGxhY2luZyBhbGwgY2hhcmFjdGVycyB0aGF0IGFyZSBub3QgaW4gdGhlIHVucmVzZXJ2ZWQgc2V0IHdpdGhcbiAqIHRoZWlyIHBlcmNlbnQtZW5jb2RlZCBlcXVpdmFsZW50c1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHIgLSBUaGUgc3RyaW5nIHRvIGVuY29kZS5cbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZW5jb2RlZCBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIGVuY29kZShzdHIpIHtcbiAgY29uc3QgY2hhck1hcCA9IHtcbiAgICAnISc6ICclMjEnLFxuICAgIFwiJ1wiOiAnJTI3JyxcbiAgICAnKCc6ICclMjgnLFxuICAgICcpJzogJyUyOScsXG4gICAgJ34nOiAnJTdFJyxcbiAgICAnJTIwJzogJysnLFxuICAgICclMDAnOiAnXFx4MDAnLFxuICB9O1xuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHN0cikucmVwbGFjZSgvWyEnKCl+XXwlMjB8JTAwL2csIGZ1bmN0aW9uIHJlcGxhY2VyKG1hdGNoKSB7XG4gICAgcmV0dXJuIGNoYXJNYXBbbWF0Y2hdO1xuICB9KTtcbn1cblxuLyoqXG4gKiBJdCB0YWtlcyBhIHBhcmFtcyBvYmplY3QgYW5kIGNvbnZlcnRzIGl0IHRvIGEgRm9ybURhdGEgb2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3Q8c3RyaW5nLCBhbnk+fSBwYXJhbXMgLSBUaGUgcGFyYW1ldGVycyB0byBiZSBjb252ZXJ0ZWQgdG8gYSBGb3JtRGF0YSBvYmplY3QuXG4gKiBAcGFyYW0ge09iamVjdDxzdHJpbmcsIGFueT59IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBvYmplY3QgcGFzc2VkIHRvIHRoZSBBeGlvcyBjb25zdHJ1Y3Rvci5cbiAqXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZnVuY3Rpb24gQXhpb3NVUkxTZWFyY2hQYXJhbXMocGFyYW1zLCBvcHRpb25zKSB7XG4gIHRoaXMuX3BhaXJzID0gW107XG5cbiAgcGFyYW1zICYmIHRvRm9ybURhdGEocGFyYW1zLCB0aGlzLCBvcHRpb25zKTtcbn1cblxuY29uc3QgcHJvdG90eXBlID0gQXhpb3NVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlO1xuXG5wcm90b3R5cGUuYXBwZW5kID0gZnVuY3Rpb24gYXBwZW5kKG5hbWUsIHZhbHVlKSB7XG4gIHRoaXMuX3BhaXJzLnB1c2goW25hbWUsIHZhbHVlXSk7XG59O1xuXG5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZyhlbmNvZGVyKSB7XG4gIGNvbnN0IF9lbmNvZGUgPSBlbmNvZGVyXG4gICAgPyBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIGVuY29kZXIuY2FsbCh0aGlzLCB2YWx1ZSwgZW5jb2RlKTtcbiAgICAgIH1cbiAgICA6IGVuY29kZTtcblxuICByZXR1cm4gdGhpcy5fcGFpcnNcbiAgICAubWFwKGZ1bmN0aW9uIGVhY2gocGFpcikge1xuICAgICAgcmV0dXJuIF9lbmNvZGUocGFpclswXSkgKyAnPScgKyBfZW5jb2RlKHBhaXJbMV0pO1xuICAgIH0sICcnKVxuICAgIC5qb2luKCcmJyk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBeGlvc1VSTFNlYXJjaFBhcmFtcztcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcbmltcG9ydCBBeGlvc1VSTFNlYXJjaFBhcmFtcyBmcm9tICcuLi9oZWxwZXJzL0F4aW9zVVJMU2VhcmNoUGFyYW1zLmpzJztcblxuLyoqXG4gKiBJdCByZXBsYWNlcyBhbGwgaW5zdGFuY2VzIG9mIHRoZSBjaGFyYWN0ZXJzIGA6YCwgYCRgLCBgLGAsIGArYCwgYFtgLCBhbmQgYF1gIHdpdGggdGhlaXJcbiAqIFVSSSBlbmNvZGVkIGNvdW50ZXJwYXJ0c1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWwgVGhlIHZhbHVlIHRvIGJlIGVuY29kZWQuXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGVuY29kZWQgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGVuY29kZSh2YWwpIHtcbiAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudCh2YWwpXG4gICAgLnJlcGxhY2UoLyUzQS9naSwgJzonKVxuICAgIC5yZXBsYWNlKC8lMjQvZywgJyQnKVxuICAgIC5yZXBsYWNlKC8lMkMvZ2ksICcsJylcbiAgICAucmVwbGFjZSgvJTIwL2csICcrJyk7XG59XG5cbi8qKlxuICogQnVpbGQgYSBVUkwgYnkgYXBwZW5kaW5nIHBhcmFtcyB0byB0aGUgZW5kXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgYmFzZSBvZiB0aGUgdXJsIChlLmcuLCBodHRwOi8vd3d3Lmdvb2dsZS5jb20pXG4gKiBAcGFyYW0ge29iamVjdH0gW3BhcmFtc10gVGhlIHBhcmFtcyB0byBiZSBhcHBlbmRlZFxuICogQHBhcmFtIHs/KG9iamVjdHxGdW5jdGlvbil9IG9wdGlvbnNcbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIHVybFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZFVSTCh1cmwsIHBhcmFtcywgb3B0aW9ucykge1xuICBpZiAoIXBhcmFtcykge1xuICAgIHJldHVybiB1cmw7XG4gIH1cblxuICBjb25zdCBfZW5jb2RlID0gKG9wdGlvbnMgJiYgb3B0aW9ucy5lbmNvZGUpIHx8IGVuY29kZTtcblxuICBjb25zdCBfb3B0aW9ucyA9IHV0aWxzLmlzRnVuY3Rpb24ob3B0aW9ucylcbiAgICA/IHtcbiAgICAgICAgc2VyaWFsaXplOiBvcHRpb25zLFxuICAgICAgfVxuICAgIDogb3B0aW9ucztcblxuICBjb25zdCBzZXJpYWxpemVGbiA9IF9vcHRpb25zICYmIF9vcHRpb25zLnNlcmlhbGl6ZTtcblxuICBsZXQgc2VyaWFsaXplZFBhcmFtcztcblxuICBpZiAoc2VyaWFsaXplRm4pIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gc2VyaWFsaXplRm4ocGFyYW1zLCBfb3B0aW9ucyk7XG4gIH0gZWxzZSB7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHV0aWxzLmlzVVJMU2VhcmNoUGFyYW1zKHBhcmFtcylcbiAgICAgID8gcGFyYW1zLnRvU3RyaW5nKClcbiAgICAgIDogbmV3IEF4aW9zVVJMU2VhcmNoUGFyYW1zKHBhcmFtcywgX29wdGlvbnMpLnRvU3RyaW5nKF9lbmNvZGUpO1xuICB9XG5cbiAgaWYgKHNlcmlhbGl6ZWRQYXJhbXMpIHtcbiAgICBjb25zdCBoYXNobWFya0luZGV4ID0gdXJsLmluZGV4T2YoJyMnKTtcblxuICAgIGlmIChoYXNobWFya0luZGV4ICE9PSAtMSkge1xuICAgICAgdXJsID0gdXJsLnNsaWNlKDAsIGhhc2htYXJrSW5kZXgpO1xuICAgIH1cbiAgICB1cmwgKz0gKHVybC5pbmRleE9mKCc/JykgPT09IC0xID8gJz8nIDogJyYnKSArIHNlcmlhbGl6ZWRQYXJhbXM7XG4gIH1cblxuICByZXR1cm4gdXJsO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuXG5jbGFzcyBJbnRlcmNlcHRvck1hbmFnZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmhhbmRsZXJzID0gW107XG4gIH1cblxuICAvKipcbiAgICogQWRkIGEgbmV3IGludGVyY2VwdG9yIHRvIHRoZSBzdGFja1xuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdWxmaWxsZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgdGhlbmAgZm9yIGEgYFByb21pc2VgXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHJlamVjdGAgZm9yIGEgYFByb21pc2VgXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIFRoZSBvcHRpb25zIGZvciB0aGUgaW50ZXJjZXB0b3IsIHN5bmNocm9ub3VzIGFuZCBydW5XaGVuXG4gICAqXG4gICAqIEByZXR1cm4ge051bWJlcn0gQW4gSUQgdXNlZCB0byByZW1vdmUgaW50ZXJjZXB0b3IgbGF0ZXJcbiAgICovXG4gIHVzZShmdWxmaWxsZWQsIHJlamVjdGVkLCBvcHRpb25zKSB7XG4gICAgdGhpcy5oYW5kbGVycy5wdXNoKHtcbiAgICAgIGZ1bGZpbGxlZCxcbiAgICAgIHJlamVjdGVkLFxuICAgICAgc3luY2hyb25vdXM6IG9wdGlvbnMgPyBvcHRpb25zLnN5bmNocm9ub3VzIDogZmFsc2UsXG4gICAgICBydW5XaGVuOiBvcHRpb25zID8gb3B0aW9ucy5ydW5XaGVuIDogbnVsbCxcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVycy5sZW5ndGggLSAxO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhbiBpbnRlcmNlcHRvciBmcm9tIHRoZSBzdGFja1xuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gaWQgVGhlIElEIHRoYXQgd2FzIHJldHVybmVkIGJ5IGB1c2VgXG4gICAqXG4gICAqIEByZXR1cm5zIHt2b2lkfVxuICAgKi9cbiAgZWplY3QoaWQpIHtcbiAgICBpZiAodGhpcy5oYW5kbGVyc1tpZF0pIHtcbiAgICAgIHRoaXMuaGFuZGxlcnNbaWRdID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXIgYWxsIGludGVyY2VwdG9ycyBmcm9tIHRoZSBzdGFja1xuICAgKlxuICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICovXG4gIGNsZWFyKCkge1xuICAgIGlmICh0aGlzLmhhbmRsZXJzKSB7XG4gICAgICB0aGlzLmhhbmRsZXJzID0gW107XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEl0ZXJhdGUgb3ZlciBhbGwgdGhlIHJlZ2lzdGVyZWQgaW50ZXJjZXB0b3JzXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGlzIHBhcnRpY3VsYXJseSB1c2VmdWwgZm9yIHNraXBwaW5nIG92ZXIgYW55XG4gICAqIGludGVyY2VwdG9ycyB0aGF0IG1heSBoYXZlIGJlY29tZSBgbnVsbGAgY2FsbGluZyBgZWplY3RgLlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY2FsbCBmb3IgZWFjaCBpbnRlcmNlcHRvclxuICAgKlxuICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICovXG4gIGZvckVhY2goZm4pIHtcbiAgICB1dGlscy5mb3JFYWNoKHRoaXMuaGFuZGxlcnMsIGZ1bmN0aW9uIGZvckVhY2hIYW5kbGVyKGgpIHtcbiAgICAgIGlmIChoICE9PSBudWxsKSB7XG4gICAgICAgIGZuKGgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEludGVyY2VwdG9yTWFuYWdlcjtcbiIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBzaWxlbnRKU09OUGFyc2luZzogdHJ1ZSxcbiAgZm9yY2VkSlNPTlBhcnNpbmc6IHRydWUsXG4gIGNsYXJpZnlUaW1lb3V0RXJyb3I6IGZhbHNlLFxuICBsZWdhY3lJbnRlcmNlcHRvclJlcVJlc09yZGVyaW5nOiB0cnVlLFxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IEF4aW9zVVJMU2VhcmNoUGFyYW1zIGZyb20gJy4uLy4uLy4uL2hlbHBlcnMvQXhpb3NVUkxTZWFyY2hQYXJhbXMuanMnO1xuZXhwb3J0IGRlZmF1bHQgdHlwZW9mIFVSTFNlYXJjaFBhcmFtcyAhPT0gJ3VuZGVmaW5lZCcgPyBVUkxTZWFyY2hQYXJhbXMgOiBBeGlvc1VSTFNlYXJjaFBhcmFtcztcbiIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGRlZmF1bHQgdHlwZW9mIEZvcm1EYXRhICE9PSAndW5kZWZpbmVkJyA/IEZvcm1EYXRhIDogbnVsbDtcbiIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGRlZmF1bHQgdHlwZW9mIEJsb2IgIT09ICd1bmRlZmluZWQnID8gQmxvYiA6IG51bGw7XG4iLCJpbXBvcnQgVVJMU2VhcmNoUGFyYW1zIGZyb20gJy4vY2xhc3Nlcy9VUkxTZWFyY2hQYXJhbXMuanMnO1xuaW1wb3J0IEZvcm1EYXRhIGZyb20gJy4vY2xhc3Nlcy9Gb3JtRGF0YS5qcyc7XG5pbXBvcnQgQmxvYiBmcm9tICcuL2NsYXNzZXMvQmxvYi5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgaXNCcm93c2VyOiB0cnVlLFxuICBjbGFzc2VzOiB7XG4gICAgVVJMU2VhcmNoUGFyYW1zLFxuICAgIEZvcm1EYXRhLFxuICAgIEJsb2IsXG4gIH0sXG4gIHByb3RvY29sczogWydodHRwJywgJ2h0dHBzJywgJ2ZpbGUnLCAnYmxvYicsICd1cmwnLCAnZGF0YSddLFxufTtcbiIsImNvbnN0IGhhc0Jyb3dzZXJFbnYgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnO1xuXG5jb25zdCBfbmF2aWdhdG9yID0gKHR5cGVvZiBuYXZpZ2F0b3IgPT09ICdvYmplY3QnICYmIG5hdmlnYXRvcikgfHwgdW5kZWZpbmVkO1xuXG4vKipcbiAqIERldGVybWluZSBpZiB3ZSdyZSBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudFxuICpcbiAqIFRoaXMgYWxsb3dzIGF4aW9zIHRvIHJ1biBpbiBhIHdlYiB3b3JrZXIsIGFuZCByZWFjdC1uYXRpdmUuXG4gKiBCb3RoIGVudmlyb25tZW50cyBzdXBwb3J0IFhNTEh0dHBSZXF1ZXN0LCBidXQgbm90IGZ1bGx5IHN0YW5kYXJkIGdsb2JhbHMuXG4gKlxuICogd2ViIHdvcmtlcnM6XG4gKiAgdHlwZW9mIHdpbmRvdyAtPiB1bmRlZmluZWRcbiAqICB0eXBlb2YgZG9jdW1lbnQgLT4gdW5kZWZpbmVkXG4gKlxuICogcmVhY3QtbmF0aXZlOlxuICogIG5hdmlnYXRvci5wcm9kdWN0IC0+ICdSZWFjdE5hdGl2ZSdcbiAqIG5hdGl2ZXNjcmlwdFxuICogIG5hdmlnYXRvci5wcm9kdWN0IC0+ICdOYXRpdmVTY3JpcHQnIG9yICdOUydcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuY29uc3QgaGFzU3RhbmRhcmRCcm93c2VyRW52ID1cbiAgaGFzQnJvd3NlckVudiAmJlxuICAoIV9uYXZpZ2F0b3IgfHwgWydSZWFjdE5hdGl2ZScsICdOYXRpdmVTY3JpcHQnLCAnTlMnXS5pbmRleE9mKF9uYXZpZ2F0b3IucHJvZHVjdCkgPCAwKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgd2UncmUgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgd2ViV29ya2VyIGVudmlyb25tZW50XG4gKlxuICogQWx0aG91Z2ggdGhlIGBpc1N0YW5kYXJkQnJvd3NlckVudmAgbWV0aG9kIGluZGljYXRlcyB0aGF0XG4gKiBgYWxsb3dzIGF4aW9zIHRvIHJ1biBpbiBhIHdlYiB3b3JrZXJgLCB0aGUgV2ViV29ya2VyIHdpbGwgc3RpbGwgYmVcbiAqIGZpbHRlcmVkIG91dCBkdWUgdG8gaXRzIGp1ZGdtZW50IHN0YW5kYXJkXG4gKiBgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJ2AuXG4gKiBUaGlzIGxlYWRzIHRvIGEgcHJvYmxlbSB3aGVuIGF4aW9zIHBvc3QgYEZvcm1EYXRhYCBpbiB3ZWJXb3JrZXJcbiAqL1xuY29uc3QgaGFzU3RhbmRhcmRCcm93c2VyV2ViV29ya2VyRW52ID0gKCgpID0+IHtcbiAgcmV0dXJuIChcbiAgICB0eXBlb2YgV29ya2VyR2xvYmFsU2NvcGUgIT09ICd1bmRlZmluZWQnICYmXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gICAgc2VsZiBpbnN0YW5jZW9mIFdvcmtlckdsb2JhbFNjb3BlICYmXG4gICAgdHlwZW9mIHNlbGYuaW1wb3J0U2NyaXB0cyA9PT0gJ2Z1bmN0aW9uJ1xuICApO1xufSkoKTtcblxuY29uc3Qgb3JpZ2luID0gKGhhc0Jyb3dzZXJFbnYgJiYgd2luZG93LmxvY2F0aW9uLmhyZWYpIHx8ICdodHRwOi8vbG9jYWxob3N0JztcblxuZXhwb3J0IHtcbiAgaGFzQnJvd3NlckVudixcbiAgaGFzU3RhbmRhcmRCcm93c2VyV2ViV29ya2VyRW52LFxuICBoYXNTdGFuZGFyZEJyb3dzZXJFbnYsXG4gIF9uYXZpZ2F0b3IgYXMgbmF2aWdhdG9yLFxuICBvcmlnaW4sXG59O1xuIiwiaW1wb3J0IHBsYXRmb3JtIGZyb20gJy4vbm9kZS9pbmRleC5qcyc7XG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tICcuL2NvbW1vbi91dGlscy5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgLi4udXRpbHMsXG4gIC4uLnBsYXRmb3JtLFxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcbmltcG9ydCB0b0Zvcm1EYXRhIGZyb20gJy4vdG9Gb3JtRGF0YS5qcyc7XG5pbXBvcnQgcGxhdGZvcm0gZnJvbSAnLi4vcGxhdGZvcm0vaW5kZXguanMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0b1VSTEVuY29kZWRGb3JtKGRhdGEsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIHRvRm9ybURhdGEoZGF0YSwgbmV3IHBsYXRmb3JtLmNsYXNzZXMuVVJMU2VhcmNoUGFyYW1zKCksIHtcbiAgICB2aXNpdG9yOiBmdW5jdGlvbiAodmFsdWUsIGtleSwgcGF0aCwgaGVscGVycykge1xuICAgICAgaWYgKHBsYXRmb3JtLmlzTm9kZSAmJiB1dGlscy5pc0J1ZmZlcih2YWx1ZSkpIHtcbiAgICAgICAgdGhpcy5hcHBlbmQoa2V5LCB2YWx1ZS50b1N0cmluZygnYmFzZTY0JykpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBoZWxwZXJzLmRlZmF1bHRWaXNpdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfSxcbiAgICAuLi5vcHRpb25zLFxuICB9KTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcblxuLyoqXG4gKiBJdCB0YWtlcyBhIHN0cmluZyBsaWtlIGBmb29beF1beV1bel1gIGFuZCByZXR1cm5zIGFuIGFycmF5IGxpa2UgYFsnZm9vJywgJ3gnLCAneScsICd6J11cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKlxuICogQHJldHVybnMgQW4gYXJyYXkgb2Ygc3RyaW5ncy5cbiAqL1xuZnVuY3Rpb24gcGFyc2VQcm9wUGF0aChuYW1lKSB7XG4gIC8vIGZvb1t4XVt5XVt6XVxuICAvLyBmb28ueC55LnpcbiAgLy8gZm9vLXgteS16XG4gIC8vIGZvbyB4IHkgelxuICByZXR1cm4gdXRpbHMubWF0Y2hBbGwoL1xcdyt8XFxbKFxcdyopXS9nLCBuYW1lKS5tYXAoKG1hdGNoKSA9PiB7XG4gICAgcmV0dXJuIG1hdGNoWzBdID09PSAnW10nID8gJycgOiBtYXRjaFsxXSB8fCBtYXRjaFswXTtcbiAgfSk7XG59XG5cbi8qKlxuICogQ29udmVydCBhbiBhcnJheSB0byBhbiBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtBcnJheTxhbnk+fSBhcnIgLSBUaGUgYXJyYXkgdG8gY29udmVydCB0byBhbiBvYmplY3QuXG4gKlxuICogQHJldHVybnMgQW4gb2JqZWN0IHdpdGggdGhlIHNhbWUga2V5cyBhbmQgdmFsdWVzIGFzIHRoZSBhcnJheS5cbiAqL1xuZnVuY3Rpb24gYXJyYXlUb09iamVjdChhcnIpIHtcbiAgY29uc3Qgb2JqID0ge307XG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhhcnIpO1xuICBsZXQgaTtcbiAgY29uc3QgbGVuID0ga2V5cy5sZW5ndGg7XG4gIGxldCBrZXk7XG4gIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIGtleSA9IGtleXNbaV07XG4gICAgb2JqW2tleV0gPSBhcnJba2V5XTtcbiAgfVxuICByZXR1cm4gb2JqO1xufVxuXG4vKipcbiAqIEl0IHRha2VzIGEgRm9ybURhdGEgb2JqZWN0IGFuZCByZXR1cm5zIGEgSmF2YVNjcmlwdCBvYmplY3RcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZm9ybURhdGEgVGhlIEZvcm1EYXRhIG9iamVjdCB0byBjb252ZXJ0IHRvIEpTT04uXG4gKlxuICogQHJldHVybnMge09iamVjdDxzdHJpbmcsIGFueT4gfCBudWxsfSBUaGUgY29udmVydGVkIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gZm9ybURhdGFUb0pTT04oZm9ybURhdGEpIHtcbiAgZnVuY3Rpb24gYnVpbGRQYXRoKHBhdGgsIHZhbHVlLCB0YXJnZXQsIGluZGV4KSB7XG4gICAgbGV0IG5hbWUgPSBwYXRoW2luZGV4KytdO1xuXG4gICAgaWYgKG5hbWUgPT09ICdfX3Byb3RvX18nKSByZXR1cm4gdHJ1ZTtcblxuICAgIGNvbnN0IGlzTnVtZXJpY0tleSA9IE51bWJlci5pc0Zpbml0ZSgrbmFtZSk7XG4gICAgY29uc3QgaXNMYXN0ID0gaW5kZXggPj0gcGF0aC5sZW5ndGg7XG4gICAgbmFtZSA9ICFuYW1lICYmIHV0aWxzLmlzQXJyYXkodGFyZ2V0KSA/IHRhcmdldC5sZW5ndGggOiBuYW1lO1xuXG4gICAgaWYgKGlzTGFzdCkge1xuICAgICAgaWYgKHV0aWxzLmhhc093blByb3AodGFyZ2V0LCBuYW1lKSkge1xuICAgICAgICB0YXJnZXRbbmFtZV0gPSBbdGFyZ2V0W25hbWVdLCB2YWx1ZV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0YXJnZXRbbmFtZV0gPSB2YWx1ZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuICFpc051bWVyaWNLZXk7XG4gICAgfVxuXG4gICAgaWYgKCF0YXJnZXRbbmFtZV0gfHwgIXV0aWxzLmlzT2JqZWN0KHRhcmdldFtuYW1lXSkpIHtcbiAgICAgIHRhcmdldFtuYW1lXSA9IFtdO1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3VsdCA9IGJ1aWxkUGF0aChwYXRoLCB2YWx1ZSwgdGFyZ2V0W25hbWVdLCBpbmRleCk7XG5cbiAgICBpZiAocmVzdWx0ICYmIHV0aWxzLmlzQXJyYXkodGFyZ2V0W25hbWVdKSkge1xuICAgICAgdGFyZ2V0W25hbWVdID0gYXJyYXlUb09iamVjdCh0YXJnZXRbbmFtZV0pO1xuICAgIH1cblxuICAgIHJldHVybiAhaXNOdW1lcmljS2V5O1xuICB9XG5cbiAgaWYgKHV0aWxzLmlzRm9ybURhdGEoZm9ybURhdGEpICYmIHV0aWxzLmlzRnVuY3Rpb24oZm9ybURhdGEuZW50cmllcykpIHtcbiAgICBjb25zdCBvYmogPSB7fTtcblxuICAgIHV0aWxzLmZvckVhY2hFbnRyeShmb3JtRGF0YSwgKG5hbWUsIHZhbHVlKSA9PiB7XG4gICAgICBidWlsZFBhdGgocGFyc2VQcm9wUGF0aChuYW1lKSwgdmFsdWUsIG9iaiwgMCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZvcm1EYXRhVG9KU09OO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSAnLi4vY29yZS9BeGlvc0Vycm9yLmpzJztcbmltcG9ydCB0cmFuc2l0aW9uYWxEZWZhdWx0cyBmcm9tICcuL3RyYW5zaXRpb25hbC5qcyc7XG5pbXBvcnQgdG9Gb3JtRGF0YSBmcm9tICcuLi9oZWxwZXJzL3RvRm9ybURhdGEuanMnO1xuaW1wb3J0IHRvVVJMRW5jb2RlZEZvcm0gZnJvbSAnLi4vaGVscGVycy90b1VSTEVuY29kZWRGb3JtLmpzJztcbmltcG9ydCBwbGF0Zm9ybSBmcm9tICcuLi9wbGF0Zm9ybS9pbmRleC5qcyc7XG5pbXBvcnQgZm9ybURhdGFUb0pTT04gZnJvbSAnLi4vaGVscGVycy9mb3JtRGF0YVRvSlNPTi5qcyc7XG5cbi8qKlxuICogSXQgdGFrZXMgYSBzdHJpbmcsIHRyaWVzIHRvIHBhcnNlIGl0LCBhbmQgaWYgaXQgZmFpbHMsIGl0IHJldHVybnMgdGhlIHN0cmluZ2lmaWVkIHZlcnNpb25cbiAqIG9mIHRoZSBpbnB1dFxuICpcbiAqIEBwYXJhbSB7YW55fSByYXdWYWx1ZSAtIFRoZSB2YWx1ZSB0byBiZSBzdHJpbmdpZmllZC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHBhcnNlciAtIEEgZnVuY3Rpb24gdGhhdCBwYXJzZXMgYSBzdHJpbmcgaW50byBhIEphdmFTY3JpcHQgb2JqZWN0LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZW5jb2RlciAtIEEgZnVuY3Rpb24gdGhhdCB0YWtlcyBhIHZhbHVlIGFuZCByZXR1cm5zIGEgc3RyaW5nLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IEEgc3RyaW5naWZpZWQgdmVyc2lvbiBvZiB0aGUgcmF3VmFsdWUuXG4gKi9cbmZ1bmN0aW9uIHN0cmluZ2lmeVNhZmVseShyYXdWYWx1ZSwgcGFyc2VyLCBlbmNvZGVyKSB7XG4gIGlmICh1dGlscy5pc1N0cmluZyhyYXdWYWx1ZSkpIHtcbiAgICB0cnkge1xuICAgICAgKHBhcnNlciB8fCBKU09OLnBhcnNlKShyYXdWYWx1ZSk7XG4gICAgICByZXR1cm4gdXRpbHMudHJpbShyYXdWYWx1ZSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKGUubmFtZSAhPT0gJ1N5bnRheEVycm9yJykge1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiAoZW5jb2RlciB8fCBKU09OLnN0cmluZ2lmeSkocmF3VmFsdWUpO1xufVxuXG5jb25zdCBkZWZhdWx0cyA9IHtcbiAgdHJhbnNpdGlvbmFsOiB0cmFuc2l0aW9uYWxEZWZhdWx0cyxcblxuICBhZGFwdGVyOiBbJ3hocicsICdodHRwJywgJ2ZldGNoJ10sXG5cbiAgdHJhbnNmb3JtUmVxdWVzdDogW1xuICAgIGZ1bmN0aW9uIHRyYW5zZm9ybVJlcXVlc3QoZGF0YSwgaGVhZGVycykge1xuICAgICAgY29uc3QgY29udGVudFR5cGUgPSBoZWFkZXJzLmdldENvbnRlbnRUeXBlKCkgfHwgJyc7XG4gICAgICBjb25zdCBoYXNKU09OQ29udGVudFR5cGUgPSBjb250ZW50VHlwZS5pbmRleE9mKCdhcHBsaWNhdGlvbi9qc29uJykgPiAtMTtcbiAgICAgIGNvbnN0IGlzT2JqZWN0UGF5bG9hZCA9IHV0aWxzLmlzT2JqZWN0KGRhdGEpO1xuXG4gICAgICBpZiAoaXNPYmplY3RQYXlsb2FkICYmIHV0aWxzLmlzSFRNTEZvcm0oZGF0YSkpIHtcbiAgICAgICAgZGF0YSA9IG5ldyBGb3JtRGF0YShkYXRhKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgaXNGb3JtRGF0YSA9IHV0aWxzLmlzRm9ybURhdGEoZGF0YSk7XG5cbiAgICAgIGlmIChpc0Zvcm1EYXRhKSB7XG4gICAgICAgIHJldHVybiBoYXNKU09OQ29udGVudFR5cGUgPyBKU09OLnN0cmluZ2lmeShmb3JtRGF0YVRvSlNPTihkYXRhKSkgOiBkYXRhO1xuICAgICAgfVxuXG4gICAgICBpZiAoXG4gICAgICAgIHV0aWxzLmlzQXJyYXlCdWZmZXIoZGF0YSkgfHxcbiAgICAgICAgdXRpbHMuaXNCdWZmZXIoZGF0YSkgfHxcbiAgICAgICAgdXRpbHMuaXNTdHJlYW0oZGF0YSkgfHxcbiAgICAgICAgdXRpbHMuaXNGaWxlKGRhdGEpIHx8XG4gICAgICAgIHV0aWxzLmlzQmxvYihkYXRhKSB8fFxuICAgICAgICB1dGlscy5pc1JlYWRhYmxlU3RyZWFtKGRhdGEpXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICB9XG4gICAgICBpZiAodXRpbHMuaXNBcnJheUJ1ZmZlclZpZXcoZGF0YSkpIHtcbiAgICAgICAgcmV0dXJuIGRhdGEuYnVmZmVyO1xuICAgICAgfVxuICAgICAgaWYgKHV0aWxzLmlzVVJMU2VhcmNoUGFyYW1zKGRhdGEpKSB7XG4gICAgICAgIGhlYWRlcnMuc2V0Q29udGVudFR5cGUoJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PXV0Zi04JywgZmFsc2UpO1xuICAgICAgICByZXR1cm4gZGF0YS50b1N0cmluZygpO1xuICAgICAgfVxuXG4gICAgICBsZXQgaXNGaWxlTGlzdDtcblxuICAgICAgaWYgKGlzT2JqZWN0UGF5bG9hZCkge1xuICAgICAgICBpZiAoY29udGVudFR5cGUuaW5kZXhPZignYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJykgPiAtMSkge1xuICAgICAgICAgIHJldHVybiB0b1VSTEVuY29kZWRGb3JtKGRhdGEsIHRoaXMuZm9ybVNlcmlhbGl6ZXIpLnRvU3RyaW5nKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXG4gICAgICAgICAgKGlzRmlsZUxpc3QgPSB1dGlscy5pc0ZpbGVMaXN0KGRhdGEpKSB8fFxuICAgICAgICAgIGNvbnRlbnRUeXBlLmluZGV4T2YoJ211bHRpcGFydC9mb3JtLWRhdGEnKSA+IC0xXG4gICAgICAgICkge1xuICAgICAgICAgIGNvbnN0IF9Gb3JtRGF0YSA9IHRoaXMuZW52ICYmIHRoaXMuZW52LkZvcm1EYXRhO1xuXG4gICAgICAgICAgcmV0dXJuIHRvRm9ybURhdGEoXG4gICAgICAgICAgICBpc0ZpbGVMaXN0ID8geyAnZmlsZXNbXSc6IGRhdGEgfSA6IGRhdGEsXG4gICAgICAgICAgICBfRm9ybURhdGEgJiYgbmV3IF9Gb3JtRGF0YSgpLFxuICAgICAgICAgICAgdGhpcy5mb3JtU2VyaWFsaXplclxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGlzT2JqZWN0UGF5bG9hZCB8fCBoYXNKU09OQ29udGVudFR5cGUpIHtcbiAgICAgICAgaGVhZGVycy5zZXRDb250ZW50VHlwZSgnYXBwbGljYXRpb24vanNvbicsIGZhbHNlKTtcbiAgICAgICAgcmV0dXJuIHN0cmluZ2lmeVNhZmVseShkYXRhKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfSxcbiAgXSxcblxuICB0cmFuc2Zvcm1SZXNwb25zZTogW1xuICAgIGZ1bmN0aW9uIHRyYW5zZm9ybVJlc3BvbnNlKGRhdGEpIHtcbiAgICAgIGNvbnN0IHRyYW5zaXRpb25hbCA9IHRoaXMudHJhbnNpdGlvbmFsIHx8IGRlZmF1bHRzLnRyYW5zaXRpb25hbDtcbiAgICAgIGNvbnN0IGZvcmNlZEpTT05QYXJzaW5nID0gdHJhbnNpdGlvbmFsICYmIHRyYW5zaXRpb25hbC5mb3JjZWRKU09OUGFyc2luZztcbiAgICAgIGNvbnN0IEpTT05SZXF1ZXN0ZWQgPSB0aGlzLnJlc3BvbnNlVHlwZSA9PT0gJ2pzb24nO1xuXG4gICAgICBpZiAodXRpbHMuaXNSZXNwb25zZShkYXRhKSB8fCB1dGlscy5pc1JlYWRhYmxlU3RyZWFtKGRhdGEpKSB7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgfVxuXG4gICAgICBpZiAoXG4gICAgICAgIGRhdGEgJiZcbiAgICAgICAgdXRpbHMuaXNTdHJpbmcoZGF0YSkgJiZcbiAgICAgICAgKChmb3JjZWRKU09OUGFyc2luZyAmJiAhdGhpcy5yZXNwb25zZVR5cGUpIHx8IEpTT05SZXF1ZXN0ZWQpXG4gICAgICApIHtcbiAgICAgICAgY29uc3Qgc2lsZW50SlNPTlBhcnNpbmcgPSB0cmFuc2l0aW9uYWwgJiYgdHJhbnNpdGlvbmFsLnNpbGVudEpTT05QYXJzaW5nO1xuICAgICAgICBjb25zdCBzdHJpY3RKU09OUGFyc2luZyA9ICFzaWxlbnRKU09OUGFyc2luZyAmJiBKU09OUmVxdWVzdGVkO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoZGF0YSwgdGhpcy5wYXJzZVJldml2ZXIpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgaWYgKHN0cmljdEpTT05QYXJzaW5nKSB7XG4gICAgICAgICAgICBpZiAoZS5uYW1lID09PSAnU3ludGF4RXJyb3InKSB7XG4gICAgICAgICAgICAgIHRocm93IEF4aW9zRXJyb3IuZnJvbShlLCBBeGlvc0Vycm9yLkVSUl9CQURfUkVTUE9OU0UsIHRoaXMsIG51bGwsIHRoaXMucmVzcG9uc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfSxcbiAgXSxcblxuICAvKipcbiAgICogQSB0aW1lb3V0IGluIG1pbGxpc2Vjb25kcyB0byBhYm9ydCBhIHJlcXVlc3QuIElmIHNldCB0byAwIChkZWZhdWx0KSBhXG4gICAqIHRpbWVvdXQgaXMgbm90IGNyZWF0ZWQuXG4gICAqL1xuICB0aW1lb3V0OiAwLFxuXG4gIHhzcmZDb29raWVOYW1lOiAnWFNSRi1UT0tFTicsXG4gIHhzcmZIZWFkZXJOYW1lOiAnWC1YU1JGLVRPS0VOJyxcblxuICBtYXhDb250ZW50TGVuZ3RoOiAtMSxcbiAgbWF4Qm9keUxlbmd0aDogLTEsXG5cbiAgZW52OiB7XG4gICAgRm9ybURhdGE6IHBsYXRmb3JtLmNsYXNzZXMuRm9ybURhdGEsXG4gICAgQmxvYjogcGxhdGZvcm0uY2xhc3Nlcy5CbG9iLFxuICB9LFxuXG4gIHZhbGlkYXRlU3RhdHVzOiBmdW5jdGlvbiB2YWxpZGF0ZVN0YXR1cyhzdGF0dXMpIHtcbiAgICByZXR1cm4gc3RhdHVzID49IDIwMCAmJiBzdGF0dXMgPCAzMDA7XG4gIH0sXG5cbiAgaGVhZGVyczoge1xuICAgIGNvbW1vbjoge1xuICAgICAgQWNjZXB0OiAnYXBwbGljYXRpb24vanNvbiwgdGV4dC9wbGFpbiwgKi8qJyxcbiAgICAgICdDb250ZW50LVR5cGUnOiB1bmRlZmluZWQsXG4gICAgfSxcbiAgfSxcbn07XG5cbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgKG1ldGhvZCkgPT4ge1xuICBkZWZhdWx0cy5oZWFkZXJzW21ldGhvZF0gPSB7fTtcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZhdWx0cztcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcblxuLy8gUmF3QXhpb3NIZWFkZXJzIHdob3NlIGR1cGxpY2F0ZXMgYXJlIGlnbm9yZWQgYnkgbm9kZVxuLy8gYy5mLiBodHRwczovL25vZGVqcy5vcmcvYXBpL2h0dHAuaHRtbCNodHRwX21lc3NhZ2VfaGVhZGVyc1xuY29uc3QgaWdub3JlRHVwbGljYXRlT2YgPSB1dGlscy50b09iamVjdFNldChbXG4gICdhZ2UnLFxuICAnYXV0aG9yaXphdGlvbicsXG4gICdjb250ZW50LWxlbmd0aCcsXG4gICdjb250ZW50LXR5cGUnLFxuICAnZXRhZycsXG4gICdleHBpcmVzJyxcbiAgJ2Zyb20nLFxuICAnaG9zdCcsXG4gICdpZi1tb2RpZmllZC1zaW5jZScsXG4gICdpZi11bm1vZGlmaWVkLXNpbmNlJyxcbiAgJ2xhc3QtbW9kaWZpZWQnLFxuICAnbG9jYXRpb24nLFxuICAnbWF4LWZvcndhcmRzJyxcbiAgJ3Byb3h5LWF1dGhvcml6YXRpb24nLFxuICAncmVmZXJlcicsXG4gICdyZXRyeS1hZnRlcicsXG4gICd1c2VyLWFnZW50Jyxcbl0pO1xuXG4vKipcbiAqIFBhcnNlIGhlYWRlcnMgaW50byBhbiBvYmplY3RcbiAqXG4gKiBgYGBcbiAqIERhdGU6IFdlZCwgMjcgQXVnIDIwMTQgMDg6NTg6NDkgR01UXG4gKiBDb250ZW50LVR5cGU6IGFwcGxpY2F0aW9uL2pzb25cbiAqIENvbm5lY3Rpb246IGtlZXAtYWxpdmVcbiAqIFRyYW5zZmVyLUVuY29kaW5nOiBjaHVua2VkXG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gcmF3SGVhZGVycyBIZWFkZXJzIG5lZWRpbmcgdG8gYmUgcGFyc2VkXG4gKlxuICogQHJldHVybnMge09iamVjdH0gSGVhZGVycyBwYXJzZWQgaW50byBhbiBvYmplY3RcbiAqL1xuZXhwb3J0IGRlZmF1bHQgKHJhd0hlYWRlcnMpID0+IHtcbiAgY29uc3QgcGFyc2VkID0ge307XG4gIGxldCBrZXk7XG4gIGxldCB2YWw7XG4gIGxldCBpO1xuXG4gIHJhd0hlYWRlcnMgJiZcbiAgICByYXdIZWFkZXJzLnNwbGl0KCdcXG4nKS5mb3JFYWNoKGZ1bmN0aW9uIHBhcnNlcihsaW5lKSB7XG4gICAgICBpID0gbGluZS5pbmRleE9mKCc6Jyk7XG4gICAgICBrZXkgPSBsaW5lLnN1YnN0cmluZygwLCBpKS50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgICAgIHZhbCA9IGxpbmUuc3Vic3RyaW5nKGkgKyAxKS50cmltKCk7XG5cbiAgICAgIGlmICgha2V5IHx8IChwYXJzZWRba2V5XSAmJiBpZ25vcmVEdXBsaWNhdGVPZltrZXldKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChrZXkgPT09ICdzZXQtY29va2llJykge1xuICAgICAgICBpZiAocGFyc2VkW2tleV0pIHtcbiAgICAgICAgICBwYXJzZWRba2V5XS5wdXNoKHZhbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcGFyc2VkW2tleV0gPSBbdmFsXTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSBwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldICsgJywgJyArIHZhbCA6IHZhbDtcbiAgICAgIH1cbiAgICB9KTtcblxuICByZXR1cm4gcGFyc2VkO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcbmltcG9ydCBwYXJzZUhlYWRlcnMgZnJvbSAnLi4vaGVscGVycy9wYXJzZUhlYWRlcnMuanMnO1xuXG5jb25zdCAkaW50ZXJuYWxzID0gU3ltYm9sKCdpbnRlcm5hbHMnKTtcblxuZnVuY3Rpb24gbm9ybWFsaXplSGVhZGVyKGhlYWRlcikge1xuICByZXR1cm4gaGVhZGVyICYmIFN0cmluZyhoZWFkZXIpLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xufVxuXG5mdW5jdGlvbiBub3JtYWxpemVWYWx1ZSh2YWx1ZSkge1xuICBpZiAodmFsdWUgPT09IGZhbHNlIHx8IHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gdXRpbHMuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZS5tYXAobm9ybWFsaXplVmFsdWUpIDogU3RyaW5nKHZhbHVlKTtcbn1cblxuZnVuY3Rpb24gcGFyc2VUb2tlbnMoc3RyKSB7XG4gIGNvbnN0IHRva2VucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIGNvbnN0IHRva2Vuc1JFID0gLyhbXlxccyw7PV0rKVxccyooPzo9XFxzKihbXiw7XSspKT8vZztcbiAgbGV0IG1hdGNoO1xuXG4gIHdoaWxlICgobWF0Y2ggPSB0b2tlbnNSRS5leGVjKHN0cikpKSB7XG4gICAgdG9rZW5zW21hdGNoWzFdXSA9IG1hdGNoWzJdO1xuICB9XG5cbiAgcmV0dXJuIHRva2Vucztcbn1cblxuY29uc3QgaXNWYWxpZEhlYWRlck5hbWUgPSAoc3RyKSA9PiAvXlstX2EtekEtWjAtOV5gfH4sISMkJSYnKisuXSskLy50ZXN0KHN0ci50cmltKCkpO1xuXG5mdW5jdGlvbiBtYXRjaEhlYWRlclZhbHVlKGNvbnRleHQsIHZhbHVlLCBoZWFkZXIsIGZpbHRlciwgaXNIZWFkZXJOYW1lRmlsdGVyKSB7XG4gIGlmICh1dGlscy5pc0Z1bmN0aW9uKGZpbHRlcikpIHtcbiAgICByZXR1cm4gZmlsdGVyLmNhbGwodGhpcywgdmFsdWUsIGhlYWRlcik7XG4gIH1cblxuICBpZiAoaXNIZWFkZXJOYW1lRmlsdGVyKSB7XG4gICAgdmFsdWUgPSBoZWFkZXI7XG4gIH1cblxuICBpZiAoIXV0aWxzLmlzU3RyaW5nKHZhbHVlKSkgcmV0dXJuO1xuXG4gIGlmICh1dGlscy5pc1N0cmluZyhmaWx0ZXIpKSB7XG4gICAgcmV0dXJuIHZhbHVlLmluZGV4T2YoZmlsdGVyKSAhPT0gLTE7XG4gIH1cblxuICBpZiAodXRpbHMuaXNSZWdFeHAoZmlsdGVyKSkge1xuICAgIHJldHVybiBmaWx0ZXIudGVzdCh2YWx1ZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZm9ybWF0SGVhZGVyKGhlYWRlcikge1xuICByZXR1cm4gaGVhZGVyXG4gICAgLnRyaW0oKVxuICAgIC50b0xvd2VyQ2FzZSgpXG4gICAgLnJlcGxhY2UoLyhbYS16XFxkXSkoXFx3KikvZywgKHcsIGNoYXIsIHN0cikgPT4ge1xuICAgICAgcmV0dXJuIGNoYXIudG9VcHBlckNhc2UoKSArIHN0cjtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gYnVpbGRBY2Nlc3NvcnMob2JqLCBoZWFkZXIpIHtcbiAgY29uc3QgYWNjZXNzb3JOYW1lID0gdXRpbHMudG9DYW1lbENhc2UoJyAnICsgaGVhZGVyKTtcblxuICBbJ2dldCcsICdzZXQnLCAnaGFzJ10uZm9yRWFjaCgobWV0aG9kTmFtZSkgPT4ge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIG1ldGhvZE5hbWUgKyBhY2Nlc3Nvck5hbWUsIHtcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiAoYXJnMSwgYXJnMiwgYXJnMykge1xuICAgICAgICByZXR1cm4gdGhpc1ttZXRob2ROYW1lXS5jYWxsKHRoaXMsIGhlYWRlciwgYXJnMSwgYXJnMiwgYXJnMyk7XG4gICAgICB9LFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIH0pO1xuICB9KTtcbn1cblxuY2xhc3MgQXhpb3NIZWFkZXJzIHtcbiAgY29uc3RydWN0b3IoaGVhZGVycykge1xuICAgIGhlYWRlcnMgJiYgdGhpcy5zZXQoaGVhZGVycyk7XG4gIH1cblxuICBzZXQoaGVhZGVyLCB2YWx1ZU9yUmV3cml0ZSwgcmV3cml0ZSkge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuXG4gICAgZnVuY3Rpb24gc2V0SGVhZGVyKF92YWx1ZSwgX2hlYWRlciwgX3Jld3JpdGUpIHtcbiAgICAgIGNvbnN0IGxIZWFkZXIgPSBub3JtYWxpemVIZWFkZXIoX2hlYWRlcik7XG5cbiAgICAgIGlmICghbEhlYWRlcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2hlYWRlciBuYW1lIG11c3QgYmUgYSBub24tZW1wdHkgc3RyaW5nJyk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGtleSA9IHV0aWxzLmZpbmRLZXkoc2VsZiwgbEhlYWRlcik7XG5cbiAgICAgIGlmIChcbiAgICAgICAgIWtleSB8fFxuICAgICAgICBzZWxmW2tleV0gPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICBfcmV3cml0ZSA9PT0gdHJ1ZSB8fFxuICAgICAgICAoX3Jld3JpdGUgPT09IHVuZGVmaW5lZCAmJiBzZWxmW2tleV0gIT09IGZhbHNlKVxuICAgICAgKSB7XG4gICAgICAgIHNlbGZba2V5IHx8IF9oZWFkZXJdID0gbm9ybWFsaXplVmFsdWUoX3ZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBzZXRIZWFkZXJzID0gKGhlYWRlcnMsIF9yZXdyaXRlKSA9PlxuICAgICAgdXRpbHMuZm9yRWFjaChoZWFkZXJzLCAoX3ZhbHVlLCBfaGVhZGVyKSA9PiBzZXRIZWFkZXIoX3ZhbHVlLCBfaGVhZGVyLCBfcmV3cml0ZSkpO1xuXG4gICAgaWYgKHV0aWxzLmlzUGxhaW5PYmplY3QoaGVhZGVyKSB8fCBoZWFkZXIgaW5zdGFuY2VvZiB0aGlzLmNvbnN0cnVjdG9yKSB7XG4gICAgICBzZXRIZWFkZXJzKGhlYWRlciwgdmFsdWVPclJld3JpdGUpO1xuICAgIH0gZWxzZSBpZiAodXRpbHMuaXNTdHJpbmcoaGVhZGVyKSAmJiAoaGVhZGVyID0gaGVhZGVyLnRyaW0oKSkgJiYgIWlzVmFsaWRIZWFkZXJOYW1lKGhlYWRlcikpIHtcbiAgICAgIHNldEhlYWRlcnMocGFyc2VIZWFkZXJzKGhlYWRlciksIHZhbHVlT3JSZXdyaXRlKTtcbiAgICB9IGVsc2UgaWYgKHV0aWxzLmlzT2JqZWN0KGhlYWRlcikgJiYgdXRpbHMuaXNJdGVyYWJsZShoZWFkZXIpKSB7XG4gICAgICBsZXQgb2JqID0ge30sXG4gICAgICAgIGRlc3QsXG4gICAgICAgIGtleTtcbiAgICAgIGZvciAoY29uc3QgZW50cnkgb2YgaGVhZGVyKSB7XG4gICAgICAgIGlmICghdXRpbHMuaXNBcnJheShlbnRyeSkpIHtcbiAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ09iamVjdCBpdGVyYXRvciBtdXN0IHJldHVybiBhIGtleS12YWx1ZSBwYWlyJyk7XG4gICAgICAgIH1cblxuICAgICAgICBvYmpbKGtleSA9IGVudHJ5WzBdKV0gPSAoZGVzdCA9IG9ialtrZXldKVxuICAgICAgICAgID8gdXRpbHMuaXNBcnJheShkZXN0KVxuICAgICAgICAgICAgPyBbLi4uZGVzdCwgZW50cnlbMV1dXG4gICAgICAgICAgICA6IFtkZXN0LCBlbnRyeVsxXV1cbiAgICAgICAgICA6IGVudHJ5WzFdO1xuICAgICAgfVxuXG4gICAgICBzZXRIZWFkZXJzKG9iaiwgdmFsdWVPclJld3JpdGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBoZWFkZXIgIT0gbnVsbCAmJiBzZXRIZWFkZXIodmFsdWVPclJld3JpdGUsIGhlYWRlciwgcmV3cml0ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBnZXQoaGVhZGVyLCBwYXJzZXIpIHtcbiAgICBoZWFkZXIgPSBub3JtYWxpemVIZWFkZXIoaGVhZGVyKTtcblxuICAgIGlmIChoZWFkZXIpIHtcbiAgICAgIGNvbnN0IGtleSA9IHV0aWxzLmZpbmRLZXkodGhpcywgaGVhZGVyKTtcblxuICAgICAgaWYgKGtleSkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXNba2V5XTtcblxuICAgICAgICBpZiAoIXBhcnNlcikge1xuICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYXJzZXIgPT09IHRydWUpIHtcbiAgICAgICAgICByZXR1cm4gcGFyc2VUb2tlbnModmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHV0aWxzLmlzRnVuY3Rpb24ocGFyc2VyKSkge1xuICAgICAgICAgIHJldHVybiBwYXJzZXIuY2FsbCh0aGlzLCB2YWx1ZSwga2V5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1dGlscy5pc1JlZ0V4cChwYXJzZXIpKSB7XG4gICAgICAgICAgcmV0dXJuIHBhcnNlci5leGVjKHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3BhcnNlciBtdXN0IGJlIGJvb2xlYW58cmVnZXhwfGZ1bmN0aW9uJyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaGFzKGhlYWRlciwgbWF0Y2hlcikge1xuICAgIGhlYWRlciA9IG5vcm1hbGl6ZUhlYWRlcihoZWFkZXIpO1xuXG4gICAgaWYgKGhlYWRlcikge1xuICAgICAgY29uc3Qga2V5ID0gdXRpbHMuZmluZEtleSh0aGlzLCBoZWFkZXIpO1xuXG4gICAgICByZXR1cm4gISEoXG4gICAgICAgIGtleSAmJlxuICAgICAgICB0aGlzW2tleV0gIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAoIW1hdGNoZXIgfHwgbWF0Y2hIZWFkZXJWYWx1ZSh0aGlzLCB0aGlzW2tleV0sIGtleSwgbWF0Y2hlcikpXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGRlbGV0ZShoZWFkZXIsIG1hdGNoZXIpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICBsZXQgZGVsZXRlZCA9IGZhbHNlO1xuXG4gICAgZnVuY3Rpb24gZGVsZXRlSGVhZGVyKF9oZWFkZXIpIHtcbiAgICAgIF9oZWFkZXIgPSBub3JtYWxpemVIZWFkZXIoX2hlYWRlcik7XG5cbiAgICAgIGlmIChfaGVhZGVyKSB7XG4gICAgICAgIGNvbnN0IGtleSA9IHV0aWxzLmZpbmRLZXkoc2VsZiwgX2hlYWRlcik7XG5cbiAgICAgICAgaWYgKGtleSAmJiAoIW1hdGNoZXIgfHwgbWF0Y2hIZWFkZXJWYWx1ZShzZWxmLCBzZWxmW2tleV0sIGtleSwgbWF0Y2hlcikpKSB7XG4gICAgICAgICAgZGVsZXRlIHNlbGZba2V5XTtcblxuICAgICAgICAgIGRlbGV0ZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzLmlzQXJyYXkoaGVhZGVyKSkge1xuICAgICAgaGVhZGVyLmZvckVhY2goZGVsZXRlSGVhZGVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVsZXRlSGVhZGVyKGhlYWRlcik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlbGV0ZWQ7XG4gIH1cblxuICBjbGVhcihtYXRjaGVyKSB7XG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMpO1xuICAgIGxldCBpID0ga2V5cy5sZW5ndGg7XG4gICAgbGV0IGRlbGV0ZWQgPSBmYWxzZTtcblxuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIGNvbnN0IGtleSA9IGtleXNbaV07XG4gICAgICBpZiAoIW1hdGNoZXIgfHwgbWF0Y2hIZWFkZXJWYWx1ZSh0aGlzLCB0aGlzW2tleV0sIGtleSwgbWF0Y2hlciwgdHJ1ZSkpIHtcbiAgICAgICAgZGVsZXRlIHRoaXNba2V5XTtcbiAgICAgICAgZGVsZXRlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlbGV0ZWQ7XG4gIH1cblxuICBub3JtYWxpemUoZm9ybWF0KSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgY29uc3QgaGVhZGVycyA9IHt9O1xuXG4gICAgdXRpbHMuZm9yRWFjaCh0aGlzLCAodmFsdWUsIGhlYWRlcikgPT4ge1xuICAgICAgY29uc3Qga2V5ID0gdXRpbHMuZmluZEtleShoZWFkZXJzLCBoZWFkZXIpO1xuXG4gICAgICBpZiAoa2V5KSB7XG4gICAgICAgIHNlbGZba2V5XSA9IG5vcm1hbGl6ZVZhbHVlKHZhbHVlKTtcbiAgICAgICAgZGVsZXRlIHNlbGZbaGVhZGVyXTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBub3JtYWxpemVkID0gZm9ybWF0ID8gZm9ybWF0SGVhZGVyKGhlYWRlcikgOiBTdHJpbmcoaGVhZGVyKS50cmltKCk7XG5cbiAgICAgIGlmIChub3JtYWxpemVkICE9PSBoZWFkZXIpIHtcbiAgICAgICAgZGVsZXRlIHNlbGZbaGVhZGVyXTtcbiAgICAgIH1cblxuICAgICAgc2VsZltub3JtYWxpemVkXSA9IG5vcm1hbGl6ZVZhbHVlKHZhbHVlKTtcblxuICAgICAgaGVhZGVyc1tub3JtYWxpemVkXSA9IHRydWU7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGNvbmNhdCguLi50YXJnZXRzKSB7XG4gICAgcmV0dXJuIHRoaXMuY29uc3RydWN0b3IuY29uY2F0KHRoaXMsIC4uLnRhcmdldHMpO1xuICB9XG5cbiAgdG9KU09OKGFzU3RyaW5ncykge1xuICAgIGNvbnN0IG9iaiA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbiAgICB1dGlscy5mb3JFYWNoKHRoaXMsICh2YWx1ZSwgaGVhZGVyKSA9PiB7XG4gICAgICB2YWx1ZSAhPSBudWxsICYmXG4gICAgICAgIHZhbHVlICE9PSBmYWxzZSAmJlxuICAgICAgICAob2JqW2hlYWRlcl0gPSBhc1N0cmluZ3MgJiYgdXRpbHMuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZS5qb2luKCcsICcpIDogdmFsdWUpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG4gIFtTeW1ib2wuaXRlcmF0b3JdKCkge1xuICAgIHJldHVybiBPYmplY3QuZW50cmllcyh0aGlzLnRvSlNPTigpKVtTeW1ib2wuaXRlcmF0b3JdKCk7XG4gIH1cblxuICB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gT2JqZWN0LmVudHJpZXModGhpcy50b0pTT04oKSlcbiAgICAgIC5tYXAoKFtoZWFkZXIsIHZhbHVlXSkgPT4gaGVhZGVyICsgJzogJyArIHZhbHVlKVxuICAgICAgLmpvaW4oJ1xcbicpO1xuICB9XG5cbiAgZ2V0U2V0Q29va2llKCkge1xuICAgIHJldHVybiB0aGlzLmdldCgnc2V0LWNvb2tpZScpIHx8IFtdO1xuICB9XG5cbiAgZ2V0IFtTeW1ib2wudG9TdHJpbmdUYWddKCkge1xuICAgIHJldHVybiAnQXhpb3NIZWFkZXJzJztcbiAgfVxuXG4gIHN0YXRpYyBmcm9tKHRoaW5nKSB7XG4gICAgcmV0dXJuIHRoaW5nIGluc3RhbmNlb2YgdGhpcyA/IHRoaW5nIDogbmV3IHRoaXModGhpbmcpO1xuICB9XG5cbiAgc3RhdGljIGNvbmNhdChmaXJzdCwgLi4udGFyZ2V0cykge1xuICAgIGNvbnN0IGNvbXB1dGVkID0gbmV3IHRoaXMoZmlyc3QpO1xuXG4gICAgdGFyZ2V0cy5mb3JFYWNoKCh0YXJnZXQpID0+IGNvbXB1dGVkLnNldCh0YXJnZXQpKTtcblxuICAgIHJldHVybiBjb21wdXRlZDtcbiAgfVxuXG4gIHN0YXRpYyBhY2Nlc3NvcihoZWFkZXIpIHtcbiAgICBjb25zdCBpbnRlcm5hbHMgPVxuICAgICAgKHRoaXNbJGludGVybmFsc10gPVxuICAgICAgdGhpc1skaW50ZXJuYWxzXSA9XG4gICAgICAgIHtcbiAgICAgICAgICBhY2Nlc3NvcnM6IHt9LFxuICAgICAgICB9KTtcblxuICAgIGNvbnN0IGFjY2Vzc29ycyA9IGludGVybmFscy5hY2Nlc3NvcnM7XG4gICAgY29uc3QgcHJvdG90eXBlID0gdGhpcy5wcm90b3R5cGU7XG5cbiAgICBmdW5jdGlvbiBkZWZpbmVBY2Nlc3NvcihfaGVhZGVyKSB7XG4gICAgICBjb25zdCBsSGVhZGVyID0gbm9ybWFsaXplSGVhZGVyKF9oZWFkZXIpO1xuXG4gICAgICBpZiAoIWFjY2Vzc29yc1tsSGVhZGVyXSkge1xuICAgICAgICBidWlsZEFjY2Vzc29ycyhwcm90b3R5cGUsIF9oZWFkZXIpO1xuICAgICAgICBhY2Nlc3NvcnNbbEhlYWRlcl0gPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHV0aWxzLmlzQXJyYXkoaGVhZGVyKSA/IGhlYWRlci5mb3JFYWNoKGRlZmluZUFjY2Vzc29yKSA6IGRlZmluZUFjY2Vzc29yKGhlYWRlcik7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuXG5BeGlvc0hlYWRlcnMuYWNjZXNzb3IoW1xuICAnQ29udGVudC1UeXBlJyxcbiAgJ0NvbnRlbnQtTGVuZ3RoJyxcbiAgJ0FjY2VwdCcsXG4gICdBY2NlcHQtRW5jb2RpbmcnLFxuICAnVXNlci1BZ2VudCcsXG4gICdBdXRob3JpemF0aW9uJyxcbl0pO1xuXG4vLyByZXNlcnZlZCBuYW1lcyBob3RmaXhcbnV0aWxzLnJlZHVjZURlc2NyaXB0b3JzKEF4aW9zSGVhZGVycy5wcm90b3R5cGUsICh7IHZhbHVlIH0sIGtleSkgPT4ge1xuICBsZXQgbWFwcGVkID0ga2V5WzBdLnRvVXBwZXJDYXNlKCkgKyBrZXkuc2xpY2UoMSk7IC8vIG1hcCBgc2V0YCA9PiBgU2V0YFxuICByZXR1cm4ge1xuICAgIGdldDogKCkgPT4gdmFsdWUsXG4gICAgc2V0KGhlYWRlclZhbHVlKSB7XG4gICAgICB0aGlzW21hcHBlZF0gPSBoZWFkZXJWYWx1ZTtcbiAgICB9LFxuICB9O1xufSk7XG5cbnV0aWxzLmZyZWV6ZU1ldGhvZHMoQXhpb3NIZWFkZXJzKTtcblxuZXhwb3J0IGRlZmF1bHQgQXhpb3NIZWFkZXJzO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IGRlZmF1bHRzIGZyb20gJy4uL2RlZmF1bHRzL2luZGV4LmpzJztcbmltcG9ydCBBeGlvc0hlYWRlcnMgZnJvbSAnLi4vY29yZS9BeGlvc0hlYWRlcnMuanMnO1xuXG4vKipcbiAqIFRyYW5zZm9ybSB0aGUgZGF0YSBmb3IgYSByZXF1ZXN0IG9yIGEgcmVzcG9uc2VcbiAqXG4gKiBAcGFyYW0ge0FycmF5fEZ1bmN0aW9ufSBmbnMgQSBzaW5nbGUgZnVuY3Rpb24gb3IgQXJyYXkgb2YgZnVuY3Rpb25zXG4gKiBAcGFyYW0gez9PYmplY3R9IHJlc3BvbnNlIFRoZSByZXNwb25zZSBvYmplY3RcbiAqXG4gKiBAcmV0dXJucyB7Kn0gVGhlIHJlc3VsdGluZyB0cmFuc2Zvcm1lZCBkYXRhXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRyYW5zZm9ybURhdGEoZm5zLCByZXNwb25zZSkge1xuICBjb25zdCBjb25maWcgPSB0aGlzIHx8IGRlZmF1bHRzO1xuICBjb25zdCBjb250ZXh0ID0gcmVzcG9uc2UgfHwgY29uZmlnO1xuICBjb25zdCBoZWFkZXJzID0gQXhpb3NIZWFkZXJzLmZyb20oY29udGV4dC5oZWFkZXJzKTtcbiAgbGV0IGRhdGEgPSBjb250ZXh0LmRhdGE7XG5cbiAgdXRpbHMuZm9yRWFjaChmbnMsIGZ1bmN0aW9uIHRyYW5zZm9ybShmbikge1xuICAgIGRhdGEgPSBmbi5jYWxsKGNvbmZpZywgZGF0YSwgaGVhZGVycy5ub3JtYWxpemUoKSwgcmVzcG9uc2UgPyByZXNwb25zZS5zdGF0dXMgOiB1bmRlZmluZWQpO1xuICB9KTtcblxuICBoZWFkZXJzLm5vcm1hbGl6ZSgpO1xuXG4gIHJldHVybiBkYXRhO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc0NhbmNlbCh2YWx1ZSkge1xuICByZXR1cm4gISEodmFsdWUgJiYgdmFsdWUuX19DQU5DRUxfXyk7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gJy4uL2NvcmUvQXhpb3NFcnJvci5qcyc7XG5cbmNsYXNzIENhbmNlbGVkRXJyb3IgZXh0ZW5kcyBBeGlvc0Vycm9yIHtcbiAgLyoqXG4gICAqIEEgYENhbmNlbGVkRXJyb3JgIGlzIGFuIG9iamVjdCB0aGF0IGlzIHRocm93biB3aGVuIGFuIG9wZXJhdGlvbiBpcyBjYW5jZWxlZC5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmc9fSBtZXNzYWdlIFRoZSBtZXNzYWdlLlxuICAgKiBAcGFyYW0ge09iamVjdD19IGNvbmZpZyBUaGUgY29uZmlnLlxuICAgKiBAcGFyYW0ge09iamVjdD19IHJlcXVlc3QgVGhlIHJlcXVlc3QuXG4gICAqXG4gICAqIEByZXR1cm5zIHtDYW5jZWxlZEVycm9yfSBUaGUgY3JlYXRlZCBlcnJvci5cbiAgICovXG4gIGNvbnN0cnVjdG9yKG1lc3NhZ2UsIGNvbmZpZywgcmVxdWVzdCkge1xuICAgIHN1cGVyKG1lc3NhZ2UgPT0gbnVsbCA/ICdjYW5jZWxlZCcgOiBtZXNzYWdlLCBBeGlvc0Vycm9yLkVSUl9DQU5DRUxFRCwgY29uZmlnLCByZXF1ZXN0KTtcbiAgICB0aGlzLm5hbWUgPSAnQ2FuY2VsZWRFcnJvcic7XG4gICAgdGhpcy5fX0NBTkNFTF9fID0gdHJ1ZTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDYW5jZWxlZEVycm9yO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgQXhpb3NFcnJvciBmcm9tICcuL0F4aW9zRXJyb3IuanMnO1xuXG4vKipcbiAqIFJlc29sdmUgb3IgcmVqZWN0IGEgUHJvbWlzZSBiYXNlZCBvbiByZXNwb25zZSBzdGF0dXMuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVzb2x2ZSBBIGZ1bmN0aW9uIHRoYXQgcmVzb2x2ZXMgdGhlIHByb21pc2UuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWplY3QgQSBmdW5jdGlvbiB0aGF0IHJlamVjdHMgdGhlIHByb21pc2UuXG4gKiBAcGFyYW0ge29iamVjdH0gcmVzcG9uc2UgVGhlIHJlc3BvbnNlLlxuICpcbiAqIEByZXR1cm5zIHtvYmplY3R9IFRoZSByZXNwb25zZS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgcmVzcG9uc2UpIHtcbiAgY29uc3QgdmFsaWRhdGVTdGF0dXMgPSByZXNwb25zZS5jb25maWcudmFsaWRhdGVTdGF0dXM7XG4gIGlmICghcmVzcG9uc2Uuc3RhdHVzIHx8ICF2YWxpZGF0ZVN0YXR1cyB8fCB2YWxpZGF0ZVN0YXR1cyhyZXNwb25zZS5zdGF0dXMpKSB7XG4gICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gIH0gZWxzZSB7XG4gICAgcmVqZWN0KFxuICAgICAgbmV3IEF4aW9zRXJyb3IoXG4gICAgICAgICdSZXF1ZXN0IGZhaWxlZCB3aXRoIHN0YXR1cyBjb2RlICcgKyByZXNwb25zZS5zdGF0dXMsXG4gICAgICAgIFtBeGlvc0Vycm9yLkVSUl9CQURfUkVRVUVTVCwgQXhpb3NFcnJvci5FUlJfQkFEX1JFU1BPTlNFXVtcbiAgICAgICAgICBNYXRoLmZsb29yKHJlc3BvbnNlLnN0YXR1cyAvIDEwMCkgLSA0XG4gICAgICAgIF0sXG4gICAgICAgIHJlc3BvbnNlLmNvbmZpZyxcbiAgICAgICAgcmVzcG9uc2UucmVxdWVzdCxcbiAgICAgICAgcmVzcG9uc2VcbiAgICAgIClcbiAgICApO1xuICB9XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBhcnNlUHJvdG9jb2wodXJsKSB7XG4gIGNvbnN0IG1hdGNoID0gL14oWy0rXFx3XXsxLDI1fSkoOj9cXC9cXC98OikvLmV4ZWModXJsKTtcbiAgcmV0dXJuIChtYXRjaCAmJiBtYXRjaFsxXSkgfHwgJyc7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQ2FsY3VsYXRlIGRhdGEgbWF4UmF0ZVxuICogQHBhcmFtIHtOdW1iZXJ9IFtzYW1wbGVzQ291bnQ9IDEwXVxuICogQHBhcmFtIHtOdW1iZXJ9IFttaW49IDEwMDBdXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cbmZ1bmN0aW9uIHNwZWVkb21ldGVyKHNhbXBsZXNDb3VudCwgbWluKSB7XG4gIHNhbXBsZXNDb3VudCA9IHNhbXBsZXNDb3VudCB8fCAxMDtcbiAgY29uc3QgYnl0ZXMgPSBuZXcgQXJyYXkoc2FtcGxlc0NvdW50KTtcbiAgY29uc3QgdGltZXN0YW1wcyA9IG5ldyBBcnJheShzYW1wbGVzQ291bnQpO1xuICBsZXQgaGVhZCA9IDA7XG4gIGxldCB0YWlsID0gMDtcbiAgbGV0IGZpcnN0U2FtcGxlVFM7XG5cbiAgbWluID0gbWluICE9PSB1bmRlZmluZWQgPyBtaW4gOiAxMDAwO1xuXG4gIHJldHVybiBmdW5jdGlvbiBwdXNoKGNodW5rTGVuZ3RoKSB7XG4gICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcblxuICAgIGNvbnN0IHN0YXJ0ZWRBdCA9IHRpbWVzdGFtcHNbdGFpbF07XG5cbiAgICBpZiAoIWZpcnN0U2FtcGxlVFMpIHtcbiAgICAgIGZpcnN0U2FtcGxlVFMgPSBub3c7XG4gICAgfVxuXG4gICAgYnl0ZXNbaGVhZF0gPSBjaHVua0xlbmd0aDtcbiAgICB0aW1lc3RhbXBzW2hlYWRdID0gbm93O1xuXG4gICAgbGV0IGkgPSB0YWlsO1xuICAgIGxldCBieXRlc0NvdW50ID0gMDtcblxuICAgIHdoaWxlIChpICE9PSBoZWFkKSB7XG4gICAgICBieXRlc0NvdW50ICs9IGJ5dGVzW2krK107XG4gICAgICBpID0gaSAlIHNhbXBsZXNDb3VudDtcbiAgICB9XG5cbiAgICBoZWFkID0gKGhlYWQgKyAxKSAlIHNhbXBsZXNDb3VudDtcblxuICAgIGlmIChoZWFkID09PSB0YWlsKSB7XG4gICAgICB0YWlsID0gKHRhaWwgKyAxKSAlIHNhbXBsZXNDb3VudDtcbiAgICB9XG5cbiAgICBpZiAobm93IC0gZmlyc3RTYW1wbGVUUyA8IG1pbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHBhc3NlZCA9IHN0YXJ0ZWRBdCAmJiBub3cgLSBzdGFydGVkQXQ7XG5cbiAgICByZXR1cm4gcGFzc2VkID8gTWF0aC5yb3VuZCgoYnl0ZXNDb3VudCAqIDEwMDApIC8gcGFzc2VkKSA6IHVuZGVmaW5lZDtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc3BlZWRvbWV0ZXI7XG4iLCIvKipcbiAqIFRocm90dGxlIGRlY29yYXRvclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSB7TnVtYmVyfSBmcmVxXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqL1xuZnVuY3Rpb24gdGhyb3R0bGUoZm4sIGZyZXEpIHtcbiAgbGV0IHRpbWVzdGFtcCA9IDA7XG4gIGxldCB0aHJlc2hvbGQgPSAxMDAwIC8gZnJlcTtcbiAgbGV0IGxhc3RBcmdzO1xuICBsZXQgdGltZXI7XG5cbiAgY29uc3QgaW52b2tlID0gKGFyZ3MsIG5vdyA9IERhdGUubm93KCkpID0+IHtcbiAgICB0aW1lc3RhbXAgPSBub3c7XG4gICAgbGFzdEFyZ3MgPSBudWxsO1xuICAgIGlmICh0aW1lcikge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgIHRpbWVyID0gbnVsbDtcbiAgICB9XG4gICAgZm4oLi4uYXJncyk7XG4gIH07XG5cbiAgY29uc3QgdGhyb3R0bGVkID0gKC4uLmFyZ3MpID0+IHtcbiAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgIGNvbnN0IHBhc3NlZCA9IG5vdyAtIHRpbWVzdGFtcDtcbiAgICBpZiAocGFzc2VkID49IHRocmVzaG9sZCkge1xuICAgICAgaW52b2tlKGFyZ3MsIG5vdyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxhc3RBcmdzID0gYXJncztcbiAgICAgIGlmICghdGltZXIpIHtcbiAgICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aW1lciA9IG51bGw7XG4gICAgICAgICAgaW52b2tlKGxhc3RBcmdzKTtcbiAgICAgICAgfSwgdGhyZXNob2xkIC0gcGFzc2VkKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZmx1c2ggPSAoKSA9PiBsYXN0QXJncyAmJiBpbnZva2UobGFzdEFyZ3MpO1xuXG4gIHJldHVybiBbdGhyb3R0bGVkLCBmbHVzaF07XG59XG5cbmV4cG9ydCBkZWZhdWx0IHRocm90dGxlO1xuIiwiaW1wb3J0IHNwZWVkb21ldGVyIGZyb20gJy4vc3BlZWRvbWV0ZXIuanMnO1xuaW1wb3J0IHRocm90dGxlIGZyb20gJy4vdGhyb3R0bGUuanMnO1xuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcblxuZXhwb3J0IGNvbnN0IHByb2dyZXNzRXZlbnRSZWR1Y2VyID0gKGxpc3RlbmVyLCBpc0Rvd25sb2FkU3RyZWFtLCBmcmVxID0gMykgPT4ge1xuICBsZXQgYnl0ZXNOb3RpZmllZCA9IDA7XG4gIGNvbnN0IF9zcGVlZG9tZXRlciA9IHNwZWVkb21ldGVyKDUwLCAyNTApO1xuXG4gIHJldHVybiB0aHJvdHRsZSgoZSkgPT4ge1xuICAgIGNvbnN0IGxvYWRlZCA9IGUubG9hZGVkO1xuICAgIGNvbnN0IHRvdGFsID0gZS5sZW5ndGhDb21wdXRhYmxlID8gZS50b3RhbCA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCBwcm9ncmVzc0J5dGVzID0gbG9hZGVkIC0gYnl0ZXNOb3RpZmllZDtcbiAgICBjb25zdCByYXRlID0gX3NwZWVkb21ldGVyKHByb2dyZXNzQnl0ZXMpO1xuICAgIGNvbnN0IGluUmFuZ2UgPSBsb2FkZWQgPD0gdG90YWw7XG5cbiAgICBieXRlc05vdGlmaWVkID0gbG9hZGVkO1xuXG4gICAgY29uc3QgZGF0YSA9IHtcbiAgICAgIGxvYWRlZCxcbiAgICAgIHRvdGFsLFxuICAgICAgcHJvZ3Jlc3M6IHRvdGFsID8gbG9hZGVkIC8gdG90YWwgOiB1bmRlZmluZWQsXG4gICAgICBieXRlczogcHJvZ3Jlc3NCeXRlcyxcbiAgICAgIHJhdGU6IHJhdGUgPyByYXRlIDogdW5kZWZpbmVkLFxuICAgICAgZXN0aW1hdGVkOiByYXRlICYmIHRvdGFsICYmIGluUmFuZ2UgPyAodG90YWwgLSBsb2FkZWQpIC8gcmF0ZSA6IHVuZGVmaW5lZCxcbiAgICAgIGV2ZW50OiBlLFxuICAgICAgbGVuZ3RoQ29tcHV0YWJsZTogdG90YWwgIT0gbnVsbCxcbiAgICAgIFtpc0Rvd25sb2FkU3RyZWFtID8gJ2Rvd25sb2FkJyA6ICd1cGxvYWQnXTogdHJ1ZSxcbiAgICB9O1xuXG4gICAgbGlzdGVuZXIoZGF0YSk7XG4gIH0sIGZyZXEpO1xufTtcblxuZXhwb3J0IGNvbnN0IHByb2dyZXNzRXZlbnREZWNvcmF0b3IgPSAodG90YWwsIHRocm90dGxlZCkgPT4ge1xuICBjb25zdCBsZW5ndGhDb21wdXRhYmxlID0gdG90YWwgIT0gbnVsbDtcblxuICByZXR1cm4gW1xuICAgIChsb2FkZWQpID0+XG4gICAgICB0aHJvdHRsZWRbMF0oe1xuICAgICAgICBsZW5ndGhDb21wdXRhYmxlLFxuICAgICAgICB0b3RhbCxcbiAgICAgICAgbG9hZGVkLFxuICAgICAgfSksXG4gICAgdGhyb3R0bGVkWzFdLFxuICBdO1xufTtcblxuZXhwb3J0IGNvbnN0IGFzeW5jRGVjb3JhdG9yID1cbiAgKGZuKSA9PlxuICAoLi4uYXJncykgPT5cbiAgICB1dGlscy5hc2FwKCgpID0+IGZuKC4uLmFyZ3MpKTtcbiIsImltcG9ydCBwbGF0Zm9ybSBmcm9tICcuLi9wbGF0Zm9ybS9pbmRleC5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IHBsYXRmb3JtLmhhc1N0YW5kYXJkQnJvd3NlckVudlxuICA/ICgob3JpZ2luLCBpc01TSUUpID0+ICh1cmwpID0+IHtcbiAgICAgIHVybCA9IG5ldyBVUkwodXJsLCBwbGF0Zm9ybS5vcmlnaW4pO1xuXG4gICAgICByZXR1cm4gKFxuICAgICAgICBvcmlnaW4ucHJvdG9jb2wgPT09IHVybC5wcm90b2NvbCAmJlxuICAgICAgICBvcmlnaW4uaG9zdCA9PT0gdXJsLmhvc3QgJiZcbiAgICAgICAgKGlzTVNJRSB8fCBvcmlnaW4ucG9ydCA9PT0gdXJsLnBvcnQpXG4gICAgICApO1xuICAgIH0pKFxuICAgICAgbmV3IFVSTChwbGF0Zm9ybS5vcmlnaW4pLFxuICAgICAgcGxhdGZvcm0ubmF2aWdhdG9yICYmIC8obXNpZXx0cmlkZW50KS9pLnRlc3QocGxhdGZvcm0ubmF2aWdhdG9yLnVzZXJBZ2VudClcbiAgICApXG4gIDogKCkgPT4gdHJ1ZTtcbiIsImltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy5qcyc7XG5pbXBvcnQgcGxhdGZvcm0gZnJvbSAnLi4vcGxhdGZvcm0vaW5kZXguanMnO1xuXG5leHBvcnQgZGVmYXVsdCBwbGF0Zm9ybS5oYXNTdGFuZGFyZEJyb3dzZXJFbnZcbiAgPyAvLyBTdGFuZGFyZCBicm93c2VyIGVudnMgc3VwcG9ydCBkb2N1bWVudC5jb29raWVcbiAgICB7XG4gICAgICB3cml0ZShuYW1lLCB2YWx1ZSwgZXhwaXJlcywgcGF0aCwgZG9tYWluLCBzZWN1cmUsIHNhbWVTaXRlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgY29va2llID0gW2Ake25hbWV9PSR7ZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKX1gXTtcblxuICAgICAgICBpZiAodXRpbHMuaXNOdW1iZXIoZXhwaXJlcykpIHtcbiAgICAgICAgICBjb29raWUucHVzaChgZXhwaXJlcz0ke25ldyBEYXRlKGV4cGlyZXMpLnRvVVRDU3RyaW5nKCl9YCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHV0aWxzLmlzU3RyaW5nKHBhdGgpKSB7XG4gICAgICAgICAgY29va2llLnB1c2goYHBhdGg9JHtwYXRofWApO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1dGlscy5pc1N0cmluZyhkb21haW4pKSB7XG4gICAgICAgICAgY29va2llLnB1c2goYGRvbWFpbj0ke2RvbWFpbn1gKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2VjdXJlID09PSB0cnVlKSB7XG4gICAgICAgICAgY29va2llLnB1c2goJ3NlY3VyZScpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1dGlscy5pc1N0cmluZyhzYW1lU2l0ZSkpIHtcbiAgICAgICAgICBjb29raWUucHVzaChgU2FtZVNpdGU9JHtzYW1lU2l0ZX1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGNvb2tpZS5qb2luKCc7ICcpO1xuICAgICAgfSxcblxuICAgICAgcmVhZChuYW1lKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnKSByZXR1cm4gbnVsbDtcbiAgICAgICAgY29uc3QgbWF0Y2ggPSBkb2N1bWVudC5jb29raWUubWF0Y2gobmV3IFJlZ0V4cCgnKD86Xnw7ICknICsgbmFtZSArICc9KFteO10qKScpKTtcbiAgICAgICAgcmV0dXJuIG1hdGNoID8gZGVjb2RlVVJJQ29tcG9uZW50KG1hdGNoWzFdKSA6IG51bGw7XG4gICAgICB9LFxuXG4gICAgICByZW1vdmUobmFtZSkge1xuICAgICAgICB0aGlzLndyaXRlKG5hbWUsICcnLCBEYXRlLm5vdygpIC0gODY0MDAwMDAsICcvJyk7XG4gICAgICB9LFxuICAgIH1cbiAgOiAvLyBOb24tc3RhbmRhcmQgYnJvd3NlciBlbnYgKHdlYiB3b3JrZXJzLCByZWFjdC1uYXRpdmUpIGxhY2sgbmVlZGVkIHN1cHBvcnQuXG4gICAge1xuICAgICAgd3JpdGUoKSB7fSxcbiAgICAgIHJlYWQoKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfSxcbiAgICAgIHJlbW92ZSgpIHt9LFxuICAgIH07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgVVJMIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgc3BlY2lmaWVkIFVSTCBpcyBhYnNvbHV0ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzQWJzb2x1dGVVUkwodXJsKSB7XG4gIC8vIEEgVVJMIGlzIGNvbnNpZGVyZWQgYWJzb2x1dGUgaWYgaXQgYmVnaW5zIHdpdGggXCI8c2NoZW1lPjovL1wiIG9yIFwiLy9cIiAocHJvdG9jb2wtcmVsYXRpdmUgVVJMKS5cbiAgLy8gUkZDIDM5ODYgZGVmaW5lcyBzY2hlbWUgbmFtZSBhcyBhIHNlcXVlbmNlIG9mIGNoYXJhY3RlcnMgYmVnaW5uaW5nIHdpdGggYSBsZXR0ZXIgYW5kIGZvbGxvd2VkXG4gIC8vIGJ5IGFueSBjb21iaW5hdGlvbiBvZiBsZXR0ZXJzLCBkaWdpdHMsIHBsdXMsIHBlcmlvZCwgb3IgaHlwaGVuLlxuICBpZiAodHlwZW9mIHVybCAhPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gL14oW2Etel1bYS16XFxkK1xcLS5dKjopP1xcL1xcLy9pLnRlc3QodXJsKTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFVSTCBieSBjb21iaW5pbmcgdGhlIHNwZWNpZmllZCBVUkxzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVUkwgVGhlIGJhc2UgVVJMXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpdmVVUkwgVGhlIHJlbGF0aXZlIFVSTFxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjb21iaW5lZCBVUkxcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29tYmluZVVSTHMoYmFzZVVSTCwgcmVsYXRpdmVVUkwpIHtcbiAgcmV0dXJuIHJlbGF0aXZlVVJMXG4gICAgPyBiYXNlVVJMLnJlcGxhY2UoL1xcLz9cXC8kLywgJycpICsgJy8nICsgcmVsYXRpdmVVUkwucmVwbGFjZSgvXlxcLysvLCAnJylcbiAgICA6IGJhc2VVUkw7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBpc0Fic29sdXRlVVJMIGZyb20gJy4uL2hlbHBlcnMvaXNBYnNvbHV0ZVVSTC5qcyc7XG5pbXBvcnQgY29tYmluZVVSTHMgZnJvbSAnLi4vaGVscGVycy9jb21iaW5lVVJMcy5qcyc7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBVUkwgYnkgY29tYmluaW5nIHRoZSBiYXNlVVJMIHdpdGggdGhlIHJlcXVlc3RlZFVSTCxcbiAqIG9ubHkgd2hlbiB0aGUgcmVxdWVzdGVkVVJMIGlzIG5vdCBhbHJlYWR5IGFuIGFic29sdXRlIFVSTC5cbiAqIElmIHRoZSByZXF1ZXN0VVJMIGlzIGFic29sdXRlLCB0aGlzIGZ1bmN0aW9uIHJldHVybnMgdGhlIHJlcXVlc3RlZFVSTCB1bnRvdWNoZWQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVUkwgVGhlIGJhc2UgVVJMXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVxdWVzdGVkVVJMIEFic29sdXRlIG9yIHJlbGF0aXZlIFVSTCB0byBjb21iaW5lXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbWJpbmVkIGZ1bGwgcGF0aFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZEZ1bGxQYXRoKGJhc2VVUkwsIHJlcXVlc3RlZFVSTCwgYWxsb3dBYnNvbHV0ZVVybHMpIHtcbiAgbGV0IGlzUmVsYXRpdmVVcmwgPSAhaXNBYnNvbHV0ZVVSTChyZXF1ZXN0ZWRVUkwpO1xuICBpZiAoYmFzZVVSTCAmJiAoaXNSZWxhdGl2ZVVybCB8fCBhbGxvd0Fic29sdXRlVXJscyA9PSBmYWxzZSkpIHtcbiAgICByZXR1cm4gY29tYmluZVVSTHMoYmFzZVVSTCwgcmVxdWVzdGVkVVJMKTtcbiAgfVxuICByZXR1cm4gcmVxdWVzdGVkVVJMO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IEF4aW9zSGVhZGVycyBmcm9tICcuL0F4aW9zSGVhZGVycy5qcyc7XG5cbmNvbnN0IGhlYWRlcnNUb09iamVjdCA9ICh0aGluZykgPT4gKHRoaW5nIGluc3RhbmNlb2YgQXhpb3NIZWFkZXJzID8geyAuLi50aGluZyB9IDogdGhpbmcpO1xuXG4vKipcbiAqIENvbmZpZy1zcGVjaWZpYyBtZXJnZS1mdW5jdGlvbiB3aGljaCBjcmVhdGVzIGEgbmV3IGNvbmZpZy1vYmplY3RcbiAqIGJ5IG1lcmdpbmcgdHdvIGNvbmZpZ3VyYXRpb24gb2JqZWN0cyB0b2dldGhlci5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnMVxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZzJcbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBOZXcgb2JqZWN0IHJlc3VsdGluZyBmcm9tIG1lcmdpbmcgY29uZmlnMiB0byBjb25maWcxXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1lcmdlQ29uZmlnKGNvbmZpZzEsIGNvbmZpZzIpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gIGNvbmZpZzIgPSBjb25maWcyIHx8IHt9O1xuICBjb25zdCBjb25maWcgPSB7fTtcblxuICBmdW5jdGlvbiBnZXRNZXJnZWRWYWx1ZSh0YXJnZXQsIHNvdXJjZSwgcHJvcCwgY2FzZWxlc3MpIHtcbiAgICBpZiAodXRpbHMuaXNQbGFpbk9iamVjdCh0YXJnZXQpICYmIHV0aWxzLmlzUGxhaW5PYmplY3Qoc291cmNlKSkge1xuICAgICAgcmV0dXJuIHV0aWxzLm1lcmdlLmNhbGwoeyBjYXNlbGVzcyB9LCB0YXJnZXQsIHNvdXJjZSk7XG4gICAgfSBlbHNlIGlmICh1dGlscy5pc1BsYWluT2JqZWN0KHNvdXJjZSkpIHtcbiAgICAgIHJldHVybiB1dGlscy5tZXJnZSh7fSwgc291cmNlKTtcbiAgICB9IGVsc2UgaWYgKHV0aWxzLmlzQXJyYXkoc291cmNlKSkge1xuICAgICAgcmV0dXJuIHNvdXJjZS5zbGljZSgpO1xuICAgIH1cbiAgICByZXR1cm4gc291cmNlO1xuICB9XG5cbiAgZnVuY3Rpb24gbWVyZ2VEZWVwUHJvcGVydGllcyhhLCBiLCBwcm9wLCBjYXNlbGVzcykge1xuICAgIGlmICghdXRpbHMuaXNVbmRlZmluZWQoYikpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZShhLCBiLCBwcm9wLCBjYXNlbGVzcyk7XG4gICAgfSBlbHNlIGlmICghdXRpbHMuaXNVbmRlZmluZWQoYSkpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGEsIHByb3AsIGNhc2VsZXNzKTtcbiAgICB9XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbiAgZnVuY3Rpb24gdmFsdWVGcm9tQ29uZmlnMihhLCBiKSB7XG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChiKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgYik7XG4gICAgfVxuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbnNpc3RlbnQtcmV0dXJuXG4gIGZ1bmN0aW9uIGRlZmF1bHRUb0NvbmZpZzIoYSwgYikge1xuICAgIGlmICghdXRpbHMuaXNVbmRlZmluZWQoYikpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGIpO1xuICAgIH0gZWxzZSBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGEpKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBhKTtcbiAgICB9XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbiAgZnVuY3Rpb24gbWVyZ2VEaXJlY3RLZXlzKGEsIGIsIHByb3ApIHtcbiAgICBpZiAocHJvcCBpbiBjb25maWcyKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUoYSwgYik7XG4gICAgfSBlbHNlIGlmIChwcm9wIGluIGNvbmZpZzEpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGEpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IG1lcmdlTWFwID0ge1xuICAgIHVybDogdmFsdWVGcm9tQ29uZmlnMixcbiAgICBtZXRob2Q6IHZhbHVlRnJvbUNvbmZpZzIsXG4gICAgZGF0YTogdmFsdWVGcm9tQ29uZmlnMixcbiAgICBiYXNlVVJMOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHRyYW5zZm9ybVJlcXVlc3Q6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgdHJhbnNmb3JtUmVzcG9uc2U6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgcGFyYW1zU2VyaWFsaXplcjogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB0aW1lb3V0OiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHRpbWVvdXRNZXNzYWdlOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHdpdGhDcmVkZW50aWFsczogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB3aXRoWFNSRlRva2VuOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIGFkYXB0ZXI6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgcmVzcG9uc2VUeXBlOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHhzcmZDb29raWVOYW1lOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHhzcmZIZWFkZXJOYW1lOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIG9uVXBsb2FkUHJvZ3Jlc3M6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgb25Eb3dubG9hZFByb2dyZXNzOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIGRlY29tcHJlc3M6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgbWF4Q29udGVudExlbmd0aDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBtYXhCb2R5TGVuZ3RoOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIGJlZm9yZVJlZGlyZWN0OiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHRyYW5zcG9ydDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBodHRwQWdlbnQ6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgaHR0cHNBZ2VudDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBjYW5jZWxUb2tlbjogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBzb2NrZXRQYXRoOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHJlc3BvbnNlRW5jb2Rpbmc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgdmFsaWRhdGVTdGF0dXM6IG1lcmdlRGlyZWN0S2V5cyxcbiAgICBoZWFkZXJzOiAoYSwgYiwgcHJvcCkgPT5cbiAgICAgIG1lcmdlRGVlcFByb3BlcnRpZXMoaGVhZGVyc1RvT2JqZWN0KGEpLCBoZWFkZXJzVG9PYmplY3QoYiksIHByb3AsIHRydWUpLFxuICB9O1xuXG4gIHV0aWxzLmZvckVhY2goT2JqZWN0LmtleXMoeyAuLi5jb25maWcxLCAuLi5jb25maWcyIH0pLCBmdW5jdGlvbiBjb21wdXRlQ29uZmlnVmFsdWUocHJvcCkge1xuICAgIGlmIChwcm9wID09PSAnX19wcm90b19fJyB8fCBwcm9wID09PSAnY29uc3RydWN0b3InIHx8IHByb3AgPT09ICdwcm90b3R5cGUnKSByZXR1cm47XG4gICAgY29uc3QgbWVyZ2UgPSB1dGlscy5oYXNPd25Qcm9wKG1lcmdlTWFwLCBwcm9wKSA/IG1lcmdlTWFwW3Byb3BdIDogbWVyZ2VEZWVwUHJvcGVydGllcztcbiAgICBjb25zdCBjb25maWdWYWx1ZSA9IG1lcmdlKGNvbmZpZzFbcHJvcF0sIGNvbmZpZzJbcHJvcF0sIHByb3ApO1xuICAgICh1dGlscy5pc1VuZGVmaW5lZChjb25maWdWYWx1ZSkgJiYgbWVyZ2UgIT09IG1lcmdlRGlyZWN0S2V5cykgfHwgKGNvbmZpZ1twcm9wXSA9IGNvbmZpZ1ZhbHVlKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGNvbmZpZztcbn1cbiIsImltcG9ydCBwbGF0Zm9ybSBmcm9tICcuLi9wbGF0Zm9ybS9pbmRleC5qcyc7XG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IGlzVVJMU2FtZU9yaWdpbiBmcm9tICcuL2lzVVJMU2FtZU9yaWdpbi5qcyc7XG5pbXBvcnQgY29va2llcyBmcm9tICcuL2Nvb2tpZXMuanMnO1xuaW1wb3J0IGJ1aWxkRnVsbFBhdGggZnJvbSAnLi4vY29yZS9idWlsZEZ1bGxQYXRoLmpzJztcbmltcG9ydCBtZXJnZUNvbmZpZyBmcm9tICcuLi9jb3JlL21lcmdlQ29uZmlnLmpzJztcbmltcG9ydCBBeGlvc0hlYWRlcnMgZnJvbSAnLi4vY29yZS9BeGlvc0hlYWRlcnMuanMnO1xuaW1wb3J0IGJ1aWxkVVJMIGZyb20gJy4vYnVpbGRVUkwuanMnO1xuXG5leHBvcnQgZGVmYXVsdCAoY29uZmlnKSA9PiB7XG4gIGNvbnN0IG5ld0NvbmZpZyA9IG1lcmdlQ29uZmlnKHt9LCBjb25maWcpO1xuXG4gIGxldCB7IGRhdGEsIHdpdGhYU1JGVG9rZW4sIHhzcmZIZWFkZXJOYW1lLCB4c3JmQ29va2llTmFtZSwgaGVhZGVycywgYXV0aCB9ID0gbmV3Q29uZmlnO1xuXG4gIG5ld0NvbmZpZy5oZWFkZXJzID0gaGVhZGVycyA9IEF4aW9zSGVhZGVycy5mcm9tKGhlYWRlcnMpO1xuXG4gIG5ld0NvbmZpZy51cmwgPSBidWlsZFVSTChcbiAgICBidWlsZEZ1bGxQYXRoKG5ld0NvbmZpZy5iYXNlVVJMLCBuZXdDb25maWcudXJsLCBuZXdDb25maWcuYWxsb3dBYnNvbHV0ZVVybHMpLFxuICAgIGNvbmZpZy5wYXJhbXMsXG4gICAgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXJcbiAgKTtcblxuICAvLyBIVFRQIGJhc2ljIGF1dGhlbnRpY2F0aW9uXG4gIGlmIChhdXRoKSB7XG4gICAgaGVhZGVycy5zZXQoXG4gICAgICAnQXV0aG9yaXphdGlvbicsXG4gICAgICAnQmFzaWMgJyArXG4gICAgICAgIGJ0b2EoXG4gICAgICAgICAgKGF1dGgudXNlcm5hbWUgfHwgJycpICtcbiAgICAgICAgICAgICc6JyArXG4gICAgICAgICAgICAoYXV0aC5wYXNzd29yZCA/IHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChhdXRoLnBhc3N3b3JkKSkgOiAnJylcbiAgICAgICAgKVxuICAgICk7XG4gIH1cblxuICBpZiAodXRpbHMuaXNGb3JtRGF0YShkYXRhKSkge1xuICAgIGlmIChwbGF0Zm9ybS5oYXNTdGFuZGFyZEJyb3dzZXJFbnYgfHwgcGxhdGZvcm0uaGFzU3RhbmRhcmRCcm93c2VyV2ViV29ya2VyRW52KSB7XG4gICAgICBoZWFkZXJzLnNldENvbnRlbnRUeXBlKHVuZGVmaW5lZCk7IC8vIGJyb3dzZXIgaGFuZGxlcyBpdFxuICAgIH0gZWxzZSBpZiAodXRpbHMuaXNGdW5jdGlvbihkYXRhLmdldEhlYWRlcnMpKSB7XG4gICAgICAvLyBOb2RlLmpzIEZvcm1EYXRhIChsaWtlIGZvcm0tZGF0YSBwYWNrYWdlKVxuICAgICAgY29uc3QgZm9ybUhlYWRlcnMgPSBkYXRhLmdldEhlYWRlcnMoKTtcbiAgICAgIC8vIE9ubHkgc2V0IHNhZmUgaGVhZGVycyB0byBhdm9pZCBvdmVyd3JpdGluZyBzZWN1cml0eSBoZWFkZXJzXG4gICAgICBjb25zdCBhbGxvd2VkSGVhZGVycyA9IFsnY29udGVudC10eXBlJywgJ2NvbnRlbnQtbGVuZ3RoJ107XG4gICAgICBPYmplY3QuZW50cmllcyhmb3JtSGVhZGVycykuZm9yRWFjaCgoW2tleSwgdmFsXSkgPT4ge1xuICAgICAgICBpZiAoYWxsb3dlZEhlYWRlcnMuaW5jbHVkZXMoa2V5LnRvTG93ZXJDYXNlKCkpKSB7XG4gICAgICAgICAgaGVhZGVycy5zZXQoa2V5LCB2YWwpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgLy8gVGhpcyBpcyBvbmx5IGRvbmUgaWYgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgZW52aXJvbm1lbnQuXG4gIC8vIFNwZWNpZmljYWxseSBub3QgaWYgd2UncmUgaW4gYSB3ZWIgd29ya2VyLCBvciByZWFjdC1uYXRpdmUuXG5cbiAgaWYgKHBsYXRmb3JtLmhhc1N0YW5kYXJkQnJvd3NlckVudikge1xuICAgIHdpdGhYU1JGVG9rZW4gJiYgdXRpbHMuaXNGdW5jdGlvbih3aXRoWFNSRlRva2VuKSAmJiAod2l0aFhTUkZUb2tlbiA9IHdpdGhYU1JGVG9rZW4obmV3Q29uZmlnKSk7XG5cbiAgICBpZiAod2l0aFhTUkZUb2tlbiB8fCAod2l0aFhTUkZUb2tlbiAhPT0gZmFsc2UgJiYgaXNVUkxTYW1lT3JpZ2luKG5ld0NvbmZpZy51cmwpKSkge1xuICAgICAgLy8gQWRkIHhzcmYgaGVhZGVyXG4gICAgICBjb25zdCB4c3JmVmFsdWUgPSB4c3JmSGVhZGVyTmFtZSAmJiB4c3JmQ29va2llTmFtZSAmJiBjb29raWVzLnJlYWQoeHNyZkNvb2tpZU5hbWUpO1xuXG4gICAgICBpZiAoeHNyZlZhbHVlKSB7XG4gICAgICAgIGhlYWRlcnMuc2V0KHhzcmZIZWFkZXJOYW1lLCB4c3JmVmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXdDb25maWc7XG59O1xuIiwiaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcbmltcG9ydCBzZXR0bGUgZnJvbSAnLi4vY29yZS9zZXR0bGUuanMnO1xuaW1wb3J0IHRyYW5zaXRpb25hbERlZmF1bHRzIGZyb20gJy4uL2RlZmF1bHRzL3RyYW5zaXRpb25hbC5qcyc7XG5pbXBvcnQgQXhpb3NFcnJvciBmcm9tICcuLi9jb3JlL0F4aW9zRXJyb3IuanMnO1xuaW1wb3J0IENhbmNlbGVkRXJyb3IgZnJvbSAnLi4vY2FuY2VsL0NhbmNlbGVkRXJyb3IuanMnO1xuaW1wb3J0IHBhcnNlUHJvdG9jb2wgZnJvbSAnLi4vaGVscGVycy9wYXJzZVByb3RvY29sLmpzJztcbmltcG9ydCBwbGF0Zm9ybSBmcm9tICcuLi9wbGF0Zm9ybS9pbmRleC5qcyc7XG5pbXBvcnQgQXhpb3NIZWFkZXJzIGZyb20gJy4uL2NvcmUvQXhpb3NIZWFkZXJzLmpzJztcbmltcG9ydCB7IHByb2dyZXNzRXZlbnRSZWR1Y2VyIH0gZnJvbSAnLi4vaGVscGVycy9wcm9ncmVzc0V2ZW50UmVkdWNlci5qcyc7XG5pbXBvcnQgcmVzb2x2ZUNvbmZpZyBmcm9tICcuLi9oZWxwZXJzL3Jlc29sdmVDb25maWcuanMnO1xuXG5jb25zdCBpc1hIUkFkYXB0ZXJTdXBwb3J0ZWQgPSB0eXBlb2YgWE1MSHR0cFJlcXVlc3QgIT09ICd1bmRlZmluZWQnO1xuXG5leHBvcnQgZGVmYXVsdCBpc1hIUkFkYXB0ZXJTdXBwb3J0ZWQgJiZcbiAgZnVuY3Rpb24gKGNvbmZpZykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiBkaXNwYXRjaFhoclJlcXVlc3QocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICBjb25zdCBfY29uZmlnID0gcmVzb2x2ZUNvbmZpZyhjb25maWcpO1xuICAgICAgbGV0IHJlcXVlc3REYXRhID0gX2NvbmZpZy5kYXRhO1xuICAgICAgY29uc3QgcmVxdWVzdEhlYWRlcnMgPSBBeGlvc0hlYWRlcnMuZnJvbShfY29uZmlnLmhlYWRlcnMpLm5vcm1hbGl6ZSgpO1xuICAgICAgbGV0IHsgcmVzcG9uc2VUeXBlLCBvblVwbG9hZFByb2dyZXNzLCBvbkRvd25sb2FkUHJvZ3Jlc3MgfSA9IF9jb25maWc7XG4gICAgICBsZXQgb25DYW5jZWxlZDtcbiAgICAgIGxldCB1cGxvYWRUaHJvdHRsZWQsIGRvd25sb2FkVGhyb3R0bGVkO1xuICAgICAgbGV0IGZsdXNoVXBsb2FkLCBmbHVzaERvd25sb2FkO1xuXG4gICAgICBmdW5jdGlvbiBkb25lKCkge1xuICAgICAgICBmbHVzaFVwbG9hZCAmJiBmbHVzaFVwbG9hZCgpOyAvLyBmbHVzaCBldmVudHNcbiAgICAgICAgZmx1c2hEb3dubG9hZCAmJiBmbHVzaERvd25sb2FkKCk7IC8vIGZsdXNoIGV2ZW50c1xuXG4gICAgICAgIF9jb25maWcuY2FuY2VsVG9rZW4gJiYgX2NvbmZpZy5jYW5jZWxUb2tlbi51bnN1YnNjcmliZShvbkNhbmNlbGVkKTtcblxuICAgICAgICBfY29uZmlnLnNpZ25hbCAmJiBfY29uZmlnLnNpZ25hbC5yZW1vdmVFdmVudExpc3RlbmVyKCdhYm9ydCcsIG9uQ2FuY2VsZWQpO1xuICAgICAgfVxuXG4gICAgICBsZXQgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgICByZXF1ZXN0Lm9wZW4oX2NvbmZpZy5tZXRob2QudG9VcHBlckNhc2UoKSwgX2NvbmZpZy51cmwsIHRydWUpO1xuXG4gICAgICAvLyBTZXQgdGhlIHJlcXVlc3QgdGltZW91dCBpbiBNU1xuICAgICAgcmVxdWVzdC50aW1lb3V0ID0gX2NvbmZpZy50aW1lb3V0O1xuXG4gICAgICBmdW5jdGlvbiBvbmxvYWRlbmQoKSB7XG4gICAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBQcmVwYXJlIHRoZSByZXNwb25zZVxuICAgICAgICBjb25zdCByZXNwb25zZUhlYWRlcnMgPSBBeGlvc0hlYWRlcnMuZnJvbShcbiAgICAgICAgICAnZ2V0QWxsUmVzcG9uc2VIZWFkZXJzJyBpbiByZXF1ZXN0ICYmIHJlcXVlc3QuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKClcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgcmVzcG9uc2VEYXRhID1cbiAgICAgICAgICAhcmVzcG9uc2VUeXBlIHx8IHJlc3BvbnNlVHlwZSA9PT0gJ3RleHQnIHx8IHJlc3BvbnNlVHlwZSA9PT0gJ2pzb24nXG4gICAgICAgICAgICA/IHJlcXVlc3QucmVzcG9uc2VUZXh0XG4gICAgICAgICAgICA6IHJlcXVlc3QucmVzcG9uc2U7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0ge1xuICAgICAgICAgIGRhdGE6IHJlc3BvbnNlRGF0YSxcbiAgICAgICAgICBzdGF0dXM6IHJlcXVlc3Quc3RhdHVzLFxuICAgICAgICAgIHN0YXR1c1RleHQ6IHJlcXVlc3Quc3RhdHVzVGV4dCxcbiAgICAgICAgICBoZWFkZXJzOiByZXNwb25zZUhlYWRlcnMsXG4gICAgICAgICAgY29uZmlnLFxuICAgICAgICAgIHJlcXVlc3QsXG4gICAgICAgIH07XG5cbiAgICAgICAgc2V0dGxlKFxuICAgICAgICAgIGZ1bmN0aW9uIF9yZXNvbHZlKHZhbHVlKSB7XG4gICAgICAgICAgICByZXNvbHZlKHZhbHVlKTtcbiAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZ1bmN0aW9uIF9yZWplY3QoZXJyKSB7XG4gICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHJlc3BvbnNlXG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaWYgKCdvbmxvYWRlbmQnIGluIHJlcXVlc3QpIHtcbiAgICAgICAgLy8gVXNlIG9ubG9hZGVuZCBpZiBhdmFpbGFibGVcbiAgICAgICAgcmVxdWVzdC5vbmxvYWRlbmQgPSBvbmxvYWRlbmQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBMaXN0ZW4gZm9yIHJlYWR5IHN0YXRlIHRvIGVtdWxhdGUgb25sb2FkZW5kXG4gICAgICAgIHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gaGFuZGxlTG9hZCgpIHtcbiAgICAgICAgICBpZiAoIXJlcXVlc3QgfHwgcmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gVGhlIHJlcXVlc3QgZXJyb3JlZCBvdXQgYW5kIHdlIGRpZG4ndCBnZXQgYSByZXNwb25zZSwgdGhpcyB3aWxsIGJlXG4gICAgICAgICAgLy8gaGFuZGxlZCBieSBvbmVycm9yIGluc3RlYWRcbiAgICAgICAgICAvLyBXaXRoIG9uZSBleGNlcHRpb246IHJlcXVlc3QgdGhhdCB1c2luZyBmaWxlOiBwcm90b2NvbCwgbW9zdCBicm93c2Vyc1xuICAgICAgICAgIC8vIHdpbGwgcmV0dXJuIHN0YXR1cyBhcyAwIGV2ZW4gdGhvdWdoIGl0J3MgYSBzdWNjZXNzZnVsIHJlcXVlc3RcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICByZXF1ZXN0LnN0YXR1cyA9PT0gMCAmJlxuICAgICAgICAgICAgIShyZXF1ZXN0LnJlc3BvbnNlVVJMICYmIHJlcXVlc3QucmVzcG9uc2VVUkwuaW5kZXhPZignZmlsZTonKSA9PT0gMClcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gcmVhZHlzdGF0ZSBoYW5kbGVyIGlzIGNhbGxpbmcgYmVmb3JlIG9uZXJyb3Igb3Igb250aW1lb3V0IGhhbmRsZXJzLFxuICAgICAgICAgIC8vIHNvIHdlIHNob3VsZCBjYWxsIG9ubG9hZGVuZCBvbiB0aGUgbmV4dCAndGljaydcbiAgICAgICAgICBzZXRUaW1lb3V0KG9ubG9hZGVuZCk7XG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIC8vIEhhbmRsZSBicm93c2VyIHJlcXVlc3QgY2FuY2VsbGF0aW9uIChhcyBvcHBvc2VkIHRvIGEgbWFudWFsIGNhbmNlbGxhdGlvbilcbiAgICAgIHJlcXVlc3Qub25hYm9ydCA9IGZ1bmN0aW9uIGhhbmRsZUFib3J0KCkge1xuICAgICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoJ1JlcXVlc3QgYWJvcnRlZCcsIEF4aW9zRXJyb3IuRUNPTk5BQk9SVEVELCBjb25maWcsIHJlcXVlc3QpKTtcblxuICAgICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgICAgfTtcblxuICAgICAgLy8gSGFuZGxlIGxvdyBsZXZlbCBuZXR3b3JrIGVycm9yc1xuICAgICAgcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24gaGFuZGxlRXJyb3IoZXZlbnQpIHtcbiAgICAgICAgLy8gQnJvd3NlcnMgZGVsaXZlciBhIFByb2dyZXNzRXZlbnQgaW4gWEhSIG9uZXJyb3JcbiAgICAgICAgLy8gKG1lc3NhZ2UgbWF5IGJlIGVtcHR5OyB3aGVuIHByZXNlbnQsIHN1cmZhY2UgaXQpXG4gICAgICAgIC8vIFNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9kb2NzL1dlYi9BUEkvWE1MSHR0cFJlcXVlc3QvZXJyb3JfZXZlbnRcbiAgICAgICAgY29uc3QgbXNnID0gZXZlbnQgJiYgZXZlbnQubWVzc2FnZSA/IGV2ZW50Lm1lc3NhZ2UgOiAnTmV0d29yayBFcnJvcic7XG4gICAgICAgIGNvbnN0IGVyciA9IG5ldyBBeGlvc0Vycm9yKG1zZywgQXhpb3NFcnJvci5FUlJfTkVUV09SSywgY29uZmlnLCByZXF1ZXN0KTtcbiAgICAgICAgLy8gYXR0YWNoIHRoZSB1bmRlcmx5aW5nIGV2ZW50IGZvciBjb25zdW1lcnMgd2hvIHdhbnQgZGV0YWlsc1xuICAgICAgICBlcnIuZXZlbnQgPSBldmVudCB8fCBudWxsO1xuICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgICB9O1xuXG4gICAgICAvLyBIYW5kbGUgdGltZW91dFxuICAgICAgcmVxdWVzdC5vbnRpbWVvdXQgPSBmdW5jdGlvbiBoYW5kbGVUaW1lb3V0KCkge1xuICAgICAgICBsZXQgdGltZW91dEVycm9yTWVzc2FnZSA9IF9jb25maWcudGltZW91dFxuICAgICAgICAgID8gJ3RpbWVvdXQgb2YgJyArIF9jb25maWcudGltZW91dCArICdtcyBleGNlZWRlZCdcbiAgICAgICAgICA6ICd0aW1lb3V0IGV4Y2VlZGVkJztcbiAgICAgICAgY29uc3QgdHJhbnNpdGlvbmFsID0gX2NvbmZpZy50cmFuc2l0aW9uYWwgfHwgdHJhbnNpdGlvbmFsRGVmYXVsdHM7XG4gICAgICAgIGlmIChfY29uZmlnLnRpbWVvdXRFcnJvck1lc3NhZ2UpIHtcbiAgICAgICAgICB0aW1lb3V0RXJyb3JNZXNzYWdlID0gX2NvbmZpZy50aW1lb3V0RXJyb3JNZXNzYWdlO1xuICAgICAgICB9XG4gICAgICAgIHJlamVjdChcbiAgICAgICAgICBuZXcgQXhpb3NFcnJvcihcbiAgICAgICAgICAgIHRpbWVvdXRFcnJvck1lc3NhZ2UsXG4gICAgICAgICAgICB0cmFuc2l0aW9uYWwuY2xhcmlmeVRpbWVvdXRFcnJvciA/IEF4aW9zRXJyb3IuRVRJTUVET1VUIDogQXhpb3NFcnJvci5FQ09OTkFCT1JURUQsXG4gICAgICAgICAgICBjb25maWcsXG4gICAgICAgICAgICByZXF1ZXN0XG4gICAgICAgICAgKVxuICAgICAgICApO1xuXG4gICAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgICB9O1xuXG4gICAgICAvLyBSZW1vdmUgQ29udGVudC1UeXBlIGlmIGRhdGEgaXMgdW5kZWZpbmVkXG4gICAgICByZXF1ZXN0RGF0YSA9PT0gdW5kZWZpbmVkICYmIHJlcXVlc3RIZWFkZXJzLnNldENvbnRlbnRUeXBlKG51bGwpO1xuXG4gICAgICAvLyBBZGQgaGVhZGVycyB0byB0aGUgcmVxdWVzdFxuICAgICAgaWYgKCdzZXRSZXF1ZXN0SGVhZGVyJyBpbiByZXF1ZXN0KSB7XG4gICAgICAgIHV0aWxzLmZvckVhY2gocmVxdWVzdEhlYWRlcnMudG9KU09OKCksIGZ1bmN0aW9uIHNldFJlcXVlc3RIZWFkZXIodmFsLCBrZXkpIHtcbiAgICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoa2V5LCB2YWwpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gQWRkIHdpdGhDcmVkZW50aWFscyB0byByZXF1ZXN0IGlmIG5lZWRlZFxuICAgICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChfY29uZmlnLndpdGhDcmVkZW50aWFscykpIHtcbiAgICAgICAgcmVxdWVzdC53aXRoQ3JlZGVudGlhbHMgPSAhIV9jb25maWcud2l0aENyZWRlbnRpYWxzO1xuICAgICAgfVxuXG4gICAgICAvLyBBZGQgcmVzcG9uc2VUeXBlIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgICBpZiAocmVzcG9uc2VUeXBlICYmIHJlc3BvbnNlVHlwZSAhPT0gJ2pzb24nKSB7XG4gICAgICAgIHJlcXVlc3QucmVzcG9uc2VUeXBlID0gX2NvbmZpZy5yZXNwb25zZVR5cGU7XG4gICAgICB9XG5cbiAgICAgIC8vIEhhbmRsZSBwcm9ncmVzcyBpZiBuZWVkZWRcbiAgICAgIGlmIChvbkRvd25sb2FkUHJvZ3Jlc3MpIHtcbiAgICAgICAgW2Rvd25sb2FkVGhyb3R0bGVkLCBmbHVzaERvd25sb2FkXSA9IHByb2dyZXNzRXZlbnRSZWR1Y2VyKG9uRG93bmxvYWRQcm9ncmVzcywgdHJ1ZSk7XG4gICAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBkb3dubG9hZFRocm90dGxlZCk7XG4gICAgICB9XG5cbiAgICAgIC8vIE5vdCBhbGwgYnJvd3NlcnMgc3VwcG9ydCB1cGxvYWQgZXZlbnRzXG4gICAgICBpZiAob25VcGxvYWRQcm9ncmVzcyAmJiByZXF1ZXN0LnVwbG9hZCkge1xuICAgICAgICBbdXBsb2FkVGhyb3R0bGVkLCBmbHVzaFVwbG9hZF0gPSBwcm9ncmVzc0V2ZW50UmVkdWNlcihvblVwbG9hZFByb2dyZXNzKTtcblxuICAgICAgICByZXF1ZXN0LnVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIHVwbG9hZFRocm90dGxlZCk7XG5cbiAgICAgICAgcmVxdWVzdC51cGxvYWQuYWRkRXZlbnRMaXN0ZW5lcignbG9hZGVuZCcsIGZsdXNoVXBsb2FkKTtcbiAgICAgIH1cblxuICAgICAgaWYgKF9jb25maWcuY2FuY2VsVG9rZW4gfHwgX2NvbmZpZy5zaWduYWwpIHtcbiAgICAgICAgLy8gSGFuZGxlIGNhbmNlbGxhdGlvblxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICAgICAgICBvbkNhbmNlbGVkID0gKGNhbmNlbCkgPT4ge1xuICAgICAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZWplY3QoIWNhbmNlbCB8fCBjYW5jZWwudHlwZSA/IG5ldyBDYW5jZWxlZEVycm9yKG51bGwsIGNvbmZpZywgcmVxdWVzdCkgOiBjYW5jZWwpO1xuICAgICAgICAgIHJlcXVlc3QuYWJvcnQoKTtcbiAgICAgICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICAgICAgfTtcblxuICAgICAgICBfY29uZmlnLmNhbmNlbFRva2VuICYmIF9jb25maWcuY2FuY2VsVG9rZW4uc3Vic2NyaWJlKG9uQ2FuY2VsZWQpO1xuICAgICAgICBpZiAoX2NvbmZpZy5zaWduYWwpIHtcbiAgICAgICAgICBfY29uZmlnLnNpZ25hbC5hYm9ydGVkXG4gICAgICAgICAgICA/IG9uQ2FuY2VsZWQoKVxuICAgICAgICAgICAgOiBfY29uZmlnLnNpZ25hbC5hZGRFdmVudExpc3RlbmVyKCdhYm9ydCcsIG9uQ2FuY2VsZWQpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHByb3RvY29sID0gcGFyc2VQcm90b2NvbChfY29uZmlnLnVybCk7XG5cbiAgICAgIGlmIChwcm90b2NvbCAmJiBwbGF0Zm9ybS5wcm90b2NvbHMuaW5kZXhPZihwcm90b2NvbCkgPT09IC0xKSB7XG4gICAgICAgIHJlamVjdChcbiAgICAgICAgICBuZXcgQXhpb3NFcnJvcihcbiAgICAgICAgICAgICdVbnN1cHBvcnRlZCBwcm90b2NvbCAnICsgcHJvdG9jb2wgKyAnOicsXG4gICAgICAgICAgICBBeGlvc0Vycm9yLkVSUl9CQURfUkVRVUVTVCxcbiAgICAgICAgICAgIGNvbmZpZ1xuICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBTZW5kIHRoZSByZXF1ZXN0XG4gICAgICByZXF1ZXN0LnNlbmQocmVxdWVzdERhdGEgfHwgbnVsbCk7XG4gICAgfSk7XG4gIH07XG4iLCJpbXBvcnQgQ2FuY2VsZWRFcnJvciBmcm9tICcuLi9jYW5jZWwvQ2FuY2VsZWRFcnJvci5qcyc7XG5pbXBvcnQgQXhpb3NFcnJvciBmcm9tICcuLi9jb3JlL0F4aW9zRXJyb3IuanMnO1xuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcblxuY29uc3QgY29tcG9zZVNpZ25hbHMgPSAoc2lnbmFscywgdGltZW91dCkgPT4ge1xuICBjb25zdCB7IGxlbmd0aCB9ID0gKHNpZ25hbHMgPSBzaWduYWxzID8gc2lnbmFscy5maWx0ZXIoQm9vbGVhbikgOiBbXSk7XG5cbiAgaWYgKHRpbWVvdXQgfHwgbGVuZ3RoKSB7XG4gICAgbGV0IGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG5cbiAgICBsZXQgYWJvcnRlZDtcblxuICAgIGNvbnN0IG9uYWJvcnQgPSBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgICBpZiAoIWFib3J0ZWQpIHtcbiAgICAgICAgYWJvcnRlZCA9IHRydWU7XG4gICAgICAgIHVuc3Vic2NyaWJlKCk7XG4gICAgICAgIGNvbnN0IGVyciA9IHJlYXNvbiBpbnN0YW5jZW9mIEVycm9yID8gcmVhc29uIDogdGhpcy5yZWFzb247XG4gICAgICAgIGNvbnRyb2xsZXIuYWJvcnQoXG4gICAgICAgICAgZXJyIGluc3RhbmNlb2YgQXhpb3NFcnJvclxuICAgICAgICAgICAgPyBlcnJcbiAgICAgICAgICAgIDogbmV3IENhbmNlbGVkRXJyb3IoZXJyIGluc3RhbmNlb2YgRXJyb3IgPyBlcnIubWVzc2FnZSA6IGVycilcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgbGV0IHRpbWVyID1cbiAgICAgIHRpbWVvdXQgJiZcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aW1lciA9IG51bGw7XG4gICAgICAgIG9uYWJvcnQobmV3IEF4aW9zRXJyb3IoYHRpbWVvdXQgb2YgJHt0aW1lb3V0fW1zIGV4Y2VlZGVkYCwgQXhpb3NFcnJvci5FVElNRURPVVQpKTtcbiAgICAgIH0sIHRpbWVvdXQpO1xuXG4gICAgY29uc3QgdW5zdWJzY3JpYmUgPSAoKSA9PiB7XG4gICAgICBpZiAoc2lnbmFscykge1xuICAgICAgICB0aW1lciAmJiBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgICAgICB0aW1lciA9IG51bGw7XG4gICAgICAgIHNpZ25hbHMuZm9yRWFjaCgoc2lnbmFsKSA9PiB7XG4gICAgICAgICAgc2lnbmFsLnVuc3Vic2NyaWJlXG4gICAgICAgICAgICA/IHNpZ25hbC51bnN1YnNjcmliZShvbmFib3J0KVxuICAgICAgICAgICAgOiBzaWduYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBvbmFib3J0KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHNpZ25hbHMgPSBudWxsO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBzaWduYWxzLmZvckVhY2goKHNpZ25hbCkgPT4gc2lnbmFsLmFkZEV2ZW50TGlzdGVuZXIoJ2Fib3J0Jywgb25hYm9ydCkpO1xuXG4gICAgY29uc3QgeyBzaWduYWwgfSA9IGNvbnRyb2xsZXI7XG5cbiAgICBzaWduYWwudW5zdWJzY3JpYmUgPSAoKSA9PiB1dGlscy5hc2FwKHVuc3Vic2NyaWJlKTtcblxuICAgIHJldHVybiBzaWduYWw7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbXBvc2VTaWduYWxzO1xuIiwiZXhwb3J0IGNvbnN0IHN0cmVhbUNodW5rID0gZnVuY3Rpb24qIChjaHVuaywgY2h1bmtTaXplKSB7XG4gIGxldCBsZW4gPSBjaHVuay5ieXRlTGVuZ3RoO1xuXG4gIGlmICghY2h1bmtTaXplIHx8IGxlbiA8IGNodW5rU2l6ZSkge1xuICAgIHlpZWxkIGNodW5rO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGxldCBwb3MgPSAwO1xuICBsZXQgZW5kO1xuXG4gIHdoaWxlIChwb3MgPCBsZW4pIHtcbiAgICBlbmQgPSBwb3MgKyBjaHVua1NpemU7XG4gICAgeWllbGQgY2h1bmsuc2xpY2UocG9zLCBlbmQpO1xuICAgIHBvcyA9IGVuZDtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IHJlYWRCeXRlcyA9IGFzeW5jIGZ1bmN0aW9uKiAoaXRlcmFibGUsIGNodW5rU2l6ZSkge1xuICBmb3IgYXdhaXQgKGNvbnN0IGNodW5rIG9mIHJlYWRTdHJlYW0oaXRlcmFibGUpKSB7XG4gICAgeWllbGQqIHN0cmVhbUNodW5rKGNodW5rLCBjaHVua1NpemUpO1xuICB9XG59O1xuXG5jb25zdCByZWFkU3RyZWFtID0gYXN5bmMgZnVuY3Rpb24qIChzdHJlYW0pIHtcbiAgaWYgKHN0cmVhbVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0pIHtcbiAgICB5aWVsZCogc3RyZWFtO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHJlYWRlciA9IHN0cmVhbS5nZXRSZWFkZXIoKTtcbiAgdHJ5IHtcbiAgICBmb3IgKDs7KSB7XG4gICAgICBjb25zdCB7IGRvbmUsIHZhbHVlIH0gPSBhd2FpdCByZWFkZXIucmVhZCgpO1xuICAgICAgaWYgKGRvbmUpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICB5aWVsZCB2YWx1ZTtcbiAgICB9XG4gIH0gZmluYWxseSB7XG4gICAgYXdhaXQgcmVhZGVyLmNhbmNlbCgpO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgdHJhY2tTdHJlYW0gPSAoc3RyZWFtLCBjaHVua1NpemUsIG9uUHJvZ3Jlc3MsIG9uRmluaXNoKSA9PiB7XG4gIGNvbnN0IGl0ZXJhdG9yID0gcmVhZEJ5dGVzKHN0cmVhbSwgY2h1bmtTaXplKTtcblxuICBsZXQgYnl0ZXMgPSAwO1xuICBsZXQgZG9uZTtcbiAgbGV0IF9vbkZpbmlzaCA9IChlKSA9PiB7XG4gICAgaWYgKCFkb25lKSB7XG4gICAgICBkb25lID0gdHJ1ZTtcbiAgICAgIG9uRmluaXNoICYmIG9uRmluaXNoKGUpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbmV3IFJlYWRhYmxlU3RyZWFtKFxuICAgIHtcbiAgICAgIGFzeW5jIHB1bGwoY29udHJvbGxlcikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IHsgZG9uZSwgdmFsdWUgfSA9IGF3YWl0IGl0ZXJhdG9yLm5leHQoKTtcblxuICAgICAgICAgIGlmIChkb25lKSB7XG4gICAgICAgICAgICBfb25GaW5pc2goKTtcbiAgICAgICAgICAgIGNvbnRyb2xsZXIuY2xvc2UoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsZXQgbGVuID0gdmFsdWUuYnl0ZUxlbmd0aDtcbiAgICAgICAgICBpZiAob25Qcm9ncmVzcykge1xuICAgICAgICAgICAgbGV0IGxvYWRlZEJ5dGVzID0gKGJ5dGVzICs9IGxlbik7XG4gICAgICAgICAgICBvblByb2dyZXNzKGxvYWRlZEJ5dGVzKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29udHJvbGxlci5lbnF1ZXVlKG5ldyBVaW50OEFycmF5KHZhbHVlKSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIF9vbkZpbmlzaChlcnIpO1xuICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGNhbmNlbChyZWFzb24pIHtcbiAgICAgICAgX29uRmluaXNoKHJlYXNvbik7XG4gICAgICAgIHJldHVybiBpdGVyYXRvci5yZXR1cm4oKTtcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBoaWdoV2F0ZXJNYXJrOiAyLFxuICAgIH1cbiAgKTtcbn07XG4iLCJpbXBvcnQgcGxhdGZvcm0gZnJvbSAnLi4vcGxhdGZvcm0vaW5kZXguanMnO1xuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gJy4uL2NvcmUvQXhpb3NFcnJvci5qcyc7XG5pbXBvcnQgY29tcG9zZVNpZ25hbHMgZnJvbSAnLi4vaGVscGVycy9jb21wb3NlU2lnbmFscy5qcyc7XG5pbXBvcnQgeyB0cmFja1N0cmVhbSB9IGZyb20gJy4uL2hlbHBlcnMvdHJhY2tTdHJlYW0uanMnO1xuaW1wb3J0IEF4aW9zSGVhZGVycyBmcm9tICcuLi9jb3JlL0F4aW9zSGVhZGVycy5qcyc7XG5pbXBvcnQge1xuICBwcm9ncmVzc0V2ZW50UmVkdWNlcixcbiAgcHJvZ3Jlc3NFdmVudERlY29yYXRvcixcbiAgYXN5bmNEZWNvcmF0b3IsXG59IGZyb20gJy4uL2hlbHBlcnMvcHJvZ3Jlc3NFdmVudFJlZHVjZXIuanMnO1xuaW1wb3J0IHJlc29sdmVDb25maWcgZnJvbSAnLi4vaGVscGVycy9yZXNvbHZlQ29uZmlnLmpzJztcbmltcG9ydCBzZXR0bGUgZnJvbSAnLi4vY29yZS9zZXR0bGUuanMnO1xuXG5jb25zdCBERUZBVUxUX0NIVU5LX1NJWkUgPSA2NCAqIDEwMjQ7XG5cbmNvbnN0IHsgaXNGdW5jdGlvbiB9ID0gdXRpbHM7XG5cbmNvbnN0IGdsb2JhbEZldGNoQVBJID0gKCh7IFJlcXVlc3QsIFJlc3BvbnNlIH0pID0+ICh7XG4gIFJlcXVlc3QsXG4gIFJlc3BvbnNlLFxufSkpKHV0aWxzLmdsb2JhbCk7XG5cbmNvbnN0IHsgUmVhZGFibGVTdHJlYW0sIFRleHRFbmNvZGVyIH0gPSB1dGlscy5nbG9iYWw7XG5cbmNvbnN0IHRlc3QgPSAoZm4sIC4uLmFyZ3MpID0+IHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISFmbiguLi5hcmdzKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxuY29uc3QgZmFjdG9yeSA9IChlbnYpID0+IHtcbiAgZW52ID0gdXRpbHMubWVyZ2UuY2FsbChcbiAgICB7XG4gICAgICBza2lwVW5kZWZpbmVkOiB0cnVlLFxuICAgIH0sXG4gICAgZ2xvYmFsRmV0Y2hBUEksXG4gICAgZW52XG4gICk7XG5cbiAgY29uc3QgeyBmZXRjaDogZW52RmV0Y2gsIFJlcXVlc3QsIFJlc3BvbnNlIH0gPSBlbnY7XG4gIGNvbnN0IGlzRmV0Y2hTdXBwb3J0ZWQgPSBlbnZGZXRjaCA/IGlzRnVuY3Rpb24oZW52RmV0Y2gpIDogdHlwZW9mIGZldGNoID09PSAnZnVuY3Rpb24nO1xuICBjb25zdCBpc1JlcXVlc3RTdXBwb3J0ZWQgPSBpc0Z1bmN0aW9uKFJlcXVlc3QpO1xuICBjb25zdCBpc1Jlc3BvbnNlU3VwcG9ydGVkID0gaXNGdW5jdGlvbihSZXNwb25zZSk7XG5cbiAgaWYgKCFpc0ZldGNoU3VwcG9ydGVkKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgY29uc3QgaXNSZWFkYWJsZVN0cmVhbVN1cHBvcnRlZCA9IGlzRmV0Y2hTdXBwb3J0ZWQgJiYgaXNGdW5jdGlvbihSZWFkYWJsZVN0cmVhbSk7XG5cbiAgY29uc3QgZW5jb2RlVGV4dCA9XG4gICAgaXNGZXRjaFN1cHBvcnRlZCAmJlxuICAgICh0eXBlb2YgVGV4dEVuY29kZXIgPT09ICdmdW5jdGlvbidcbiAgICAgID8gKFxuICAgICAgICAgIChlbmNvZGVyKSA9PiAoc3RyKSA9PlxuICAgICAgICAgICAgZW5jb2Rlci5lbmNvZGUoc3RyKVxuICAgICAgICApKG5ldyBUZXh0RW5jb2RlcigpKVxuICAgICAgOiBhc3luYyAoc3RyKSA9PiBuZXcgVWludDhBcnJheShhd2FpdCBuZXcgUmVxdWVzdChzdHIpLmFycmF5QnVmZmVyKCkpKTtcblxuICBjb25zdCBzdXBwb3J0c1JlcXVlc3RTdHJlYW0gPVxuICAgIGlzUmVxdWVzdFN1cHBvcnRlZCAmJlxuICAgIGlzUmVhZGFibGVTdHJlYW1TdXBwb3J0ZWQgJiZcbiAgICB0ZXN0KCgpID0+IHtcbiAgICAgIGxldCBkdXBsZXhBY2Nlc3NlZCA9IGZhbHNlO1xuXG4gICAgICBjb25zdCBoYXNDb250ZW50VHlwZSA9IG5ldyBSZXF1ZXN0KHBsYXRmb3JtLm9yaWdpbiwge1xuICAgICAgICBib2R5OiBuZXcgUmVhZGFibGVTdHJlYW0oKSxcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGdldCBkdXBsZXgoKSB7XG4gICAgICAgICAgZHVwbGV4QWNjZXNzZWQgPSB0cnVlO1xuICAgICAgICAgIHJldHVybiAnaGFsZic7XG4gICAgICAgIH0sXG4gICAgICB9KS5oZWFkZXJzLmhhcygnQ29udGVudC1UeXBlJyk7XG5cbiAgICAgIHJldHVybiBkdXBsZXhBY2Nlc3NlZCAmJiAhaGFzQ29udGVudFR5cGU7XG4gICAgfSk7XG5cbiAgY29uc3Qgc3VwcG9ydHNSZXNwb25zZVN0cmVhbSA9XG4gICAgaXNSZXNwb25zZVN1cHBvcnRlZCAmJlxuICAgIGlzUmVhZGFibGVTdHJlYW1TdXBwb3J0ZWQgJiZcbiAgICB0ZXN0KCgpID0+IHV0aWxzLmlzUmVhZGFibGVTdHJlYW0obmV3IFJlc3BvbnNlKCcnKS5ib2R5KSk7XG5cbiAgY29uc3QgcmVzb2x2ZXJzID0ge1xuICAgIHN0cmVhbTogc3VwcG9ydHNSZXNwb25zZVN0cmVhbSAmJiAoKHJlcykgPT4gcmVzLmJvZHkpLFxuICB9O1xuXG4gIGlzRmV0Y2hTdXBwb3J0ZWQgJiZcbiAgICAoKCkgPT4ge1xuICAgICAgWyd0ZXh0JywgJ2FycmF5QnVmZmVyJywgJ2Jsb2InLCAnZm9ybURhdGEnLCAnc3RyZWFtJ10uZm9yRWFjaCgodHlwZSkgPT4ge1xuICAgICAgICAhcmVzb2x2ZXJzW3R5cGVdICYmXG4gICAgICAgICAgKHJlc29sdmVyc1t0eXBlXSA9IChyZXMsIGNvbmZpZykgPT4ge1xuICAgICAgICAgICAgbGV0IG1ldGhvZCA9IHJlcyAmJiByZXNbdHlwZV07XG5cbiAgICAgICAgICAgIGlmIChtZXRob2QpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIG1ldGhvZC5jYWxsKHJlcyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKFxuICAgICAgICAgICAgICBgUmVzcG9uc2UgdHlwZSAnJHt0eXBlfScgaXMgbm90IHN1cHBvcnRlZGAsXG4gICAgICAgICAgICAgIEF4aW9zRXJyb3IuRVJSX05PVF9TVVBQT1JULFxuICAgICAgICAgICAgICBjb25maWdcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KSgpO1xuXG4gIGNvbnN0IGdldEJvZHlMZW5ndGggPSBhc3luYyAoYm9keSkgPT4ge1xuICAgIGlmIChib2R5ID09IG51bGwpIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIGlmICh1dGlscy5pc0Jsb2IoYm9keSkpIHtcbiAgICAgIHJldHVybiBib2R5LnNpemU7XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzLmlzU3BlY0NvbXBsaWFudEZvcm0oYm9keSkpIHtcbiAgICAgIGNvbnN0IF9yZXF1ZXN0ID0gbmV3IFJlcXVlc3QocGxhdGZvcm0ub3JpZ2luLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBib2R5LFxuICAgICAgfSk7XG4gICAgICByZXR1cm4gKGF3YWl0IF9yZXF1ZXN0LmFycmF5QnVmZmVyKCkpLmJ5dGVMZW5ndGg7XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzLmlzQXJyYXlCdWZmZXJWaWV3KGJvZHkpIHx8IHV0aWxzLmlzQXJyYXlCdWZmZXIoYm9keSkpIHtcbiAgICAgIHJldHVybiBib2R5LmJ5dGVMZW5ndGg7XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzLmlzVVJMU2VhcmNoUGFyYW1zKGJvZHkpKSB7XG4gICAgICBib2R5ID0gYm9keSArICcnO1xuICAgIH1cblxuICAgIGlmICh1dGlscy5pc1N0cmluZyhib2R5KSkge1xuICAgICAgcmV0dXJuIChhd2FpdCBlbmNvZGVUZXh0KGJvZHkpKS5ieXRlTGVuZ3RoO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCByZXNvbHZlQm9keUxlbmd0aCA9IGFzeW5jIChoZWFkZXJzLCBib2R5KSA9PiB7XG4gICAgY29uc3QgbGVuZ3RoID0gdXRpbHMudG9GaW5pdGVOdW1iZXIoaGVhZGVycy5nZXRDb250ZW50TGVuZ3RoKCkpO1xuXG4gICAgcmV0dXJuIGxlbmd0aCA9PSBudWxsID8gZ2V0Qm9keUxlbmd0aChib2R5KSA6IGxlbmd0aDtcbiAgfTtcblxuICByZXR1cm4gYXN5bmMgKGNvbmZpZykgPT4ge1xuICAgIGxldCB7XG4gICAgICB1cmwsXG4gICAgICBtZXRob2QsXG4gICAgICBkYXRhLFxuICAgICAgc2lnbmFsLFxuICAgICAgY2FuY2VsVG9rZW4sXG4gICAgICB0aW1lb3V0LFxuICAgICAgb25Eb3dubG9hZFByb2dyZXNzLFxuICAgICAgb25VcGxvYWRQcm9ncmVzcyxcbiAgICAgIHJlc3BvbnNlVHlwZSxcbiAgICAgIGhlYWRlcnMsXG4gICAgICB3aXRoQ3JlZGVudGlhbHMgPSAnc2FtZS1vcmlnaW4nLFxuICAgICAgZmV0Y2hPcHRpb25zLFxuICAgIH0gPSByZXNvbHZlQ29uZmlnKGNvbmZpZyk7XG5cbiAgICBsZXQgX2ZldGNoID0gZW52RmV0Y2ggfHwgZmV0Y2g7XG5cbiAgICByZXNwb25zZVR5cGUgPSByZXNwb25zZVR5cGUgPyAocmVzcG9uc2VUeXBlICsgJycpLnRvTG93ZXJDYXNlKCkgOiAndGV4dCc7XG5cbiAgICBsZXQgY29tcG9zZWRTaWduYWwgPSBjb21wb3NlU2lnbmFscyhcbiAgICAgIFtzaWduYWwsIGNhbmNlbFRva2VuICYmIGNhbmNlbFRva2VuLnRvQWJvcnRTaWduYWwoKV0sXG4gICAgICB0aW1lb3V0XG4gICAgKTtcblxuICAgIGxldCByZXF1ZXN0ID0gbnVsbDtcblxuICAgIGNvbnN0IHVuc3Vic2NyaWJlID1cbiAgICAgIGNvbXBvc2VkU2lnbmFsICYmXG4gICAgICBjb21wb3NlZFNpZ25hbC51bnN1YnNjcmliZSAmJlxuICAgICAgKCgpID0+IHtcbiAgICAgICAgY29tcG9zZWRTaWduYWwudW5zdWJzY3JpYmUoKTtcbiAgICAgIH0pO1xuXG4gICAgbGV0IHJlcXVlc3RDb250ZW50TGVuZ3RoO1xuXG4gICAgdHJ5IHtcbiAgICAgIGlmIChcbiAgICAgICAgb25VcGxvYWRQcm9ncmVzcyAmJlxuICAgICAgICBzdXBwb3J0c1JlcXVlc3RTdHJlYW0gJiZcbiAgICAgICAgbWV0aG9kICE9PSAnZ2V0JyAmJlxuICAgICAgICBtZXRob2QgIT09ICdoZWFkJyAmJlxuICAgICAgICAocmVxdWVzdENvbnRlbnRMZW5ndGggPSBhd2FpdCByZXNvbHZlQm9keUxlbmd0aChoZWFkZXJzLCBkYXRhKSkgIT09IDBcbiAgICAgICkge1xuICAgICAgICBsZXQgX3JlcXVlc3QgPSBuZXcgUmVxdWVzdCh1cmwsIHtcbiAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICBib2R5OiBkYXRhLFxuICAgICAgICAgIGR1cGxleDogJ2hhbGYnLFxuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgY29udGVudFR5cGVIZWFkZXI7XG5cbiAgICAgICAgaWYgKHV0aWxzLmlzRm9ybURhdGEoZGF0YSkgJiYgKGNvbnRlbnRUeXBlSGVhZGVyID0gX3JlcXVlc3QuaGVhZGVycy5nZXQoJ2NvbnRlbnQtdHlwZScpKSkge1xuICAgICAgICAgIGhlYWRlcnMuc2V0Q29udGVudFR5cGUoY29udGVudFR5cGVIZWFkZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF9yZXF1ZXN0LmJvZHkpIHtcbiAgICAgICAgICBjb25zdCBbb25Qcm9ncmVzcywgZmx1c2hdID0gcHJvZ3Jlc3NFdmVudERlY29yYXRvcihcbiAgICAgICAgICAgIHJlcXVlc3RDb250ZW50TGVuZ3RoLFxuICAgICAgICAgICAgcHJvZ3Jlc3NFdmVudFJlZHVjZXIoYXN5bmNEZWNvcmF0b3Iob25VcGxvYWRQcm9ncmVzcykpXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGRhdGEgPSB0cmFja1N0cmVhbShfcmVxdWVzdC5ib2R5LCBERUZBVUxUX0NIVU5LX1NJWkUsIG9uUHJvZ3Jlc3MsIGZsdXNoKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoIXV0aWxzLmlzU3RyaW5nKHdpdGhDcmVkZW50aWFscykpIHtcbiAgICAgICAgd2l0aENyZWRlbnRpYWxzID0gd2l0aENyZWRlbnRpYWxzID8gJ2luY2x1ZGUnIDogJ29taXQnO1xuICAgICAgfVxuXG4gICAgICAvLyBDbG91ZGZsYXJlIFdvcmtlcnMgdGhyb3dzIHdoZW4gY3JlZGVudGlhbHMgYXJlIGRlZmluZWRcbiAgICAgIC8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vY2xvdWRmbGFyZS93b3JrZXJkL2lzc3Vlcy85MDJcbiAgICAgIGNvbnN0IGlzQ3JlZGVudGlhbHNTdXBwb3J0ZWQgPSBpc1JlcXVlc3RTdXBwb3J0ZWQgJiYgJ2NyZWRlbnRpYWxzJyBpbiBSZXF1ZXN0LnByb3RvdHlwZTtcblxuICAgICAgY29uc3QgcmVzb2x2ZWRPcHRpb25zID0ge1xuICAgICAgICAuLi5mZXRjaE9wdGlvbnMsXG4gICAgICAgIHNpZ25hbDogY29tcG9zZWRTaWduYWwsXG4gICAgICAgIG1ldGhvZDogbWV0aG9kLnRvVXBwZXJDYXNlKCksXG4gICAgICAgIGhlYWRlcnM6IGhlYWRlcnMubm9ybWFsaXplKCkudG9KU09OKCksXG4gICAgICAgIGJvZHk6IGRhdGEsXG4gICAgICAgIGR1cGxleDogJ2hhbGYnLFxuICAgICAgICBjcmVkZW50aWFsczogaXNDcmVkZW50aWFsc1N1cHBvcnRlZCA/IHdpdGhDcmVkZW50aWFscyA6IHVuZGVmaW5lZCxcbiAgICAgIH07XG5cbiAgICAgIHJlcXVlc3QgPSBpc1JlcXVlc3RTdXBwb3J0ZWQgJiYgbmV3IFJlcXVlc3QodXJsLCByZXNvbHZlZE9wdGlvbnMpO1xuXG4gICAgICBsZXQgcmVzcG9uc2UgPSBhd2FpdCAoaXNSZXF1ZXN0U3VwcG9ydGVkXG4gICAgICAgID8gX2ZldGNoKHJlcXVlc3QsIGZldGNoT3B0aW9ucylcbiAgICAgICAgOiBfZmV0Y2godXJsLCByZXNvbHZlZE9wdGlvbnMpKTtcblxuICAgICAgY29uc3QgaXNTdHJlYW1SZXNwb25zZSA9XG4gICAgICAgIHN1cHBvcnRzUmVzcG9uc2VTdHJlYW0gJiYgKHJlc3BvbnNlVHlwZSA9PT0gJ3N0cmVhbScgfHwgcmVzcG9uc2VUeXBlID09PSAncmVzcG9uc2UnKTtcblxuICAgICAgaWYgKHN1cHBvcnRzUmVzcG9uc2VTdHJlYW0gJiYgKG9uRG93bmxvYWRQcm9ncmVzcyB8fCAoaXNTdHJlYW1SZXNwb25zZSAmJiB1bnN1YnNjcmliZSkpKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7fTtcblxuICAgICAgICBbJ3N0YXR1cycsICdzdGF0dXNUZXh0JywgJ2hlYWRlcnMnXS5mb3JFYWNoKChwcm9wKSA9PiB7XG4gICAgICAgICAgb3B0aW9uc1twcm9wXSA9IHJlc3BvbnNlW3Byb3BdO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCByZXNwb25zZUNvbnRlbnRMZW5ndGggPSB1dGlscy50b0Zpbml0ZU51bWJlcihyZXNwb25zZS5oZWFkZXJzLmdldCgnY29udGVudC1sZW5ndGgnKSk7XG5cbiAgICAgICAgY29uc3QgW29uUHJvZ3Jlc3MsIGZsdXNoXSA9XG4gICAgICAgICAgKG9uRG93bmxvYWRQcm9ncmVzcyAmJlxuICAgICAgICAgICAgcHJvZ3Jlc3NFdmVudERlY29yYXRvcihcbiAgICAgICAgICAgICAgcmVzcG9uc2VDb250ZW50TGVuZ3RoLFxuICAgICAgICAgICAgICBwcm9ncmVzc0V2ZW50UmVkdWNlcihhc3luY0RlY29yYXRvcihvbkRvd25sb2FkUHJvZ3Jlc3MpLCB0cnVlKVxuICAgICAgICAgICAgKSkgfHxcbiAgICAgICAgICBbXTtcblxuICAgICAgICByZXNwb25zZSA9IG5ldyBSZXNwb25zZShcbiAgICAgICAgICB0cmFja1N0cmVhbShyZXNwb25zZS5ib2R5LCBERUZBVUxUX0NIVU5LX1NJWkUsIG9uUHJvZ3Jlc3MsICgpID0+IHtcbiAgICAgICAgICAgIGZsdXNoICYmIGZsdXNoKCk7XG4gICAgICAgICAgICB1bnN1YnNjcmliZSAmJiB1bnN1YnNjcmliZSgpO1xuICAgICAgICAgIH0pLFxuICAgICAgICAgIG9wdGlvbnNcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgcmVzcG9uc2VUeXBlID0gcmVzcG9uc2VUeXBlIHx8ICd0ZXh0JztcblxuICAgICAgbGV0IHJlc3BvbnNlRGF0YSA9IGF3YWl0IHJlc29sdmVyc1t1dGlscy5maW5kS2V5KHJlc29sdmVycywgcmVzcG9uc2VUeXBlKSB8fCAndGV4dCddKFxuICAgICAgICByZXNwb25zZSxcbiAgICAgICAgY29uZmlnXG4gICAgICApO1xuXG4gICAgICAhaXNTdHJlYW1SZXNwb25zZSAmJiB1bnN1YnNjcmliZSAmJiB1bnN1YnNjcmliZSgpO1xuXG4gICAgICByZXR1cm4gYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB7XG4gICAgICAgICAgZGF0YTogcmVzcG9uc2VEYXRhLFxuICAgICAgICAgIGhlYWRlcnM6IEF4aW9zSGVhZGVycy5mcm9tKHJlc3BvbnNlLmhlYWRlcnMpLFxuICAgICAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgICAgIHN0YXR1c1RleHQ6IHJlc3BvbnNlLnN0YXR1c1RleHQsXG4gICAgICAgICAgY29uZmlnLFxuICAgICAgICAgIHJlcXVlc3QsXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB1bnN1YnNjcmliZSAmJiB1bnN1YnNjcmliZSgpO1xuXG4gICAgICBpZiAoZXJyICYmIGVyci5uYW1lID09PSAnVHlwZUVycm9yJyAmJiAvTG9hZCBmYWlsZWR8ZmV0Y2gvaS50ZXN0KGVyci5tZXNzYWdlKSkge1xuICAgICAgICB0aHJvdyBPYmplY3QuYXNzaWduKFxuICAgICAgICAgIG5ldyBBeGlvc0Vycm9yKFxuICAgICAgICAgICAgJ05ldHdvcmsgRXJyb3InLFxuICAgICAgICAgICAgQXhpb3NFcnJvci5FUlJfTkVUV09SSyxcbiAgICAgICAgICAgIGNvbmZpZyxcbiAgICAgICAgICAgIHJlcXVlc3QsXG4gICAgICAgICAgICBlcnIgJiYgZXJyLnJlc3BvbnNlXG4gICAgICAgICAgKSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBjYXVzZTogZXJyLmNhdXNlIHx8IGVycixcbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHRocm93IEF4aW9zRXJyb3IuZnJvbShlcnIsIGVyciAmJiBlcnIuY29kZSwgY29uZmlnLCByZXF1ZXN0LCBlcnIgJiYgZXJyLnJlc3BvbnNlKTtcbiAgICB9XG4gIH07XG59O1xuXG5jb25zdCBzZWVkQ2FjaGUgPSBuZXcgTWFwKCk7XG5cbmV4cG9ydCBjb25zdCBnZXRGZXRjaCA9IChjb25maWcpID0+IHtcbiAgbGV0IGVudiA9IChjb25maWcgJiYgY29uZmlnLmVudikgfHwge307XG4gIGNvbnN0IHsgZmV0Y2gsIFJlcXVlc3QsIFJlc3BvbnNlIH0gPSBlbnY7XG4gIGNvbnN0IHNlZWRzID0gW1JlcXVlc3QsIFJlc3BvbnNlLCBmZXRjaF07XG5cbiAgbGV0IGxlbiA9IHNlZWRzLmxlbmd0aCxcbiAgICBpID0gbGVuLFxuICAgIHNlZWQsXG4gICAgdGFyZ2V0LFxuICAgIG1hcCA9IHNlZWRDYWNoZTtcblxuICB3aGlsZSAoaS0tKSB7XG4gICAgc2VlZCA9IHNlZWRzW2ldO1xuICAgIHRhcmdldCA9IG1hcC5nZXQoc2VlZCk7XG5cbiAgICB0YXJnZXQgPT09IHVuZGVmaW5lZCAmJiBtYXAuc2V0KHNlZWQsICh0YXJnZXQgPSBpID8gbmV3IE1hcCgpIDogZmFjdG9yeShlbnYpKSk7XG5cbiAgICBtYXAgPSB0YXJnZXQ7XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufTtcblxuY29uc3QgYWRhcHRlciA9IGdldEZldGNoKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGFkYXB0ZXI7XG4iLCJpbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IGh0dHBBZGFwdGVyIGZyb20gJy4vaHR0cC5qcyc7XG5pbXBvcnQgeGhyQWRhcHRlciBmcm9tICcuL3hoci5qcyc7XG5pbXBvcnQgKiBhcyBmZXRjaEFkYXB0ZXIgZnJvbSAnLi9mZXRjaC5qcyc7XG5pbXBvcnQgQXhpb3NFcnJvciBmcm9tICcuLi9jb3JlL0F4aW9zRXJyb3IuanMnO1xuXG4vKipcbiAqIEtub3duIGFkYXB0ZXJzIG1hcHBpbmcuXG4gKiBQcm92aWRlcyBlbnZpcm9ubWVudC1zcGVjaWZpYyBhZGFwdGVycyBmb3IgQXhpb3M6XG4gKiAtIGBodHRwYCBmb3IgTm9kZS5qc1xuICogLSBgeGhyYCBmb3IgYnJvd3NlcnNcbiAqIC0gYGZldGNoYCBmb3IgZmV0Y2ggQVBJLWJhc2VkIHJlcXVlc3RzXG4gKlxuICogQHR5cGUge09iamVjdDxzdHJpbmcsIEZ1bmN0aW9ufE9iamVjdD59XG4gKi9cbmNvbnN0IGtub3duQWRhcHRlcnMgPSB7XG4gIGh0dHA6IGh0dHBBZGFwdGVyLFxuICB4aHI6IHhockFkYXB0ZXIsXG4gIGZldGNoOiB7XG4gICAgZ2V0OiBmZXRjaEFkYXB0ZXIuZ2V0RmV0Y2gsXG4gIH0sXG59O1xuXG4vLyBBc3NpZ24gYWRhcHRlciBuYW1lcyBmb3IgZWFzaWVyIGRlYnVnZ2luZyBhbmQgaWRlbnRpZmljYXRpb25cbnV0aWxzLmZvckVhY2goa25vd25BZGFwdGVycywgKGZuLCB2YWx1ZSkgPT4ge1xuICBpZiAoZm4pIHtcbiAgICB0cnkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCAnbmFtZScsIHsgdmFsdWUgfSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWVtcHR5XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgJ2FkYXB0ZXJOYW1lJywgeyB2YWx1ZSB9KTtcbiAgfVxufSk7XG5cbi8qKlxuICogUmVuZGVyIGEgcmVqZWN0aW9uIHJlYXNvbiBzdHJpbmcgZm9yIHVua25vd24gb3IgdW5zdXBwb3J0ZWQgYWRhcHRlcnNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVhc29uXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5jb25zdCByZW5kZXJSZWFzb24gPSAocmVhc29uKSA9PiBgLSAke3JlYXNvbn1gO1xuXG4vKipcbiAqIENoZWNrIGlmIHRoZSBhZGFwdGVyIGlzIHJlc29sdmVkIChmdW5jdGlvbiwgbnVsbCwgb3IgZmFsc2UpXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbnxudWxsfGZhbHNlfSBhZGFwdGVyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuY29uc3QgaXNSZXNvbHZlZEhhbmRsZSA9IChhZGFwdGVyKSA9PlxuICB1dGlscy5pc0Z1bmN0aW9uKGFkYXB0ZXIpIHx8IGFkYXB0ZXIgPT09IG51bGwgfHwgYWRhcHRlciA9PT0gZmFsc2U7XG5cbi8qKlxuICogR2V0IHRoZSBmaXJzdCBzdWl0YWJsZSBhZGFwdGVyIGZyb20gdGhlIHByb3ZpZGVkIGxpc3QuXG4gKiBUcmllcyBlYWNoIGFkYXB0ZXIgaW4gb3JkZXIgdW50aWwgYSBzdXBwb3J0ZWQgb25lIGlzIGZvdW5kLlxuICogVGhyb3dzIGFuIEF4aW9zRXJyb3IgaWYgbm8gYWRhcHRlciBpcyBzdWl0YWJsZS5cbiAqXG4gKiBAcGFyYW0ge0FycmF5PHN0cmluZ3xGdW5jdGlvbj58c3RyaW5nfEZ1bmN0aW9ufSBhZGFwdGVycyAtIEFkYXB0ZXIocykgYnkgbmFtZSBvciBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgLSBBeGlvcyByZXF1ZXN0IGNvbmZpZ3VyYXRpb25cbiAqIEB0aHJvd3Mge0F4aW9zRXJyb3J9IElmIG5vIHN1aXRhYmxlIGFkYXB0ZXIgaXMgYXZhaWxhYmxlXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFRoZSByZXNvbHZlZCBhZGFwdGVyIGZ1bmN0aW9uXG4gKi9cbmZ1bmN0aW9uIGdldEFkYXB0ZXIoYWRhcHRlcnMsIGNvbmZpZykge1xuICBhZGFwdGVycyA9IHV0aWxzLmlzQXJyYXkoYWRhcHRlcnMpID8gYWRhcHRlcnMgOiBbYWRhcHRlcnNdO1xuXG4gIGNvbnN0IHsgbGVuZ3RoIH0gPSBhZGFwdGVycztcbiAgbGV0IG5hbWVPckFkYXB0ZXI7XG4gIGxldCBhZGFwdGVyO1xuXG4gIGNvbnN0IHJlamVjdGVkUmVhc29ucyA9IHt9O1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBuYW1lT3JBZGFwdGVyID0gYWRhcHRlcnNbaV07XG4gICAgbGV0IGlkO1xuXG4gICAgYWRhcHRlciA9IG5hbWVPckFkYXB0ZXI7XG5cbiAgICBpZiAoIWlzUmVzb2x2ZWRIYW5kbGUobmFtZU9yQWRhcHRlcikpIHtcbiAgICAgIGFkYXB0ZXIgPSBrbm93bkFkYXB0ZXJzWyhpZCA9IFN0cmluZyhuYW1lT3JBZGFwdGVyKSkudG9Mb3dlckNhc2UoKV07XG5cbiAgICAgIGlmIChhZGFwdGVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoYFVua25vd24gYWRhcHRlciAnJHtpZH0nYCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGFkYXB0ZXIgJiYgKHV0aWxzLmlzRnVuY3Rpb24oYWRhcHRlcikgfHwgKGFkYXB0ZXIgPSBhZGFwdGVyLmdldChjb25maWcpKSkpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHJlamVjdGVkUmVhc29uc1tpZCB8fCAnIycgKyBpXSA9IGFkYXB0ZXI7XG4gIH1cblxuICBpZiAoIWFkYXB0ZXIpIHtcbiAgICBjb25zdCByZWFzb25zID0gT2JqZWN0LmVudHJpZXMocmVqZWN0ZWRSZWFzb25zKS5tYXAoXG4gICAgICAoW2lkLCBzdGF0ZV0pID0+XG4gICAgICAgIGBhZGFwdGVyICR7aWR9IGAgK1xuICAgICAgICAoc3RhdGUgPT09IGZhbHNlID8gJ2lzIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIGVudmlyb25tZW50JyA6ICdpcyBub3QgYXZhaWxhYmxlIGluIHRoZSBidWlsZCcpXG4gICAgKTtcblxuICAgIGxldCBzID0gbGVuZ3RoXG4gICAgICA/IHJlYXNvbnMubGVuZ3RoID4gMVxuICAgICAgICA/ICdzaW5jZSA6XFxuJyArIHJlYXNvbnMubWFwKHJlbmRlclJlYXNvbikuam9pbignXFxuJylcbiAgICAgICAgOiAnICcgKyByZW5kZXJSZWFzb24ocmVhc29uc1swXSlcbiAgICAgIDogJ2FzIG5vIGFkYXB0ZXIgc3BlY2lmaWVkJztcblxuICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKFxuICAgICAgYFRoZXJlIGlzIG5vIHN1aXRhYmxlIGFkYXB0ZXIgdG8gZGlzcGF0Y2ggdGhlIHJlcXVlc3QgYCArIHMsXG4gICAgICAnRVJSX05PVF9TVVBQT1JUJ1xuICAgICk7XG4gIH1cblxuICByZXR1cm4gYWRhcHRlcjtcbn1cblxuLyoqXG4gKiBFeHBvcnRzIEF4aW9zIGFkYXB0ZXJzIGFuZCB1dGlsaXR5IHRvIHJlc29sdmUgYW4gYWRhcHRlclxuICovXG5leHBvcnQgZGVmYXVsdCB7XG4gIC8qKlxuICAgKiBSZXNvbHZlIGFuIGFkYXB0ZXIgZnJvbSBhIGxpc3Qgb2YgYWRhcHRlciBuYW1lcyBvciBmdW5jdGlvbnMuXG4gICAqIEB0eXBlIHtGdW5jdGlvbn1cbiAgICovXG4gIGdldEFkYXB0ZXIsXG5cbiAgLyoqXG4gICAqIEV4cG9zZXMgYWxsIGtub3duIGFkYXB0ZXJzXG4gICAqIEB0eXBlIHtPYmplY3Q8c3RyaW5nLCBGdW5jdGlvbnxPYmplY3Q+fVxuICAgKi9cbiAgYWRhcHRlcnM6IGtub3duQWRhcHRlcnMsXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdHJhbnNmb3JtRGF0YSBmcm9tICcuL3RyYW5zZm9ybURhdGEuanMnO1xuaW1wb3J0IGlzQ2FuY2VsIGZyb20gJy4uL2NhbmNlbC9pc0NhbmNlbC5qcyc7XG5pbXBvcnQgZGVmYXVsdHMgZnJvbSAnLi4vZGVmYXVsdHMvaW5kZXguanMnO1xuaW1wb3J0IENhbmNlbGVkRXJyb3IgZnJvbSAnLi4vY2FuY2VsL0NhbmNlbGVkRXJyb3IuanMnO1xuaW1wb3J0IEF4aW9zSGVhZGVycyBmcm9tICcuLi9jb3JlL0F4aW9zSGVhZGVycy5qcyc7XG5pbXBvcnQgYWRhcHRlcnMgZnJvbSAnLi4vYWRhcHRlcnMvYWRhcHRlcnMuanMnO1xuXG4vKipcbiAqIFRocm93cyBhIGBDYW5jZWxlZEVycm9yYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyB0aGF0IGlzIHRvIGJlIHVzZWQgZm9yIHRoZSByZXF1ZXN0XG4gKlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmZ1bmN0aW9uIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKSB7XG4gIGlmIChjb25maWcuY2FuY2VsVG9rZW4pIHtcbiAgICBjb25maWcuY2FuY2VsVG9rZW4udGhyb3dJZlJlcXVlc3RlZCgpO1xuICB9XG5cbiAgaWYgKGNvbmZpZy5zaWduYWwgJiYgY29uZmlnLnNpZ25hbC5hYm9ydGVkKSB7XG4gICAgdGhyb3cgbmV3IENhbmNlbGVkRXJyb3IobnVsbCwgY29uZmlnKTtcbiAgfVxufVxuXG4vKipcbiAqIERpc3BhdGNoIGEgcmVxdWVzdCB0byB0aGUgc2VydmVyIHVzaW5nIHRoZSBjb25maWd1cmVkIGFkYXB0ZXIuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHRoYXQgaXMgdG8gYmUgdXNlZCBmb3IgdGhlIHJlcXVlc3RcbiAqXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gVGhlIFByb21pc2UgdG8gYmUgZnVsZmlsbGVkXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRpc3BhdGNoUmVxdWVzdChjb25maWcpIHtcbiAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gIGNvbmZpZy5oZWFkZXJzID0gQXhpb3NIZWFkZXJzLmZyb20oY29uZmlnLmhlYWRlcnMpO1xuXG4gIC8vIFRyYW5zZm9ybSByZXF1ZXN0IGRhdGFcbiAgY29uZmlnLmRhdGEgPSB0cmFuc2Zvcm1EYXRhLmNhbGwoY29uZmlnLCBjb25maWcudHJhbnNmb3JtUmVxdWVzdCk7XG5cbiAgaWYgKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXS5pbmRleE9mKGNvbmZpZy5tZXRob2QpICE9PSAtMSkge1xuICAgIGNvbmZpZy5oZWFkZXJzLnNldENvbnRlbnRUeXBlKCdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnLCBmYWxzZSk7XG4gIH1cblxuICBjb25zdCBhZGFwdGVyID0gYWRhcHRlcnMuZ2V0QWRhcHRlcihjb25maWcuYWRhcHRlciB8fCBkZWZhdWx0cy5hZGFwdGVyLCBjb25maWcpO1xuXG4gIHJldHVybiBhZGFwdGVyKGNvbmZpZykudGhlbihcbiAgICBmdW5jdGlvbiBvbkFkYXB0ZXJSZXNvbHV0aW9uKHJlc3BvbnNlKSB7XG4gICAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAgIC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG4gICAgICByZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YS5jYWxsKGNvbmZpZywgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlLCByZXNwb25zZSk7XG5cbiAgICAgIHJlc3BvbnNlLmhlYWRlcnMgPSBBeGlvc0hlYWRlcnMuZnJvbShyZXNwb25zZS5oZWFkZXJzKTtcblxuICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH0sXG4gICAgZnVuY3Rpb24gb25BZGFwdGVyUmVqZWN0aW9uKHJlYXNvbikge1xuICAgICAgaWYgKCFpc0NhbmNlbChyZWFzb24pKSB7XG4gICAgICAgIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAgICAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuICAgICAgICBpZiAocmVhc29uICYmIHJlYXNvbi5yZXNwb25zZSkge1xuICAgICAgICAgIHJlYXNvbi5yZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YS5jYWxsKFxuICAgICAgICAgICAgY29uZmlnLFxuICAgICAgICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlLFxuICAgICAgICAgICAgcmVhc29uLnJlc3BvbnNlXG4gICAgICAgICAgKTtcbiAgICAgICAgICByZWFzb24ucmVzcG9uc2UuaGVhZGVycyA9IEF4aW9zSGVhZGVycy5mcm9tKHJlYXNvbi5yZXNwb25zZS5oZWFkZXJzKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVhc29uKTtcbiAgICB9XG4gICk7XG59XG4iLCJleHBvcnQgY29uc3QgVkVSU0lPTiA9IFwiMS4xMy42XCI7IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgeyBWRVJTSU9OIH0gZnJvbSAnLi4vZW52L2RhdGEuanMnO1xuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSAnLi4vY29yZS9BeGlvc0Vycm9yLmpzJztcblxuY29uc3QgdmFsaWRhdG9ycyA9IHt9O1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuWydvYmplY3QnLCAnYm9vbGVhbicsICdudW1iZXInLCAnZnVuY3Rpb24nLCAnc3RyaW5nJywgJ3N5bWJvbCddLmZvckVhY2goKHR5cGUsIGkpID0+IHtcbiAgdmFsaWRhdG9yc1t0eXBlXSA9IGZ1bmN0aW9uIHZhbGlkYXRvcih0aGluZykge1xuICAgIHJldHVybiB0eXBlb2YgdGhpbmcgPT09IHR5cGUgfHwgJ2EnICsgKGkgPCAxID8gJ24gJyA6ICcgJykgKyB0eXBlO1xuICB9O1xufSk7XG5cbmNvbnN0IGRlcHJlY2F0ZWRXYXJuaW5ncyA9IHt9O1xuXG4vKipcbiAqIFRyYW5zaXRpb25hbCBvcHRpb24gdmFsaWRhdG9yXG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbnxib29sZWFuP30gdmFsaWRhdG9yIC0gc2V0IHRvIGZhbHNlIGlmIHRoZSB0cmFuc2l0aW9uYWwgb3B0aW9uIGhhcyBiZWVuIHJlbW92ZWRcbiAqIEBwYXJhbSB7c3RyaW5nP30gdmVyc2lvbiAtIGRlcHJlY2F0ZWQgdmVyc2lvbiAvIHJlbW92ZWQgc2luY2UgdmVyc2lvblxuICogQHBhcmFtIHtzdHJpbmc/fSBtZXNzYWdlIC0gc29tZSBtZXNzYWdlIHdpdGggYWRkaXRpb25hbCBpbmZvXG4gKlxuICogQHJldHVybnMge2Z1bmN0aW9ufVxuICovXG52YWxpZGF0b3JzLnRyYW5zaXRpb25hbCA9IGZ1bmN0aW9uIHRyYW5zaXRpb25hbCh2YWxpZGF0b3IsIHZlcnNpb24sIG1lc3NhZ2UpIHtcbiAgZnVuY3Rpb24gZm9ybWF0TWVzc2FnZShvcHQsIGRlc2MpIHtcbiAgICByZXR1cm4gKFxuICAgICAgJ1tBeGlvcyB2JyArXG4gICAgICBWRVJTSU9OICtcbiAgICAgIFwiXSBUcmFuc2l0aW9uYWwgb3B0aW9uICdcIiArXG4gICAgICBvcHQgK1xuICAgICAgXCInXCIgK1xuICAgICAgZGVzYyArXG4gICAgICAobWVzc2FnZSA/ICcuICcgKyBtZXNzYWdlIDogJycpXG4gICAgKTtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG4gIHJldHVybiAodmFsdWUsIG9wdCwgb3B0cykgPT4ge1xuICAgIGlmICh2YWxpZGF0b3IgPT09IGZhbHNlKSB7XG4gICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcihcbiAgICAgICAgZm9ybWF0TWVzc2FnZShvcHQsICcgaGFzIGJlZW4gcmVtb3ZlZCcgKyAodmVyc2lvbiA/ICcgaW4gJyArIHZlcnNpb24gOiAnJykpLFxuICAgICAgICBBeGlvc0Vycm9yLkVSUl9ERVBSRUNBVEVEXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICh2ZXJzaW9uICYmICFkZXByZWNhdGVkV2FybmluZ3Nbb3B0XSkge1xuICAgICAgZGVwcmVjYXRlZFdhcm5pbmdzW29wdF0gPSB0cnVlO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgZm9ybWF0TWVzc2FnZShcbiAgICAgICAgICBvcHQsXG4gICAgICAgICAgJyBoYXMgYmVlbiBkZXByZWNhdGVkIHNpbmNlIHYnICsgdmVyc2lvbiArICcgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgbmVhciBmdXR1cmUnXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbGlkYXRvciA/IHZhbGlkYXRvcih2YWx1ZSwgb3B0LCBvcHRzKSA6IHRydWU7XG4gIH07XG59O1xuXG52YWxpZGF0b3JzLnNwZWxsaW5nID0gZnVuY3Rpb24gc3BlbGxpbmcoY29ycmVjdFNwZWxsaW5nKSB7XG4gIHJldHVybiAodmFsdWUsIG9wdCkgPT4ge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgY29uc29sZS53YXJuKGAke29wdH0gaXMgbGlrZWx5IGEgbWlzc3BlbGxpbmcgb2YgJHtjb3JyZWN0U3BlbGxpbmd9YCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG59O1xuXG4vKipcbiAqIEFzc2VydCBvYmplY3QncyBwcm9wZXJ0aWVzIHR5cGVcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gb3B0aW9uc1xuICogQHBhcmFtIHtvYmplY3R9IHNjaGVtYVxuICogQHBhcmFtIHtib29sZWFuP30gYWxsb3dVbmtub3duXG4gKlxuICogQHJldHVybnMge29iamVjdH1cbiAqL1xuXG5mdW5jdGlvbiBhc3NlcnRPcHRpb25zKG9wdGlvbnMsIHNjaGVtYSwgYWxsb3dVbmtub3duKSB7XG4gIGlmICh0eXBlb2Ygb3B0aW9ucyAhPT0gJ29iamVjdCcpIHtcbiAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcignb3B0aW9ucyBtdXN0IGJlIGFuIG9iamVjdCcsIEF4aW9zRXJyb3IuRVJSX0JBRF9PUFRJT05fVkFMVUUpO1xuICB9XG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhvcHRpb25zKTtcbiAgbGV0IGkgPSBrZXlzLmxlbmd0aDtcbiAgd2hpbGUgKGktLSA+IDApIHtcbiAgICBjb25zdCBvcHQgPSBrZXlzW2ldO1xuICAgIGNvbnN0IHZhbGlkYXRvciA9IHNjaGVtYVtvcHRdO1xuICAgIGlmICh2YWxpZGF0b3IpIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gb3B0aW9uc1tvcHRdO1xuICAgICAgY29uc3QgcmVzdWx0ID0gdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWxpZGF0b3IodmFsdWUsIG9wdCwgb3B0aW9ucyk7XG4gICAgICBpZiAocmVzdWx0ICE9PSB0cnVlKSB7XG4gICAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKFxuICAgICAgICAgICdvcHRpb24gJyArIG9wdCArICcgbXVzdCBiZSAnICsgcmVzdWx0LFxuICAgICAgICAgIEF4aW9zRXJyb3IuRVJSX0JBRF9PUFRJT05fVkFMVUVcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBpZiAoYWxsb3dVbmtub3duICE9PSB0cnVlKSB7XG4gICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcignVW5rbm93biBvcHRpb24gJyArIG9wdCwgQXhpb3NFcnJvci5FUlJfQkFEX09QVElPTik7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgYXNzZXJ0T3B0aW9ucyxcbiAgdmFsaWRhdG9ycyxcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy5qcyc7XG5pbXBvcnQgYnVpbGRVUkwgZnJvbSAnLi4vaGVscGVycy9idWlsZFVSTC5qcyc7XG5pbXBvcnQgSW50ZXJjZXB0b3JNYW5hZ2VyIGZyb20gJy4vSW50ZXJjZXB0b3JNYW5hZ2VyLmpzJztcbmltcG9ydCBkaXNwYXRjaFJlcXVlc3QgZnJvbSAnLi9kaXNwYXRjaFJlcXVlc3QuanMnO1xuaW1wb3J0IG1lcmdlQ29uZmlnIGZyb20gJy4vbWVyZ2VDb25maWcuanMnO1xuaW1wb3J0IGJ1aWxkRnVsbFBhdGggZnJvbSAnLi9idWlsZEZ1bGxQYXRoLmpzJztcbmltcG9ydCB2YWxpZGF0b3IgZnJvbSAnLi4vaGVscGVycy92YWxpZGF0b3IuanMnO1xuaW1wb3J0IEF4aW9zSGVhZGVycyBmcm9tICcuL0F4aW9zSGVhZGVycy5qcyc7XG5pbXBvcnQgdHJhbnNpdGlvbmFsRGVmYXVsdHMgZnJvbSAnLi4vZGVmYXVsdHMvdHJhbnNpdGlvbmFsLmpzJztcblxuY29uc3QgdmFsaWRhdG9ycyA9IHZhbGlkYXRvci52YWxpZGF0b3JzO1xuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZUNvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxuICpcbiAqIEByZXR1cm4ge0F4aW9zfSBBIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICovXG5jbGFzcyBBeGlvcyB7XG4gIGNvbnN0cnVjdG9yKGluc3RhbmNlQ29uZmlnKSB7XG4gICAgdGhpcy5kZWZhdWx0cyA9IGluc3RhbmNlQ29uZmlnIHx8IHt9O1xuICAgIHRoaXMuaW50ZXJjZXB0b3JzID0ge1xuICAgICAgcmVxdWVzdDogbmV3IEludGVyY2VwdG9yTWFuYWdlcigpLFxuICAgICAgcmVzcG9uc2U6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKSxcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIERpc3BhdGNoIGEgcmVxdWVzdFxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IGNvbmZpZ09yVXJsIFRoZSBjb25maWcgc3BlY2lmaWMgZm9yIHRoaXMgcmVxdWVzdCAobWVyZ2VkIHdpdGggdGhpcy5kZWZhdWx0cylcbiAgICogQHBhcmFtIHs/T2JqZWN0fSBjb25maWdcbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2V9IFRoZSBQcm9taXNlIHRvIGJlIGZ1bGZpbGxlZFxuICAgKi9cbiAgYXN5bmMgcmVxdWVzdChjb25maWdPclVybCwgY29uZmlnKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBhd2FpdCB0aGlzLl9yZXF1ZXN0KGNvbmZpZ09yVXJsLCBjb25maWcpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgaWYgKGVyciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgIGxldCBkdW1teSA9IHt9O1xuXG4gICAgICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlID8gRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UoZHVtbXkpIDogKGR1bW15ID0gbmV3IEVycm9yKCkpO1xuXG4gICAgICAgIC8vIHNsaWNlIG9mZiB0aGUgRXJyb3I6IC4uLiBsaW5lXG4gICAgICAgIGNvbnN0IHN0YWNrID0gZHVtbXkuc3RhY2sgPyBkdW1teS5zdGFjay5yZXBsYWNlKC9eLitcXG4vLCAnJykgOiAnJztcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAoIWVyci5zdGFjaykge1xuICAgICAgICAgICAgZXJyLnN0YWNrID0gc3RhY2s7XG4gICAgICAgICAgICAvLyBtYXRjaCB3aXRob3V0IHRoZSAyIHRvcCBzdGFjayBsaW5lc1xuICAgICAgICAgIH0gZWxzZSBpZiAoc3RhY2sgJiYgIVN0cmluZyhlcnIuc3RhY2spLmVuZHNXaXRoKHN0YWNrLnJlcGxhY2UoL14uK1xcbi4rXFxuLywgJycpKSkge1xuICAgICAgICAgICAgZXJyLnN0YWNrICs9ICdcXG4nICsgc3RhY2s7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgLy8gaWdub3JlIHRoZSBjYXNlIHdoZXJlIFwic3RhY2tcIiBpcyBhbiB1bi13cml0YWJsZSBwcm9wZXJ0eVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRocm93IGVycjtcbiAgICB9XG4gIH1cblxuICBfcmVxdWVzdChjb25maWdPclVybCwgY29uZmlnKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgLy8gQWxsb3cgZm9yIGF4aW9zKCdleGFtcGxlL3VybCdbLCBjb25maWddKSBhIGxhIGZldGNoIEFQSVxuICAgIGlmICh0eXBlb2YgY29uZmlnT3JVcmwgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb25maWcgPSBjb25maWcgfHwge307XG4gICAgICBjb25maWcudXJsID0gY29uZmlnT3JVcmw7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbmZpZyA9IGNvbmZpZ09yVXJsIHx8IHt9O1xuICAgIH1cblxuICAgIGNvbmZpZyA9IG1lcmdlQ29uZmlnKHRoaXMuZGVmYXVsdHMsIGNvbmZpZyk7XG5cbiAgICBjb25zdCB7IHRyYW5zaXRpb25hbCwgcGFyYW1zU2VyaWFsaXplciwgaGVhZGVycyB9ID0gY29uZmlnO1xuXG4gICAgaWYgKHRyYW5zaXRpb25hbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB2YWxpZGF0b3IuYXNzZXJ0T3B0aW9ucyhcbiAgICAgICAgdHJhbnNpdGlvbmFsLFxuICAgICAgICB7XG4gICAgICAgICAgc2lsZW50SlNPTlBhcnNpbmc6IHZhbGlkYXRvcnMudHJhbnNpdGlvbmFsKHZhbGlkYXRvcnMuYm9vbGVhbiksXG4gICAgICAgICAgZm9yY2VkSlNPTlBhcnNpbmc6IHZhbGlkYXRvcnMudHJhbnNpdGlvbmFsKHZhbGlkYXRvcnMuYm9vbGVhbiksXG4gICAgICAgICAgY2xhcmlmeVRpbWVvdXRFcnJvcjogdmFsaWRhdG9ycy50cmFuc2l0aW9uYWwodmFsaWRhdG9ycy5ib29sZWFuKSxcbiAgICAgICAgICBsZWdhY3lJbnRlcmNlcHRvclJlcVJlc09yZGVyaW5nOiB2YWxpZGF0b3JzLnRyYW5zaXRpb25hbCh2YWxpZGF0b3JzLmJvb2xlYW4pLFxuICAgICAgICB9LFxuICAgICAgICBmYWxzZVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAocGFyYW1zU2VyaWFsaXplciAhPSBudWxsKSB7XG4gICAgICBpZiAodXRpbHMuaXNGdW5jdGlvbihwYXJhbXNTZXJpYWxpemVyKSkge1xuICAgICAgICBjb25maWcucGFyYW1zU2VyaWFsaXplciA9IHtcbiAgICAgICAgICBzZXJpYWxpemU6IHBhcmFtc1NlcmlhbGl6ZXIsXG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWxpZGF0b3IuYXNzZXJ0T3B0aW9ucyhcbiAgICAgICAgICBwYXJhbXNTZXJpYWxpemVyLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGVuY29kZTogdmFsaWRhdG9ycy5mdW5jdGlvbixcbiAgICAgICAgICAgIHNlcmlhbGl6ZTogdmFsaWRhdG9ycy5mdW5jdGlvbixcbiAgICAgICAgICB9LFxuICAgICAgICAgIHRydWVcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBTZXQgY29uZmlnLmFsbG93QWJzb2x1dGVVcmxzXG4gICAgaWYgKGNvbmZpZy5hbGxvd0Fic29sdXRlVXJscyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBkbyBub3RoaW5nXG4gICAgfSBlbHNlIGlmICh0aGlzLmRlZmF1bHRzLmFsbG93QWJzb2x1dGVVcmxzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbmZpZy5hbGxvd0Fic29sdXRlVXJscyA9IHRoaXMuZGVmYXVsdHMuYWxsb3dBYnNvbHV0ZVVybHM7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbmZpZy5hbGxvd0Fic29sdXRlVXJscyA9IHRydWU7XG4gICAgfVxuXG4gICAgdmFsaWRhdG9yLmFzc2VydE9wdGlvbnMoXG4gICAgICBjb25maWcsXG4gICAgICB7XG4gICAgICAgIGJhc2VVcmw6IHZhbGlkYXRvcnMuc3BlbGxpbmcoJ2Jhc2VVUkwnKSxcbiAgICAgICAgd2l0aFhzcmZUb2tlbjogdmFsaWRhdG9ycy5zcGVsbGluZygnd2l0aFhTUkZUb2tlbicpLFxuICAgICAgfSxcbiAgICAgIHRydWVcbiAgICApO1xuXG4gICAgLy8gU2V0IGNvbmZpZy5tZXRob2RcbiAgICBjb25maWcubWV0aG9kID0gKGNvbmZpZy5tZXRob2QgfHwgdGhpcy5kZWZhdWx0cy5tZXRob2QgfHwgJ2dldCcpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAvLyBGbGF0dGVuIGhlYWRlcnNcbiAgICBsZXQgY29udGV4dEhlYWRlcnMgPSBoZWFkZXJzICYmIHV0aWxzLm1lcmdlKGhlYWRlcnMuY29tbW9uLCBoZWFkZXJzW2NvbmZpZy5tZXRob2RdKTtcblxuICAgIGhlYWRlcnMgJiZcbiAgICAgIHV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAncG9zdCcsICdwdXQnLCAncGF0Y2gnLCAnY29tbW9uJ10sIChtZXRob2QpID0+IHtcbiAgICAgICAgZGVsZXRlIGhlYWRlcnNbbWV0aG9kXTtcbiAgICAgIH0pO1xuXG4gICAgY29uZmlnLmhlYWRlcnMgPSBBeGlvc0hlYWRlcnMuY29uY2F0KGNvbnRleHRIZWFkZXJzLCBoZWFkZXJzKTtcblxuICAgIC8vIGZpbHRlciBvdXQgc2tpcHBlZCBpbnRlcmNlcHRvcnNcbiAgICBjb25zdCByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbiA9IFtdO1xuICAgIGxldCBzeW5jaHJvbm91c1JlcXVlc3RJbnRlcmNlcHRvcnMgPSB0cnVlO1xuICAgIHRoaXMuaW50ZXJjZXB0b3JzLnJlcXVlc3QuZm9yRWFjaChmdW5jdGlvbiB1bnNoaWZ0UmVxdWVzdEludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgICAgaWYgKHR5cGVvZiBpbnRlcmNlcHRvci5ydW5XaGVuID09PSAnZnVuY3Rpb24nICYmIGludGVyY2VwdG9yLnJ1bldoZW4oY29uZmlnKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBzeW5jaHJvbm91c1JlcXVlc3RJbnRlcmNlcHRvcnMgPSBzeW5jaHJvbm91c1JlcXVlc3RJbnRlcmNlcHRvcnMgJiYgaW50ZXJjZXB0b3Iuc3luY2hyb25vdXM7XG5cbiAgICAgIGNvbnN0IHRyYW5zaXRpb25hbCA9IGNvbmZpZy50cmFuc2l0aW9uYWwgfHwgdHJhbnNpdGlvbmFsRGVmYXVsdHM7XG4gICAgICBjb25zdCBsZWdhY3lJbnRlcmNlcHRvclJlcVJlc09yZGVyaW5nID1cbiAgICAgICAgdHJhbnNpdGlvbmFsICYmIHRyYW5zaXRpb25hbC5sZWdhY3lJbnRlcmNlcHRvclJlcVJlc09yZGVyaW5nO1xuXG4gICAgICBpZiAobGVnYWN5SW50ZXJjZXB0b3JSZXFSZXNPcmRlcmluZykge1xuICAgICAgICByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbi51bnNoaWZ0KGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVxdWVzdEludGVyY2VwdG9yQ2hhaW4ucHVzaChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbiA9IFtdO1xuICAgIHRoaXMuaW50ZXJjZXB0b3JzLnJlc3BvbnNlLmZvckVhY2goZnVuY3Rpb24gcHVzaFJlc3BvbnNlSW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XG4gICAgICByZXNwb25zZUludGVyY2VwdG9yQ2hhaW4ucHVzaChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgICB9KTtcblxuICAgIGxldCBwcm9taXNlO1xuICAgIGxldCBpID0gMDtcbiAgICBsZXQgbGVuO1xuXG4gICAgaWYgKCFzeW5jaHJvbm91c1JlcXVlc3RJbnRlcmNlcHRvcnMpIHtcbiAgICAgIGNvbnN0IGNoYWluID0gW2Rpc3BhdGNoUmVxdWVzdC5iaW5kKHRoaXMpLCB1bmRlZmluZWRdO1xuICAgICAgY2hhaW4udW5zaGlmdCguLi5yZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbik7XG4gICAgICBjaGFpbi5wdXNoKC4uLnJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbik7XG4gICAgICBsZW4gPSBjaGFpbi5sZW5ndGg7XG5cbiAgICAgIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoY29uZmlnKTtcblxuICAgICAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICAgICAgcHJvbWlzZSA9IHByb21pc2UudGhlbihjaGFpbltpKytdLCBjaGFpbltpKytdKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfVxuXG4gICAgbGVuID0gcmVxdWVzdEludGVyY2VwdG9yQ2hhaW4ubGVuZ3RoO1xuXG4gICAgbGV0IG5ld0NvbmZpZyA9IGNvbmZpZztcblxuICAgIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgICBjb25zdCBvbkZ1bGZpbGxlZCA9IHJlcXVlc3RJbnRlcmNlcHRvckNoYWluW2krK107XG4gICAgICBjb25zdCBvblJlamVjdGVkID0gcmVxdWVzdEludGVyY2VwdG9yQ2hhaW5baSsrXTtcbiAgICAgIHRyeSB7XG4gICAgICAgIG5ld0NvbmZpZyA9IG9uRnVsZmlsbGVkKG5ld0NvbmZpZyk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBvblJlamVjdGVkLmNhbGwodGhpcywgZXJyb3IpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgcHJvbWlzZSA9IGRpc3BhdGNoUmVxdWVzdC5jYWxsKHRoaXMsIG5ld0NvbmZpZyk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gICAgfVxuXG4gICAgaSA9IDA7XG4gICAgbGVuID0gcmVzcG9uc2VJbnRlcmNlcHRvckNoYWluLmxlbmd0aDtcblxuICAgIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgICBwcm9taXNlID0gcHJvbWlzZS50aGVuKHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbltpKytdLCByZXNwb25zZUludGVyY2VwdG9yQ2hhaW5baSsrXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cblxuICBnZXRVcmkoY29uZmlnKSB7XG4gICAgY29uZmlnID0gbWVyZ2VDb25maWcodGhpcy5kZWZhdWx0cywgY29uZmlnKTtcbiAgICBjb25zdCBmdWxsUGF0aCA9IGJ1aWxkRnVsbFBhdGgoY29uZmlnLmJhc2VVUkwsIGNvbmZpZy51cmwsIGNvbmZpZy5hbGxvd0Fic29sdXRlVXJscyk7XG4gICAgcmV0dXJuIGJ1aWxkVVJMKGZ1bGxQYXRoLCBjb25maWcucGFyYW1zLCBjb25maWcucGFyYW1zU2VyaWFsaXplcik7XG4gIH1cbn1cblxuLy8gUHJvdmlkZSBhbGlhc2VzIGZvciBzdXBwb3J0ZWQgcmVxdWVzdCBtZXRob2RzXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ29wdGlvbnMnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbiAodXJsLCBjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KFxuICAgICAgbWVyZ2VDb25maWcoY29uZmlnIHx8IHt9LCB7XG4gICAgICAgIG1ldGhvZCxcbiAgICAgICAgdXJsLFxuICAgICAgICBkYXRhOiAoY29uZmlnIHx8IHt9KS5kYXRhLFxuICAgICAgfSlcbiAgICApO1xuICB9O1xufSk7XG5cbnV0aWxzLmZvckVhY2goWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kV2l0aERhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG5cbiAgZnVuY3Rpb24gZ2VuZXJhdGVIVFRQTWV0aG9kKGlzRm9ybSkge1xuICAgIHJldHVybiBmdW5jdGlvbiBodHRwTWV0aG9kKHVybCwgZGF0YSwgY29uZmlnKSB7XG4gICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KFxuICAgICAgICBtZXJnZUNvbmZpZyhjb25maWcgfHwge30sIHtcbiAgICAgICAgICBtZXRob2QsXG4gICAgICAgICAgaGVhZGVyczogaXNGb3JtXG4gICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ211bHRpcGFydC9mb3JtLWRhdGEnLFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA6IHt9LFxuICAgICAgICAgIHVybCxcbiAgICAgICAgICBkYXRhLFxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9O1xuICB9XG5cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBnZW5lcmF0ZUhUVFBNZXRob2QoKTtcblxuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kICsgJ0Zvcm0nXSA9IGdlbmVyYXRlSFRUUE1ldGhvZCh0cnVlKTtcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBBeGlvcztcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IENhbmNlbGVkRXJyb3IgZnJvbSAnLi9DYW5jZWxlZEVycm9yLmpzJztcblxuLyoqXG4gKiBBIGBDYW5jZWxUb2tlbmAgaXMgYW4gb2JqZWN0IHRoYXQgY2FuIGJlIHVzZWQgdG8gcmVxdWVzdCBjYW5jZWxsYXRpb24gb2YgYW4gb3BlcmF0aW9uLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGV4ZWN1dG9yIFRoZSBleGVjdXRvciBmdW5jdGlvbi5cbiAqXG4gKiBAcmV0dXJucyB7Q2FuY2VsVG9rZW59XG4gKi9cbmNsYXNzIENhbmNlbFRva2VuIHtcbiAgY29uc3RydWN0b3IoZXhlY3V0b3IpIHtcbiAgICBpZiAodHlwZW9mIGV4ZWN1dG9yICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdleGVjdXRvciBtdXN0IGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgfVxuXG4gICAgbGV0IHJlc29sdmVQcm9taXNlO1xuXG4gICAgdGhpcy5wcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gcHJvbWlzZUV4ZWN1dG9yKHJlc29sdmUpIHtcbiAgICAgIHJlc29sdmVQcm9taXNlID0gcmVzb2x2ZTtcbiAgICB9KTtcblxuICAgIGNvbnN0IHRva2VuID0gdGhpcztcblxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG4gICAgdGhpcy5wcm9taXNlLnRoZW4oKGNhbmNlbCkgPT4ge1xuICAgICAgaWYgKCF0b2tlbi5fbGlzdGVuZXJzKSByZXR1cm47XG5cbiAgICAgIGxldCBpID0gdG9rZW4uX2xpc3RlbmVycy5sZW5ndGg7XG5cbiAgICAgIHdoaWxlIChpLS0gPiAwKSB7XG4gICAgICAgIHRva2VuLl9saXN0ZW5lcnNbaV0oY2FuY2VsKTtcbiAgICAgIH1cbiAgICAgIHRva2VuLl9saXN0ZW5lcnMgPSBudWxsO1xuICAgIH0pO1xuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgICB0aGlzLnByb21pc2UudGhlbiA9IChvbmZ1bGZpbGxlZCkgPT4ge1xuICAgICAgbGV0IF9yZXNvbHZlO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICB0b2tlbi5zdWJzY3JpYmUocmVzb2x2ZSk7XG4gICAgICAgIF9yZXNvbHZlID0gcmVzb2x2ZTtcbiAgICAgIH0pLnRoZW4ob25mdWxmaWxsZWQpO1xuXG4gICAgICBwcm9taXNlLmNhbmNlbCA9IGZ1bmN0aW9uIHJlamVjdCgpIHtcbiAgICAgICAgdG9rZW4udW5zdWJzY3JpYmUoX3Jlc29sdmUpO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfTtcblxuICAgIGV4ZWN1dG9yKGZ1bmN0aW9uIGNhbmNlbChtZXNzYWdlLCBjb25maWcsIHJlcXVlc3QpIHtcbiAgICAgIGlmICh0b2tlbi5yZWFzb24pIHtcbiAgICAgICAgLy8gQ2FuY2VsbGF0aW9uIGhhcyBhbHJlYWR5IGJlZW4gcmVxdWVzdGVkXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdG9rZW4ucmVhc29uID0gbmV3IENhbmNlbGVkRXJyb3IobWVzc2FnZSwgY29uZmlnLCByZXF1ZXN0KTtcbiAgICAgIHJlc29sdmVQcm9taXNlKHRva2VuLnJlYXNvbik7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogVGhyb3dzIGEgYENhbmNlbGVkRXJyb3JgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gICAqL1xuICB0aHJvd0lmUmVxdWVzdGVkKCkge1xuICAgIGlmICh0aGlzLnJlYXNvbikge1xuICAgICAgdGhyb3cgdGhpcy5yZWFzb247XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFN1YnNjcmliZSB0byB0aGUgY2FuY2VsIHNpZ25hbFxuICAgKi9cblxuICBzdWJzY3JpYmUobGlzdGVuZXIpIHtcbiAgICBpZiAodGhpcy5yZWFzb24pIHtcbiAgICAgIGxpc3RlbmVyKHRoaXMucmVhc29uKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fbGlzdGVuZXJzKSB7XG4gICAgICB0aGlzLl9saXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2xpc3RlbmVycyA9IFtsaXN0ZW5lcl07XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFVuc3Vic2NyaWJlIGZyb20gdGhlIGNhbmNlbCBzaWduYWxcbiAgICovXG5cbiAgdW5zdWJzY3JpYmUobGlzdGVuZXIpIHtcbiAgICBpZiAoIXRoaXMuX2xpc3RlbmVycykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBpbmRleCA9IHRoaXMuX2xpc3RlbmVycy5pbmRleE9mKGxpc3RlbmVyKTtcbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICB0aGlzLl9saXN0ZW5lcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gIH1cblxuICB0b0Fib3J0U2lnbmFsKCkge1xuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG5cbiAgICBjb25zdCBhYm9ydCA9IChlcnIpID0+IHtcbiAgICAgIGNvbnRyb2xsZXIuYWJvcnQoZXJyKTtcbiAgICB9O1xuXG4gICAgdGhpcy5zdWJzY3JpYmUoYWJvcnQpO1xuXG4gICAgY29udHJvbGxlci5zaWduYWwudW5zdWJzY3JpYmUgPSAoKSA9PiB0aGlzLnVuc3Vic2NyaWJlKGFib3J0KTtcblxuICAgIHJldHVybiBjb250cm9sbGVyLnNpZ25hbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIG9iamVjdCB0aGF0IGNvbnRhaW5zIGEgbmV3IGBDYW5jZWxUb2tlbmAgYW5kIGEgZnVuY3Rpb24gdGhhdCwgd2hlbiBjYWxsZWQsXG4gICAqIGNhbmNlbHMgdGhlIGBDYW5jZWxUb2tlbmAuXG4gICAqL1xuICBzdGF0aWMgc291cmNlKCkge1xuICAgIGxldCBjYW5jZWw7XG4gICAgY29uc3QgdG9rZW4gPSBuZXcgQ2FuY2VsVG9rZW4oZnVuY3Rpb24gZXhlY3V0b3IoYykge1xuICAgICAgY2FuY2VsID0gYztcbiAgICB9KTtcbiAgICByZXR1cm4ge1xuICAgICAgdG9rZW4sXG4gICAgICBjYW5jZWwsXG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDYW5jZWxUb2tlbjtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBTeW50YWN0aWMgc3VnYXIgZm9yIGludm9raW5nIGEgZnVuY3Rpb24gYW5kIGV4cGFuZGluZyBhbiBhcnJheSBmb3IgYXJndW1lbnRzLlxuICpcbiAqIENvbW1vbiB1c2UgY2FzZSB3b3VsZCBiZSB0byB1c2UgYEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseWAuXG4gKlxuICogIGBgYGpzXG4gKiAgZnVuY3Rpb24gZih4LCB5LCB6KSB7fVxuICogIGNvbnN0IGFyZ3MgPSBbMSwgMiwgM107XG4gKiAgZi5hcHBseShudWxsLCBhcmdzKTtcbiAqICBgYGBcbiAqXG4gKiBXaXRoIGBzcHJlYWRgIHRoaXMgZXhhbXBsZSBjYW4gYmUgcmUtd3JpdHRlbi5cbiAqXG4gKiAgYGBganNcbiAqICBzcHJlYWQoZnVuY3Rpb24oeCwgeSwgeikge30pKFsxLCAyLCAzXSk7XG4gKiAgYGBgXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNwcmVhZChjYWxsYmFjaykge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcChhcnIpIHtcbiAgICByZXR1cm4gY2FsbGJhY2suYXBwbHkobnVsbCwgYXJyKTtcbiAgfTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHBheWxvYWQgaXMgYW4gZXJyb3IgdGhyb3duIGJ5IEF4aW9zXG4gKlxuICogQHBhcmFtIHsqfSBwYXlsb2FkIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHBheWxvYWQgaXMgYW4gZXJyb3IgdGhyb3duIGJ5IEF4aW9zLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNBeGlvc0Vycm9yKHBheWxvYWQpIHtcbiAgcmV0dXJuIHV0aWxzLmlzT2JqZWN0KHBheWxvYWQpICYmIHBheWxvYWQuaXNBeGlvc0Vycm9yID09PSB0cnVlO1xufVxuIiwiY29uc3QgSHR0cFN0YXR1c0NvZGUgPSB7XG4gIENvbnRpbnVlOiAxMDAsXG4gIFN3aXRjaGluZ1Byb3RvY29sczogMTAxLFxuICBQcm9jZXNzaW5nOiAxMDIsXG4gIEVhcmx5SGludHM6IDEwMyxcbiAgT2s6IDIwMCxcbiAgQ3JlYXRlZDogMjAxLFxuICBBY2NlcHRlZDogMjAyLFxuICBOb25BdXRob3JpdGF0aXZlSW5mb3JtYXRpb246IDIwMyxcbiAgTm9Db250ZW50OiAyMDQsXG4gIFJlc2V0Q29udGVudDogMjA1LFxuICBQYXJ0aWFsQ29udGVudDogMjA2LFxuICBNdWx0aVN0YXR1czogMjA3LFxuICBBbHJlYWR5UmVwb3J0ZWQ6IDIwOCxcbiAgSW1Vc2VkOiAyMjYsXG4gIE11bHRpcGxlQ2hvaWNlczogMzAwLFxuICBNb3ZlZFBlcm1hbmVudGx5OiAzMDEsXG4gIEZvdW5kOiAzMDIsXG4gIFNlZU90aGVyOiAzMDMsXG4gIE5vdE1vZGlmaWVkOiAzMDQsXG4gIFVzZVByb3h5OiAzMDUsXG4gIFVudXNlZDogMzA2LFxuICBUZW1wb3JhcnlSZWRpcmVjdDogMzA3LFxuICBQZXJtYW5lbnRSZWRpcmVjdDogMzA4LFxuICBCYWRSZXF1ZXN0OiA0MDAsXG4gIFVuYXV0aG9yaXplZDogNDAxLFxuICBQYXltZW50UmVxdWlyZWQ6IDQwMixcbiAgRm9yYmlkZGVuOiA0MDMsXG4gIE5vdEZvdW5kOiA0MDQsXG4gIE1ldGhvZE5vdEFsbG93ZWQ6IDQwNSxcbiAgTm90QWNjZXB0YWJsZTogNDA2LFxuICBQcm94eUF1dGhlbnRpY2F0aW9uUmVxdWlyZWQ6IDQwNyxcbiAgUmVxdWVzdFRpbWVvdXQ6IDQwOCxcbiAgQ29uZmxpY3Q6IDQwOSxcbiAgR29uZTogNDEwLFxuICBMZW5ndGhSZXF1aXJlZDogNDExLFxuICBQcmVjb25kaXRpb25GYWlsZWQ6IDQxMixcbiAgUGF5bG9hZFRvb0xhcmdlOiA0MTMsXG4gIFVyaVRvb0xvbmc6IDQxNCxcbiAgVW5zdXBwb3J0ZWRNZWRpYVR5cGU6IDQxNSxcbiAgUmFuZ2VOb3RTYXRpc2ZpYWJsZTogNDE2LFxuICBFeHBlY3RhdGlvbkZhaWxlZDogNDE3LFxuICBJbUFUZWFwb3Q6IDQxOCxcbiAgTWlzZGlyZWN0ZWRSZXF1ZXN0OiA0MjEsXG4gIFVucHJvY2Vzc2FibGVFbnRpdHk6IDQyMixcbiAgTG9ja2VkOiA0MjMsXG4gIEZhaWxlZERlcGVuZGVuY3k6IDQyNCxcbiAgVG9vRWFybHk6IDQyNSxcbiAgVXBncmFkZVJlcXVpcmVkOiA0MjYsXG4gIFByZWNvbmRpdGlvblJlcXVpcmVkOiA0MjgsXG4gIFRvb01hbnlSZXF1ZXN0czogNDI5LFxuICBSZXF1ZXN0SGVhZGVyRmllbGRzVG9vTGFyZ2U6IDQzMSxcbiAgVW5hdmFpbGFibGVGb3JMZWdhbFJlYXNvbnM6IDQ1MSxcbiAgSW50ZXJuYWxTZXJ2ZXJFcnJvcjogNTAwLFxuICBOb3RJbXBsZW1lbnRlZDogNTAxLFxuICBCYWRHYXRld2F5OiA1MDIsXG4gIFNlcnZpY2VVbmF2YWlsYWJsZTogNTAzLFxuICBHYXRld2F5VGltZW91dDogNTA0LFxuICBIdHRwVmVyc2lvbk5vdFN1cHBvcnRlZDogNTA1LFxuICBWYXJpYW50QWxzb05lZ290aWF0ZXM6IDUwNixcbiAgSW5zdWZmaWNpZW50U3RvcmFnZTogNTA3LFxuICBMb29wRGV0ZWN0ZWQ6IDUwOCxcbiAgTm90RXh0ZW5kZWQ6IDUxMCxcbiAgTmV0d29ya0F1dGhlbnRpY2F0aW9uUmVxdWlyZWQ6IDUxMSxcbiAgV2ViU2VydmVySXNEb3duOiA1MjEsXG4gIENvbm5lY3Rpb25UaW1lZE91dDogNTIyLFxuICBPcmlnaW5Jc1VucmVhY2hhYmxlOiA1MjMsXG4gIFRpbWVvdXRPY2N1cnJlZDogNTI0LFxuICBTc2xIYW5kc2hha2VGYWlsZWQ6IDUyNSxcbiAgSW52YWxpZFNzbENlcnRpZmljYXRlOiA1MjYsXG59O1xuXG5PYmplY3QuZW50cmllcyhIdHRwU3RhdHVzQ29kZSkuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XG4gIEh0dHBTdGF0dXNDb2RlW3ZhbHVlXSA9IGtleTtcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBIdHRwU3RhdHVzQ29kZTtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4vdXRpbHMuanMnO1xuaW1wb3J0IGJpbmQgZnJvbSAnLi9oZWxwZXJzL2JpbmQuanMnO1xuaW1wb3J0IEF4aW9zIGZyb20gJy4vY29yZS9BeGlvcy5qcyc7XG5pbXBvcnQgbWVyZ2VDb25maWcgZnJvbSAnLi9jb3JlL21lcmdlQ29uZmlnLmpzJztcbmltcG9ydCBkZWZhdWx0cyBmcm9tICcuL2RlZmF1bHRzL2luZGV4LmpzJztcbmltcG9ydCBmb3JtRGF0YVRvSlNPTiBmcm9tICcuL2hlbHBlcnMvZm9ybURhdGFUb0pTT04uanMnO1xuaW1wb3J0IENhbmNlbGVkRXJyb3IgZnJvbSAnLi9jYW5jZWwvQ2FuY2VsZWRFcnJvci5qcyc7XG5pbXBvcnQgQ2FuY2VsVG9rZW4gZnJvbSAnLi9jYW5jZWwvQ2FuY2VsVG9rZW4uanMnO1xuaW1wb3J0IGlzQ2FuY2VsIGZyb20gJy4vY2FuY2VsL2lzQ2FuY2VsLmpzJztcbmltcG9ydCB7IFZFUlNJT04gfSBmcm9tICcuL2Vudi9kYXRhLmpzJztcbmltcG9ydCB0b0Zvcm1EYXRhIGZyb20gJy4vaGVscGVycy90b0Zvcm1EYXRhLmpzJztcbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gJy4vY29yZS9BeGlvc0Vycm9yLmpzJztcbmltcG9ydCBzcHJlYWQgZnJvbSAnLi9oZWxwZXJzL3NwcmVhZC5qcyc7XG5pbXBvcnQgaXNBeGlvc0Vycm9yIGZyb20gJy4vaGVscGVycy9pc0F4aW9zRXJyb3IuanMnO1xuaW1wb3J0IEF4aW9zSGVhZGVycyBmcm9tICcuL2NvcmUvQXhpb3NIZWFkZXJzLmpzJztcbmltcG9ydCBhZGFwdGVycyBmcm9tICcuL2FkYXB0ZXJzL2FkYXB0ZXJzLmpzJztcbmltcG9ydCBIdHRwU3RhdHVzQ29kZSBmcm9tICcuL2hlbHBlcnMvSHR0cFN0YXR1c0NvZGUuanMnO1xuXG4vKipcbiAqIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBkZWZhdWx0Q29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKlxuICogQHJldHVybnMge0F4aW9zfSBBIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICovXG5mdW5jdGlvbiBjcmVhdGVJbnN0YW5jZShkZWZhdWx0Q29uZmlnKSB7XG4gIGNvbnN0IGNvbnRleHQgPSBuZXcgQXhpb3MoZGVmYXVsdENvbmZpZyk7XG4gIGNvbnN0IGluc3RhbmNlID0gYmluZChBeGlvcy5wcm90b3R5cGUucmVxdWVzdCwgY29udGV4dCk7XG5cbiAgLy8gQ29weSBheGlvcy5wcm90b3R5cGUgdG8gaW5zdGFuY2VcbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBBeGlvcy5wcm90b3R5cGUsIGNvbnRleHQsIHsgYWxsT3duS2V5czogdHJ1ZSB9KTtcblxuICAvLyBDb3B5IGNvbnRleHQgdG8gaW5zdGFuY2VcbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBjb250ZXh0LCBudWxsLCB7IGFsbE93bktleXM6IHRydWUgfSk7XG5cbiAgLy8gRmFjdG9yeSBmb3IgY3JlYXRpbmcgbmV3IGluc3RhbmNlc1xuICBpbnN0YW5jZS5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoaW5zdGFuY2VDb25maWcpIHtcbiAgICByZXR1cm4gY3JlYXRlSW5zdGFuY2UobWVyZ2VDb25maWcoZGVmYXVsdENvbmZpZywgaW5zdGFuY2VDb25maWcpKTtcbiAgfTtcblxuICByZXR1cm4gaW5zdGFuY2U7XG59XG5cbi8vIENyZWF0ZSB0aGUgZGVmYXVsdCBpbnN0YW5jZSB0byBiZSBleHBvcnRlZFxuY29uc3QgYXhpb3MgPSBjcmVhdGVJbnN0YW5jZShkZWZhdWx0cyk7XG5cbi8vIEV4cG9zZSBBeGlvcyBjbGFzcyB0byBhbGxvdyBjbGFzcyBpbmhlcml0YW5jZVxuYXhpb3MuQXhpb3MgPSBBeGlvcztcblxuLy8gRXhwb3NlIENhbmNlbCAmIENhbmNlbFRva2VuXG5heGlvcy5DYW5jZWxlZEVycm9yID0gQ2FuY2VsZWRFcnJvcjtcbmF4aW9zLkNhbmNlbFRva2VuID0gQ2FuY2VsVG9rZW47XG5heGlvcy5pc0NhbmNlbCA9IGlzQ2FuY2VsO1xuYXhpb3MuVkVSU0lPTiA9IFZFUlNJT047XG5heGlvcy50b0Zvcm1EYXRhID0gdG9Gb3JtRGF0YTtcblxuLy8gRXhwb3NlIEF4aW9zRXJyb3IgY2xhc3NcbmF4aW9zLkF4aW9zRXJyb3IgPSBBeGlvc0Vycm9yO1xuXG4vLyBhbGlhcyBmb3IgQ2FuY2VsZWRFcnJvciBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eVxuYXhpb3MuQ2FuY2VsID0gYXhpb3MuQ2FuY2VsZWRFcnJvcjtcblxuLy8gRXhwb3NlIGFsbC9zcHJlYWRcbmF4aW9zLmFsbCA9IGZ1bmN0aW9uIGFsbChwcm9taXNlcykge1xuICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xufTtcblxuYXhpb3Muc3ByZWFkID0gc3ByZWFkO1xuXG4vLyBFeHBvc2UgaXNBeGlvc0Vycm9yXG5heGlvcy5pc0F4aW9zRXJyb3IgPSBpc0F4aW9zRXJyb3I7XG5cbi8vIEV4cG9zZSBtZXJnZUNvbmZpZ1xuYXhpb3MubWVyZ2VDb25maWcgPSBtZXJnZUNvbmZpZztcblxuYXhpb3MuQXhpb3NIZWFkZXJzID0gQXhpb3NIZWFkZXJzO1xuXG5heGlvcy5mb3JtVG9KU09OID0gKHRoaW5nKSA9PiBmb3JtRGF0YVRvSlNPTih1dGlscy5pc0hUTUxGb3JtKHRoaW5nKSA/IG5ldyBGb3JtRGF0YSh0aGluZykgOiB0aGluZyk7XG5cbmF4aW9zLmdldEFkYXB0ZXIgPSBhZGFwdGVycy5nZXRBZGFwdGVyO1xuXG5heGlvcy5IdHRwU3RhdHVzQ29kZSA9IEh0dHBTdGF0dXNDb2RlO1xuXG5heGlvcy5kZWZhdWx0ID0gYXhpb3M7XG5cbi8vIHRoaXMgbW9kdWxlIHNob3VsZCBvbmx5IGhhdmUgYSBkZWZhdWx0IGV4cG9ydFxuZXhwb3J0IGRlZmF1bHQgYXhpb3M7XG4iLCJpbXBvcnQgYXhpb3MgZnJvbSAnLi9saWIvYXhpb3MuanMnO1xuXG4vLyBUaGlzIG1vZHVsZSBpcyBpbnRlbmRlZCB0byB1bndyYXAgQXhpb3MgZGVmYXVsdCBleHBvcnQgYXMgbmFtZWQuXG4vLyBLZWVwIHRvcC1sZXZlbCBleHBvcnQgc2FtZSB3aXRoIHN0YXRpYyBwcm9wZXJ0aWVzXG4vLyBzbyB0aGF0IGl0IGNhbiBrZWVwIHNhbWUgd2l0aCBlcyBtb2R1bGUgb3IgY2pzXG5jb25zdCB7XG4gIEF4aW9zLFxuICBBeGlvc0Vycm9yLFxuICBDYW5jZWxlZEVycm9yLFxuICBpc0NhbmNlbCxcbiAgQ2FuY2VsVG9rZW4sXG4gIFZFUlNJT04sXG4gIGFsbCxcbiAgQ2FuY2VsLFxuICBpc0F4aW9zRXJyb3IsXG4gIHNwcmVhZCxcbiAgdG9Gb3JtRGF0YSxcbiAgQXhpb3NIZWFkZXJzLFxuICBIdHRwU3RhdHVzQ29kZSxcbiAgZm9ybVRvSlNPTixcbiAgZ2V0QWRhcHRlcixcbiAgbWVyZ2VDb25maWcsXG59ID0gYXhpb3M7XG5cbmV4cG9ydCB7XG4gIGF4aW9zIGFzIGRlZmF1bHQsXG4gIEF4aW9zLFxuICBBeGlvc0Vycm9yLFxuICBDYW5jZWxlZEVycm9yLFxuICBpc0NhbmNlbCxcbiAgQ2FuY2VsVG9rZW4sXG4gIFZFUlNJT04sXG4gIGFsbCxcbiAgQ2FuY2VsLFxuICBpc0F4aW9zRXJyb3IsXG4gIHNwcmVhZCxcbiAgdG9Gb3JtRGF0YSxcbiAgQXhpb3NIZWFkZXJzLFxuICBIdHRwU3RhdHVzQ29kZSxcbiAgZm9ybVRvSlNPTixcbiAgZ2V0QWRhcHRlcixcbiAgbWVyZ2VDb25maWcsXG59O1xuIiwiaW1wb3J0IHsgZGVmaW5lQm9vdCB9IGZyb20gJyNxLWFwcC93cmFwcGVycydcbmltcG9ydCBheGlvcyBmcm9tICdheGlvcydcblxuY29uc3QgYXhpb3NJbnN0YW5jZSA9IGF4aW9zLmNyZWF0ZSh7XG4gICAgLy9Vc2UgdGhlIElQIDEwLjAuMi4yIHRvIGFjY2VzcyB0aGUgaG9zdCB5b3VyIGVtdWxhdG9yIGlzIHJ1bm5pbmcgb25cbiAgICAvL1JlYWQgbW9yZSBodHRwczovL2RldmVsb3Blci5hbmRyb2lkLmNvbS9zdHVkaW8vcnVuL2VtdWxhdG9yLW5ldHdvcmtpbmcjbmV0d29ya2FkZHJlc3Nlc1xuICAgIC8vYmFzZVVSTDogXCJodHRwOi8vMTAuMC4yLjI6OTEwMC9cIixcbiAgICBiYXNlVVJMOiAnaHR0cDovL2xvY2FsaG9zdDo5MTAwLycsXG4gICAgdGltZW91dDogNTAwMCxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICB9XG59KVxuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVCb290KCh7IGFwcCB9KSA9PiB7XG4gICAgLy8gTWFrZSBheGlvcyBhdmFpbGFibGUgZ2xvYmFsbHkgb24gdGhlIGFwcCBpbnN0YW5jZVxuICAgIGFwcC5jb25maWcuZ2xvYmFsUHJvcGVydGllcy4kYXhpb3MgPSBheGlvc1xuICAgIGFwcC5jb25maWcuZ2xvYmFsUHJvcGVydGllcy4kYXBpID0gYXhpb3NJbnN0YW5jZVxufSlcblxuZXhwb3J0IHsgYXhpb3NJbnN0YW5jZSB9XG4iXSwibmFtZXMiOlsiaXNGdW5jdGlvbiIsInByb3RvdHlwZSIsImZpbHRlciIsImhhc093blByb3BlcnR5IiwidXRpbHMiLCJBeGlvc0Vycm9yIiwidG9Gb3JtRGF0YSIsImVuY29kZSIsInRvU3RyaW5nIiwiVVJMU2VhcmNoUGFyYW1zIiwiRm9ybURhdGEiLCJCbG9iIiwicGxhdGZvcm0iLCJpc0Zvcm1EYXRhIiwiaXNGaWxlTGlzdCIsInRyYW5zaXRpb25hbCIsInNlbGYiLCJBeGlvc0hlYWRlcnMiLCJpc0NhbmNlbCIsInZhbGlkYXRlU3RhdHVzIiwib3JpZ2luIiwibWVyZ2VDb25maWciLCJtZXJnZSIsIkNhbmNlbGVkRXJyb3IiLCJzaWduYWwiLCJpdGVyYXRvciIsImRvbmUiLCJSZWFkYWJsZVN0cmVhbSIsImZldGNoIiwiZmV0Y2hBZGFwdGVyLmdldEZldGNoIiwiZ2V0QWRhcHRlciIsImFkYXB0ZXJzIiwiVkVSU0lPTiIsInZhbGlkYXRvcnMiLCJ2YWxpZGF0b3IiLCJBeGlvcyIsInNwcmVhZCIsImlzQXhpb3NFcnJvciIsIkh0dHBTdGF0dXNDb2RlIiwiYXhpb3MiLCJDYW5jZWxUb2tlbiIsImFsbCJdLCJtYXBwaW5ncyI6IjtBQVNlLFNBQVMsS0FBSyxJQUFJLFNBQVM7QUFDeEMsU0FBTyxTQUFTLE9BQU87QUFDckIsV0FBTyxHQUFHLE1BQU0sU0FBUyxTQUFTO0FBQUEsRUFDcEM7QUFDRjtBQ1BBLE1BQU0sRUFBRSxTQUFRLElBQUssT0FBTztBQUM1QixNQUFNLEVBQUUsZUFBYyxJQUFLO0FBQzNCLE1BQU0sRUFBRSxVQUFVLFlBQVcsSUFBSztBQUVsQyxNQUFNLFNBQVUsa0JBQUMsVUFBVSxDQUFDLFVBQVU7QUFDcEMsUUFBTSxNQUFNLFNBQVMsS0FB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
