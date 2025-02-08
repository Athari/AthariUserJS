# User JS

[ [English](/ReadMe.md) | [Русский](/ReadMe.ru.md) | [Українська](/ReadMe.uk.md) ]

Коллекция **пользовательских скриптов** [@Athari](/Athari).

* [Animator.ru](#animator): Настоящие Ссылки
* [Culture.ru](#culture): Отпёртый
* [Kinorium.com](#kinorium): Улучшенный
* [Premier.one](#premier): Улучшенный
* [Для нескольких сайтов](#multiple)
  * [ReYohoho](#reyohoho): Без Рекламы + Улучшения

**См. также: [User CSS](https://github.com/Athari/AthariUserCSS)** (коллекция пользовательских стилей @Athari).

## ⚙️ Инструкция

1. **Установите 🐵 расширение для пользовательских скриптов** (выберите одно):

   * <img src="https://www.tampermonkey.net/images/ape.svg" height=16> [Tampermonkey](https://www.tampermonkey.net/) для
     [Chrome](https://chromewebstore.google.com/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo) /
     [Edge](https://microsoftedge.microsoft.com/addons/detail/iikmkjmpaadaobahmlepeloendndfphd) /
     [Firefox](https://addons.mozilla.org/ru/firefox/addon/tampermonkey/) /
     [Safari](https://apps.apple.com/app/tampermonkey/id6738342400)  
     (на данный момент закрытый исходный код, самое функциональное)

   * ![][vm-logo] [Violentmonkey](https://violentmonkey.github.io/) для
     [Chrome](https://chrome.google.com/webstore/detail/violent-monkey/jinjaccalgkegednnccohejagnlnfdag) /
     [Edge](https://microsoftedge.microsoft.com/addons/detail/eeagobfjdenkkddmbclomhiblgggliao) /
     [Firefox](https://addons.mozilla.org/ru/firefox/addon/violentmonkey/)  
     (открытый исходный код)

   * <img src="https://addons.mozilla.org/user-media/addon_icons/0/748-32.png" height=16> [<del>Greasemonkey</del>](https://www.greasespot.net/) для
     [Firefox](https://addons.mozilla.org/ru/firefox/addon/greasemonkey/)  
     (открытый исходный код, минималистичное, устаревшее)

2. Рекомендуется **прикрепить кнопку расширения на панели инструментов**, чтобы получить доступ к установленным пользовательским скриптам и их настройкам.

3. Перейдите к пользовательскому скрипту ниже и **нажмите на его значок ![User Script Install][Install Script]**. Откроется предварительный просмотр скрипта.

4. **Нажмите на кнопку ![Install][Install Script Monkey]** в верхней панели, чтобы установить скрипт.

5. Если вы захотите **отключить или снова включить скрипт**, нажмите на кнопку расширения <img src="https://addons.mozilla.org/user-media/addon_icons/0/748-32.png" height=16>, затем переключите тумблер рядом со скриптом.

## <a id="animator"/> ![](https://icons.duckduckgo.com/ip3/animator.ru.ico) Animator.ru

### Animator.ru – Настоящие Ссылки [![Установить скрипт Animator.ru Настоящие Ссылки][Install Script]](Animator/Animator-TrueLinks.user.js?raw=1)

Улучшает навигацию на Animator.ru:

* Отображает длинные списки целиком без разбиения на страницы.
* Заменяет скриптовые ссылки (JavaScript) на настоящие (href), чтобы их можно было открыть в новой вкладке, скопировать адрес и т.п.

## <a id="culture"/> ![](https://www.google.com/s2/favicons?sz=32&domain=culture.ru) Culture.ru

### Culture.ru – Отпёртый [![Установить скрипт Culture.ru Отпёртый][Install Script]](Culture/Culture-Unlocked.user.js?raw=1)

Исправляет баг, приводящий к появлению сообщения "Видеозапись недоступна для просмотра по решению правообладателя".

* Всегда отображает видео (кроме внешних).
* Настраиваемый размер превьюшек в галерее картинок.

## <a id="kinorium"/> ![](https://icons.duckduckgo.com/ip3/kinorium.com.ico) Kinorium.com

### Kinorium.com – Улучшенный [![Установить скрипт Kinorium.com Улучшенный][Install Script]](Kinorium/Kinorium-Enhanced.user.js?raw=1)

Разнообразные улучшения:

* Удобство работы с пользовательскими коллекциями
* Ссылки на дополнительные онлайн-кинотеатры
* Нативная ленивая загрузка изображений
* и т.п.

Этот пользовательский скрипт предназначен для совместного использования с [пользовательским стилем "Kinorium.com – Улучшенный"](https://github.com/Athari/AthariUserCSS#kinorium) [![Установить стиль Kinorium.com Улучшенный][Install Style]](https://github.com/Athari/AthariUserCSS/blob/master/Kinorium/Kinorium-Enhanced.user.css?raw=1).

## <a id="premier"/> ![](https://icons.duckduckgo.com/ip3/premier.one.ico) Premier.one

### Premier.one – Улучшенный [![Установить скрипт Premier.one Улучшенный][Install Script]](Premier/Premier-Enhanced.user.js?raw=1)

Разнообразные улучшения и исправления багов:

* Исправлена фильтрация фильмов до 1969 г. (вместо фильтрации фильмов за только 1969 г.)
* Диапазоны годов в фильтрах изменены на 5-летние (вместо 10-летних).
* Списки полностью развёрнуты (вместо полосок на 50 пунктов без ползунков).
* Рейтинги IMDB и Кинопоиска в списках фильмов (вместо рейтинга Premier).
* Прямые ссылки на эпизоды и недавно посмотренные фильмы (можно легко открыть в новой вкладке).
* Полные названия эпизодов в заголовке видео-плеера (вместо "сезон 1").
* Дополнительные фильтры (кроме Союзмультфильма смотреть на Премьере нечего).
* и т.п.

Этот пользовательский скрипт предназначен для совместного использования с [пользовательским стилем "Premier.one – Улучшенный"](https://github.com/Athari/AthariUserCSS#premier) [![Установить стиль Premier.one Улучшенный][Install Style]](https://github.com/Athari/AthariUserCSS/blob/master/Premier/Premier-Enhanced.user.css?raw=1).

## <a id="multiple"/> Для нескольких сайтов

### <a id="reyohoho"/> ![](https://reyohoho.github.io/reyohoho/icons/favicon-32x32.png) ReYohoho – Без Рекламы + Улучшения [![Установить скрипт Без Рекламы + Улучшения][Install Script]](Multiple/ReYohoho-NoAds.user.js?raw=1)

Убирает рекламные ролики с видеобалансеров в онлайн-кинотеатре ReYohoho: Alloha, Collaps, HDVB, Lumex, Rezka, Turbo, Vibix, VideoCDN, VideoSeed и т.д.

Также по возможности применяет небольшие улучшения: дополнительные скорости воспроизведения, исправления дизайна и т.п.

[vm-logo]: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADMElEQVQ4T2XTS0xjdRTH8e+9vW3v7ZtC6RAsBVpAxgQcBhgfwyMxk7gxGs1snM2oS93pwpiwN251Y4xR48K40TgbDQ5OnFFnVMChQsUJlHZgKK8pfdy+bm/v34VSjXPWv/M5yck5khACSZL4T8l9Qe0VzWFrDnS4Lt+vGB+aTTFVM613LcFKYrfUCgohkP4PvHyum91i/dWegDrnVGRHvWkV/ari/fOg/FaXz/n+Bzd3sMS/gHzSBDgB9edMYdRjly/EO7Rwb1BtG+3yRCMBZ9Btl1/8JVN4whJ4gbaTgZIQgoke3/RET9vrArR2lzI4HA1Hw6EQtYqOEALFoVIolVjP7O3tl4yUx6koy9vH7y3cyX0qCSF448Jg8rnZ8eGDezvY7XZGJx/D6XJjmSYgkBU7zYbBRnKNw/09orE4X99YPJr76veQDBDyqkOSZWLUq/QNDWMd3Kdw5RtMXYemRWHhOvWtu0T6YzTNBrVKmTa3swP4ewfLW4dfJBKryJKM1++nsbOL/bc1zHyBRqWCbTGBuZnGaBg0jDp/JNdY3MwutABgX5ag2TQxDQPP+KMYly8idXYiudxYl55HO38Oo1ol0hcj2B5CgmILCGjKgEORkW0K+dwRDk1jX1L55NslPp7/lbxdwx3wEwyFGRoZ4/TICO0+V6wFCCHw+PyMPzlNpDcGQDQc4Ey8m7F4Ny6Hwvqezs19SB0UcTqc2GQbLaBYbWyobh+K6mZ5M8tOTudYr9Pe0YGjs5elcoDQzCWGZp5FURRKpRLHejXVArbztavZw1xFshoUayYJI0Q+Oo0ePc/kxdfoH5uib+BhCrtp/A5IZbbN9GFxvgX8lCleW03v/ZDe3GDmkQgxJU/5+AjV7cXj9WJZFqu3lzC3VzDLeRaTqdu30vkr8M8lSpLEZI9v9pmRrs+eevzsqb74IId6nUzZhhbuJXtvh4dUg1O2Mt/duFX4/Mf1l65vFb584JlmY20vTMWD75wZjPZHoz2omotq3cAyG+h6icVkKns1cXdu/k7uI8B6AAA4HXZPnI143+wNup7u9KkuCTjS6/VMrvL98nbx7ZVs+dpJVgjBX+5bdV2t19OKAAAAAElFTkSuQmCC
[Install Script]: https://img.shields.io/badge/User%20Script-Install-brightgreen?logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAACvElEQVQoz23STUiTAQDG8Sezmx5fuuw0gx1eGPSGsBiLJUPEREQco5gYhoXGUExT/Fq2JalT5mypaOZsISlqWomoSJliTNTUvtSZFiZhH2aIznTv08EOHnrO/9/tAQ5NAEIAhCgBxKgRmqHDmXwNqjM1mDercPJfFoL/IOhFHMvVIrXcgKkbeuxdjhSYqhaGzJEITZRwXHHIHAEQCgAXJeGEXY+JSgNYqIOcJiGYrgLz1HhTEY2JYg1OCwcmFAJwVACQroPCrsWn6jgFbTr8KZCwf1MLeiw6ucWiY5kO6xYNIjJVCNMrACRJCM+WEGGNhLejMJaz3Tm7k4+y6D6vZn+1mSvDpVzoLwr22JNkmxbfnXGK9asanEOJAR2uRBVrTOLeu6f58ucXdm5OO7k2eptfX5Xz24SDa2O3Od9XKDekRu73VZpo1WMId0yi/KTcSG+OQf7ysoxffVX03rNwabSS78ectJdf5Op4Bb/5HPRkRu133zKywiTOoNas3mgvTaAnyyD/mnZyadxJU1EuWxypHBl0E9HxnOgtZmC+nt124747RaItTumBwyDccyer2VWaGNx6W8dVXy2hADuaCjgz7KIkCfSP1jCw2CSvDNvojFf8uSThFLJVQrhNxNzbnnxuzNwJ7vgfcHWqmT8WuhhY7efWcid3l9s423uD674que16DC1KxCJBLaBEwujHQSvHvTnBgfpsfhqr4+LLRs4O3KWvs4ze4hS225K5Me0MNl/R0qJGDIyiALsSTYOuFP587drtc2WwJdfE5mwTW/Mu8LEjnVPdpfLOQuPeZFsWrRI+JOmFMIgArmmgsmnxY6QhjZtzbnl78T63/V4Glh5y2+/h96la+Xl9Gm/p8LsoDmdx+LTpEk4VKvHKZRSDndYEPqs0s6fMxNbMKLkiWljLE9CYLwkqUXVg/gKaZ3VuIbnk5AAAAABJRU5ErkJggg==
[Install Script Monkey]: https://img.shields.io/badge/Install-666?labelColor=444&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAACvElEQVQoz23STUiTAQDG8Sezmx5fuuw0gx1eGPSGsBiLJUPEREQco5gYhoXGUExT/Fq2JalT5mypaOZsISlqWomoSJliTNTUvtSZFiZhH2aIznTv08EOHnrO/9/tAQ5NAEIAhCgBxKgRmqHDmXwNqjM1mDercPJfFoL/IOhFHMvVIrXcgKkbeuxdjhSYqhaGzJEITZRwXHHIHAEQCgAXJeGEXY+JSgNYqIOcJiGYrgLz1HhTEY2JYg1OCwcmFAJwVACQroPCrsWn6jgFbTr8KZCwf1MLeiw6ucWiY5kO6xYNIjJVCNMrACRJCM+WEGGNhLejMJaz3Tm7k4+y6D6vZn+1mSvDpVzoLwr22JNkmxbfnXGK9asanEOJAR2uRBVrTOLeu6f58ucXdm5OO7k2eptfX5Xz24SDa2O3Od9XKDekRu73VZpo1WMId0yi/KTcSG+OQf7ysoxffVX03rNwabSS78ectJdf5Op4Bb/5HPRkRu133zKywiTOoNas3mgvTaAnyyD/mnZyadxJU1EuWxypHBl0E9HxnOgtZmC+nt124747RaItTumBwyDccyer2VWaGNx6W8dVXy2hADuaCjgz7KIkCfSP1jCw2CSvDNvojFf8uSThFLJVQrhNxNzbnnxuzNwJ7vgfcHWqmT8WuhhY7efWcid3l9s423uD674que16DC1KxCJBLaBEwujHQSvHvTnBgfpsfhqr4+LLRs4O3KWvs4ze4hS225K5Me0MNl/R0qJGDIyiALsSTYOuFP587drtc2WwJdfE5mwTW/Mu8LEjnVPdpfLOQuPeZFsWrRI+JOmFMIgArmmgsmnxY6QhjZtzbnl78T63/V4Glh5y2+/h96la+Xl9Gm/p8LsoDmdx+LTpEk4VKvHKZRSDndYEPqs0s6fMxNbMKLkiWljLE9CYLwkqUXVg/gKaZ3VuIbnk5AAAAABJRU5ErkJggg==
[Install Style]: https://img.shields.io/badge/User%20Style-Install-brightgreen?logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAeFBMVEUAAAAm+/cn/fkn//wm//wn/fkANS0n//sCQTol9PETmpQcysYTlpESk44SkIsNe3Qm9/Qj6OQf1tIXrqkUnZcOhH4FUUoANy8m+vYk8ewi4t8g4Nsdz8oavLcZubUZt7MVop0PiIINfnkKbmgJZ2AHXVcGU00DRj5BSX4OAAAABnRSTlMA8fJbVfVdb86DAAAAh0lEQVQY013PWRKDIBBF0UZNP0BB45h5Hva/wzSFISnvF3U++hVEeYaUKohIVZyySgDyeJ23wLpmRoTRIPSDDhjeD6cTlNholhL0csDrGWCZ9QGA8QIOhLA6XXdCPXOFOCvdDMw034idAP0Ffxxq22D/NxtqngnuXduWl5EjKLf4XL5CKivoA3AuCHPhSbdbAAAAAElFTkSuQmCC