// kathmandu.im — main.js
// Minimal JS: widget tab switching + TravelPayouts widget init

(function () {
    'use strict';

    // ── Widget tab switcher ──────────────────────────────────────────────────
    var tabBtns    = document.querySelectorAll('.tab-btn');
    var hotelPane  = document.getElementById('widget-hotels');
    var flightPane = document.getElementById('widget-flights');

    tabBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            tabBtns.forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');
            var target = btn.getAttribute('data-tab');
            if (target === 'hotels') {
                hotelPane.style.display  = 'block';
                flightPane.style.display = 'none';
            } else {
                hotelPane.style.display  = 'none';
                flightPane.style.display = 'block';
            }
        });
    });

    // ── TravelPayouts widget loader ──────────────────────────────────────────
    // Replace MARKER_ID below with your TravelPayouts marker once registered.
    // Widget docs: https://support.travelpayouts.com/hc/en-us/articles/115000736268
    var MARKER = 'YOUR_MARKER_ID'; // <-- swap this

    function loadTPWidget(containerId, widgetSrc) {
        var container = document.getElementById(containerId);
        if (!container) return;

        // Remove existing children safely
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }

        var script   = document.createElement('script');
        script.async = true;
        script.src   = widgetSrc.replace('MARKER', MARKER);
        container.appendChild(script);
    }

    // Hotel search widget (promo_id=4132 = hotel search form)
    loadTPWidget('tp-hotel-widget',
        'https://tp.media/content?trs=273492&shmarker=MARKER&promo_id=4132&campaign_id=121&locale=en&currency=gbp'
    );

    // Flight search widget (promo_id=728 = flight search form)
    loadTPWidget('tp-flight-widget',
        'https://tp.media/content?trs=273492&shmarker=MARKER&promo_id=728&campaign_id=121&locale=en&currency=gbp'
    );

    // ── Smooth-scroll for anchor links ──────────────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
})();
