((factory, global = this) => {
  typeof module === 'object' && module.exports ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define([], factory) :
  ((global?.globalThis ?? global ?? self).athari ??= {}).monkeyutils = factory();
  //(global?.globalThis ?? global ?? self)[id] = factory();
})(() => {
  'use strict'

  const O = Object, A = Array;
  const mimeType = {
    appJson: 'application/json',
    appXHtml: 'application/xhtml+xml',
    appXml: 'application/xml',
    imageSvg: 'image/svg+xml',
    multiFormData: 'multipart/form-data',
    textHtml: 'text/html',
    textPlain: 'text/plain',
    textXml: 'text/xml',
  };
  const httpHeader = {
    contentType: 'content-type',
  };
  const dl = {
    arraybuffer: 'arraybuffer', blob: 'blob', bytes: 'bytes', form: 'form', html: 'html', json: 'json',
    response: 'response', stream: 'stream', svg: 'svg', text: 'text', xhtml: 'xhtml', xml: 'xml',
  };

  // MARK: Types

  const isBoolean = (v) => typeof v === 'boolean' || v instanceof Boolean;
  const isArray = (v) => A.isArray(v);
  const isNumber = (v) => (typeof v === 'number' || v instanceof Number) && !isNaN(v);
  const isFiniteNumber = (v) => typeof v === 'number' && !isNaN(v) && isFinite(v);
  const isFunction = (v) => typeof v === 'function';
  const isObject = (v) => v !== null && typeof v === 'object' && !A.isArray(v);
  const isString = (v) => typeof v === 'string' || v instanceof String;
  const isSymbol = (v) => typeof v === 'symbol';
  const isUndefined = (v) => v === undefined;

  const isPropFluent = (prop, fluent) => O.getPrototypeOf(fluent).hasOwnProperty(prop);

  const assignDeep = (target, ...sources) => {
    if (!sources.length)
      return target;
    const source = sources.shift();
    if (isObject(target) && isObject(source)) {
      for (const key in source) {
        if (isObject(source[key])) {
          if (!target[key])
            O.assign(target, { [key]: {} });
          assignDeep(target[key], source[key]);
        } else {
          O.assign(target, { [key]: source[key] });
        }
      }
    }
    return assignDeep(target, ...sources);
  };

  // MARK: Time

  class StatefulPromise extends Promise {
    #success = null
    #value = null
    #error = null

    constructor(executor) {
      super((yay, nay) => {
        executor(
          value => ([ this.#success, this.#value ] = [ true, value ], yay(value)),
          error => ([ this.#success, this.#error ] = [ false, error ], nay(error)),
        );
      });
    }

    get success() { return this.#success }
    get value() { return this.#value }
    get error() { return this.#error }

    static resolve(value) { return super.resolve.call(StatefulPromise, value) }
    static reject(error) { return super.reject.call(StatefulPromise, error) }
  }

  const now = typeof performance !== 'undefined' ? performance.now.bind(performance) : Date.now;

  const delay = (ms) =>
    new Promise(yay => setTimeout(yay, ms));

  const waitForCallback = () => {
    let yay, nay, promise = new Promise((y, n) => [ yay, nay ] = [ y, n ]);
    return [ promise, yay, nay ];
  };

  const waitForEvent = (obj, eventName) =>
    new Promise(yay => obj.addEventListener(eventName, yay, { once: true }));

  const waitForDocumentReady = async (state = 'interactive') => {
    const states = { loading: 0, interactive: 1, complete: 2 };
    const currentState = states[document.readyState], neededState = states[state];
    if (currentState >= neededState)
      return document.readyState;
    return await new Promise((yay) => document.addEventListener('readystatechange', () => {
      if (document.readyState == state)
        yay(document.readyState);
    }))
  };

  const waitFor = async (predicate, ms = +Infinity) => {
    for (let ret, timeout = now() + ms; now() < timeout; await delay(100))
      if (ret = predicate())
        return ret;
    return null;
  };

  const waitForActionFast = (predicate) => {
    let result = predicate(), none = {};
    return result instanceof Promise
      ? StatefulPromise.race([ result, none ]).then(
        value => value !== none ? StatefulPromise.resolve(value) : new StatefulPromise(result.then.bind(result)),
        error => StatefulPromise.reject(error),
      )
      : StatefulPromise.resolve(result);
  };

  const waitForFast = (predicate, onYay) => {
    const result = predicate();
    if (result)
      return onYay(result);
    const wait = waitFor(predicate), instant = {};
    const promise = StatefulPromise.race([ wait, instant ]).then(
      value => value !== instant ? StatefulPromise.resolve(value) : new StatefulPromise(wait.then.bind(wait)),
      error => StatefulPromise.reject(error));
    if (promise.success === false)
      throw promise.error;
    return promise.success === true ? onYay(promise.value) : promise.then(onYay);
  };

  const withTimeout = async (promise, ms) => {
    let timer = null;
    const timeout = new Promise((_, nay) =>
      timer = setTimeout(() => nay(new Error(`Timed out after ${ms} ms.`)), ms));
    try {
      return await Promise.race([promise, timeout]);
    } finally {
      clearTimeout(timer);
    }
  };

  // MARK: Strings

  const h = s => S(s).escapeHTML();
  const u = s => h(encodeURIComponent(s));
  const f = (s, ...args) => s.replace(/%(\d+)%/g, (m, i) => args[+i]);

  const numberRange = (start, count) => Array(count).fill().map((_, i) => start + i);

  const repeatValue = (value, count) => Array(count).fill(value);

  const win1251ToUtf8Map = [
    ...numberRange(0, 128), // ASCII
    ..."ЂЃ‚ѓ„…†‡€‰Љ‹ЊЌЋЏђ‘’“”•–—˜™љ›њќћџ ЎўЈ¤Ґ¦§Ё©Є«¬\xAD®Ї°±Ііґµ¶·ё№є»јЅѕї".split("").map(c => c.charCodeAt(0)),
    ...numberRange(1040, 64), // Russian alphabet
  ];

  const utf8ToWin1251Map = win1251ToUtf8Map.reduce((o, v, i) => (v !== null && (o[v] = i), o), {});

  const utf8ToEncoding = (str, map, options = {}) => {
    options = Object.assign({ encode: false, fatal: false }, options);
    const sb = [];
    for (let i = 0; i < str.length; i++) {
      const c = map[str.charCodeAt(i)];
      if (c !== undefined)
        sb.push(options.encode
          ? (c < 128 ? str[i] : `%${c.toString(16)}`)
          : String.fromCharCode(c));
      else if (options.fatal)
        throw new Error(`Unsupported character: ${str.charAt(i)}`);
    }
    return sb.join("");
  };

  const utf8ToWin1251 = (str, options = {}) => utf8ToEncoding(str, utf8ToWin1251Map, options);

  // MARK: URIs

  const toUrl = (url) =>
    url instanceof URL || url instanceof Location ? url : new URL(url, location?.href);

  const urlSearch = (url) =>
    O.fromEntries(new URLSearchParams(toUrl(url).search));

  const matchUrl = (url, host, patterns = {}) => {
    const p = new URLPattern({ hostname: `(www\.)?${host}`, ...patterns }).exec(toUrl(url));
    return p == null ? p : { ...p, ...p.hostname.groups, ...p.pathname.groups, ...p.search.groups, ...p.hash.groups };
  };

  const matchLocation = (host, patterns = {}, url = null) =>
    matchUrl(url ?? location.href, host, patterns);

  const adjustUrlSearch = (url, search) => {
    url = toUrl(url);
    const adjustedSearch = new URLSearchParams({ ...urlSearch(url), ...search });
    return toUrl(`${url.pathname}?${adjustedSearch}`, url.href).toString();
  }

  const adjustLocationSearch = (search) =>
    adjustUrlSearch(location, search);

  /**
   * @param {String|URL} url
   * @param {'arraybuffer'|'blob'|'bytes'|'form'|'json'|'response'|'stream'|'text'|'html'|'svg'|'xhtml'|'xml'} type
   * @param {RequestInit} init
   * @param {*} options
   * @returns {ArrayBuffer|Blob|Int8Array|FormData|Object|Response|ReadableStream|String|HTMLDocument|XMLDocument}
   */
  const download = async (url, type = null, init = {}, options = { encoding: null, fetch: null }) => {
    const response = await (options.fetch ?? fetch)(url, assignDeep({
      credentials: 'include',
      headers: {
        'accept-encoding': "gzip, deflate, br, zstd",
      },
    }, init));
    if (!response.ok)
      throw new Error(`Failed to download ${url} (${response.status} ${response.statusText})`);
    const getText = async () => options.encoding == null
      ? await response.text()
      : new TextDecoder(options.encoding).decode(await response.arrayBuffer());
    const getDom = async (mime) => new DOMParser().parseFromString(await getText(), mime);
    const contentType = response.headers.get(httpHeader.contentType)?.split(";", 1)[0]?.toLowerCase() ?? 'none';
    type ??= {
      [mimeType.appJson]: dl.json,
      [mimeType.appXHtml]: dl.xhtml,
      [mimeType.appXml]: dl.xml,
      [mimeType.imageSvg]: dl.svg,
      [mimeType.multiFormData]: dl.form,
      [mimeType.textHtml]: dl.html,
      [mimeType.textXml]: dl.xml,
    }[contentType] ?? Object.entries({
      [dl.text]: /^text\/.+|^application\/(javascript|ecmascript)$/,
      [dl.xml]: /\+xml$/,
    }).filter(([ _, re ]) => re.test(contentType)).map(([ type ]) => type)[0];
    switch (type) {
      case dl.arraybuffer:
        return await response.arrayBuffer();
      case dl.blob:
        return await response.blob();
      case dl.bytes:
        return await response.bytes();
      case dl.form:
        return await response.formData();
      case dl.json:
        return await response.json();
      case dl.response:
        return response;
      case dl.stream:
        return response.body;
      case dl.text:
        return await getText();
      case dl.html:
        return await getDom(mimeType.textHtml);
      case dl.svg:
        return await getDom(mimeType.imageSvg);
      case dl.xhtml:
        return await getDom(mimeType.appXHtml);
      case dl.xml:
        return await getDom(mimeType.appXml);
      default:
        throw new RangeError(`unexpected type '${type}' (${httpHeader.contentType} '${contentType}')`);
    }
  };

  // MARK: Errors

  const throwError = (ex) => {
    throw ex instanceof Error ? ex : new Error(ex);
  };

  const attempt = (actionOrName, action = null, log = console.error) => {
    const handleError = ex => log(`Failed to ${action != null ? actionOrName : "perform action"} at location:`, location.href, "error:", ex);
    try {
      let ret = (action ?? actionOrName)();
      if (ret instanceof Promise)
        ret = ret.catch(handleError);
      return ret;
    } catch(ex) {
      handleError(ex);
    }
  };

  // MARK: Hacks

  /** @callback GetterCallback @param {} field Field value @returns {} Final value to return from property */
  /** @callback SetterCallback @param {} value New value   @returns {} Final value to assign to property */
  /**
   * @param {object|function} optionsOrSet Options
   * @param {} optionsOrSet.value Initial value
   * @param {GetterCallback} optionsOrSet.get Getter
   * @param {SetterCallback} optionsOrSet.set Setter
  */
  const overrideProperty = (o, prop, optionsOrSet = {}) => {
    let { value, get, set, log } = isObject(optionsOrSet) ? optionsOrSet : { set: optionsOrSet };
    const logMessage = isString(log) ? log : prop;
    const logAccess = (verb, value, accessor = true) => {
      if (log != null && accessor) {
        let clone = value;
        if (value?.constructor === O)
          attempt("clone value", () => clone = structuredClone(value), console.warn);
        console.info(`${verb} ${logMessage}`, clone);
      }
    };
    if (O.hasOwn(o, prop)) {
      if (value === undefined)
        value = set != null ? set(o[prop]) : o[prop];
      attempt(`delete ${prop} property`, () =>
        delete o[prop]);
    }
    attempt(`define ${prop} property`, () =>
      O.defineProperty(o, prop, {
        get: () => {
          logAccess("get retrieve", value);
          const ret = get != null ? get(value) : value;
          logAccess("get override", ret, get);
          return ret;
        },
        set: (v) => {
          logAccess("set original", value);
          value = set != null ? set(v) : v;
          logAccess("set modified", value, set);
        },
      }));
  };

  const overrideFunction = (o, prop, fun, out, proc) => {
    const originalProp = o[prop];
    let result;
    try {
      o[prop] = function(...args) {
        const ret = fun?.(originalProp, ...args);
        result = out ? out(ret, ...args) : ret;
        return ret;
      };
      proc?.();
    } finally {
      if (proc != null)
        o[prop] = originalProp;
    }
    return result;
  };

  const overrideFetch = (window, override = { fakeResponse: null, modifyRequestUrl: null, modifyRequestJson: null, modifyResponseJson: null }) => {
    const tryParseJson = (s, message) => {
      try {
        return JSON.parse(s);
      } catch (ex) {
        console.error(message, ex);
      }
    }
    const { fetch: originalFetch } = window;
    window.fetch = async (...args) => {
      let [ resource, options ] = args;
      const url = toUrl(resource), search = urlSearch(url), requestUrl = url.toString();
      const input = { resource, url, search };

      // Fake response
      if (override.fakeResponse != null) {
        let fakeResponse = undefined;
        override.fakeResponse(input, new class {
          init = { status: 200, statusText: "OK" }
          #setFakeResponse(body, headers) {
            fakeResponse = new Response(body, O.assign(this.init, { headers }))
          }
          text(body) {
            this.#setFakeResponse(body, { [httpHeader.contentType]: mimeType.textPlain });
            console.info("fake text", requestUrl, body);
          }
          json(body) {
            this.#setFakeResponse(JSON.stringify(body), { [httpHeader.contentType]: mimeType.appJson });
            console.info("fake json", requestUrl, structuredClone(body));
          }
        });
        if (fakeResponse !== undefined)
          return fakeResponse;
      }

      // Modify query url
      if (override.modifyRequestUrl != null) {
        const modifiedRequestUrl = override.modifyRequestUrl(input);
        if (modifiedRequestUrl !== undefined) {
          console.info("redirect", requestUrl, " -> ", modifiedRequestUrl);
          resource = modifiedRequestUrl.toString();
        }
      }

      // Modify query body
      if (override.modifyRequestJson != null && options.headers[httpHeader.contentType].includes(mimeType.appJson)) {
        const requestJson = tryParseJson(options.body, "invalid request json");
        if (requestJson !== undefined) {
          const modifiedRequestJson = override.modifyRequestJson(input, requestJson);
          if (modifiedRequestJson != null)
            options.body = JSON.stringify(modifiedRequestJson);
        }
      }

      // Perform query
      const response = await originalFetch(resource, options);
      const contentType = response.headers.get(httpHeader.contentType);
      if (!contentType || !contentType.includes(mimeType.appJson))
        return response;

      let responseJson = undefined;
      try {
        responseJson = await response.clone().json();
        console.info("original json", requestUrl, structuredClone(responseJson));
      } catch (ex) {
        console.error("invalid response json", requestUrl, ex);
      }

      // Modify response JSON
      if (override.modifyResponseJson != null) {
        const modifiedResponseJson = override.modifyResponseJson(input, responseJson);
        if (modifiedResponseJson !== undefined) {
          response.json = async () => modifiedResponseJson;
          console.info("modified json", requestUrl, structuredClone(responseJson));
        }
      }

      return response;
    };
  };

  const overrideXmlHttpRequest = (window, override = { on: {} }) => {
    window.XMLHttpRequest = class extends window.XMLHttpRequest {
      //#eventNames = Reflect.ownKeys(XMLHttpRequestEventTarget.prototype).filter(k => k.startsWith?.('on')).map(k => k.substring(2)).concat([ 'readystatechange' ])
      #eventNames = [ 'abort', 'error', 'load', 'loadend', 'loadstart', 'progress', 'readystatechange', 'timeout' ]
      #writablePropNames = [ 'responseType', 'timeout', 'withCredentials' ]
      #readonlyPropNames = [ 'readyState', 'response', 'responseText', 'responseURL', 'responseXML', 'status', 'statusText', 'upload' ]
      #on = { }
      #onOverride = { }
      #options = {
        async: null,
        body: null,
        headers: {},
        method: null,
        mime: null,
        mode: null,
        password: null,
        responseType: "",
        timeout: 0,
        url: null,
        username: null,
        withCredentials: false,
      }
      #props = {
        readyState: undefined,
        response: undefined,
        responseHeaders: {},
        responseText: undefined,
        reponseURL: undefined,
        reponseXML: undefined,
        status: undefined,
        statusText: undefined,
        upload: undefined,
      }

      constructor(params) {
        super(params);
        Object.assign(this.#options, params);
        Object.assign(this.#onOverride, override.on);
        for (const eventName of this.#eventNames) {
          Object.defineProperty(this, `on${eventName}`, {
            get: () => this.#on[eventName]?.[0] ?? null,
            set: v => this.#on[eventName] = [ v ],
          });
        }
        for (const propName of this.#writablePropNames) {
          Object.defineProperty(this, propName, {
            get: () => this.#options[propName],
            set: v => this.#options[propName] = v,
          });
        }
        for (const propName of this.#readonlyPropNames) {
          Object.defineProperty(this, propName, {
            get: () => this.#props[propName] !== undefined ? this.#props[propName] : super[propName],
            set: v => this.#props[propName] = v,
          });
        }
      }

      #createCustomEvent(eventName) {
        return Object.defineProperties(new Event(eventName), {
          target: { value: this, enumerable: true },
          currentTarget: { value: this, enumerable: true },
        });
      }

      #callSuperMethod(methodName, ...args) {
        const call = () => super[methodName](...args);
        console.log(`XMLHttpRequest.${methodName}`, args, this);
        return this.#onOverride[methodName] != null
          ? this.#onOverride[methodName](this.#createCustomEvent(methodName), call) : call();
      }

      addEventListener(type, listener, options) {
        (this.#on[type] ??= []).push(listener);
        //return super.addEventListener(type, listener, options);
      }

      removeEventListener(type, listener, options) {
        if (this.#on[type] == null)
          return;
        const index = this.#on[type].indexOf(listener);
        if (index != -1)
          this.#on[type].splice(index, 1);
        //return super.removeEventListener(type, listener, options);
      }

      overrideMimeType(mime) {
        Object.assign(this.#options, { mime });
        return super.overrideMimeType(mime);
      }

      setRequestHeader(name, value) {
        name = name.toLowerCase();
        this.#options.headers[name] = value;
        return super.setRequestHeader(name, value);
      }

      getAllResponseHeaders() {
        return super.getAllResponseHeaders()
          .trimEnd().split(/[\r\n]+/)
          .map(h => h.match(/: /)?.slice(1) ?? [ h ])
          .map(([ hk, hv ]) => hv === undefined ? hk : `${hk}: ${this.#props.responseHeaders[hk.toLowerCase()] ?? hv}\r\n`)
          .join("");
      }

      getResponseHeader(name) {
        name = name.toLowerCase();
        return this.#props.responseHeaders[name] ?? super.getResponseHeader(name);
      }

      open(method = 'GET', url = location.href, async = true, username = null, password = null) {
        Object.assign(this.#options, { method, url, async, username, password });
        this.#callSuperMethod(this.open.name, method, url, async, username, password);
      }

      send(body) {
        Object.assign(this.#options, { body });
        for (const eventName of this.#eventNames) {
          super.addEventListener(eventName, e => {
            const on = (e) => this.#on[eventName]?.forEach(h => h(e));
            const onOverride = this.#onOverride[eventName];
            if (onOverride != null)
              return onOverride(e, on)
            else if (on != null)
              return on(e);
          });
        }
        this.#callSuperMethod(this.send.name, body);
      }
    }
  };

  const reviveConsole = async (window) => {
    return waitForFast(() => document.body, body => {
      body.insertAdjacentHTML('beforeEnd', /*html*/`<iframe style="display: none">`);
      window.console = body.lastChild.contentWindow.console;
    });
  }

  // MARK: HTML

  const setElementTagName = (elSource, tagName) => {
    const el = document.createElement(tagName);
    while (elSource.firstChild != null)
      el.appendChild(elSource.firstChild);
    for (let i = 0; i < elSource.attributes.length; i++)
      el.attributes.setNamedItem(elSource.attributes[i].cloneNode());
    elSource.replaceWith(el);
    return el;
  };

  const wrapElement = (el, tagName, options = { copyAttrs: false }) => {
    const wrapper = document.createElement(tagName);
    if (options.copyAttrs)
      for (let i = 0; i < el.attributes.length; i++)
        wrapper.attributes.setNamedItem(el.attributes[i].cloneNode());
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);
    return wrapper;
  };

  // MARK: Fluent

  const gmResources = () => O.fromEntries(O.entries(GM_info.script.resources).map(([, v]) => [v.name, v]));

  const ress = (map = gmResources(), params = { props: [], wait: false }) => new Proxy(map, new class {
    //constructor() { console.debug("res", { map, ...params }); }
    #fluent = new class {
      get #path() { return params.props.join("-") }
      get wait() { return ress(map, { ...params, wait: true }) }
      get bytes() { return map[this.#path].content } // Greasymonkey-only
      get url() { return map[this.#path].url }
      get data() { return params.wait ? GM.getResourceUrl(this.#path) : GM_getResourceURL(this.#path) }
      get text() { return params.wait ? GM.getResourceText(this.#path) : GM_getResourceText(this.#path) }
    }
    get(_, prop) {
      if (isPropFluent(prop, this.#fluent))
        return this.#fluent[prop];
      return ress(map, { ...params, props: params.props.concat(prop) });
    }
  });

  const scripts = (res) => new Proxy({}, new class {
    #scripts = {}
    get(_, prop) { return this.#scripts[prop] ?? import(res.script[prop].url).then(js => this.#scripts[prop] = js) }
  });

  const els = (el = document, map = {}, params = {
    method: 'querySelector', wait: false, wrap: null,
    syntax: (o, p) => o[p] ?? p,
  }) => new Proxy(map, new class {
    //constructor() { console.debug("query", { el, map, ...params }) }
    #fluent = new class {
      get self() { return el }
      get all() { return els(el, map, { ...params, method: 'querySelectorAll' }) }
      get is() { return els(el, map, { ...params, method: 'matches' }) }
      get parent() { return els(el, map, { ...params, method: 'closest' }) }
      get tag() { return els(el, map, { ...params, syntax: (_, p) => p }) }
      get id() { return els(el, map, { ...params, syntax: (_, p) => `#${p}` }) }
      get cls() { return els(el, map, { ...params, syntax: (_, p) => `.${p}` }) }
      get wait() { return els(el, map, { ...params, wait: true }) }
      get wrap() { return els(el, map, { ...params, wrap: map }) }
      wraps(wrap) { return els(el, map, { ...params, wrap }) }
    }
    get(t, prop) {
      if (isObject(t[prop]))
        return els(el, t[prop], params);
      if (isPropFluent(prop, this.#fluent))
        return this.#fluent[prop];
      const { method, wait, wrap, syntax } = params;
      const query = () => el[method](syntax(t, prop) ?? throwError(prop));
      const wrapper = wrap == null ? (i) => i : (i) => i != null ? els(i, wrap) : null;
      return method == 'querySelectorAll' ? [...query()].map(wrapper) : wait ? waitFor(query).then(wrapper) : wrapper(query());
    }
  });

  const opts = (map) => new Proxy(map, {
    get: (t, prop) => GM_getValue(prop, t[prop]),
    set: (t, prop, value) => (GM_setValue(prop, value), true),
  });

  const props = (el, map = {}) => new Proxy(map, new class {
    get(t, prop) { return prop.startsWith('--') ? el.style.getPropertyValue(prop) : el.dataset[prop] }
  });

  // MARK: Export

  return {
    isBoolean, isArray, isNumber, isFiniteNumber, isFunction, isObject, isString, isSymbol, isUndefined, assignDeep,
    delay, waitForCallback, waitForEvent, waitForDocumentReady, waitFor, withTimeout,
    h, u, f, utf8ToWin1251,
    toUrl, urlSearch, matchUrl, matchLocation, adjustUrlSearch, adjustLocationSearch, download,
    throwError, attempt,
    overrideProperty, overrideFunction, overrideFetch, overrideXmlHttpRequest, reviveConsole,
    setElementTagName, wrapElement,
    ress, scripts, els, opts, props,
  };
});