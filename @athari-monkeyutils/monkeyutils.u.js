((factory, global = this) => {
  typeof module === 'object' && module.exports ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define([], factory) :
  ((global?.globalThis ?? global ?? self).athari ??= {}).monkeyutils = factory();
  //(global?.globalThis ?? global ?? self)[id] = factory();
})(() => {
  'use strict'

  const O = Object;

  // Types

  const isObject = (item) => item && typeof item === 'object' && !Array.isArray(item);
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
  }

  // Time

  class PromiseWithValue extends Promise {
    #success = null
    #value = null
    #error = null

    constructor(executor) {
      super((yay, nay) => {
        executor(
          value => ([ this.#success, this.#value ] = [ true, value ], yay(value)),
          error => ([ this.#success, this.#error ] = [ false, error ], nay(error)),
        );
      })
    }

    get success() { return this.#success }
    get value() { return this.#value }
    get error() { return this.#error }

    static resolve(value) { return super.resolve.call(PromiseWithValue, value) }
    static reject(error) { return super.reject.call(PromiseWithValue, error) }
  }

  const now = typeof performance !== 'undefined' ? performance.now.bind(performance) : Date.now;

  const delay = (ms) =>
    new Promise(yay => setTimeout(yay, ms));

  const waitForEvent = (obj, eventName) =>
    new Promise(yay => obj.addEventListener(eventName, yay, { once: true }));

  const waitFor = async (predicate, ms = +Infinity) => {
    for (let ret, timeout = now() + ms; now() < timeout; await delay(100))
      if (ret = predicate())
        return ret;
    return null;
  };

  const waitForFast = (action) => {
    let result = action(), none = {};
    return result instanceof Promise
      ? PromiseWithValue.race([ result, none ]).then(
        value => value !== none
          ? PromiseWithValue.resolve(value)
          : new PromiseWithValue(result.then.bind(result)),
        error => PromiseWithValue.reject(error),
      )
      : PromiseWithValue.resolve(result);
  };

  const waitForValue = (action, then) => {
    const value = action();
    if (value)
      return then(value);
    const promise = waitForFast(waitFor(action));
    if (promise.success === true)
      return then(promise.value);
    else if (promise.success === false)
      throw promise.error;
    else
      return promise.then(then);
  };

  const withTimeout = (promise, ms) => {
    let timer = null;
    const timeout = new Promise((_, nay) =>
      timer = setTimeout(() => nay(new Error(`Timed out after ${ms} ms.`)), ms));
    return Promise.race([ promise, timeout ]).finally(() => clearTimeout(timer));
  };

  // Strings

  const h = s => S(s).escapeHTML();
  const u = s => h(encodeURIComponent(s));
  const f = (s, ...args) => s.replace(/%(\d+)%/g, (m, i) => args[+i]);

  // URIs

  const toUrl = (url) =>
    url instanceof URL || url instanceof Location ? url : new URL(url, location?.href);

  const urlSearch = (url) => O.fromEntries(new URLSearchParams(toUrl(url).search));

  const matchLocation = (host, patterns = {}, url = null) => {
    const p = new URLPattern({ hostname: `(www\.)?${host}`, ...patterns }).exec(url ?? location.href);
    return p == null ? p : { ...p, ...p.hostname.groups, ...p.pathname.groups, ...p.search.groups, ...p.hash.groups };
  };

  const adjustUrlSearch = (url, params) =>
    toUrl('?' + new URLSearchParams({ ...urlSearch(url), ...params }), toUrl(url).href).toString();

  const adjustLocationSearch = (params) =>
    adjustUrlSearch(location, params);

  // Errors

  const throwError = (s) => { throw new Error(s) };

  const attempt = (actionOrName, action = null) => {
    const handleError = ex => console.error(`Failed to ${action != null ? actionOrName : "perform action"} at location:`, location.href, "error:", ex);
    try {
      let ret = (action ?? actionOrName)();
      if (ret instanceof Promise)
        ret = ret.catch(handleError);
      return ret;
    } catch(ex) {
      handleError(ex);
    }
  };

  // Hacks

  /** @callback GetterCallback @param {} field Field value @returns {} Final value to return from property */
  /** @callback SetterCallback @param {} value New value   @returns {} Final value to assign to property */
  /**
   * @param {object} opts Options
   * @param {} opts.value Initial value
   * @param {GetterCallback} opts.get Getter
   * @param {SetterCallback} opts.set Setter
  */
  const overrideProperty = (o, prop, opts = {}) => {
    let { value, get, set } = opts;
    if (O.hasOwn(o, prop))
      attempt(`delete ${prop} property`, () =>
        delete o[prop]);
    attempt(`define ${prop} property`, () =>
      O.defineProperty(o, prop, {
        get: () => get != null ? get(value) : value,
        set: v => value = set != null ? set(v) : v,
      }));
  };

  const overrideFetch = (window, override = { fakeResponse: null, modifyRequestUrl: null, modifyRequestJson: null, modifyResponseJson: null }) => {
    const tryParseJson = (s, message) => {
      try {
        return JSON.parse(options.body);
      } catch (ex) {
        console.error(message, ex);
      }
    }
    const { fetch: originalFetch } = window;
    window.fetch = async (...args) => {
      let [ resource, options ] = args;
      const url = toUrl(resource), search = urlSearch(url);
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
            this.#setFakeResponse(body, { 'Content-Type': "text/plain" });
            console.info("fake text", resource, body);
          }
          json(body) {
            this.#setFakeResponse(JSON.stringify(body), { 'Content-Type': "application/json" });
            console.info("fake json", resource, structuredClone(body));
          }
        });
        if (fakeResponse !== undefined)
          return fakeResponse;
      }

      // Modify query url
      if (override.modifyRequestUrl != null) {
        const modifiedRequestUrl = override.modifyRequestUrl(input);
        if (modifiedRequestUrl !== undefined) {
          console.info("redirect", resource, " -> ", modifiedRequestUrl);
          resource = modifiedRequestUrl.toString();
        }
      }

      // Modify query body
      if (override.modifyRequestJson != null && options.headers["Content-Type"].includes("application/json")) {
        const requestJson = tryParseJson(options.body, "invalid request json");
        if (requestJson !== undefined) {
          const modifiedRequestJson = override.modifyRequestJson(input, requestJson);
          if (modifiedRequestJson != null)
            options.body = JSON.stringify(modifiedRequestJson);
        }
      }

      // Perform query
      const response = await originalFetch(resource, options);
      const contentType = response.headers.get('Content-Type');
      if (!contentType || !contentType.includes("application/json"))
        return response;

      let responseJson = undefined;
      try {
        responseJson = await response.clone().json();
        console.info("original json", resource, structuredClone(responseJson));
      } catch (ex) {
        console.error("invalid response json", ex);
      }

      // Modify response JSON
      if (override.modifyResponseJson != null) {
        const modifiedResponseJson = override.modifyResponseJson(input, responseJson);
        if (modifiedResponseJson !== undefined) {
          response.json = async () => modifiedResponseJson;
          console.info("modified json", resource, structuredClone(responseJson));
        }
      }

      return response;
    };
  };

  const reviveConsole = async () => {
    // return waitForValue(() => document.body, body => {
    //   body.insertAdjacentHTML('beforeEnd', /*html*/`<iframe style="display: none">`);
    //   unsafeWindow.console = body.lastChild.contentWindow.console;
    // });
    (await waitFor(() => document.body)).insertAdjacentHTML('beforeEnd', /*html*/`<iframe style="display: none">`);
    unsafeWindow.console = document.body.lastChild.contentWindow.console;
  }

  // HTML

  const setElementTagName = (elSource, tagName) => {
    const el = document.createElement(tagName);
    while (elSource.firstChild != null)
      el.appendChild(elSource.firstChild);
    for (let i = 0; i < elSource.attributes.length; i++)
      el.attributes.setNamedItem(elSource.attributes[i].cloneNode());
    elSource.replaceWith(el);
    return el;
  };

  // Fluent

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
      get tag() { return els(el, map, { ...params, syntax: (o, p) => p }) }
      get id() { return els(el, map, { ...params, syntax: (o, p) => `#${p}` }) }
      get cls() { return els(el, map, { ...params, syntax: (o, p) => `.${p}` }) }
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

  // Export

  return {
    isObject, assignDeep,
    delay, waitForEvent, waitFor, withTimeout,
    h, u, f,
    toUrl, urlSearch, matchLocation, adjustUrlSearch, adjustLocationSearch,
    throwError, attempt,
    overrideProperty, overrideFetch, reviveConsole,
    setElementTagName,
    ress, scripts, els, opts, props,
  };
});