import Vue from 'vue';
import Fingerprint2 from '@/plugins/fingerprint.js';

let _paq = _paq || [];
_paq.push(["setDocumentTitle", document.domain + "/" + document.title]);
_paq.push(["setCookieDomain", "*.enecuum.com"]);
_paq.push(['trackPageView']);
_paq.push(['enableLinkTracking']);
_paq.push(['trackAllContentImpressions']);


(function () {
  let u = "//api.enecuum.com/v1/";
  _paq.push(['setTrackerUrl', u + 'a']);
  _paq.push(['setSiteId', 'GNL2r4zMP1']);
  let d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
  g.type = 'text/javascript';
  g.async = true;
  g.defer = true;
  g.src = u + 'a';
  s.parentNode.insertBefore(g, s);
})();

(function () {
  function Build(name, args) {
    return function () {
      window.carrotquestasync.push(name, arguments);
    }
  }

  if (typeof carrotquest === 'undefined') {
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src = '//cdn.carrotquest.io/api.min.js';
    var x = document.getElementsByTagName('head')[0];
    x.appendChild(s);
    window.carrotquest = {};
    window.carrotquestasync = [];
    carrotquest.settings = {};
    var m = ['connect', 'track', 'identify', 'auth', 'open', 'onReady', 'addCallback', 'removeCallback', 'trackMessageInteraction'];
    for (var i = 0; i < m.length; i++) carrotquest[m[i]] = Build(m[i]);
  }
})();
carrotquest.connect('14851-e5671147436705305d3a0410d2');
window.dataLayer = window.dataLayer || [];

function gtag() {
  dataLayer.push(arguments);
}

gtag('js', new Date());
gtag('config', 'UA-114577800-1');
(function (i, s, o, g, r, a, m) {
  i['GoogleAnalyticsObject'] = r;
  i[r] = i[r] || function () {
    (i[r].q = i[r].q || []).push(arguments)
  }, i[r].l = 1 * new Date();
  a = s.createElement(o),
    m = s.getElementsByTagName(o)[0];
  a.async = 1;
  a.src = g;
  m.parentNode.insertBefore(a, m)
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
(function (d, w, c) {
  (w[c] = w[c] || []).push(function () {
    try {
      w.yaCounter47793562 = new Ya.Metrika({
        id: 47793562,
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true
      });
    } catch (e) {
    }
  });
  var n = d.getElementsByTagName("script")[0],
    s = d.createElement("script"),
    f = function () {
      n.parentNode.insertBefore(s, n);
    };
  s.type = "text/javascript";
  s.async = true;
  s.src = "https://mc.yandex.ru/metrika/watch.js";
  if (w.opera == "[object Opera]") {
    d.addEventListener("DOMContentLoaded", f, false);
  } else {
    f();
  }
})(document, window, "yandex_metrika_callbacks");

function isBlocked() {
  let img = document.createElement('img');
  img.src = 'https://www.googletagmanager.com';
  if (img.naturalWidth || (typeof(ga) === 'undefined') || (typeof(Ya) === 'undefined') || (typeof(_paq) === 'undefined')) {
    return true;
  } else {
    return false;
  }
}


function install(Vue) {
  Vue.cq_user = '';
  Vue.prototype.getFinger = function () {
    return Vue.cq_user;
  }
  Vue.prototype.ainit = function () {
    const fp = new Fingerprint2();
    fp().get(res => {
      Vue.cq_user = res;
      let isInited = false;
      let attemptedConnect = 0;

      function testConnect() {
        if (isBlocked() && attemptedConnect < 10) {
          setTimeout(() => {
            attemptedConnect++;
            testConnect();
          }, 200);
        } else {
          init();
        }
      }

      testConnect();

      function init() {
        if (!isInited) {
          if (typeof(_paq !== 'undefined')) {
            _paq.push(['setUserId', Vue.cq_user]);
            isInited = true;
          }
          if (isBlocked()) {
            //todo: add addblock notification
          } else {
            yaCounter47793562.setUserID(Vue.cq_user);
            gtag('set', {'user_id': Vue.cq_user});
            ga('set', 'userId', Vue.cq_user);
            ga('create', 'UA-114577800-1', 'auto');
            ga('send', 'pageview');
            isInited = true;
          }
        }
      }
    });
  }
  Vue.prototype.a = function (target) {
    console.log(target, _paq, isBlocked());
    if (_paq) {
      _paq.push(['trackEvent', target.category, target.eventAction, target.eventLabel]);
    }
    if (isBlocked()) {
      //todo: add addblock notification
    } else {
      yaCounter47793562.reachGoal(target.eventLabel, target);
      ga('send', 'event', target.category, target.eventAction, target.eventLabel);
    }
  };
}

Vue.use(install);

/*
document.addEventListener('click', function (e) {
  if (e.target && e.target.getAttribute && e.target.getAttribute('data-link')) {
    a.send({category: 'social', eventAction: 'click', eventLabel: e.target.getAttribute('data-link')});
  }
});*/
