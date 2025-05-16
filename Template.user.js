// ==UserScript==
// @name           $Example.com$ – Enhanced [Ath]
// @description    $Example.com$ enhancements: a.
// @namespace      athari
// @author         Athari (https://github.com/Athari)
// @copyright      © Prokhorov ‘Athari’ Alexander, 2025–2025
// @license        MIT
// @homepageURL    https://github.com/Athari/AthariUserJS
// @supportURL     https://github.com/Athari/AthariUserJS/issues
// @version        1.0.0
// @icon           https://www.google.com/s2/favicons?sz=64&domain=$example.com$
// @match          https://*.$example.com$/*
// @grant          unsafeWindow
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_getResourceText
// @grant          GM_getResourceURL
// @grant          GM_info
// @grant          GM_registerMenuCommand
// @run-at         document-start
// @require        https://cdn.jsdelivr.net/npm/string@3.3.3/dist/string.min.js
// @require        https://cdn.jsdelivr.net/npm/@athari/monkeyutils@0.5.6/monkeyutils.u.min.js
// @resource       script-urlpattern  https://cdn.jsdelivr.net/npm/urlpattern-polyfill/dist/urlpattern.js
// @tag            athari
// ==/UserScript==

(async () => {
  'use strict'

  const { assignDeep, delay, waitForDocumentReady, h, u, f, matchLocation, download, attempt, throwError, ress, scripts, els, opts } =
    //require("../@athari-monkeyutils/monkeyutils.u"); // TODO
    athari.monkeyutils;

  const host = {
    example: "(.*\\.)?example\.com",
  };
  const win = unsafeWindow;
  const res = ress(), script = scripts(res);
  const eld = doc => els(doc, {
    head: "head",
  }), el = eld(document);
  const ctls = ctl => els(ctl, {
    link: "a",
  });
  const opt = opts({});
  const strs = {
    en: {
      hi: "Hi",
    },
    ru: {
      hi: "Hi",
    },
  };

  S.extendPrototype();
  Object.assign(globalThis, globalThis.URLPattern ? null : await script.urlpattern);
  console.debug("GM info", GM_info);
  //GM_registerMenuCommand("Config", e => alert(e), { accessKey: 'a', title: "Config" });

  await waitForDocumentReady();
  const language = navigator.languages.filter(l => strs[l] != null)[0] ?? strs[navigator.language] ?? 'en';
  const str = strs[language];

  let murl = null;

  if (murl = matchLocation(host.example)) {}

  el.tag.head.insertAdjacentHTML('beforeEnd', /*html*/`
    <style>
      :root {
        color-scheme: light dark;
      }

      #ath-options {
        margin: 8px auto;
        display: flex;
        flex-flow: row wrap;
        gap: 8px 32px;
      }
    </style>`);

  (op.addOptionsMenu = () => attempt("add options menu", () => {
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
    el.tag.body.insertAdjacentHTML('beforeEnd', /*html*/`
      <div id="ath-options">
        <label title="${h(meta('description'))}">${h(meta('name'))} ${GM_info.script.version}</label>
        ${/*tplInput('optionName')*/""}
      </div>`);
    for (let { id, type } of inputs) {
      const elInput = el.id[`ath-${id}`];
      elInput.onchange = () =>
        opt[id] = type == 'checkbox' ? elInput.checked : elInput.value;
    }
  }))();

  op.isInitialized = true;

  for (;;) {
    await delay(200);
  }
})();