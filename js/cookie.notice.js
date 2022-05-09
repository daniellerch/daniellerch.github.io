/**
 * Cookie Notice JS
 * @author Alessandro Benoit
 */
;
(function () {

    "use strict";

    /**
     * Store current instance
     */
    var instance;

    /**
     * Defaults values
     * @type object
     */
    var defaults = {
        'messageLocales': {
            'en': 'We use cookies to analyze our website traffic and performance. If you continue to use this site we assume that you will be happy with it.',
            'es': 'Usamos cookies para analizar el tráfico y el rendimiento de la página. Si continúa usando esta página asumimos que está de acuerdo.'
        },

        'cookieNoticePosition': 'bottom',

        'learnMoreLinkEnabled': false,

        'learnMoreLinkHref': '/cookie-information.html',

        'learnMoreLinkText': {
            'en': 'Learn more',
            'es': 'Tudjon meg többet',
        },

        'acceptButtonLocales': {
            'en': 'Continue',
            'es': 'Continuar'
        },

        'cancelButtonLocales': {
            'en': 'Cancel',
            'es': 'Cancelar'
        },



        'expiresIn': 30,
        'buttonBgColor': '#0074d9',
        'buttonTextColor': '#fff',
        'noticeBgColor': '#ccc',
        'noticeTextColor': '#000',
        'linkColor': '#009fdd'
    };



    function getCookie(cname) {
      let name = cname + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }


    /**
     * Initialize cookie notice on DOMContentLoaded
     * if not already initialized with alt params
     */
    document.addEventListener('DOMContentLoaded', function () {
        if(getCookie("cookie_notice")==1)
            return;

        if (!instance) {
            new cookieNoticeJS();
        }
    });

    /**
     * Constructor
     */
    window.cookieNoticeJS = function () {


        // If an instance is already set stop here
        if (instance !== undefined) {
            return;
        }

        // Set current instance
        instance = this;

        // If cookies are not supported or notice cookie is already set
        if (!testCookie() || getNoticeCookie()) {
            return;
        }

        // Extend default params
        var params = extendDefaults(defaults, arguments[0] || {});

        // Get current locale for notice text
        var noticeText = getStringForCurrentLocale(params.messageLocales);

        // Create notice
        var notice = createNotice(noticeText, params.noticeBgColor, params.noticeTextColor, params.cookieNoticePosition);

        var learnMoreLink;

        if (params.learnMoreLinkEnabled) {
            var learnMoreLinkText = getStringForCurrentLocale(params.learnMoreLinkText);

            learnMoreLink = createLearnMoreLink(learnMoreLinkText, params.learnMoreLinkHref, params.linkColor);
        }


        // Get current locale for button text
        var acceptButtonText = getStringForCurrentLocale(params.acceptButtonLocales);
        var cancelButtonText = getStringForCurrentLocale(params.cancelButtonLocales);

        // Create cancel button
        var acceptButton = createButton(acceptButtonText, params.buttonBgColor, params.buttonTextColor);

        // Dismiss button click event
        acceptButton.addEventListener('click', function (e) {
            e.preventDefault();
            setDismissNoticeCookie(parseInt(params.expiresIn + "", 10) * 60 * 1000 * 60 * 24);
            fadeElementOut(notice);
        });




        // Create cancel button
        var cancelButton = createButton(cancelButtonText, params.buttonBgColor, params.buttonTextColor);

        // Dismiss button click event
        cancelButton.addEventListener('click', function (e) {
            e.preventDefault();
            document.location.href="https://google.com";
        });

        // Append notice to the DOM
        var noticeDomElement = document.body.appendChild(notice);

        if (!!learnMoreLink) {
            noticeDomElement.appendChild(learnMoreLink);
        }

        noticeDomElement.appendChild(acceptButton);
        noticeDomElement.appendChild(cancelButton);

    };

    /**
     * Get the string for the current locale
     * and fallback to "en" if none provided
     * @param locales
     * @returns {*}
     */
    function getStringForCurrentLocale(locales) {
        var locale = (
            document.documentElement.lang ||
            navigator.language||
            navigator.userLanguage
        ).substr(0, 2);

        return (locales[locale]) ? locales[locale] : locales['en'];
    }

    /**
     * Test if cookies are enabled
     * @returns {boolean}
     */
    function testCookie() {
        document.cookie = 'testCookie=1';
        return document.cookie.indexOf('testCookie') != -1;
    }

    /**
     * Test if notice cookie is there
     * @returns {boolean}
     */
    function getNoticeCookie() {
        return document.cookie.indexOf('cookie_notice_') != -1;
    }

    /**
     * Create notice
     * @param message
     * @param bgColor
     * @param textColor
     * @param position
     * @returns {HTMLElement}
     */
    function createNotice(message, bgColor, textColor, position) {

        var notice = document.createElement('div'),
            noticeStyle = notice.style;

        notice.innerHTML = message + '&nbsp;';
        notice.setAttribute('id', 'cookieNotice');

        noticeStyle.position = 'fixed';

        if (position === 'top') {
            noticeStyle.top = '0';
        } else {
            noticeStyle.bottom = '0';
        }

        noticeStyle.left = '0';
        noticeStyle.right = '0';
        noticeStyle.background = bgColor;
        noticeStyle.color = textColor;
        noticeStyle["z-index"] = '999';
        noticeStyle.padding = '10px 5px';
        noticeStyle["text-align"] = 'center';
        noticeStyle["font-size"] = "13px";
        noticeStyle["line-height"] = "30px";
        noticeStyle.fontFamily = 'Lora, Times New Roman, serif';

        return notice;
    }

    /**
     * Create button
     * @param message
     * @param buttonColor
     * @param buttonTextColor
     * @returns {HTMLElement}
     */
    function createButton(message, buttonColor, buttonTextColor) {

        var button = document.createElement('a'),
            buttonStyle = button.style;

        // Dismiss button
        button.href = '#';
        button.innerHTML = message;

        button.className = 'confirm';

        // Dismiss button style
        buttonStyle.background = buttonColor;
        buttonStyle.color = buttonTextColor;
        buttonStyle['text-decoration'] = 'none';
        buttonStyle.display = 'inline-block';
        buttonStyle.padding = '0 15px';
        buttonStyle.margin = '0 0 0 10px';

        return button;

    }

    /**
     * Create link
     * @param learnMoreLinkText
     * @param learnMoreLinkHref
     * @param linkColor
     * @returns {HTMLElement}
     */
    function createLearnMoreLink(learnMoreLinkText, learnMoreLinkHref, linkColor) {

        var learnMoreLink = document.createElement('a'),
            learnMoreLinkStyle = learnMoreLink.style;

        // Dismiss button
        learnMoreLink.href = learnMoreLinkHref;
        learnMoreLink.textContent = learnMoreLinkText;
        learnMoreLink.target = '_blank';
        learnMoreLink.className = 'learn-more';

        // Dismiss button style
        learnMoreLinkStyle.color = linkColor;
        learnMoreLinkStyle['text-decoration'] = 'none';
        learnMoreLinkStyle.display = 'inline';

        return learnMoreLink;

    }

    /**
     * Set sismiss notice cookie
     * @param expireIn
     */
    function setDismissNoticeCookie(expireIn) {
        console.log("set cookies");
        var now = new Date(),
            cookieExpire = new Date();

        cookieExpire.setTime(now.getTime() + expireIn);
        document.cookie = "cookie_notice=1; expires=" + cookieExpire.toUTCString() + "; path=/;";
    }

    /**
     * Fade a given element out
     * @param element
     */
    function fadeElementOut(element) {
        element.style.opacity = 1;
        (function fade() {
            (element.style.opacity -= .1) < 0.01 ? element.parentNode.removeChild(element) : setTimeout(fade, 40)
        })();
    }

    /**
     * Utility method to extend defaults with user options
     * @param source
     * @param properties
     * @returns {*}
     */
    function extendDefaults(source, properties) {
        var property;
        for (property in properties) {
            if (properties.hasOwnProperty(property)) {
                if (typeof source[property] === 'object') {
                    source[property] = extendDefaults(source[property], properties[property]);
                } else {
                    source[property] = properties[property];
                }
            }
        }
        return source;
    }

    /* test-code */
    //cookieNoticeJS.extendDefaults = extendDefaults;
    //cookieNoticeJS.clearInstance = function () {
    //    instance = undefined;
    //};
    /* end-test-code */

}());
