# User JS

A collection of **user scripts** by [@Athari](/Athari).

* [Animator.ru](#animator)
* [Culture.ru](#culture)
* [Kinorium.com](#kinorium)
* [Premier.one](#premier)

**See also:** [User CSS](https://github.com/Athari/AthariUserCSS) (@Athari's collection of user styles).

## ⚙️ Instructions

1. **Install a 🐵 userscript extension** (choose one):

   * <img src="https://www.tampermonkey.net/images/ape.svg" height=16> [Tampermonkey](https://www.tampermonkey.net/) for
     [Chrome](https://chromewebstore.google.com/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo) /
     [Edge](https://microsoftedge.microsoft.com/addons/detail/iikmkjmpaadaobahmlepeloendndfphd) /
     [Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/) / 
     [Safari](https://apps.apple.com/app/tampermonkey/id6738342400)

   * ![][vm-logo] [Violentmonkey](https://violentmonkey.github.io/) for
     [Chrome](https://chrome.google.com/webstore/detail/violent-monkey/jinjaccalgkegednnccohejagnlnfdag) /
     [Edge](https://microsoftedge.microsoft.com/addons/detail/eeagobfjdenkkddmbclomhiblgggliao) /
     [Firefox](https://addons.mozilla.org/firefox/addon/violentmonkey/)

   * <img src="https://addons.mozilla.org/user-media/addon_icons/0/748-32.png" height=16> [<del>Greasemonkey</del>](https://www.greasespot.net/) for
     [Firefox](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/)

2. It is recommended to **put the extension's button on the toolbar** as it'll give access to the currently installed user scripts and their options.

3. Go to a user script below and **click on its ![User Script Install][Install Script] badge**. You'll see a preview of the script.

4. **Click on the ![Install][Install Script Monkey] button** in the top panel to install the script.

5. If at any point you want to **disable or reenable the script**, click on the extension button <img src="https://addons.mozilla.org/user-media/addon_icons/0/748-32.png" height=16>, then click on the toggle switch next to the script.

## <a id="animator"/> ![](https://icons.duckduckgo.com/ip3/animator.ru.ico) Animator.ru

### Animator.ru – True Links [![Install Animator.ru True Links Script][Install Script]](Animator/Animator-TrueLinks.user.js?raw=1)

Improves navigation on Animator.ru:

* Displays long lists without pagination.
* Replaces script links (JavaScript) with real ones (href), so they can be opened in a new tab, copied, etc.

## <a id="culture"/> ![](https://www.google.com/s2/favicons?sz=32&domain=culture.ru) Culture.ru

### Culture.ru – Unlocked [![Install Culture.ru Unlocked Script][Install Script]](Culture/Culture-Unlocked.user.js?raw=1)

Fixes the bug causing the "Видеозапись недоступна для просмотра по решению правообладателя" error message.

* Always display directly hosted videos.
* Configurable image gallery thumbnail size.

## <a id="kinorium"/> ![](https://icons.duckduckgo.com/ip3/kinorium.com.ico) Kinorium.com

### Kinorium.com – Enhanced [![Install Kinorium.com Enhanced Script][Install Script]](Kinorium/Kinorium-Enhanced.user.js?raw=1)

Various enhancements:

* User collections usability
* Links to extra streaming providers
* Native lazy loading of images
* etc.

This user script is designed to be used in conjunction with the [user style "Kinorium.com – Enhanced"](https://github.com/Athari/AthariUserCSS#kinorium) [![Install Kinorium.com Enhanced Script][Install Style]](https://github.com/Athari/AthariUserCSS/blob/master/Kinorium/Kinorium-Enhanced.user.css?raw=1).

## <a id="premier"/> ![](https://icons.duckduckgo.com/ip3/premier.one.ico) Premier.one

### Premier.one – Enhanced [![Install Premier.one Enhanced Script][Install Script]](Premier/Premier-Enhanced.user.js?raw=1)

Various enhancements and bug fixes:

* Fixed filtering for movies released before 1969.
* Changed from 10-year to 5-year ranges.
* Changed from sliders to fully expanded episode lists.
* IMDB and Kinopoisk ratings in movie lists.
* Direct links to episodes.
* Full episode titles in the video player.
* Extra filters (Soyuzmultfilm is the only real content on Premier.one)

This user script is designed to be used in conjunction with the [user style "Premier.one – Enhanced"](https://github.com/Athari/AthariUserCSS#premier) [![Install Premier.one Enhanced Script][Install Style]](https://github.com/Athari/AthariUserCSS/blob/master/Premier/Premier-Enhanced.user.css?raw=1).

[vm-logo]: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADMElEQVQ4T2XTS0xjdRTH8e+9vW3v7ZtC6RAsBVpAxgQcBhgfwyMxk7gxGs1snM2oS93pwpiwN251Y4xR48K40TgbDQ5OnFFnVMChQsUJlHZgKK8pfdy+bm/v34VSjXPWv/M5yck5khACSZL4T8l9Qe0VzWFrDnS4Lt+vGB+aTTFVM613LcFKYrfUCgohkP4PvHyum91i/dWegDrnVGRHvWkV/ari/fOg/FaXz/n+Bzd3sMS/gHzSBDgB9edMYdRjly/EO7Rwb1BtG+3yRCMBZ9Btl1/8JVN4whJ4gbaTgZIQgoke3/RET9vrArR2lzI4HA1Hw6EQtYqOEALFoVIolVjP7O3tl4yUx6koy9vH7y3cyX0qCSF448Jg8rnZ8eGDezvY7XZGJx/D6XJjmSYgkBU7zYbBRnKNw/09orE4X99YPJr76veQDBDyqkOSZWLUq/QNDWMd3Kdw5RtMXYemRWHhOvWtu0T6YzTNBrVKmTa3swP4ewfLW4dfJBKryJKM1++nsbOL/bc1zHyBRqWCbTGBuZnGaBg0jDp/JNdY3MwutABgX5ag2TQxDQPP+KMYly8idXYiudxYl55HO38Oo1ol0hcj2B5CgmILCGjKgEORkW0K+dwRDk1jX1L55NslPp7/lbxdwx3wEwyFGRoZ4/TICO0+V6wFCCHw+PyMPzlNpDcGQDQc4Ey8m7F4Ny6Hwvqezs19SB0UcTqc2GQbLaBYbWyobh+K6mZ5M8tOTudYr9Pe0YGjs5elcoDQzCWGZp5FURRKpRLHejXVArbztavZw1xFshoUayYJI0Q+Oo0ePc/kxdfoH5uib+BhCrtp/A5IZbbN9GFxvgX8lCleW03v/ZDe3GDmkQgxJU/5+AjV7cXj9WJZFqu3lzC3VzDLeRaTqdu30vkr8M8lSpLEZI9v9pmRrs+eevzsqb74IId6nUzZhhbuJXtvh4dUg1O2Mt/duFX4/Mf1l65vFb584JlmY20vTMWD75wZjPZHoz2omotq3cAyG+h6icVkKns1cXdu/k7uI8B6AAA4HXZPnI143+wNup7u9KkuCTjS6/VMrvL98nbx7ZVs+dpJVgjBX+5bdV2t19OKAAAAAElFTkSuQmCC
[Install Script]: https://img.shields.io/badge/User%20Script-Install-brightgreen?logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAACvElEQVQoz23STUiTAQDG8Sezmx5fuuw0gx1eGPSGsBiLJUPEREQco5gYhoXGUExT/Fq2JalT5mypaOZsISlqWomoSJliTNTUvtSZFiZhH2aIznTv08EOHnrO/9/tAQ5NAEIAhCgBxKgRmqHDmXwNqjM1mDercPJfFoL/IOhFHMvVIrXcgKkbeuxdjhSYqhaGzJEITZRwXHHIHAEQCgAXJeGEXY+JSgNYqIOcJiGYrgLz1HhTEY2JYg1OCwcmFAJwVACQroPCrsWn6jgFbTr8KZCwf1MLeiw6ucWiY5kO6xYNIjJVCNMrACRJCM+WEGGNhLejMJaz3Tm7k4+y6D6vZn+1mSvDpVzoLwr22JNkmxbfnXGK9asanEOJAR2uRBVrTOLeu6f58ucXdm5OO7k2eptfX5Xz24SDa2O3Od9XKDekRu73VZpo1WMId0yi/KTcSG+OQf7ysoxffVX03rNwabSS78ectJdf5Op4Bb/5HPRkRu133zKywiTOoNas3mgvTaAnyyD/mnZyadxJU1EuWxypHBl0E9HxnOgtZmC+nt124747RaItTumBwyDccyer2VWaGNx6W8dVXy2hADuaCjgz7KIkCfSP1jCw2CSvDNvojFf8uSThFLJVQrhNxNzbnnxuzNwJ7vgfcHWqmT8WuhhY7efWcid3l9s423uD674que16DC1KxCJBLaBEwujHQSvHvTnBgfpsfhqr4+LLRs4O3KWvs4ze4hS225K5Me0MNl/R0qJGDIyiALsSTYOuFP587drtc2WwJdfE5mwTW/Mu8LEjnVPdpfLOQuPeZFsWrRI+JOmFMIgArmmgsmnxY6QhjZtzbnl78T63/V4Glh5y2+/h96la+Xl9Gm/p8LsoDmdx+LTpEk4VKvHKZRSDndYEPqs0s6fMxNbMKLkiWljLE9CYLwkqUXVg/gKaZ3VuIbnk5AAAAABJRU5ErkJggg==
[Install Script Monkey]: https://img.shields.io/badge/Install-666?labelColor=444&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAACvElEQVQoz23STUiTAQDG8Sezmx5fuuw0gx1eGPSGsBiLJUPEREQco5gYhoXGUExT/Fq2JalT5mypaOZsISlqWomoSJliTNTUvtSZFiZhH2aIznTv08EOHnrO/9/tAQ5NAEIAhCgBxKgRmqHDmXwNqjM1mDercPJfFoL/IOhFHMvVIrXcgKkbeuxdjhSYqhaGzJEITZRwXHHIHAEQCgAXJeGEXY+JSgNYqIOcJiGYrgLz1HhTEY2JYg1OCwcmFAJwVACQroPCrsWn6jgFbTr8KZCwf1MLeiw6ucWiY5kO6xYNIjJVCNMrACRJCM+WEGGNhLejMJaz3Tm7k4+y6D6vZn+1mSvDpVzoLwr22JNkmxbfnXGK9asanEOJAR2uRBVrTOLeu6f58ucXdm5OO7k2eptfX5Xz24SDa2O3Od9XKDekRu73VZpo1WMId0yi/KTcSG+OQf7ysoxffVX03rNwabSS78ectJdf5Op4Bb/5HPRkRu133zKywiTOoNas3mgvTaAnyyD/mnZyadxJU1EuWxypHBl0E9HxnOgtZmC+nt124747RaItTumBwyDccyer2VWaGNx6W8dVXy2hADuaCjgz7KIkCfSP1jCw2CSvDNvojFf8uSThFLJVQrhNxNzbnnxuzNwJ7vgfcHWqmT8WuhhY7efWcid3l9s423uD674que16DC1KxCJBLaBEwujHQSvHvTnBgfpsfhqr4+LLRs4O3KWvs4ze4hS225K5Me0MNl/R0qJGDIyiALsSTYOuFP587drtc2WwJdfE5mwTW/Mu8LEjnVPdpfLOQuPeZFsWrRI+JOmFMIgArmmgsmnxY6QhjZtzbnl78T63/V4Glh5y2+/h96la+Xl9Gm/p8LsoDmdx+LTpEk4VKvHKZRSDndYEPqs0s6fMxNbMKLkiWljLE9CYLwkqUXVg/gKaZ3VuIbnk5AAAAABJRU5ErkJggg==
[Install Style]: https://img.shields.io/badge/User%20Style-Install-brightgreen?logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAeFBMVEUAAAAm+/cn/fkn//wm//wn/fkANS0n//sCQTol9PETmpQcysYTlpESk44SkIsNe3Qm9/Qj6OQf1tIXrqkUnZcOhH4FUUoANy8m+vYk8ewi4t8g4Nsdz8oavLcZubUZt7MVop0PiIINfnkKbmgJZ2AHXVcGU00DRj5BSX4OAAAABnRSTlMA8fJbVfVdb86DAAAAh0lEQVQY013PWRKDIBBF0UZNP0BB45h5Hva/wzSFISnvF3U++hVEeYaUKohIVZyySgDyeJ23wLpmRoTRIPSDDhjeD6cTlNholhL0csDrGWCZ9QGA8QIOhLA6XXdCPXOFOCvdDMw034idAP0Ffxxq22D/NxtqngnuXduWl5EjKLf4XL5CKivoA3AuCHPhSbdbAAAAAElFTkSuQmCC