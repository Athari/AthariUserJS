# User JS

[ [English](/ReadMe.md) | [Русский](/ReadMe.ru.md) | [Українська](/ReadMe.uk.md) | [Беларуская](/ReadMe.be.md) | [Български](/ReadMe.bg.md) | [Татарча](/ReadMe.tt.md) | [Slovenščina](/ReadMe.sl.md) | [Српски](/ReadMe.sr.md) | [**ქართული**](/ReadMe.ka.md) ]

**მომხმარებლის სკრიპტების** კოლექცია [@Athari](/Athari).

* [Animator.ru](#animator): ნამდვილი ბმულები
* [Culture.ru](#culture): გახსნილი
* [Kinorium.com](#kinorium): გაუმჯობესებული
* [Premier.one](#premier): გაუმჯობესებული
* [რამდენიმე საიტისთვის](#multiple)
  * [ReYohoho](#reyohoho): რეკლამის გარეშე + გაუმჯობესებები

**ასევე იხილეთ: [User CSS](https://github.com/Athari/AthariUserCSS)** (@Athari-ს მომხმარებლის სტილების კოლექცია).

## ⚙️ ინსტრუქცია

1. **დააინსტალირეთ 🐵 მომხმარებლის სკრიპტების გაფართოება** (აირჩიეთ ერთი):

   * <img src="https://www.tampermonkey.net/images/ape.svg" height=16> [Tampermonkey](https://www.tampermonkey.net/) შემდეგისთვის:
     [Chrome](https://chromewebstore.google.com/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo) /
     [Edge](https://microsoftedge.microsoft.com/addons/detail/iikmkjmpaadaobahmlepeloendndfphd) /
     [Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/) /
     [Safari](https://apps.apple.com/app/tampermonkey/id6738342400)  
     (ამჟამად დახურული კოდის, ყველაზე ფუნქციური)

   * ![][vm-logo] [Violentmonkey](https://violentmonkey.github.io/) შემდეგისთვის:
     [Chrome](https://chrome.google.com/webstore/detail/violent-monkey/jinjaccalgkegednnccohejagnlnfdag) /
     [Edge](https://microsoftedge.microsoft.com/addons/detail/eeagobfjdenkkddmbclomhiblgggliao) /
     [Firefox](https://addons.mozilla.org/firefox/addon/violentmonkey/)  
     (ღია კოდის)

   * <img src="https://addons.mozilla.org/user-media/addon_icons/0/748-32.png" height=16> [<del>Greasemonkey</del>](https://www.greasespot.net/) შემდეგისთვის:
     [Firefox](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/)  
     (ღია კოდის, მინიმალისტური, მოძველებული)

2. რეკომენდებულია **გაფართოების ღილაკის ინსტრუმენტთა პანელზე განთავსება**, რაც საშუალებას მოგცემთ მიიღოთ წვდომა ამჟამად დაინსტალირებულ მომხმარებლის სკრიპტებზე და მათ პარამეტრებზე.

3. გადადით ქვემოთ მოცემულ მომხმარებლის სკრიპტზე და **დააჭირეთ მის ![User Script Install][Install Script] ნიშანს**. იხილავთ სკრიპტის წინასწარ გადახედვას.

4. **დააჭირეთ ![Install][Install Script Monkey] ღილაკს** ზედა პანელზე სკრიპტის დასაინსტალირებლად.

5. თუ ოდესმე გინდათ **სკრიპტის გამორთვა ან ჩართვა**, დააჭირეთ გაფართოების ღილაკს <img src="https://addons.mozilla.org/user-media/addon_icons/0/748-32.png" height=16>, შემდეგ კი გადართეთ ტოგლი სკრიპტის გვერდით.

## <a id="animator"/> ![](https://icons.duckduckgo.com/ip3/animator.ru.ico) Animator.ru

### Animator.ru – ნამდვილი ბმულები [![Animator.ru ნამდვილი ბმულების სკრიპტის ინსტალაცია][Install Script]](Animator/Animator-TrueLinks.user.js?raw=1)

აუმჯობესებს ნავიგაციას Animator.ru-ზე:

* აჩვენებს გრძელ სიებს გვერდების გარეშე.
* ცვლის სკრიპტულ ბმულებს (JavaScript) ნამდვილ ბმულებზე (href), რათა მათი გახსნა ახალ ჩანართში, კოპირება და ა.შ. იყოს შესაძლებელი.

## <a id="culture"/> ![](https://www.google.com/s2/favicons?sz=32&domain=culture.ru) Culture.ru

### Culture.ru – გახსნილი [![Culture.ru გახსნილი სკრიპტის ინსტალაცია][Install Script]](Culture/Culture-Unlocked.user.js?raw=1)

აფიქსირებს შეცდომას, რომელიც იწვევს შეტყობინებას "Видеозапись недоступна для просмотра по решению правообладателя".

* ყოველთვის აჩვენებს პირდაპირ მასპინძელ ვიდეოებს.
* სურათების გალერეის მინიატურების ზომის კონფიგურაცია.

## <a id="kinorium"/> ![](https://icons.duckduckgo.com/ip3/kinorium.com.ico) Kinorium.com

### Kinorium.com – გაუმჯობესებული [![Kinorium.com გაუმჯობესებული სკრიპტის ინსტალაცია][Install Script]](Kinorium/Kinorium-Enhanced.user.js?raw=1)

სხვადასხვა გაუმჯობესებები:

* მომხმარებლის კოლექციების მოხმარების სიმარტივე
* დამატებითი სტრიმინგის პროვაიდერების ბმულები
* სურათების ნატურალური ზარმაცი ჩატვირთვა
* და ა.შ.

ეს მომხმარებლის სკრიპტი განკუთვნილია ["Kinorium.com – გაუმჯობესებული" მომხმარებლის სტილთან](https://github.com/Athari/AthariUserCSS#kinorium) ერთად გამოსაყენებლად [![Kinorium.com გაუმჯობესებული სტილის ინსტალაცია][Install Style]](https://github.com/Athari/AthariUserCSS/blob/master/Kinorium/Kinorium-Enhanced.user.css?raw=1).

## <a id="premier"/> ![](https://icons.duckduckgo.com/ip3/premier.one.ico) Premier.one

### Premier.one – გაუმჯობესებული [![Premier.one გაუმჯობესებული სკრიპტის ინსტალაცია][Install Script]](Premier/Premier-Enhanced.user.js?raw=1)

სხვადასხვა გაუმჯობესებები და შეცდომების გამოსწორება:

* გამოსწორებულია ფილტრაცია 1969 წლამდე გამოშვებული ფილმებისთვის.
* 10-წლიანი დიაპაზონების ნაცვლად 5-წლიანი დიაპაზონები.
* სლაიდერების ნაცვლად სრულად გახსნილი ეპიზოდების სიები.
* IMDB და Кинопоиск რეიტინგები ფილმების სიებში.
* პირდაპირი ბმულები ეპიზოდებზე.
* ვიდეო პლეერში ეპიზოდების სრული სათაურები.
* დამატებითი ფილტრები (Союзмультфильм არის ერთადერთი რეალური კონტენტი Premier-ზე).

ეს მომხმარებლის სკრიპტი განკუთვნილია ["Premier.one – გაუმჯობესებული" მომხმარებლის სტილთან](https://github.com/Athari/AthariUserCSS#premier) ერთად გამოსაყენებლად [![Premier.one გაუმჯობესებული სტილის ინსტალაცია][Install Style]](https://github.com/Athari/AthariUserCSS/blob/master/Premier/Premier-Enhanced.user.css?raw=1).

## <a id="multiple"/> რამდენიმე საიტისთვის

### <a id="reyohoho"/> ![](https://reyohoho.github.io/reyohoho/icons/favicon-32x32.png) ReYohoho – რეკლამის გარეშე + გაუმჯობესებები [![ReYohoho რეკლამის გარეშე + გაუმჯობესებების სკრიპტის ინსტალაცია][Install Script]](Multiple/ReYohoho-NoAds.user.js?raw=1)

შლის ვიდეო რეკლამებს ონლაინ სტრიმინგის სერვის ReYohoho-ს ვიდეო ბალანსერებიდან: Alloha, Collaps, HDVB, Lumex, Rezka, Turbo, Vibix, VideoCDN, VideoSeed და ა.შ.

ასევე, შესაძლებლობის შემთხვევაში, იყენებს მცირე გაუმჯობესებებს: დამატებითი პლეერის სიჩქარეები, დიზაინის კორექტირებები და ა.შ.

[vm-logo]: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADMElEQVQ4T2XTS0xjdRTH8e+9vW3v7ZtC6RAsBVpAxgQcBhgfwyMxk7gxGs1snM2oS93pwpiwN251Y4xR48K40TgbDQ5OnFFnVMChQsUJlHZgKK8pfdy+bm/v34VSjXPWv/M5yck5khACSZL4T8l9Qe0VzWFrDnS4Lt+vGB+aTTFVM613LcFKYrfUCgohkP4PvHyum91i/dWegDrnVGRHvWkV/ari/fOg/FaXz/n+Bzd3sMS/gHzSBDgB9edMYdRjly/EO7Rwb1BtG+3yRCMBZ9Btl1/8JVN4whJ4gbaTgZIQgoke3/RET9vrArR2lzI4HA1Hw6EQtYqOEALFoVIolVjP7O3tl4yUx6koy9vH7y3cyX0qCSF448Jg8rnZ8eGDezvY7XZGJx/D6XJjmSYgkBU7zYbBRnKNw/09orE4X99YPJr76veQDBDyqkOSZWLUq/QNDWMd3Kdw5RtMXYemRWHhOvWtu0T6YzTNBrVKmTa3swP4ewfLW4dfJBKryJKM1++nsbOL/bc1zHyBRqWCbTGBuZnGaBg0jDp/JNdY3MwutABgX5ag2TQxDQPP+KMYly8idXYiudxYl55HO38Oo1ol0hcj2B5CgmILCGjKgEORkW0K+dwRDk1jX1L55NslPp7/lbxdwx3wEwyFGRoZ4/TICO0+V6wFCCHw+PyMPzlNpDcGQDQc4Ey8m7F4Ny6Hwvqezs19SB0UcTqc2GQbLaBYbWyobh+K6mZ5M8tOTudYr9Pe0YGjs5elcoDQzCWGZp5FURRKpRLHejXVArbztavZw1xFshoUayYJI0Q+Oo0ePc/kxdfoH5uib+BhCrtp/A5IZbbN9GFxvgX8lCleW03v/ZDe3GDmkQgxJU/5+AjV7cXj9WJZFqu3lzC3VzDLeRaTqdu30vkr8M8lSpLEZI9v9pmRrs+eevzsqb74IId6nUzZhhbuJXtvh4dUg1O2Mt/duFX4/Mf1l65vFb584JlmY20vTMWD75wZjPZHoz2omotq3cAyG+h6icVkKns1cXdu/k7uI8B6AAA4HXZPnI143+wNup7u9KkuCTjS6/VMrvL98nbx7ZVs+dpJVgjBX+5bdV2t19OKAAAAAElFTkSuQmCC
[Install Script]: https://img.shields.io/badge/User%20Script-Install-brightgreen?logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAACvElEQVQoz23STUiTAQDG8Sezmx5fuuw0gx1eGPSGsBiLJUPEREQco5gYhoXGUExT/Fq2JalT5mypaOZsISlqWomoSJliTNTUvtSZFiZhH2aIznTv08EOHnrO/9/tAQ5NAEIAhCgBxKgRmqHDmXwNqjM1mDercPJfFoL/IOhFHMvVIrXcgKkbeuxdjhSYqhaGzJEITZRwXHHIHAEQCgAXJeGEXY+JSgNYqIOcJiGYrgLz1HhTEY2JYg1OCwcmFAJwVACQroPCrsWn6jgFbTr8KZCwf1MLeiw6ucWiY5kO6xYNIjJVCNMrACRJCM+WEGGNhLejMJaz3Tm7k4+y6D6vZn+1mSvDpVzoLwr22JNkmxbfnXGK9asanEOJAR2uRBVrTOLeu6f58ucXdm5OO7k2eptfX5Xz24SDa2O3Od9XKDekRu73VZpo1WMId0yi/KTcSG+OQf7ysoxffVX03rNwabSS78ectJdf5Op4Bb/5HPRkRu133zKywiTOoNas3mgvTaAnyyD/mnZyadxJU1EuWxypHBl0E9HxnOgtZmC+nt124747RaItTumBwyDccyer2VWaGNx6W8dVXy2hADuaCjgz7KIkCfSP1jCw2CSvDNvojFf8uSThFLJVQrhNxNzbnnxuzNwJ7vgfcHWqmT8WuhhY7efWcid3l9s423uD674que16DC1KxCJBLaBEwujHQSvHvTnBgfpsfhqr4+LLRs4O3KWvs4ze4hS225K5Me0MNl/R0qJGDIyiALsSTYOuFP587drtc2WwJdfE5mwTW/Mu8LEjnVPdpfLOQuPeZFsWrRI+JOmFMIgArmmgsmnxY6QhjZtzbnl78T63/V4Glh5y2+/h96la+Xl9Gm/p8LsoDmdx+LTpEk4VKvHKZRSDndYEPqs0s6fMxNbMKLkiWljLE9CYLwkqUXVg/gKaZ3VuIbnk5AAAAABJRU5ErkJggg==
[Install Script Monkey]: https://img.shields.io/badge/Install-666?labelColor=444&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAACvElEQVQoz23STUiTAQDG8Sezmx5fuuw0gx1eGPSGsBiLJUPEREQco5gYhoXGUExT/Fq2JalT5mypaOZsISlqWomoSJliTNTUvtSZFiZhH2aIznTv08EOHnrO/9/tAQ5NAEIAhCgBxKgRmqHDmXwNqjM1mDercPJfFoL/IOhFHMvVIrXcgKkbeuxdjhSYqhaGzJEITZRwXHHIHAEQCgAXJeGEXY+JSgNYqIOcJiGYrgLz1HhTEY2JYg1OCwcmFAJwVACQroPCrsWn6jgFbTr8KZCwf1MLeiw6ucWiY5kO6xYNIjJVCNMrACRJCM+WEGGNhLejMJaz3Tm7k4+y6D6vZn+1mSvDpVzoLwr22JNkmxbfnXGK9asanEOJAR2uRBVrTOLeu6f58ucXdm5OO7k2eptfX5Xz24SDa2O3Od9XKDekRu73VZpo1WMId0yi/KTcSG+OQf7ysoxffVX03rNwabSS78ectJdf5Op4Bb/5HPRkRu133zKywiTOoNas3mgvTaAnyyD/mnZyadxJU1EuWxypHBl0E9HxnOgtZmC+nt124747RaItTumBwyDccyer2VWaGNx6W8dVXy2hADuaCjgz7KIkCfSP1jCw2CSvDNvojFf8uSThFLJVQrhNxNzbnnxuzNwJ7vgfcHWqmT8WuhhY7efWcid3l9s423uD674que16DC1KxCJBLaBEwujHQSvHvTnBgfpsfhqr4+LLRs4O3KWvs4ze4hS225K5Me0MNl/R0qJGDIyiALsSTYOuFP587drtc2WwJdfE5mwTW/Mu8LEjnVPdpfLOQuPeZFsWrRI+JOmFMIgArmmgsmnxY6QhjZtzbnl78T63/V4Glh5y2+/h96la+Xl9Gm/p8LsoDmdx+LTpEk4VKvHKZRSDndYEPqs0s6fMxNbMKLkiWljLE9CYLwkqUXVg/gKaZ3VuIbnk5AAAAABJRU5ErkJggg==
[Install Style]: https://img.shields.io/badge/User%20Style-Install-brightgreen?logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAeFBMVEUAAAAm+/cn/fkn//wm//wn/fkANS0n//sCQTol9PETmpQcysYTlpESk44SkIsNe3Qm9/Qj6OQf1tIXrqkUnZcOhH4FUUoANy8m+vYk8ewi4t8g4Nsdz8oavLcZubUZt7MVop0PiIINfnkKbmgJZ2AHXVcGU00DRj5BSX4OAAAABnRSTlMA8fJbVfVdb86DAAAAh0lEQVQY013PWRKDIBBF0UZNP0BB45h5Hva/wzSFISnvF3U++hVEeYaUKohIVZyySgDyeJ23wLpmRoTRIPSDDhjeD6cTlNholhL0csDrGWCZ9QGA8QIOhLA6XXdCPXOFOCvdDMw034idAP0Ffxxq22D/NxtqngnuXduWl5EjKLf4XL5CKivoA3AuCHPhSbdbAAAAAElFTkSuQmCC