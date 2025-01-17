// ==UserScript==
// @name           Kinorium.com – Enhanced [Ath]
// @name:ru        Kinorium.com – Улучшенный [Ath]
// @name:uk        Kinorium.com – Покращений [Ath]
// @namespace      kinorium
// @author         Athari (https://github.com/Athari)
// @copyright      © Prokhorov ‘Athari’ Alexander, 2024–2025
// @license        MIT
// @homepageURL    https://github.com/Athari/AthariUserJS
// @supportURL     https://github.com/Athari/AthariUserJS/issues
// @version        1.0.1
// @description    Kinorium.com enhancements: user collections usability, links to extra streaming providers, native lazy loading of images etc.
// @description:ru Улучшения для Kinorium.com: удобство работы с пользовательскими коллекциями, ссылки на дополнительные онлайн-кинотеатры, нативная ленивая загрузка изображений и т.д.
// @description:uk Покращення для Kinorium.com: зручність роботи з користувацькими колекціями, посилання на додаткові онлайн-кінотеатри, нативне ліниве завантаження зображень тощо.
// @icon           https://www.google.com/s2/favicons?sz=64&domain=kinorium.com
// @match          https://*.kinorium.com/*
// @grant          unsafeWindow
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_getResourceText
// @grant          GM_getResourceURL
// @grant          GM_info
// @grant          GM_registerMenuCommand
// @run-at         document-start
// @require        https://cdn.jsdelivr.net/npm/string@3.3.3/dist/string.min.js
// @resource       script-microdata   https://cdn.jsdelivr.net/npm/@cucumber/microdata@2.1.0/dist/esm/src/index.min.js
// @resource       script-urlpattern  https://cdn.jsdelivr.net/npm/urlpattern-polyfill/dist/urlpattern.js
// @resource       font-neucha-latin  https://fonts.gstatic.com/s/neucha/v17/q5uGsou0JOdh94bfvQlt.woff2
// @resource       img-cinema-default https://images.kinorium.com/web/vod/vod_channels.svg
// @resource       img-cinema-rezka   https://rezka.ag/templates/hdrezka/images/hdrezka-logo.png
// @resource       img-cinema-kinobox data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="32" viewBox="0 0 16 32"><polygon points="3,11 10,16 3,21" fill="%23eee" stroke="%23eee" stroke-width="4" stroke-linejoin="round" /></svg>
// @tag            athari
// ==/UserScript==

(async () => {
  'use strict';

  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  const waitForEvent = (o, e) => new Promise(resolve => o.addEventListener(e, resolve, { once: true }));
  const waitFor = async (predicate, ms = +Infinity) => {
    for (let r, timeout = Date.now() + ms; Date.now() < timeout; await delay(100))
      if (r = await predicate())
        return r;
    return null;
  };
  const withTimeout = (ms, promise) => {
    let timer = null;
    const timeout = new Promise((_, reject) => timer = setTimeout(() => reject(new Error(`Timed out after ${ms} ms.`)), ms));
    return Promise.race([ promise, timeout ]).finally(() => clearTimeout(timer));
  };
  const isObject = (item) => item && typeof item === 'object' && !Array.isArray(item);
  const assignDeep = (target, ...sources) => {
    if (!sources.length)
      return target;
    const source = sources.shift();
    if (isObject(target) && isObject(source)) {
      for (const key in source) {
        if (isObject(source[key])) {
          if (!target[key])
            Object.assign(target, { [key]: {} });
          assignDeep(target[key], source[key]);
        } else {
          Object.assign(target, { [key]: source[key] });
        }
      }
    }
    return assignDeep(target, ...sources);
  }
  const h = s => S(s).escapeHTML();
  const u = s => h(encodeURIComponent(s));
  const fstr = (s, ...args) => s.replace(/%(\d+)%/g, (m, i) => args[+i]);
  const matchLocation = (h, o = {}, l = null) => {
    const p = new URLPattern({ hostname: `(www\.)?${h}`, ...o }).exec(l ?? location.href);
    return p == null ? p : { ...p, ...p.hostname.groups, ...p.pathname.groups, ...p.search.gropus, ...p.hash.groups };
  };
  const adjustURLSearch = (u, o) => {
    const base = u instanceof URL || u instanceof Location ? u : new URL(u);
    return new URL('?' + new URLSearchParams({ ...Object.fromEntries(new URLSearchParams(base.search)), ...o }), base.href).toString();
  }
  const adjustLocationSearch = o => adjustURLSearch(location, o);
  const attempt = (actionOrName, action = null) => {
    const handleError = ex => console.log(`Failed to ${action != null ? actionOrName : "perform action"} at location:`, location.href, "error:", ex);
    try {
      let ret = (action ?? actionOrName)();
      if (ret instanceof Promise)
        ret = ret.catch(handleError);
      return ret;
    } catch(ex) {
      handleError(ex);
    }
  };
  const throwError = s => { throw new Error(s) };
  const isPropFluent = (prop, fluent) => Object.getPrototypeOf(fluent).hasOwnProperty(prop);
  const els = (el = document, map = {}, params = { method: 'querySelector', syntax: (o, p) => o[p] ?? p, wait: false, wrap: null }) => new Proxy(map, new class {
    //constructor() { console.log("query", { el, map, ...params }) }
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
      if (typeof t[prop] == 'object')
        return els(el, t[prop], params);
      if (isPropFluent(prop, this.#fluent))
        return this.#fluent[prop];
      const call = () => el[params.method](params.syntax(t, prop) ?? throwError(prop));
      const wrap = params.wrap == null ? (r => r) : (r => r == null ? null : els(r, params.wrap));
      return params.method == 'querySelectorAll' ? [...call()].map(wrap) : params.wait ? waitFor(call).then(wrap) : wrap(call());
    }
  });
  const opts = (map) => new Proxy(map, {
    get: (t, prop) => GM_getValue(prop, t[prop]),
    set: (t, prop, value) => (GM_setValue(prop, value), true),
  });
  const ress = (map = Object.fromEntries(Object.entries(GM_info.script.resources).map(r => [ r[1].name, r[1] ])), params = { props: [], wait: false }) => new Proxy(map, new class {
    //constructor() { console.log("res", { map, ...params }) }
    #fluent = new class {
      get #path() { return params.props.join("-") }
      get wait() { return ress(map, { ...params, wait: true }) }
      get bytes() { return map[this.#path].content }
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
  const scripts = () => new Proxy({}, new class {
    #scripts = {}
    get(_, prop) { return this.#scripts[prop] ?? import(res.script[prop].url).then(js => this.#scripts[prop] = js) }
  });
  const overrideProperty = (o, name, override) => {
    let value;
    if (Object.hasOwn(o, name))
      attempt(`delete ${name} property`, () =>
        delete o[name]);
    attempt(`define ${name} property`, () =>
      Object.defineProperty(o, name, {
        get: () => value,
        set: v => value = override(v),
      }));
  };

  const hostKinorium = "*\.kinorium\.com";
  const res = ress(), script = scripts();
  const el = els(document, {
    dlgCollections: ".collectionWrapper.collectionsWindow",
    collectionCaches: ".collection_cache", lstCollection: ".collectionList, .statuses",
    lazyImages: "img[data-preload]",
    lstCinemaButtons: ".film-page__buttons-cinema",
    mnuUser: ".userMenu",
  });
  const ctls = ctl => els(ctl, {
    ctlMovieItem: ".item.movie", ctlColItemSpan: "span:is(.title, .icon, .cnt)", ctlColItemIcon: ".collectionList span.icon",
    checkbox: "input[type=checkbox]",
  });
  const opt = opts({
    listUserCollections: true, iconifyUserCollections: true, addExtraCinemaSources: true, nativeLazyImages: true,
  });

  await waitFor(() => document.body);
  unsafeWindow.console = (document.body.insertAdjacentHTML('beforeEnd', `<iframe style="display: none">`), document.body.lastChild.contentWindow.console);
  S.extendPrototype();
  Object.assign(globalThis, globalThis.URLPattern ? null : await script.urlpattern);
  console.log("GM info", GM_info);
  //GM_registerMenuCommand("Config", e => alert(e), { accessKey: 'a', title: "Config Enhancer" });

  const { USER_ID: userId, PRO: userPro } = unsafeWindow;
  const language = { ua: 'uk' }[unsafeWindow.LANGUAGE] ?? unsafeWindow.LANGUAGE;
  const strs = {
    en: {
      listUserCollections: "List user collections",
      iconifyUserCollections: "Iconify user collections",
      addExtraCinemaSources: "Add extra cinema sources",
      nativeLazyImages: "Native lazy images",
      watchMovieOn: "watch “%0%” на %1%",
    },
    ru: {
      listUserCollections: "Список коллекций юзера",
      iconifyUserCollections: "Иконки у коллекций юзера",
      addExtraCinemaSources: "Дополнительные кинотеатры",
      nativeLazyImages: "Нативные ленивые картинки",
      watchMovieOn: "смотреть «%0%» на %1%",
    },
    uk: {
      listUserCollections: "Список колекцій користувача",
      iconifyUserCollections: "Іконки у колекціях користувача",
      addExtraCinemaSources: "Додаткові кінотеатри",
      nativeLazyImages: "Нативні ліниві зображення",
      watchMovieOn: "дивитися «%0%» на %1%",
    },
  };
  const str = strs[language] ?? strs.en;

  let murl = null;

  //overrideProperty(unsafeWindow, 'loadedTimestamp', v => (v.setFullYear(3000), v));

  await waitForEvent(document, 'DOMContentLoaded');

  el.tag.head.insertAdjacentHTML('beforeEnd', /*html*/`
    <style>
      @font-face {
        font-family: 'Neucha';
        font-style: normal;
        font-weight: 400;
        font-display: block;
        src: url(${res.font.neucha.latin.url}) format('woff2');
      }

      .ath-movie-ulist {
        display: block;
        margin: 4rem 40rem 4rem 0rem;
        font-size: 14rem;
        color: #555;
        .body-dark & {
          color: #aaa;
        }
        .filmList__item-wrap-title & {
          margin: 4rem 80rem 4rem 110rem;
        }
        a {
          color: inherit !important;
          font-size: 14rem;
          text-decoration: inherit;
          &:hover {
            color: #f53 !important;
          }
        }
      }

      .collectionWrapper.collectionsWindow .collectionList span.icon {
        background: none;
        text-align: center;
        font-size: 20rem;
        line-height: 32rem;
        opacity: 0.8;
      }

      .film-page__buttons-cinema li {
        vertical-align: top;
      }
      .ath-cinema:not(#\0) {
        width: 88px;
        height: 32px;
        text-align: center;
        color: #eee;
        background-color: #444;
        border-radius: 2rem;
        a:has(> &) {
          text-decoration: none !important;
        }
        &.ath-cinema-rezka {
          background: #282828 url(${res.img.cinema.rezka.data}) no-repeat 2px 3px / 83px 57px;
          filter: brightness(1.8) blur(0.5px);
        }
        &.ath-cinema-reyohoho {
          font: 600 22rem / 32px Neucha, Impact, sans-serif;
          letter-spacing: 1px;
          &::after {
            content: "ReYohoho";
          }
        }
        &.ath-cinema-kinobox {
          font: 600 18rem / 32px Arial, sans-serif;
          &::before {
            content: "";
            display: inline-block;
            width: 16px;
            height: 32px;
            vertical-align: top;
            background: url('${res.img.cinema.kinobox.url}') no-repeat center center;
          }
          &::after {
            content: "Kinobox";
            display: inline;
          }
        }
        &.ath-cinema-kinogo {
          font: 600 19rem / 32px Times New Roman, sans-serif;
          letter-spacing: 1px;
          &::after {
            content: "KINOGO";
          }
        }
      }

      .ath-menu-options {
        padding: 0 5rem;
        &:hover {
          background: rgba(33, 176, 208, .25);
        }
        .title {
          max-width: 240rem !important;
        }
        label {
          white-space: nowrap;
        }
      }
    </style>`);

  attempt("add options menu", () => {
    const chks = [];
    const tplCheckbox = (id) => (
      chks.push({ id }), /*html*/`
        <label class="title">
          <input type="checkbox" id="ath-${id}" ${opt[id] ? 'checked' : ""}> ${str[id]}
        </label>`);
    const userScriptStr = (prop, def) => GM_info.script[`${prop}_i18n`]?.[language] ?? GM_info.script[prop] ?? def;
    el.mnuUser.insertAdjacentHTML('beforeEnd', /*html*/`
      <li class="settings settings_border ath-menu-options">
        <span class="icon"></span>
        <div class="title">
          <label title="${h(userScriptStr('description'))}">${h(userScriptStr('name'))} ${GM_info.script.version}</label>
          ${tplCheckbox('listUserCollections')}
          ${tplCheckbox('iconifyUserCollections')}
          ${tplCheckbox('addExtraCinemaSources')}
          ${tplCheckbox('nativeLazyImages')}
        </div>
      </li>`);
    for (let chk of chks)
      el.id[`ath-${chk.id}`].onchange = (e) => opt[chk.id] = e.target.checked;
  });

  let userCollections = [];
  attempt("list user collections under movie title", () => {
    for (let elCache of el.wrap.all.collectionCaches) {
      const cache = JSON.parse(elCache.self.dataset.cache);
      console.log("collection cache", cache);
      let { items: movies, ulist: collections } = cache;
      userCollections = userCollections.concat(collections);
      if (!opt.listUserCollections || movies == null || elCache.parent.lstCollection == null)
        return;
      for (let [ itemId, uids ] of Object.entries(movies)) {
        const itemUlist = uids
          .map(uid => collections.filter(l => l.ulist_id == uid)[0])
          .sort((a, b) => a.sequence - b.sequence)
          .map(u => /*html*/`
            <a href="/user/${userId}/collection/movie/${u.ulist_id}/"
              >${u.icon != null ? `${u.icon} ` : ""}${u.title.replace(/[^\p{L}\p{N} -]/ug, '').trim()}</a>`);
        for (let elTitle of elCache.parent.lstCollection.querySelectorAll(`.movie-title__text[data-id="${itemId}"]`))
          (elTitle.closest("h3") ?? elTitle.closest("a")).insertAdjacentHTML('afterEnd', /*html*/`
            <div class="ath-movie-ulist">${itemUlist.length > 0 ? itemUlist.join(", ") : "—"}<div>`);
      }
    }
  });

  attempt("switch to native lazy loading of images", () => {
    if (!opt.nativeLazyImages)
      return;
    for (let elImage of el.all.lazyImages)
      assignDeep(elImage, { loading: 'lazy', style: { opacity: 1 }, src: elImage.dataset.preload });
  });

  if ((murl = matchLocation(hostKinorium, { pathname: "/:movieId/" })) != null) {
    attempt("add extra external links", async () => {
      if (!opt.addExtraCinemaSources)
        return;
      const { microdata, microdataAll } = await script.microdata;
      const movie = microdata("http://schema.org/Movie", document);
      const titleRu = movie.name;
      const titleOrig = movie.alternativeHeadline?.length > 0 ? movie.alternativeHeadline : titleRu;
      const cinemas = [
        { id: 'rezka', name: "HDRezka", url: `https://rezka.ag/search/?do=search&subaction=search&q=${u(titleOrig)}` },
        { id: 'reyohoho', name: "ReYohoho", url: `https://reyohoho.github.io/reyohoho/#search=${u(titleOrig)}` },
        { id: 'kinobox', name: "Kinobox", url: `https://kinohost.web.app/search?query=${u(titleOrig)}` },
        { id: 'kinogo', name: "Kinogo", url: `https://kinogo.fun/search/${u(titleRu)}` },
      ];
      el.lstCinemaButtons.insertAdjacentHTML('beforeEnd', cinemas.map(c => /*html*/`
        <li>
          <a title='${h(fstr(str.watchMovieOn, movie.name, c.name))}' href="${c.url}" target="_top">
            <div class="ath-cinema ath-cinema-${c.id}"></div>
          </a>
        </li>`).join(""));
    });
  }

  const iconifyCollections = (force = false) => {
    if (!opt.iconifyUserCollections)
      return;
    const dlgCollections = el.dlgCollections;
    if (dlgCollections == null || (!force && dlgCollections.classList.contains('ath-iconified')))
      return;
    dlgCollections.classList.add('ath-iconified');
    const ctl = ctls(dlgCollections);
    let i = 0;
    for (let icon of ctl.all.ctlColItemIcon)
      icon.innerText = userCollections[i++].icon;
  };

  [ 'click', 'mouseup' ].forEach(e => document.addEventListener(e, async e => {
    console.log("document event", e.type, e.target, e);
    const ctl = ctls(e.target);
    const pctl = ctls(e.target.parentElement);
    // Collection list checkbox
    if (e.type == 'click' && ctl.is.ctlColItemSpan && pctl.is.ctlMovieItem) {
      e.preventDefault();
      pctl.checkbox.click();
    }
    await delay(0);
    if (e.type == 'mouseup') {
      iconifyCollections(true);
    }
  }));

  for (;;) {
    attempt("iconify user collections popup", () => {
      iconifyCollections();
    });
    await delay(200);
  }
})();