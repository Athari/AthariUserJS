// ==UserScript==
// @name           Mults.info – Enhanced [Ath]
// @description    Mults.info enhancements: a better video player with enabled downloading.
// @namespace      athari
// @author         Athari (https://github.com/Athari)
// @copyright      © Prokhorov ‘Athari’ Alexander, 2025–2026
// @license        MIT
// @homepageURL    https://github.com/Athari/AthariUserJS
// @supportURL     https://github.com/Athari/AthariUserJS/issues
// @version        1.0.0
// @icon           https://www.google.com/s2/favicons?sz=64&domain=mults.info
// @match          https://mults.info/mults/*
// @grant          unsafeWindow
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_getResourceText
// @grant          GM_getResourceURL
// @grant          GM_info
// @run-at         document-start
// @require        https://cdn.jsdelivr.net/npm/string@3.3.3/dist/string.min.js
// @require        https://cdn.jsdelivr.net/npm/@athari/monkeyutils@0.5.8/monkeyutils.u.min.js
// @require        https://cdn.jsdelivr.net/npm/plyr@3.8.4/dist/plyr.min.js
// @resource       script-urlpattern  https://cdn.jsdelivr.net/npm/urlpattern-polyfill/dist/urlpattern.js
// @resource       style-plyr         https://cdn.plyr.io/3.8.4/plyr.css
// @resource       image-plyr         https://cdn.plyr.io/3.8.4/plyr.svg
// @tag            athari
// ==/UserScript==

(async () => {
  'use strict'

  const { assignDeep, delay, waitForDocumentReady, h, u, f, matchLocation, urlSearch, download, attempt, throwError, ress, scripts, els, opts } =
    //require("../@athari-monkeyutils/monkeyutils.u"); // TODO
    athari.monkeyutils;

  const host = {
    mults: "(.*\\.)?mults\.info",
  };
  const win = unsafeWindow;
  const res = ress(), script = scripts(res);
  const eld = doc => els(doc, {
    head: "head",
    meta: {
      description: "meta[property='og:description']",
      image: "meta[property='og:image']",
      video: "meta[property='og:video']",
      videoType: "meta[property='og:video:type']",
    },
    videoContainer: "#for_flv", video: "#for_flv video",
  }), el = eld(document);
  const ctls = ctl => els(ctl, {
    link: "a",
  });
  const opt = opts({});
  const strs = {
    ru: {
      plyr: {
        restart: 'Снова',
        rewind: 'Перемотать назад {seektime}с',
        play: 'Воспроизвести',
        pause: 'Pause',
        fastForward: 'Перемотать вперёд {seektime}с',
        seek: 'Seek',
        played: 'Проиграно',
        buffered: 'Буферезировано',
        currentTime: 'Время',
        download: 'Скачать',
        duration: 'Продолжительность',
        volume: 'Громкость',
        mute: 'Выключить звук',
        unmute: 'Включить звук',
        enableCaptions: 'Включить субтитры',
        disableCaptions: 'Отключить субтитры',
        enterFullscreen: 'На весь экран',
        exitFullscreen: 'Выйти из полноэкранного режима',
        frameTitle: '{title}',
        captions: 'Субтитры',
        settings: 'Настройки',
        speed: 'Скорость',
        normal: 'Нормальная',
        quality: 'Качество',
        loop: 'Повтор',
        start: 'Начало',
        end: 'Конец',
        all: 'Все',
        reset: 'Сброс',
        disabled: 'Отключено',
      },
    },
  };

  S.extendPrototype();
  Object.assign(globalThis, globalThis.URLPattern ? null : await script.urlpattern);
  console.debug("GM info", GM_info);

  await waitForDocumentReady();
  const language = navigator.languages.filter(l => strs[l] != null)[0] ?? strs[navigator.language] ?? 'ru';
  const str = strs[language];

  let murl = null;
  const search = urlSearch(location.search);

  if (murl = matchLocation(host.mults)) {
    await el.wait.video;
    el.videoContainer.innerHTML = /*html*/`
      <video playsinline controls data-poster="${h(el.meta.image.content)}">
        <source src="${h(el.meta.video.content)}" type="${h(el.meta.videoType.content)}" />
      </video>`;
    const player = new Plyr(el.video, {
      iconUrl: res.image.plyr.data,
      i18n: str.plyr,
      controls: [ 'play-large', 'play', 'progress', 'current-time', 'duration', 'mute', 'volume', 'download', 'settings', 'fullscreen' ],
      tooltips: { controls: true, seek: true },
      disableContextMenu: false,
    });
  }

  el.tag.head.insertAdjacentHTML('beforeEnd', /*html*/`
    <style>
      :root {
      }

      ${res.style.plyr.text}

      .plyr {
        width: 100%;
        height: 100%;
      }
    </style>`);

})();