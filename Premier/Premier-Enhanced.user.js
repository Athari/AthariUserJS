// ==UserScript==
// @name           Premier.one – Enhanced [Ath]
// @name:ru        Premier.one – Улучшенный [Ath]
// @namespace      premier.one
// @author         Athari (https://github.com/Athari)
// @copyright      © Prokhorov ‘Athari’ Alexander, 2024–2025
// @license        MIT
// @homepageURL    https://github.com/Athari/AthariUserJS
// @supportURL     https://github.com/Athari/AthariUserJS/issues
// @version        1.0.0
// @description    Premier.one enhancements: fixed time range filtering, IMDB and Kinopoisk ratings in lists, better episode titles, expanded lists with direct links, extra filters etc.
// @description:ru Улучшения для Premier.one: исправление фильтрации по годам, рейтинги Кинопоиска и IMDB в списках, полные заголовки эпизодов, раскрытые списки с прямыми ссылками, дополнительные фильтры и т.д.
// @icon           https://www.google.com/s2/favicons?sz=64&domain=premier.one
// @match          https://premier.one/*
// @match          https://rutube.ru/*
// @grant          unsafeWindow
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_getResourceText
// @grant          GM_getResourceURL
// @grant          GM_info
// @run-at         document-start
// @require        https://cdn.jsdelivr.net/npm/string@3.3.3/dist/string.min.js
// @resource       script-urlpattern https://cdn.jsdelivr.net/npm/urlpattern-polyfill/dist/urlpattern.js
// @tag            athari
// ==/UserScript==

(async () => {
  'use strict';

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
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  const waitFor = async (predicate, ms = +Infinity) => {
    for (let r, timeout = Date.now() + ms; Date.now() < timeout; await delay(100))
      if (r = await predicate())
        return r;
    return null;
  };
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
  const props = (el, map = {}) => new Proxy(map, new class {
    get(t, prop) { return prop.startsWith('--') ? el.style.getPropertyValue(prop) : el.dataset[prop] }
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
      get bytes() { return map[this.#path].content } // not portable
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

  const premierHost = "premier.one";
  const res = ress(), script = scripts();
  const el = els(document, {
    seasons: ".w-show-card-seasons-and-series__tabs", episodes: ".w-show-card-seasons-and-series__slide:not(.ath-linkified)",
    main: ".l-main", btnCancelNext: ".f-player-recommendation__cancel",
  });

  S.extendPrototype();
  Object.assign(globalThis, URLPattern ? null : await script.urlpattern);

  let trackInfo = {}, trackInfo2 = {};

  const { fetch: originalFetch } = unsafeWindow;
  unsafeWindow.fetch = async (...args) => {
    let [ resource, options ] = args;
    const url = new URL(resource, location.href), params = new URLSearchParams(url.search);
    let murl = null;
    // Utils
    const matchPremierApi = (o) => matchLocation(premierHost, { ...o, pathname: o.pathname.replace(/\/api\//, "/{uma-}?api/") }, url);
    const fixSeoTitle = o => {
      const seoTitle = o.seoTemplate.seoTitle;
      const cleanTitle = seoTitle.includes("{{episode}}")
        ? "{{title_name}} s{{season}}e{{episode}}"
        : seoTitle.includes("{{season}}")
        ? "{{title_name}} s{{season}}"
        : seoTitle.includes("{{title_name}}")
        ? "{{title_name}}"
        : seoTitle;
      return assignDeep(o, {
        seoTemplate: {
          seoH1: cleanTitle,
          seoTitle: cleanTitle,
        },
      });
    };
    const fixPlayerTitle = o => {
      if (o.season > 0 && o.episode > 0 && o.description.length < 100)
        o.title_for_player += `: ${o.description}`;
    };
    // Fake response
    let fakeResponse = null;
    const fakeJson = o => {
      fakeResponse = new Response(
        JSON.stringify(o),
        { status: 200, statusText: "OK", headers: { 'Content-Type': "application/json" } },
      );
    };
    if ((murl = matchPremierApi({ pathname: "/api/play/access/:videoId" })) != null) {
      //fakeJson({ id: murl.videoId });
    }
    if (fakeResponse != null)
      return fakeResponse;
    // Modify query url
    const redirectResource = u => {
      console.log("redirect", resource, " -> ", u/*, " / ", url, " -> ", new URL(u), " / ", options*/);
      resource = u;
    };
    if ((murl = matchPremierApi({ pathname: "/catalog/:version/tv" })) != null) {
      redirectResource(adjustURLSearch(url, { per_page: 100 }));
    }
    // Modify query body
    if (false && options.headers["Content-Type"].includes("application/json")) {
      try {
        const json = JSON.parse(options.body);
        // todo
        options.body = JSON.stringify(json);
      } catch (e) {
        console.log("error", e);
      }
    }
    // Perform query
    const response = await originalFetch(resource, options);
    const contentType = response.headers.get('Content-Type');
    if (!contentType || !contentType.includes("application/json"))
      return response;
    try {
      let json = await response.clone().json();
      console.log("original", resource, structuredClone(json));
      const modifyJson = (value = undefined) => {
        json = value !== undefined ? value : json;
        response.json = async () => json;
        console.log("modified", resource, structuredClone(json));
      };
      // Modify response
      if ((murl = matchPremierApi({ pathname: "/app/v:version/page/info" })) != null) {
        fixSeoTitle(json.result);
        modifyJson();
      }
      if ((murl = matchPremierApi({ pathname: "/app/v:version/show/:videoSlug/metainfo" })) != null) {
        /*modifyJson(assignDeep(json, {
          result: {
            slogan: "Информация должна быть свободной!",
            accessibility: 'free',
            has_allow_download: true,
            restriction_notices: [],
          },
        }));*/
      }
      if ((murl = matchPremierApi({ pathname: "/catalog/v:version/filters" })) != null) {
        const years = json.result.filter(f => f.typeFilter == 'select' && f.name == 'years')[0];
        if (years != null) {
          const yearRangeSwap = 2000, yearRangeMin = 1930, yearRangeLength = 5;
          let iyear = 1;
          const getFilterYearValue = syear => ({
            nameValue: syear, title: syear, titleEn: syear, //sendUrl: syear,
            multiselect: true, otherParam: false, activeValue: true,
            numberValue: ++iyear,
          });
          years.values = [ years.values[0] ];
          for (let year = new Date().getFullYear(); year >= yearRangeSwap; year--)
            years.values.push(getFilterYearValue(`${year}`));
          for (let toYear = yearRangeSwap - 1; toYear > yearRangeMin; toYear -= yearRangeLength)
            years.values.push(getFilterYearValue(`${toYear - yearRangeLength + 1}-${toYear}`));
          modifyJson();
        }
      }
      if ((murl = matchPremierApi({ pathname: "/catalog/v:version/complex-filters" })) != null) {
        json.result = [
          {
            nameForClient: "Советские Мультфильмы", nameForClientEn: "Soviet Cartoons", sendUrl: 'soviet-toons',
            values: [
              { inputFilter: 'countries', inputFilterValues: "SU" },
              { inputFilter: 'types', inputFilterValues: 'movie' },
              { inputFilter: 'genres', inputFilterValues: 'multfilmy' },
            ],
          },
          {
            nameForClient: "Советские Фильмы", nameForClientEn: "Soviet", sendUrl: 'soviet-films',
            values: [
              { inputFilter: 'countries', inputFilterValues: "SU" },
              { inputFilter: 'types', inputFilterValues: 'movie' },
            ],
          },
          {
            nameForClient: "Российские Мультфильмы", nameForClientEn: "Russian Cartoons", sendUrl: 'russia-toons',
            values: [
              { inputFilter: 'countries', inputFilterValues: "RU" },
              { inputFilter: 'types', inputFilterValues: 'movie' },
              { inputFilter: 'genres', inputFilterValues: 'multfilmy' },
            ],
          },
          /*{
            activeValue: true,
            nameForClient: "Пост-совковые Мультфильмы", nameForClientEn: "Post-USSR Cartoons", sendUrl: 'ex-ussr-toons',
            values: [
              { inputFilter: 'countries', inputFilterValues: "BY,KZ,PL,SK,UA,CZ,RU" },
              { inputFilter: 'types', inputFilterValues: 'movie' },
              { inputFilter: 'genres', inputFilterValues: 'multfilmy' },
            ],
          },*/
          ...json.result.filter(f => !f.nameForClient.includes("20") && f.sendUrl != 'RU'),
        ];
        let ifilter = 0;
        for (let filter of json.result)
          Object.assign(filter, { number: ++ifilter, activeValue: true });
        modifyJson();
      }
      if ((murl = matchPremierApi({ pathname: "/catalog/:version/tv" })) != null) {
        const movies = json.result?.items;
        if (movies != null) {
          (async () => {
            const elPostersList = await waitFor(() => document.querySelector(`.e-poster-list:has(a[data-id='${movies.at(-1).objectId}'])`), 20000);
            if (elPostersList == null)
              return;
            for (let elPoster of elPostersList.children) {
              const movie = movies.filter(m => m.objectId == elPoster.dataset.id)[0];
              if (movie == null)
                continue;
              elPoster.querySelector(".e-rating")?.remove();
              const htmlRating = (rating, type) => rating[type] == 0 ? "" : /*html*/`
                <div class="e-rating e-rating--${type}">
                  <div class="a-icon e-rating__icon"><i class="a-icons icon-mono--rating--${type}"></i></div>
                  <span class="e-rating__value font-poster-badge-cc">${rating[type].toFixed(1)}</span>
                </div>`;
              elPoster.querySelector(".e-poster__play-icon").insertAdjacentHTML('afterEnd', /*html*/`
                <div class="ath-poster-ratings">
                  ${htmlRating(movie.rating, 'kinopoisk')}
                  ${htmlRating(movie.rating, 'imdb')}
                </div>`);
              elPoster.title =
                `${movie.name} (${movie.genres?.map(g => g.name).join(", ")}) ${movie.age_restriction}\n\n` +
                `${movie.description}\n\n` +
                `КП: ${movie.rating.kinopoisk.toFixed(1)}   IMDB: ${movie.rating.imdb.toFixed(1)}`;
            }
          })();
        }
      }
      if ((murl = matchPremierApi({ pathname: "/api/metainfo/tv/:videoSlug/video/{/*}?" })) != null) {
        if (json?.results?.[0]?.title_for_player != null)
          for (let r of json.results)
            fixPlayerTitle(r);
        modifyJson();
      }
      if ((murl = matchPremierApi({ pathname: "/api/view_history/" })) != null) {
        if (json?.results?.[0]?.video != null) {
          for (let r of json.results) {
            fixPlayerTitle(r.video);
            r.title_for_player = r.video.title_for_player;
          }
        }
        modifyJson();
      }
      if ((murl = matchPremierApi({ pathname: "/api/play/trackinfo/:trackId/" })) != null) {
        trackInfo = structuredClone(json);
        console.log("info1", { trackInfo: structuredClone(trackInfo), title: document.querySelector('title')?.innerText });
        fixPlayerTitle(json);
        modifyJson();
      }
      if ((murl = matchPremierApi({ pathname: "/api/video/:videoId" })) != null) {
        trackInfo2 = structuredClone(json);
        console.log("info2", { trackInfo2: structuredClone(trackInfo2), title: document.querySelector('title')?.innerText });
        fixPlayerTitle(json);
        modifyJson();
      }
    } catch (e) {
      console.log("error", e);
    }
    return response;
  };

  (await el.wait.tag.head).insertAdjacentHTML('beforeEnd', /*html*/`
    <style>
      .m-select__options-list--rows {
        display: flex;
        flex-flow: column wrap;
        max-height: 29rem !important;
      }
      .e-content-filters__list .m-select:nth-child(5) .m-select__dropdown { /* plots */
        width: auto !important;
        max-width: 50rem;
      }
      .m-select__option {
        padding: 0 !important;
        label {
          padding: .75rem 1rem;
        }
      }
      .m-slider {
        .m-slider__wrapper {
          display: flex;
          flex-flow: row wrap;
        }
        .m-slider__button-prev,
        .m-slider__button-next {
          display: none;
        }
      }
      .ath-poster-ratings {
        position: absolute;
        inset: auto .5rem .5rem auto;
        display: flex;
        flex-flow: row;
        gap: .5rem;
        .e-rating {
          position: static !important;
          padding: 0 .25rem !important;
          .a-icon i {
            font-size: inherit;
            width: auto;
            height: auto;
          }
        }
      }
      a.ath-episode-link {
        position: absolute;
        inset: 0;
      }
    </style>`);

  const linkifyEpisodes = () => {
    if (el.seasons == null)
      return;
    const propSeasons = props(el.seasons);
    const [ seasonsCount, currentSeason ] = [ propSeasons['--m-tabs-items-count'], propSeasons['--m-tabs-active-index'] ];
    const murl = matchLocation(premierHost, { pathname: "/show/:videoSlug{/*}?" });
    if (!(seasonsCount > 0) || murl == null)
      return;
    for (let elEpisode of el.all.episodes) {
      const episodeIndex = +elEpisode.getAttribute('index') + 1;
      elEpisode.classList.add('ath-linkified');
      elEpisode.querySelector(".e-poster").insertAdjacentHTML('beforeEnd', /*html*/`
        <a class="ath-episode-link" href="/show/${murl.videoSlug}/season/${currentSeason}/episode/${episodeIndex}"></a>`);
    }
  };

  for (let ims = 0; ims += 100; await delay(100)) {
    if (ims % 1000 == 0) {
      linkifyEpisodes();
    }
    if (ims % 200 == 0) {
      el.main?.removeAttribute('inert');
      el.btnCancelNext?.click();
    }
  }
})();