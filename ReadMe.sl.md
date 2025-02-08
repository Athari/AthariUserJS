# User JS

[ [English](/ReadMe.md) | [Русский](/ReadMe.ru.md) | [Українська](/ReadMe.uk.md) | [Беларуская](/ReadMe.be.md) | [Български](/ReadMe.bg.md) | [Татарча](/ReadMe.tt.md) | [**Slovenščina**](/ReadMe.sl.md) | [Српски](/ReadMe.sr.md) | [ქართული](/ReadMe.ka.md) ]

Zbirka **uporabniških skript** [@Athari](/Athari).

* [Animator.ru](#animator): Prave Povezave
* [Culture.ru](#culture): Odklenjeno
* [Kinorium.com](#kinorium): Izboljšano
* [Premier.one](#premier): Izboljšano
* [Več](#multiple)
  * [ReYohoho](#reyohoho): Brez Oglasov + Izboljšave

**Glej tudi: [User CSS](https://github.com/Athari/AthariUserCSS)** (zbirka uporabniških slogov @Athari).

## ⚙️ Navodila

1. **Namestite 🐵 razširitev za uporabniške skripte** (izberite eno):

   * <img src="https://www.tampermonkey.net/images/ape.svg" height=16> [Tampermonkey](https://www.tampermonkey.net/) za
     [Chrome](https://chromewebstore.google.com/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo) /
     [Edge](https://microsoftedge.microsoft.com/addons/detail/iikmkjmpaadaobahmlepeloendndfphd) /
     [Firefox](https://addons.mozilla.org/sl/firefox/addon/tampermonkey/) /
     [Safari](https://apps.apple.com/app/tampermonkey/id6738342400)  
     (trenutno zaprta koda, najbolj funkcionalna)

   * ![][vm-logo] [Violentmonkey](https://violentmonkey.github.io/) za
     [Chrome](https://chrome.google.com/webstore/detail/violent-monkey/jinjaccalgkegednnccohejagnlnfdag) /
     [Edge](https://microsoftedge.microsoft.com/addons/detail/eeagobfjdenkkddmbclomhiblgggliao) /
     [Firefox](https://addons.mozilla.org/sl/firefox/addon/violentmonkey/)  
     (odprta koda)

   * <img src="https://addons.mozilla.org/user-media/addon_icons/0/748-32.png" height=16> [<del>Greasemonkey</del>](https://www.greasespot.net/) za
     [Firefox](https://addons.mozilla.org/sl/firefox/addon/greasemonkey/)  
     (odprta koda, minimalistična, zastarela)

2. Priporočljivo je, da **gumb razširitve postavite na orodno vrstico**, saj bo omogočil dostop do trenutno nameščenih uporabniških skript in njihovih možnosti.

3. Pojdite na uporabniški skript spodaj in **kliknite na njegov znak ![User Script Install][Install Script]**. Prikazal se bo predogled skripta.

4. **Kliknite na gumb ![Install][Install Script Monkey]** v zgornji vrstici, da namestite skript.

5. Če želite kadar koli **onemogočiti ali znova omogočiti skript**, kliknite na gumb razširitve <img src="https://addons.mozilla.org/user-media/addon_icons/0/748-32.png" height=16>, nato preklopite stikalo poleg skripta.

## <a id="animator"/> ![](https://icons.duckduckgo.com/ip3/animator.ru.ico) Animator.ru

### Animator.ru – Prave Povezave [![Namesti skript Animator.ru Prave Povezave][Install Script]](Animator/Animator-TrueLinks.user.js?raw=1)

Izboljša navigacijo na Animator.ru:

* Prikaže dolge sezname brez strani.
* Zamenja skriptne povezave (JavaScript) s pravimi (href), tako da jih je mogoče odpreti v novem zavihku, kopirati itd.

## <a id="culture"/> ![](https://www.google.com/s2/favicons?sz=32&domain=culture.ru) Culture.ru

### Culture.ru – Odklenjeno [![Namesti skript Culture.ru Odklenjeno][Install Script]](Culture/Culture-Unlocked.user.js?raw=1)

Odpravi napako, ki povzroča sporočilo "Видеозапись недоступна для просмотра по решению правообладателя".

* Vedno prikaže neposredno gostovane videoposnetke.
* Nastavljiva velikost sličic galerije slik.

## <a id="kinorium"/> ![](https://icons.duckduckgo.com/ip3/kinorium.com.ico) Kinorium.com

### Kinorium.com – Izboljšano [![Namesti skript Kinorium.com Izboljšano][Install Script]](Kinorium/Kinorium-Enhanced.user.js?raw=1)

Različne izboljšave:

* Uporabniške zbirke
* Povezave do dodatnih ponudnikov pretakanja
* Naravno leno nalaganje slik
* itd.

Ta uporabniški skript je zasnovan za uporabo skupaj z [uporabniškim slogom "Kinorium.com – Izboljšano"](https://github.com/Athari/AthariUserCSS#kinorium) [![Namesti slog Kinorium.com Izboljšano][Install Style]](https://github.com/Athari/AthariUserCSS/blob/master/Kinorium/Kinorium-Enhanced.user.css?raw=1).

## <a id="premier"/> ![](https://icons.duckduckgo.com/ip3/premier.one.ico) Premier.one

### Premier.one – Izboljšano [![Namesti skript Premier.one Izboljšano][Install Script]](Premier/Premier-Enhanced.user.js?raw=1)

Različne izboljšave in popravki napak:

* Popravljena filtracija za filme, izdane pred letom 1969.
* Spremenjeno iz 10-letnih na 5-letne razpone.
* Spremenjeno iz drsnikov na popolnoma razširjene sezname epizod.
* Ocene IMDB in Kinopoisk na seznamih filmov.
* Neposredne povezave do epizod.
* Polni naslovi epizod v video predvajalniku.
* Dodatni filtri (Soyuzmultfilm je edina prava vsebina na Premier).

Ta uporabniški skript je zasnovan za uporabo skupaj z [uporabniškim slogom "Premier.one – Izboljšano"](https://github.com/Athari/AthariUserCSS#premier) [![Namesti slog Premier.one Izboljšano][Install Style]](https://github.com/Athari/AthariUserCSS/blob/master/Premier/Premier-Enhanced.user.css?raw=1).

## <a id="multiple"/> Več

### <a id="reyohoho"/> ![](https://reyohoho.github.io/reyohoho/icons/favicon-32x32.png) ReYohoho – Brez Oglasov + Izboljšave [![Namesti skript Brez Oglasov + Izboljšave][Install Script]](Multiple/ReYohoho-NoAds.user.js?raw=1)

Odstrani video oglase iz video uravnoteževalnikov spletne storitve pretakanja ReYohoho: Alloha, Collaps, HDVB, Lumex, Rezka, Turbo, Vibix, VideoCDN, VideoSeed itd.

Prav tako po potrebi uporabi manjše izboljšave: dodatne hitrosti predvajanja, prilagoditve dizajna itd.

[vm-logo]: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADMElEQVQ4T2XTS0xjdRTH8e+9vW3v7ZtC6RAsBVpAxgQcBhgfwyMxk7gxGs1snM2oS93pwpiwN251Y4xR48K40TgbDQ5OnFFnVMChQsUJlHZgKK8pfdy+bm/v34VSjXPWv/M5yck5khACSZL4T8l9Qe0VzWFrDnS4Lt+vGB+aTTFVM613LcFKYrfUCgohkP4PvHyum91i/dWegDrnVGRHvWkV/ari/fOg/FaXz/n+Bzd3sMS/gHzSBDgB9edMYdRjly/EO7Rwb1BtG+3yRCMBZ9Btl1/8JVN4whJ4gbaTgZIQgoke3/RET9vrArR2lzI4HA1Hw6EQtYqOEALFoVIolVjP7O3tl4yUx6koy9vH7y3cyX0qCSF448Jg8rnZ8eGDezvY7XZGJx/D6XJjmSYgkBU7zYbBRnKNw/09orE4X99YPJr76veQDBDyqkOSZWLUq/QNDWMd3Kdw5RtMXYemRWHhOvWtu0T6YzTNBrVKmTa3swP4ewfLW4dfJBKryJKM1++nsbOL/bc1zHyBRqWCbTGBuZnGaBg0jDp/JNdY3MwutABgX5ag2TQxDQPP+KMYly8idXYiudxYl55HO38Oo1ol0hcj2B5CgmILCGjKgEORkW0K+dwRDk1jX1L55NslPp7/lbxdwx3wEwyFGRoZ4/TICO0+V6wFCCHw+PyMPzlNpDcGQDQc4Ey8m7F4Ny6Hwvqezs19SB0UcTqc2GQbLaBYbWyobh+K6mZ5M8tOTudYr9Pe0YGjs5elcoDQzCWGZp5FURRKpRLHejXVArbztavZw1xFshoUayYJI0Q+Oo0ePc/kxdfoH5uib+BhCrtp/A5IZbbN9GFxvgX8lCleW03v/ZDe3GDmkQgxJU/5+AjV7cXj9WJZFqu3lzC3VzDLeRaTqdu30vkr8M8lSpLEZI9v9pmRrs+eevzsqb74IId6nUzZhhbuJXtvh4dUg1O2Mt/duFX4/Mf1l65vFb584JlmY20vTMWD75wZjPZHoz2omotq3cAyG+h6icVkKns1cXdu/k7uI8B6AAA4HXZPnI143+wNup7u9KkuCTjS6/VMrvL98nbx7ZVs+dpJVgjBX+5bdV2t19OKAAAAAElFTkSuQmCC
[Install Script]: https://img.shields.io/badge/User%20Script-Install-brightgreen?logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAACvElEQVQoz23STUiTAQDG8Sezmx5fuuw0gx1eGPSGsBiLJUPEREQco5gYhoXGUExT/Fq2JalT5mypaOZsISlqWomoSJliTNTUvtSZFiZhH2aIznTv08EOHnrO/9/tAQ5NAEIAhCgBxKgRmqHDmXwNqjM1mDercPJfFoL/IOhFHMvVIrXcgKkbeuxdjhSYqhaGzJEITZRwXHHIHAEQCgAXJeGEXY+JSgNYqIOcJiGYrgLz1HhTEY2JYg1OCwcmFAJwVACQroPCrsWn6jgFbTr8KZCwf1MLeiw6ucWiY5kO6xYNIjJVCNMrACRJCM+WEGGNhLejMJaz3Tm7k4+y6D6vZn+1mSvDpVzoLwr22JNkmxbfnXGK9asanEOJAR2uRBVrTOLeu6f58ucXdm5OO7k2eptfX5Xz24SDa2O3Od9XKDekRu73VZpo1WMId0yi/KTcSG+OQf7ysoxffVX03rNwabSS78ectJdf5Op4Bb/5HPRkRu133zKywiTOoNas3mgvTaAnyyD/mnZyadxJU1EuWxypHBl0E9HxnOgtZmC+nt124747RaItTumBwyDccyer2VWaGNx6W8dVXy2hADuaCjgz7KIkCfSP1jCw2CSvDNvojFf8uSThFLJVQrhNxNzbnnxuzNwJ7vgfcHWqmT8WuhhY7efWcid3l9s423uD674que16DC1KxCJBLaBEwujHQSvHvTnBgfpsfhqr4+LLRs4O3KWvs4ze4hS225K5Me0MNl/R0qJGDIyiALsSTYOuFP587drtc2WwJdfE5mwTW/Mu8LEjnVPdpfLOQuPeZFsWrRI+JOmFMIgArmmgsmnxY6QhjZtzbnl78T63/V4Glh5y2+/h96la+Xl9Gm/p8LsoDmdx+LTpEk4VKvHKZRSDndYEPqs0s6fMxNbMKLkiWljLE9CYLwkqUXVg/gKaZ3VuIbnk5AAAAABJRU5ErkJggg==
[Install Script Monkey]: https://img.shields.io/badge/Install-666?labelColor=444&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAACvElEQVQoz23STUiTAQDG8Sezmx5fuuw0gx1eGPSGsBiLJUPEREQco5gYhoXGUExT/Fq2JalT5mypaOZsISlqWomoSJliTNTUvtSZFiZhH2aIznTv08EOHnrO/9/tAQ5NAEIAhCgBxKgRmqHDmXwNqjM1mDercPJfFoL/IOhFHMvVIrXcgKkbeuxdjhSYqhaGzJEITZRwXHHIHAEQCgAXJeGEXY+JSgNYqIOcJiGYrgLz1HhTEY2JYg1OCwcmFAJwVACQroPCrsWn6jgFbTr8KZCwf1MLeiw6ucWiY5kO6xYNIjJVCNMrACRJCM+WEGGNhLejMJaz3Tm7k4+y6D6vZn+1mSvDpVzoLwr22JNkmxbfnXGK9asanEOJAR2uRBVrTOLeu6f58ucXdm5OO7k2eptfX5Xz24SDa2O3Od9XKDekRu73VZpo1WMId0yi/KTcSG+OQf7ysoxffVX03rNwabSS78ectJdf5Op4Bb/5HPRkRu133zKywiTOoNas3mgvTaAnyyD/mnZyadxJU1EuWxypHBl0E9HxnOgtZmC+nt124747RaItTumBwyDccyer2VWaGNx6W8dVXy2hADuaCjgz7KIkCfSP1jCw2CSvDNvojFf8uSThFLJVQrhNxNzbnnxuzNwJ7vgfcHWqmT8WuhhY7efWcid3l9s423uD674que16DC1KxCJBLaBEwujHQSvHvTnBgfpsfhqr4+LLRs4O3KWvs4ze4hS225K5Me0MNl/R0qJGDIyiALsSTYOuFP587drtc2WwJdfE5mwTW/Mu8LEjnVPdpfLOQuPeZFsWrRI+JOmFMIgArmmgsmnxY6QhjZtzbnl78T63/V4Glh5y2+/h96la+Xl9Gm/p8LsoDmdx+LTpEk4VKvHKZRSDndYEPqs0s6fMxNbMKLkiWljLE9CYLwkqUXVg/gKaZ3VuIbnk5AAAAABJRU5ErkJggg==
[Install Style]: https://img.shields.io/badge/User%20Style-Install-brightgreen?logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAeFBMVEUAAAAm+/cn/fkn//wm//wn/fkANS0n//sCQTol9PETmpQcysYTlpESk44SkIsNe3Qm9/Qj6OQf1tIXrqkUnZcOhH4FUUoANy8m+vYk8ewi4t8g4Nsdz8oavLcZubUZt7MVop0PiIINfnkKbmgJZ2AHXVcGU00DRj5BSX4OAAAABnRSTlMA8fJbVfVdb86DAAAAh0lEQVQY013PWRKDIBBF0UZNP0BB45h5Hva/wzSFISnvF3U++hVEeYaUKohIVZyySgDyeJ23wLpmRoTRIPSDDhjeD6cTlNholhL0csDrGWCZ9QGA8QIOhLA6XXdCPXOFOCvdDMw034idAP0Ffxxq22D/NxtqngnuXduWl5EjKLf4XL5CKivoA3AuCHPhSbdbAAAAAElFTkSuQmCC