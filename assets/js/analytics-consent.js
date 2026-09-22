(function () {
  'use strict';

  var MEASUREMENT_ID = 'G-5WZVJZX0GV';
  var STORAGE_KEY = 'core_consent_gadgetsmania_v1';
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };

  function consentState(granted) {
    return {
      analytics_storage: granted ? 'granted' : 'denied',
      ad_storage: granted ? 'granted' : 'denied',
      ad_user_data: granted ? 'granted' : 'denied',
      ad_personalization: granted ? 'granted' : 'denied'
    };
  }

  window.gtag('consent', 'default', Object.assign(consentState(false), {
    wait_for_update: 500
  }));
  window.gtag('set', 'ads_data_redaction', true);

  var savedChoice = null;
  try { savedChoice = window.localStorage.getItem(STORAGE_KEY); } catch (_) {}
  if (savedChoice === 'all') {
    window.gtag('consent', 'update', consentState(true));
  } else if (savedChoice === 'necessary') {
    window.gtag('consent', 'update', consentState(false));
  }

  var loader = document.createElement('script');
  loader.async = true;
  loader.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(MEASUREMENT_ID);
  document.head.appendChild(loader);
  window.gtag('js', new Date());
  window.gtag('config', MEASUREMENT_ID, { send_page_view: savedChoice === 'all' });

  document.addEventListener('click', function (event) {
    if (savedChoice !== 'all') return;
    var link = event.target && event.target.closest ? event.target.closest('a[href]') : null;
    if (!link) return;
    var href = link.href || '';
    if (!/(?:amazon\.|amzn\.to)/i.test(href)) return;
    var destination;
    try {
      var parsed = new URL(href, window.location.href);
      destination = parsed.hostname + parsed.pathname;
    } catch (_) { return; }
    var placementNode = link.closest('[data-placement]');
    var placement = placementNode ? placementNode.getAttribute('data-placement') : '';
    if (!placement) placement = link.className || 'affiliate_link';
    var product = link.getAttribute('data-product') || (link.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 120) || 'amazon_product';
    window.gtag('event', 'affiliate_click', {
      product: product,
      destination: destination,
      page_path: window.location.pathname,
      placement: String(placement).slice(0, 80)
    });
  }, true);

  function saveChoice(choice) {
    try { window.localStorage.setItem(STORAGE_KEY, choice); } catch (_) {}
  }

  function labels() {
    var spanish = (document.documentElement.lang || '').toLowerCase().indexOf('es') === 0;
    return spanish ? {
      title: 'Tu privacidad',
      text: 'Usamos medición analítica y, cuando corresponda, publicidad para mejorar el sitio. Puedes aceptar o mantener solo lo necesario.',
      accept: 'Aceptar todo', reject: 'Solo necesario', manage: 'Privacidad', policy: 'Política de cookies'
    } : {
      title: 'Your privacy',
      text: 'We use analytics and, where applicable, advertising to improve the site. You can accept or keep only what is necessary.',
      accept: 'Accept all', reject: 'Necessary only', manage: 'Privacy', policy: 'Cookie policy'
    };
  }

  function installUi() {
    if (!document.body || document.getElementById('core-consent-banner')) return;
    var copy = labels();
    if (!document.querySelector('link[data-core-consent-style]')) {
      var stylesheet = document.createElement('link');
      stylesheet.rel = 'stylesheet';
      stylesheet.href = '/assets/css/analytics-consent.css';
      stylesheet.setAttribute('data-core-consent-style', 'true');
      document.head.appendChild(stylesheet);
    }

    var banner = document.createElement('section');
    banner.id = 'core-consent-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-live', 'polite');
    banner.setAttribute('aria-label', copy.title);
    banner.innerHTML = '<strong></strong><p></p><div id="core-consent-actions"><button id="core-consent-accept" type="button"></button><button id="core-consent-reject" type="button"></button><a href="/legal/cookies.html"></a></div>';
    banner.querySelector('strong').textContent = copy.title;
    banner.querySelector('p').textContent = copy.text;
    banner.querySelector('#core-consent-accept').textContent = copy.accept;
    banner.querySelector('#core-consent-reject').textContent = copy.reject;
    banner.querySelector('a').textContent = copy.policy;
    if (savedChoice) banner.hidden = true;
    document.body.appendChild(banner);

    var manage = document.createElement('button');
    manage.id = 'core-consent-manage';
    manage.type = 'button';
    manage.textContent = copy.manage;
    manage.addEventListener('click', function () { banner.hidden = false; });
    document.body.appendChild(manage);

    banner.querySelector('#core-consent-accept').addEventListener('click', function () {
      var wasGranted = savedChoice === 'all';
      savedChoice = 'all';
      saveChoice(savedChoice);
      window.gtag('consent', 'update', consentState(true));
      if (!wasGranted) window.gtag('event', 'page_view', { page_location: location.href, page_title: document.title });
      banner.hidden = true;
    });
    banner.querySelector('#core-consent-reject').addEventListener('click', function () {
      savedChoice = 'necessary';
      saveChoice(savedChoice);
      window.gtag('consent', 'update', consentState(false));
      banner.hidden = true;
    });
}

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', installUi);
  else installUi();
})();
