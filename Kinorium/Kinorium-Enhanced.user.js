// ==UserScript==
// @name           Kinorium.com – Enhanced [Ath]
// @name:ru        Kinorium.com – Улучшенный [Ath]
// @name:uk        Kinorium.com – Покращений [Ath]
// @name:be        Kinorium.com – Удасканалены [Ath]
// @name:bg        Kinorium.com – Подобрен [Ath]
// @name:tt        Kinorium.com – Яхшыртылган [Ath]
// @name:sl        Kinorium.com – Izboljšan [Ath]
// @name:sr        Kinorium.com – Poboljšan [Ath]
// @name:ka        Kinorium.com – გაუმჯობესებული [Ath]
// @description    Kinorium.com enhancements: user collections usability, links to extra streaming providers, native lazy loading of images etc.
// @description:ru Улучшения для Kinorium.com: удобство работы с пользовательскими коллекциями, ссылки на дополнительные онлайн-кинотеатры, нативная ленивая загрузка изображений и т.д.
// @description:uk Покращення для Kinorium.com: зручність роботи з користувацькими колекціями, посилання на додаткові онлайн-кінотеатри, нативна лінива завантаження зображень тощо.
// @description:be Удасканаленні для Kinorium.com: зручнасць працы з карыстальніцкімі калекцыямі, спасылкі на дадатковыя анлайн-кінатэатры, натыўная ленівая загрузка здымкаў і г.д.
// @description:bg Подобрения за Kinorium.com: удобство при работата с потребителски колекции, връзки към допълнителни онлайн кинотеатри, нативно мързеливо зареждане на изображения и т.н.
// @description:tt Kinorium.com өчен яхшыртулар: кулланучы коллекцияләре белән эш итү җиңеллеге, өстәмә онлайн-кинотеатрларга сылтамалар, туган ленивая загрузка изображений һ.б.
// @description:sl Izboljšave za Kinorium.com: uporabnost uporabniških zbirk, povezave do dodatnih spletnih kinodvoran, domače leno nalaganje slik itd.
// @description:sr Poboljšanja za Kinorium.com: upotrebljivost korisničkih kolekcija, linkovi ka dodatnim online bioskopima, nativno lenjo učitavanje slika itd.
// @description:ka Kinorium.com-ის გაუმჯობესება: მომხმარებლის კოლექციების გამოყენების მარტივება, დამატებითი ონლაინ-კინოთეატრების ბმულები, ნატიური ზარმაცი იმიჯების ჩატვირთვა და სხვა.
// @namespace      athari
// @author         Athari (https://github.com/Athari)
// @copyright      © Prokhorov ‘Athari’ Alexander, 2024–2025
// @license        MIT
// @homepageURL    https://github.com/Athari/AthariUserJS
// @supportURL     https://github.com/Athari/AthariUserJS/issues
// @version        1.5.1
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
// @require        https://cdn.jsdelivr.net/npm/@athari/monkeyutils@0.5.1/monkeyutils.u.min.js
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

  const { assignDeep, delay, waitForDocumentReady, h, u, f, toUrl, matchLocation, download, attempt, throwError, overrideProperty, overrideXmlHttpRequest, reviveConsole, wrapElement, ress, scripts, els, opts } =
    //require("../@athari-monkeyutils/monkeyutils.u"); // TODO
    athari.monkeyutils;

  const hostKinorium = "*\.kinorium\.com";
  const res = ress(), script = scripts(res);
  const eld = doc => els(doc, {
    dlgCollections: ".collectionWrapper.collectionsWindow",
    collectionCaches: ".collection_cache", lstCollection: ".collectionList, .filmList, .statuses", athMovieUserList: ".ath-movie-ulist",
    lazyImages: "img[data-preload], img[src*='/img/blank'][style^='background:']",
    lstCinemaButtons: ".film-page__buttons-cinema",
    item: ".item", itemComment: ".statusText", itemInfo: ".info", statusWidget: ".statusWidget",
    athItemComment: ".ath-item-status", athItemCommentRating: ".ath-item-status-rating",
    lnkTrailer: ".trailers__list .trailers__link, .trailer.item.video",
    mnuUser: ".userMenu",
    lstSites: ".sites_page .sites", lnkSiteDataHref: ".sites_page .sites a[href='#']:is([data-original-url], [data-url])", btnDelSite: ".sites_page .sites .delReport",
    filmLeftPanel: ".film-page_leftContent",
  }), el = eld(document);
  const ctls = ctl => els(ctl, {
    ctlMovieItem: ".item.movie", ctlColItemSpan: "span:is(.title, .icon, .cnt)", ctlColItemIcon: ".collectionList span.icon",
    checkbox: "input[type=checkbox]",
  });
  const opt = opts({
    listUserCollections: true, iconifyUserCollections: true, addExtraCinemaSources: true,
    commentsBelowRatings: true, directLinksToTrailers: true, addExternalLinks: true,
    nativeLazyImages: true,
  });
  const strs = {
    en: {
      listUserCollections: "List user collections",
      iconifyUserCollections: "Iconify user collections",
      addExtraCinemaSources: "Add extra cinema sources",
      nativeLazyImages: "Native lazy images",
      commentsBelowRatings: "Comments below ratings",
      directLinksToTrailers: "Direct links to videos",
      addExternalLinks: "External movie links in sidebar",
      watchMovieOn: "watch “%0%” on %1%",
    },
    ru: {
      listUserCollections: "Список коллекций юзера",
      iconifyUserCollections: "Иконки у коллекций юзера",
      addExtraCinemaSources: "Дополнительные кинотеатры",
      nativeLazyImages: "Нативные ленивые картинки",
      commentsBelowRatings: "Комментарии под оценками",
      directLinksToTrailers: "Прямые ссылки на видео",
      addExternalLinks: "Внешние ссылки на фильм сбоку",
      watchMovieOn: "смотреть «%0%» на %1%",
    },
    uk: {
      listUserCollections: "Список колекцій користувача",
      iconifyUserCollections: "Іконки у колекціях користувача",
      addExtraCinemaSources: "Додаткові кінотеатри",
      nativeLazyImages: "Нативні ліниві зображення",
      commentsBelowRatings: "Коментарі під оцінками",
      directLinksToTrailers: "Прямі посилання на відео",
      addExternalLinks: "Зовнішні посилання на фільм збоку",
      watchMovieOn: "дивитися «%0%» на %1%",
    },
  };
  const op = {};

  const { log: consoleLog } = unsafeWindow.console;
  unsafeWindow.console.log = (...args) => args[0]?.includes?.("Не пиши парсер") ? throwError("fuck you") : consoleLog(...args);
  const consoleRevived = reviveConsole(unsafeWindow);

  overrideXmlHttpRequest(unsafeWindow, {
    on: {
      load: async (_, load) => {
        load?.();
        await delay(0);
        if (!op.isInitialized)
          return;
        op.doCommentsBelowRatings();
        op.doListUserCollections();
        op.doNativeLazyImages();
      },
    },
  });

  await consoleRevived;
  S.extendPrototype();
  Object.assign(globalThis, globalThis.URLPattern ? null : await script.urlpattern);
  console.debug("GM info", GM_info);
  //GM_registerMenuCommand("Config", e => alert(e), { accessKey: 'a', title: "Config Enhancer" });

  //overrideProperty(unsafeWindow, 'loadedTimestamp', v => (v.setFullYear(3000), v));

  console.log(await waitForDocumentReady());
  const { USER_ID: userId, PRO: userPro } = unsafeWindow;
  const language = { ua: 'uk' }[unsafeWindow.LANGUAGE] ?? unsafeWindow.LANGUAGE;
  const str = strs[language] ?? strs.en;

  let murl = null;

  el.tag.head.insertAdjacentHTML('beforeEnd', /*html*/`
    <style>
      @font-face {
        font-family: 'Neucha';
        font-style: normal;
        font-weight: 400;
        font-display: block;
        src: url(${res.font.neucha.latin.url}) format('woff2');
      }

      body {
        --ath-header-color-gray: #000c;
        --ath-text-color-gray-light: #777;
        &.body-dark {
          --ath-header-color-gray: #fffc;
          --ath-text-color-gray-light: #bbb;
        }
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

      .trailers__item {
        display: flex;
        flex-flow: column;
        .away-transparency {
          display: none;
        }
      }
      .trailer.item.video {
        height: auto !important;
      }
      .ath-trailer-title,
      .ath-trailer-link {
        display: block;
        max-width: 260rem;
        padding: 5rem 0 0 0;
        font-size: 13rem;
        text-decoration: inherit;
        color: #777;
        .body-dark & {
          color: #999;
        }
        .trailer.item.video & {
          padding: 3rem 5rem;
        }
      }
      .ath-trailer-title {
        font-weight: 500;
      }

      .item .info .ath-item-status {
        display: grid;
        grid-template-columns: 32rem 1fr;
        gap: 20rem;
        min-height: 32rem;
        margin: 8rem 0;
        .ath-item-status-rating {
          margin: -10rem auto 0;
          .statusWidget {
            margin: 0;
            width: auto;
            min-width: 32rem;
          }
        }
        .statusText {
          display: block;
          align-self: end;
          margin: 0;
          font-size: 15rem;
          line-height: 1.3;
          color: var(--ath-text-color-gray-light);
        }
      }

      .film-page_leftContent  {
        .sites {
          .sites-page__title-group {
            margin: 15rem 0 8rem 0;
            font-size: 18rem;
            color: var(--ath-header-color-gray);
          }
          .sites-pages__item {
            margin: 6rem 0;
            a {
              font-size: 14rem;
              color: #21b0d0;
              text-decoration: none;
              &:hover {
                color: #ff5032;
              }
              .sites_page__flag {
                margin: 0 7rem 0 0;
              }
              img {
                display: inline;
                width: 16rem;
                height: 16rem;
                margin: 0 5rem 0 0;
                vertical-align: middle;
              }
            }
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

  (op.addOptionsMenu = () => attempt("add options menu", () => {
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
          ${tplCheckbox('commentsBelowRatings')}
          ${tplCheckbox('directLinksToTrailers')}
          ${tplCheckbox('addExternalLinks')}
          ${tplCheckbox('nativeLazyImages')}
        </div>
      </li>`);
    for (let chk of chks)
      el.id[`ath-${chk.id}`].onchange = (e) => opt[chk.id] = e.target.checked;
  }))();

  let userCollections = [];
  (op.doListUserCollections = () => attempt("list user collections under movie title", () => {
    for (let elwCache of el.wrap.all.collectionCaches) {
      const cache = JSON.parse(elwCache.self.dataset.cache);
      console.debug("collection cache", cache);
      let { items: movies, ulist: collections } = cache;
      userCollections = /*userCollections.concat(collections)*/collections;
      const elwLstCollection = elwCache.wrap.parent.lstCollection;
      if (!opt.listUserCollections || movies == null || elwLstCollection == null || elwLstCollection.athMovieUserList != null)
        return;
      for (let [ itemId, uids ] of Object.entries(movies)) {
        const itemUlist = uids
          .map(uid => collections.filter(l => l.ulist_id == uid)[0])
          .sort((a, b) => a.sequence - b.sequence)
          .map(u => /*html*/`
            <a href="/user/${userId}/collection/movie/${u.ulist_id}/"
              >${u.icon != null ? `${u.icon} ` : ""}${u.title.replace(/[^\p{L}\p{N} -]/ug, '').trim()}</a>`);
        for (let elTitle of elwLstCollection.self.querySelectorAll(`:is(.movie-title__text, .link-info-movie-type-film)[data-id="${itemId}"]`))
          (elTitle.closest("h3") ?? elTitle.closest("a")).insertAdjacentHTML('afterEnd', /*html*/`
            <div class="ath-movie-ulist">${itemUlist.length > 0 ? itemUlist.join(", ") : "—"}<div>`);
      }
    }
    console.info("user collections", userCollections);
  }))();

  (op.doNativeLazyImages = () => attempt("switch to native lazy loading of images", () => {
    if (!opt.nativeLazyImages)
      return;
    for (let elImage of el.all.lazyImages)
      assignDeep(elImage, {
        loading: 'lazy',
        style: { opacity: 1 },
        src: elImage.dataset.preload ?? elImage.style.backgroundImage?.replace(/url\("?(.*?)"?\)/, "$1"),
      });
  }))();

  (op.doAddExtraCinemaSources = () => attempt("add extra external links", async () => {
    if ((murl = matchLocation(hostKinorium, { pathname: "/:movieId/" })) != null) {
      if (!opt.addExtraCinemaSources)
        return;
      const { microdata/*, microdataAll*/ } = await script.microdata;
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
          <a title='${h(f(str.watchMovieOn, movie.name, c.name))}' href="${c.url}" target="_top">
            <div class="ath-cinema ath-cinema-${c.id}"></div>
          </a>
        </li>`).join(""));
    }
  }))();

  (op.doAddExternalLinks = () => attempt("add external links", async () => {
    if ((murl = matchLocation(hostKinorium, { pathname: "/:movieId/" })) != null) {
      if (!opt.addExternalLinks)
        return;
      const sitesEl = eld(await download(`/${murl.movieId}/sites/`, 'html'));
      for (const elLink of sitesEl.all.lnkSiteDataHref)
        elLink.href = elLink.dataset.originalUrl ?? elLink.dataset.url;
      for (const btnDelSite of sitesEl.all.btnDelSite)
        btnDelSite.remove();
      el.filmLeftPanel.insertAdjacentElement('beforeEnd', sitesEl.lstSites);
    }
  }))();

  (op.doCommentsBelowRatings = () => attempt("show comments after user comments", () => {
    if (!opt.commentsBelowRatings)
      return;
    for (const elwComment of el.wrap.all.itemComment) {
      const elwItem = elwComment.wrap.parent.item;
      if (elwItem.athItemComment != null)
        continue;
      elwItem.itemInfo.insertAdjacentHTML('beforeEnd', /*html*/`
        <div class="ath-item-status">
          <div class="ath-item-status-rating"></div>
        </div>`);
      elwItem.athItemCommentRating.insertAdjacentElement('beforeEnd', elwItem.all.statusWidget.at(-1));
      elwItem.athItemComment.insertAdjacentElement('beforeEnd', elwComment.self);
    }
  }))();

  (op.doDirectLinksToTrailers = () => attempt("add direct trailer links", () => {
    if (!opt.directLinksToTrailers)
      return;
    for (let lnkTrailer of el.all.lnkTrailer) {
      const elLnkTrailer = els(lnkTrailer);
      const trailer = { ...lnkTrailer.dataset, ...elLnkTrailer.tag.img?.dataset };
      const trailerUrl = toUrl(trailer.video);
      const trailerTitle = {
        "www.youtube.com": "YouTube",
      }[trailerUrl.hostname] ?? "Video";
      const trailerUrlHref = trailerUrl.toString()
        .replace("https://www.youtube.com/embed/", "https://www.youtube.com/watch?v=");
      if (lnkTrailer.classList.contains('item'))
        wrapElement(lnkTrailer, 'DIV', { copyAttrs: true });
      lnkTrailer.insertAdjacentHTML('beforeEnd', /*html*/`
        <span class="ath-trailer-title">${h(lnkTrailer.title)}</span>`);
      lnkTrailer.insertAdjacentHTML('afterEnd', /*html*/`
        <a class="ath-trailer-link" href="${h(trailerUrlHref)}">${h(trailerTitle)}</a>`);
    }
  }))();

  (op.iconifyCollections = (force = false) => {
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
  })();

  [ 'click', 'mouseup' ].forEach(e => document.addEventListener(e, async e => {
    console.debug("document event", e.type, e.target, e);
    const ctl = ctls(e.target);
    const pctl = ctls(e.target.parentElement);
    // Collection list checkbox
    if (e.type == 'click' && ctl.is.ctlColItemSpan && pctl.is.ctlMovieItem) {
      e.preventDefault();
      pctl.checkbox.click();
    }
    await delay(0);
    if (e.type == 'mouseup') {
      op.iconifyCollections(true);
    }
  }));

  op.isInitialized = true;

  for (;;) {
    attempt("iconify user collections popup", () => {
      op.iconifyCollections();
    });
    await delay(200);
  }
})();