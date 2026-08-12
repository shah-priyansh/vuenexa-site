/* =====================================================================
   VueNexa Textile — interactions
   Mobile nav · count-up stats · demo modal · scroll reveal · demo form
   ===================================================================== */
(function () {
    'use strict';

    /* ---- EmailJS (reused from the main site) ---- */
    var EMAILJS = {
        serviceId: 'service_9p8kxls',
        templateId: 'template_742usr1',
        publicKey: 'nIAEUz3F96XdoXi8r'
    };

    document.addEventListener('DOMContentLoaded', function () {
        initMobileNav();
        initModal();
        initCountUp();
        initReveal();
        initDemoForms();
    });

    /* ---------- Mobile nav ---------- */
    function initMobileNav() {
        var burger = document.querySelector('.hamburger');
        var menu = document.querySelector('.nav-menu');
        if (!burger || !menu) return;
        burger.addEventListener('click', function () {
            menu.classList.toggle('open');
            burger.classList.toggle('open');
        });
        menu.querySelectorAll('a').forEach(function (a) {
            a.addEventListener('click', function () {
                menu.classList.remove('open');
                burger.classList.remove('open');
            });
        });
    }

    /* ---------- Demo modal ---------- */
    function initModal() {
        var overlay = document.getElementById('demo-modal');
        if (!overlay) return;
        var openers = document.querySelectorAll('[data-demo-open]');
        var closers = overlay.querySelectorAll('[data-demo-close]');

        function open(e) { if (e) e.preventDefault(); overlay.classList.add('open'); document.body.style.overflow = 'hidden'; }
        function close() { overlay.classList.remove('open'); document.body.style.overflow = ''; }

        openers.forEach(function (btn) { btn.addEventListener('click', open); });
        closers.forEach(function (btn) { btn.addEventListener('click', close); });
        overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
        document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
    }

    /* ---------- Count-up stats ---------- */
    function initCountUp() {
        var els = document.querySelectorAll('[data-count]');
        if (!els.length || !('IntersectionObserver' in window)) {
            els.forEach(function (el) { el.textContent = formatNum(el, +el.getAttribute('data-count')); });
            return;
        }
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                animate(entry.target);
                io.unobserve(entry.target);
            });
        }, { threshold: 0.4 });
        els.forEach(function (el) { io.observe(el); });
    }

    function animate(el) {
        var target = +el.getAttribute('data-count');
        var dur = 1600, start = null;
        function step(ts) {
            if (!start) start = ts;
            var p = Math.min((ts - start) / dur, 1);
            var eased = 1 - Math.pow(1 - p, 3);
            el.textContent = formatNum(el, Math.floor(eased * target));
            if (p < 1) requestAnimationFrame(step);
            else el.textContent = formatNum(el, target);
        }
        requestAnimationFrame(step);
    }

    function formatNum(el, n) {
        var prefix = el.getAttribute('data-prefix') || '';
        var suffix = el.getAttribute('data-suffix') || '';
        return prefix + n.toLocaleString('en-IN') + suffix;
    }

    /* ---------- Scroll reveal ---------- */
    function initReveal() {
        var els = document.querySelectorAll('.reveal');
        if (!els.length) return;
        if (!('IntersectionObserver' in window)) { els.forEach(function (el) { el.classList.add('in'); }); return; }
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) { entry.target.classList.add('in'); io.unobserve(entry.target); }
            });
        }, { threshold: 0.12 });
        els.forEach(function (el) { io.observe(el); });
    }

    /* ---------- Demo / contact forms ---------- */
    function initDemoForms() {
        document.querySelectorAll('form[data-demo-form]').forEach(function (form) {
            form.addEventListener('submit', function (e) {
                e.preventDefault();
                submitForm(form);
            });
        });
    }

    function submitForm(form) {
        var btn = form.querySelector('[type="submit"]');
        var status = form.querySelector('.form-status');
        var original = btn ? btn.innerHTML : '';
        if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'; }
        if (status) status.innerHTML = '';

        var data = {
            user_name: val(form, 'name'),
            user_email: val(form, 'email'),
            subject: 'Demo request — VueNexa Textile',
            message: 'Phone: ' + val(form, 'phone') +
                '\nMill/Company: ' + val(form, 'company') +
                '\n\nMessage: ' + val(form, 'message'),
            reply_to: val(form, 'email')
        };

        fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                service_id: EMAILJS.serviceId,
                template_id: EMAILJS.templateId,
                user_id: EMAILJS.publicKey,
                template_params: data
            })
        }).then(function (res) {
            if (res.ok) {
                if (status) status.innerHTML = '<span class="ok"><i class="fas fa-check-circle"></i> Thank you! Our team will contact you within 24 hours.</span>';
                form.reset();
            } else {
                throw new Error('Request failed: ' + res.status);
            }
        }).catch(function (err) {
            console.error('VueNexa Textile form error:', err);
            if (status) status.innerHTML = '<span class="err"><i class="fas fa-exclamation-circle"></i> Something went wrong. Please call +91 7202976525 or email tech@vuenexa.com.</span>';
        }).finally(function () {
            if (btn) { btn.disabled = false; btn.innerHTML = original; }
        });
    }

    function val(form, name) {
        var el = form.querySelector('[name="' + name + '"]');
        return el ? el.value.trim() : '';
    }
})();
