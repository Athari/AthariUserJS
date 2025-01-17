// ==UserScript==
// @name           Culture.ru – Unlocked [Ath]
// @name:ru        Culture.ru – Отпёртый [Ath]
// @namespace      culture.ru
// @author         Athari (https://github.com/Athari)
// @copyright      © Prokhorov ‘Athari’ Alexander, 2024–2025
// @license        MIT
// @homepageURL    https://github.com/Athari/AthariUserJS
// @supportURL     https://github.com/Athari/AthariUserJS/issues
// @version        1.0.1
// @description    Fixes the bug causing the "Видеозапись недоступна для просмотра по решению правообладателя" error message.
// @description:ru Исправляет баг, приводящий к появлению сообщения "Видеозапись недоступна для просмотра по решению правообладателя".
// @icon           https://www.google.com/s2/favicons?sz=64&domain=culture.ru
// @match          https://*.culture.ru/*
// @grant          unsafeWindow
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_getResourceText
// @grant          GM_getResourceURL
// @grant          GM_info
// @run-at         document-start
// @require        https://cdnjs.cloudflare.com/ajax/libs/string.js/3.3.3/string.min.js
// @require        https://cdnjs.cloudflare.com/ajax/libs/hls.js/1.5.18/hls.light.min.js
// @require        https://cdnjs.cloudflare.com/ajax/libs/plyr/3.7.8/plyr.min.js
// @resource       script-urlpattern https://cdn.jsdelivr.net/npm/urlpattern-polyfill/dist/urlpattern.js
// @resource       css-plyr          https://cdnjs.cloudflare.com/ajax/libs/plyr/3.7.8/plyr.min.css
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
  const h = s => S(s).escapeHTML();
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

  await waitForEvent(document, 'DOMContentLoaded');

  const res = ress(), script = scripts();
  const el = els(document, {
    mainHeader: "main > div:has(h1)",
    footer: "footer",
    titleDivs: "div:has(> h1) div",
    lstVideos: "#ath-videos", videos: "#ath-videos video",
    lstImages: "#ath-images", images: "#ath-images img",
    lblPlyrAuto: ".plyr__menu__container [data-plyr='quality'][value='0'] span",
  });
  const opt = opts({
    hideOriginal: true, thumbHeight: 240,
  });
  const data = unsafeWindow.__NEXT_DATA__;

  S.extendPrototype();
  Object.assign(globalThis, globalThis.URLPattern ? null : await script.urlpattern);

  const strs = {
    en: {
      opt: {
        hideOriginal: "Hide original media",
        thumbHeight: "Thumbnail height",
      },
    },
    ru: {
      opt: {
        hideOriginal: "Скрыть исходные материалы",
        thumbHeight: "Высота превьюшек",
      },
    },
    g: {
      videoErrorMessage: "Видеозапись недоступна для просмотра по решению правообладателя",
    }
  };
  const language = navigator.languages.filter(l => strs[l] != null)[0] ?? strs[navigator.language] ?? 'en';
  const str = strs[language];

  el.tag.head.insertAdjacentHTML('beforeEnd', /*html*/`
    <style>
      :root {
        color-scheme: dark;
        --ath-hide-original: ${+opt.hideOriginal};
        --ath-thumb-height: ${opt.thumbHeight}px;
      }
      body {
        container: if;
      }
      * {
        opacity: 1;
      }

      @container if style(--ath-hide-original: 1) {
        main > div:not(:has(h2)) .swiper-container-horizontal {
          display: none;
        }
      }

      #ath-main {
        display: flex;
        flex-flow: column;
        gap: 8px;
        padding: 8px;
        #ath-videos {
          display: flex;
          flex-flow: column;
          align-items: center;
          gap: 8px;
          video {
            min-width: 800px;
            min-height: 600px;
          }
        }
        #ath-images {
          display: flex;
          flex-flow: row wrap;
          justify-content: center;
          gap: 8px;
          .ath-image img {
            height: var(--ath-thumb-height);
            max-width: calc(var(--ath-thumb-height) * 2.5);
          }
        }
      }

      #ath-options {
        margin: 8px auto;
        display: flex;
        flex-flow: row wrap;
        gap: 8px 32px;
      }

      ${res.css.plyr.text}

      @media screen and (max-width: 480px) {
        .plyr .plyr__controls button:is([data-plyr=pip], [data-plyr=mute], [data-plyr=volume]) {
          display: none;
        }
      }
    </style>`);

  attempt("add options", () => {
    const inputs = [];
    const meta = (prop) => GM_info.script[`${prop}_i18n`]?.[language] ?? GM_info.script[prop];
    const formatAttrs = attrs => Object.entries(attrs).map(([k, v]) => `${k}="${h(v)}"`).join(" ");
    const tplInput = (id, attrs = { type: 'checkbox' }) => (
      inputs.push({ id, ...attrs }),
        /*html*/`<label>${
          attrs.type == 'checkbox'
            ? /*html*/`<input id="ath-${id}" ${opt[id] ? 'checked' : ""} ${formatAttrs(attrs)}> ${str.opt[id]}`
            : /*html*/`${str.opt[id]} <input id="ath-${id}" value="${h(opt[id])}" ${formatAttrs(attrs)}>`
        }</label>`);
    el.footer.insertAdjacentHTML('beforeBegin', /*html*/`
      <div id="ath-options">
        <label title="${h(meta('description'))}">${h(meta('name'))} ${GM_info.script.version}</label>
        ${tplInput('hideOriginal')}
        ${tplInput('thumbHeight', { type: 'range', min: 40, max: 400, step: 10, 'data-unit': " pixels" })}
      </div>`);
    for (let { id, type } of inputs) {
      const elInput = el.id[`ath-${id}`];
      elInput.onchange = () =>
        opt[id] = type == 'checkbox' ? elInput.checked : elInput.value;
      if (type == 'range') {
        elInput.insertAdjacentHTML('afterEnd', /*html*/`<output for="ath-${id}">`);
        const updateValue = () => elInput.nextElementSibling.value = ` ${elInput.value}${elInput.dataset.unit}`;
        elInput.oninput = updateValue;
        updateValue();
      }
    }
  });

  attempt("publish raw materials", () => {
    const getImageUrl = (id, name = null, transform = null) =>
        `https://${data.runtimeConfig.services.storage.main.host}/images/${id}/${transform ?? "_"}/${name ?? "thumb.jpg"}`;
    const getImageThumbUrl = (id, name = null) =>
        getImageUrl(id, name, `h_${opt.thumbHeight},c_fill,g_center`);
    const getPlaylistUrl = id =>
        `https://video-playlist.culture.ru:443${id}`;
    el.mainHeader.insertAdjacentHTML('afterEnd', /*html*/`
      <div id="ath-main">
        <div id="ath-videos"></div>
        <div id="ath-images"></div>
      </div>`);
    const { movie } = data.props.pageProps;
    for (let mat of movie.materials) {
      console.log("material", mat.type, mat);
      const file = mat.files[0];
      switch (mat.type) {
        case 'video':
          el.lstVideos.insertAdjacentHTML('beforeEnd', /*html*/`
            <div class="ath-video">
              <video width="800" height="600" controls crossorigin playsinline disablepictureinpicture
                  data-src="${getPlaylistUrl(file.publicId)}"
                  poster="${getImageUrl(movie.thumbnailFile.publicId, null, "h_600,w_800,c_fill")}">
              </video>
            </div>`);
          break;
        case 'photo':
          el.lstImages.insertAdjacentHTML('beforeEnd', /*html*/`
            <a class="ath-image" href="${getImageUrl(file.publicId, file.originalName)}">
              <img src="${getImageThumbUrl(file.publicId, file.originalName)}">
            </a>`);
          break;
      }
    }
    for (let video of el.all.videos) {
      if (Hls.isSupported()) {
        const options = {
          controls: [
            'play-large', 'play', 'rewind', 'fast-forward',
            'current-time', 'progress', 'duration',
            'mute', 'volume', 'captions', 'settings', 'airplay', /*'download',*/ 'fullscreen',
          ],
          i18n: {
            qualityLabel: {
              0: "Auto",
            },
          },
          settings: [ /*'captions',*/ 'quality', 'speed', 'loop' ],
          speed: { selected: 1.0, options: [ 0.10, 0.75, 1.0, 1.2, 1.35, 1.5, 1.75, 2.0, 2.5, 3.0, 4.0 ] },
          quality: { default: 1080, options: [ 1080 ] },
          urls: { download: video.dataset.src },
          disableContextMenu: false,
          playsinline: true,
        };
        let player = null;
        const hls = new Hls();
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          attempt("init video player", () => {
            const qualities = [0].concat(hls.levels.map(l => l.height).reverse());
            options.quality = {
              default: 0,
              options: qualities,
              forced: true,
              onChange: (v) => hls.currentLevel = v == 0 ? -1 : qualities.findIndex(l => l.height == v),
            };
            player = new Plyr(video, options);
            player.on('play', () => hls.startLoad());
            player.on('qualitychange', () => {
              if (player.currentTime != 0)
                hls.startLoad();
            });
            console.log({ hls, player });
          });
        });
        hls.on(Hls.Events.LEVEL_SWITCHED, function (e, data) {
          el.lblPlyrAuto.innerText = hls.autoLevelEnabled ? `Auto (${hls.levels[data.level].height}p)` : "Auto";
        });
        hls.loadSource(video.dataset.src);
        hls.attachMedia(video);
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = video.dataset.src;
      }
    }
  });

  attempt("fuck up error message", () => {
    const elError = el.all.titleDivs.filter(d => d.innerText == strs.g.videoErrorMessage)[0];
    if (elError != null)
      elError.innerHTML = /*html*/`<s>${h(strs.g.videoErrorMessage)}</s> 😜`;
  });
})();