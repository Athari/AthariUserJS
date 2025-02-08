# User JS

[ [English](/ReadMe.md) | [Русский](/ReadMe.ru.md) | [**Українська**](/ReadMe.uk.md) | [Беларуская](/ReadMe.be.md) | [Български](/ReadMe.bg.md) | [Татарча](/ReadMe.tt.md) | [Slovenščina](/ReadMe.sl.md) | [Srpski](/ReadMe.sr.md) | [ქართული](/ReadMe.ka.md) ]

Колекція **користувацьких скриптів** [@Athari](/Athari).

* [Animator.ru](#animator): Справжні Посилання
* [Culture.ru](#culture): Розблоковано
* [Kinorium.com](#kinorium): Покращений
* [Premier.one](#premier): Покращений
* [Для кількох сайтів](#multiple)
  * [ReYohoho](#reyohoho): Без Реклами + Покращення

**Див. також: [User CSS](https://github.com/Athari/AthariUserCSS)** (колекція користувацьких стилів @Athari).

## ⚙️ Інструкція

1. **Встановіть 🐵 розширення для користувацьких скриптів** (оберіть одне):

   * <img src="https://www.tampermonkey.net/images/ape.svg" height=16> [Tampermonkey](https://www.tampermonkey.net/) для
     [Chrome](https://chromewebstore.google.com/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo) /
     [Edge](https://microsoftedge.microsoft.com/addons/detail/iikmkjmpaadaobahmlepeloendndfphd) /
     [Firefox](https://addons.mozilla.org/uk/firefox/addon/tampermonkey/) /
     [Safari](https://apps.apple.com/app/tampermonkey/id6738342400)  
     (наразі закритий вихідний код, найфункціональніше)

   * ![][vm-logo] [Violentmonkey](https://violentmonkey.github.io/) для
     [Chrome](https://chrome.google.com/webstore/detail/violent-monkey/jinjaccalgkegednnccohejagnlnfdag) /
     [Edge](https://microsoftedge.microsoft.com/addons/detail/eeagobfjdenkkddmbclomhiblgggliao) /
     [Firefox](https://addons.mozilla.org/uk/firefox/addon/violentmonkey/)  
     (відкритий вихідний код)

   * <img src="https://addons.mozilla.org/user-media/addon_icons/0/748-32.png" height=16> [<del>Greasemonkey</del>](https://www.greasespot.net/) для
     [Firefox](https://addons.mozilla.org/uk/firefox/addon/greasemonkey/)  
     (відкритий вихідний код, мінімалістичне, застаріле)

2. Рекомендується **закріпити кнопку розширення на панелі інструментів**, щоб отримати доступ до встановлених користувацьких скриптів та їхніх налаштувань.

3. Перейдіть до користувацького скрипта нижче та **натисніть на його значок ![User Script Install][Install Script]**. Відкриється попередній перегляд скрипта.

4. **Натисніть на кнопку ![Install][Install Script Monkey]** у верхній панелі, щоб встановити скрипт.

5. Якщо ви захочете **вимкнути або знову увімкнути скрипт**, натисніть на кнопку розширення <img src="https://addons.mozilla.org/user-media/addon_icons/0/748-32.png" height=16>, потім перемкніть тумблер поруч зі скриптом.

## <a id="animator"/> ![](https://icons.duckduckgo.com/ip3/animator.ru.ico) Animator.ru

### Animator.ru – Справжні Посилання [![Встановити скрипт Animator.ru Справжні Посилання][Install Script]](Animator/Animator-TrueLinks.user.js?raw=1)

Покращує навігацію на Animator.ru:

* Відображає довгі списки повністю без розбиття на сторінки.
* Замінює скриптові посилання (JavaScript) на справжні (href), щоб їх можна було відкрити в новій вкладці, скопіювати адресу тощо.

## <a id="culture"/> ![](https://www.google.com/s2/favicons?sz=32&domain=culture.ru) Culture.ru

### Culture.ru – Розблоковано [![Встановити скрипт Culture.ru Розблоковано][Install Script]](Culture/Culture-Unlocked.user.js?raw=1)

Виправляє баг, що призводить до появи повідомлення "Видеозапись недоступна для просмотра по решению правообладателя".

* Завжди відображає відео (крім зовнішніх).
* Налаштовуваний розмір прев'юшок у галереї зображень.

## <a id="kinorium"/> ![](https://icons.duckduckgo.com/ip3/kinorium.com.ico) Kinorium.com

### Kinorium.com – Покращений [![Встановити скрипт Kinorium.com Покращений][Install Script]](Kinorium/Kinorium-Enhanced.user.js?raw=1)

Різноманітні покращення:

* Зручність роботи з користувацькими колекціями
* Посилання на додаткові онлайн-кінотеатри
* Нативне ліниве завантаження зображень
* тощо

Цей користувацький скрипт призначений для спільного використання з [користувацьким стилем "Kinorium.com – Покращений"](https://github.com/Athari/AthariUserCSS#kinorium) [![Встановити стиль Kinorium.com Покращений][Install Style]](https://github.com/Athari/AthariUserCSS/blob/master/Kinorium/Kinorium-Enhanced.user.css?raw=1).

## <a id="premier"/> ![](https://icons.duckduckgo.com/ip3/premier.one.ico) Premier.one

### Premier.one – Покращений [![Встановити скрипт Premier.one Покращений][Install Script]](Premier/Premier-Enhanced.user.js?raw=1)

Різноманітні покращення та виправлення багів:

* Виправлено фільтрацію фільмів до 1969 р. (замість фільтрації фільмів лише за 1969 р.)
* Діапазони років у фільтрах змінено на 5-річні (замість 10-річних).
* Списки повністю розгорнуті (замість смужок на 50 пунктів без повзунків).
* Рейтинги IMDB та Кінопошуку у списках фільмів (замість рейтингу Premier).
* Прямі посилання на епізоди та нещодавно переглянуті фільми (можна легко відкрити в новій вкладці).
* Повні назви епізодів у заголовку відеоплеєра (замість "сезон 1").
* Додаткові фільтри (крім Союзмультфільму дивитися на Premier нічого).
* тощо

Цей користувацький скрипт призначений для спільного використання з [користувацьким стилем "Premier.one – Покращений"](https://github.com/Athari/AthariUserCSS#premier) [![Встановити стиль Premier.one Покращений][Install Style]](https://github.com/Athari/AthariUserCSS/blob/master/Premier/Premier-Enhanced.user.css?raw=1).

## <a id="multiple"/> Для кількох сайтів

### <a id="reyohoho"/> ![](https://reyohoho.github.io/reyohoho/icons/favicon-32x32.png) ReYohoho – Без Реклами + Покращення [![Встановити скрипт Без Реклами + Покращення][Install Script]](Multiple/ReYohoho-NoAds.user.js?raw=1)

Прибирає рекламні ролики з відеобалансерів в онлайн-кінотеатрі ReYohoho: Alloha, Collaps, HDVB, Lumex, Rezka, Turbo, Vibix, VideoCDN, VideoSeed тощо.

Також за можливості застосовує невеликі покращення: додаткові швидкості відтворення, виправлення дизайну тощо.

[vm-logo]: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADMElEQVQ4T2XTS0xjdRTH8e+9vW3v7ZtC6RAsBVpAxgQcBhgfwyMxk7gxGs1snM2oS93pwpiwN251Y4xR48K40TgbDQ5OnFFnVMChQsUJlHZgKK8pfdy+bm/v34VSjXPWv/M5yck5khACSZL4T8l9Qe0VzWFrDnS4Lt+vGB+aTTFVM613LcFKYrfUCgohkP4PvHyum91i/dWegDrnVGRHvWkV/ari/fOg/FaXz/n+Bzd3sMS/gHzSBDgB9edMYdRjly/EO7Rwb1BtG+3yRCMBZ9Btl1/8JVN4whJ4gbaTgZIQgoke3/RET9vrArR2lzI4HA1Hw6EQtYqOEALFoVIolVjP7O3tl4yUx6koy9vH7y3cyX0qCSF448Jg8rnZ8eGDezvY7XZGJx/D6XJjmSYgkBU7zYbBRnKNw/09orE4X99YPJr76veQDBDyqkOSZWLUq/QNDWMd3Kdw5RtMXYemRWHhOvWtu0T6YzTNBrVKmTa3swP4ewfLW4dfJBKryJKM1++nsbOL/bc1zHyBRqWCbTGBuZnGaBg0jDp/JNdY3MwutABgX5ag2TQxDQPP+KMYly8idXYiudxYl55HO38Oo1ol0hcj2B5CgmILCGjKgEORkW0K+dwRDk1jX1L55NslPp7/lbxdwx3wEwyFGRoZ4/TICO0+V6wFCCHw+PyMPzlNpDcGQDQc4Ey8m7F4Ny6Hwvqezs19SB0UcTqc2GQbLaBYbWyobh+K6mZ5M8tOTudYr9Pe0YGjs5elcoDQzCWGZp5FURRKpRLHejXVArbztavZw1xFshoUayYJI0Q+Oo0ePc/kxdfoH5uib+BhCrtp/A5IZbbN9GFxvgX8lCleW03v/ZDe3GDmkQgxJU/5+AjV7cXj9WJZFqu3lzC3VzDLeRaTqdu30vkr8M8lSpLEZI9v9pmRrs+eevzsqb74IId6nUzZhhbuJXtvh4dUg1O2Mt/duFX4/Mf1l65vFb584JlmY20vTMWD75wZjPZHoz2omotq3cAyG+h6icVkKns1cXdu/k7uI8B6AAA4HXZPnI143+wNup7u9KkuCTjS6/VMrvL98nbx7ZVs+dpJVgjBX+5bdV2t19OKAAAAAElFTkSuQmCC
[Install Script]: https://img.shields.io/badge/User%20Script-Install-brightgreen?logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAACvElEQVQoz23STUiTAQDG8Sezmx5fuuw0gx1eGPSGsBiLJUPEREQco5gYhoXGUExT/Fq2JalT5mypaOZsISlqWomoSJliTNTUvtSZFiZhH2aIznTv08EOHnrO/9/tAQ5NAEIAhCgBxKgRmqHDmXwNqjM1mDercPJfFoL/IOhFHMvVIrXcgKkbeuxdjhSYqhaGzJEITZRwXHHIHAEQCgAXJeGEXY+JSgNYqIOcJiGYrgLz1HhTEY2JYg1OCwcmFAJwVACQroPCrsWn6jgFbTr8KZCwf1MLeiw6ucWiY5kO6xYNIjJVCNMrACRJCM+WEGGNhLejMJaz3Tm7k4+y6D6vZn+1mSvDpVzoLwr22JNkmxbfnXGK9asanEOJAR2uRBVrTOLeu6f58ucXdm5OO7k2eptfX5Xz24SDa2O3Od9XKDekRu73VZpo1WMId0yi/KTcSG+OQf7ysoxffVX03rNwabSS78ectJdf5Op4Bb/5HPRkRu133zKywiTOoNas3mgvTaAnyyD/mnZyadxJU1EuWxypHBl0E9HxnOgtZmC+nt124747RaItTumBwyDccyer2VWaGNx6W8dVXy2hADuaCjgz7KIkCfSP1jCw2CSvDNvojFf8uSThFLJVQrhNxNzbnnxuzNwJ7vgfcHWqmT8WuhhY7efWcid3l9s423uD674que16DC1KxCJBLaBEwujHQSvHvTnBgfpsfhqr4+LLRs4O3KWvs4ze4hS225K5Me0MNl/R0qJGDIyiALsSTYOuFP587drtc2WwJdfE5mwTW/Mu8LEjnVPdpfLOQuPeZFsWrRI+JOmFMIgArmmgsmnxY6QhjZtzbnl78T63/V4Glh5y2+/h96la+Xl9Gm/p8LsoDmdx+LTpEk4VKvHKZRSDndYEPqs0s6fMxNbMKLkiWljLE9CYLwkqUXVg/gKaZ3VuIbnk5AAAAABJRU5ErkJggg==
[Install Script Monkey]: https://img.shields.io/badge/Install-666?labelColor=444&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAACvElEQVQoz23STUiTAQDG8Sezmx5fuuw0gx1eGPSGsBiLJUPEREQco5gYhoXGUExT/Fq2JalT5mypaOZsISlqWomoSJliTNTUvtSZFiZhH2aIznTv08EOHnrO/9/tAQ5NAEIAhCgBxKgRmqHDmXwNqjM1mDercPJfFoL/IOhFHMvVIrXcgKkbeuxdjhSYqhaGzJEITZRwXHHIHAEQCgAXJeGEXY+JSgNYqIOcJiGYrgLz1HhTEY2JYg1OCwcmFAJwVACQroPCrsWn6jgFbTr8KZCwf1MLeiw6ucWiY5kO6xYNIjJVCNMrACRJCM+WEGGNhLejMJaz3Tm7k4+y6D6vZn+1mSvDpVzoLwr22JNkmxbfnXGK9asanEOJAR2uRBVrTOLeu6f58ucXdm5OO7k2eptfX5Xz24SDa2O3Od9XKDekRu73VZpo1WMId0yi/KTcSG+OQf7ysoxffVX03rNwabSS78ectJdf5Op4Bb/5HPRkRu133zKywiTOoNas3mgvTaAnyyD/mnZyadxJU1EuWxypHBl0E9HxnOgtZmC+nt124747RaItTumBwyDccyer2VWaGNx6W8dVXy2hADuaCjgz7KIkCfSP1jCw2CSvDNvojFf8uSThFLJVQrhNxNzbnnxuzNwJ7vgfcHWqmT8WuhhY7efWcid3l9s423uD674que16DC1KxCJBLaBEwujHQSvHvTnBgfpsfhqr4+LLRs4O3KWvs4ze4hS225K5Me0MNl/R0qJGDIyiALsSTYOuFP587drtc2WwJdfE5mwTW/Mu8LEjnVPdpfLOQuPeZFsWrRI+JOmFMIgArmmgsmnxY6QhjZtzbnl78T63/V4Glh5y2+/h96la+Xl9Gm/p8LsoDmdx+LTpEk4VKvHKZRSDndYEPqs0s6fMxNbMKLkiWljLE9CYLwkqUXVg/gKaZ3VuIbnk5AAAAABJRU5ErkJggg==
[Install Style]: https://img.shields.io/badge/User%20Style-Install-brightgreen?logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAeFBMVEUAAAAm+/cn/fkn//wm//wn/fkANS0n//sCQTol9PETmpQcysYTlpESk44SkIsNe3Qm9/Qj6OQf1tIXrqkUnZcOhH4FUUoANy8m+vYk8ewi4t8g4Nsdz8oavLcZubUZt7MVop0PiIINfnkKbmgJZ2AHXVcGU00DRj5BSX4OAAAABnRSTlMA8fJbVfVdb86DAAAAh0lEQVQY013PWRKDIBBF0UZNP0BB45h5Hva/wzSFISnvF3U++hVEeYaUKohIVZyySgDyeJ23wLpmRoTRIPSDDhjeD6cTlNholhL0csDrGWCZ9QGA8QIOhLA6XXdCPXOFOCvdDMw034idAP0Ffxxq22D/NxtqngnuXduWl5EjKLf4XL5CKivoA3AuCHPhSbdbAAAAAElFTkSuQmCC