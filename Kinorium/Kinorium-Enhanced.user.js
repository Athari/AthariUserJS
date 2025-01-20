// ==UserScript==
// @name           Kinorium.com – Enhanced [Ath]
// @name:ru        Kinorium.com – Улучшенный [Ath]
// @name:uk        Kinorium.com – Покращений [Ath]
// @namespace      athari
// @author         Athari (https://github.com/Athari)
// @copyright      © Prokhorov ‘Athari’ Alexander, 2024–2025
// @license        MIT
// @homepageURL    https://github.com/Athari/AthariUserJS
// @supportURL     https://github.com/Athari/AthariUserJS/issues
// @version        1.0.2
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
// @require        https://cdn.jsdelivr.net/npm/@athari/monkeyutils@0.2.2/monkeyutils.u.min.js
// @resource       script-microdata   https://cdn.jsdelivr.net/npm/@cucumber/microdata@2.1.0/dist/esm/src/index.min.js
// @resource       script-urlpattern  https://cdn.jsdelivr.net/npm/urlpattern-polyfill/dist/urlpattern.js
// @resource       font-neucha-latin  https://fonts.gstatic.com/s/neucha/v17/q5uGsou0JOdh94bfvQlt.woff2
// @resource       img-cinema-default https://images.kinorium.com/web/vod/vod_channels.svg
// @resource       img-cinema-rezka   https://rezka.ag/templates/hdrezka/images/hdrezka-logo.png
// @resource       img-cinema-kinobox data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="32" viewBox="0 0 16 32"><polygon points="3,11 10,16 3,21" fill="%23eee" stroke="%23eee" stroke-width="4" stroke-linejoin="round" /></svg>
// @tag            athari
// ==/UserScript==

(async () => {
  'use strict'

  const { assignDeep, delay, waitForEvent, h, u, f, matchLocation, attempt, overrideProperty, reviveConsole, ress, scripts, els, opts } =
    athari.monkeyutils;

  const hostKinorium = "*\.kinorium\.com";
  const res = ress(), script = scripts(res);
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

  await reviveConsole();
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