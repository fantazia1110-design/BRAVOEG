document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('productsGrid') && typeof displayProducts === 'function') {
        displayProducts();
    }

    var heroHeadline = document.querySelector('.hero-headline');
    if (heroHeadline) {
        var originalText = heroHeadline.textContent;
        var brandRow = document.querySelector('.hero-brand-row');
        var brandName = document.querySelector('.brand-name');
        var cursorSpan = document.createElement('span');
        cursorSpan.className = 'typewriter-cursor';
        heroHeadline.textContent = '';
        heroHeadline.appendChild(cursorSpan);
        var i = 0;
        function typeChar() {
            if (i < originalText.length) {
                cursorSpan.before(document.createTextNode(originalText.charAt(i)));
                i++;
                setTimeout(typeChar, 45);
            } else {
                cursorSpan.classList.add('done');
                if (brandRow && brandRow.animate) {
                    brandRow.animate([
                        { opacity: 0, transform: 'translateY(15px)' },
                        { opacity: 1, transform: 'translateY(0)' }
                    ], { duration: 800, fill: 'forwards' });
                } else if (brandRow) {
                    brandRow.style.opacity = '1';
                    brandRow.style.transform = 'translateY(0)';
                }
                var gradEls = document.querySelectorAll('.hero-headline, .brand-name, .section-title-text');
                gradEls.forEach(function (el) {
                    if (el && el.animate) {
                        el.animate([
                            { backgroundPosition: '0% 50%' },
                            { backgroundPosition: '100% 50%' },
                            { backgroundPosition: '0% 50%' }
                        ], { duration: 4000, iterations: Infinity, easing: 'ease-in-out' });
                    }
                });
            }
        }
        setTimeout(typeChar, 400);
    }

    var hero = document.querySelector('.hero');
    if (hero) {
        hero.style.opacity = '0';
        hero.style.transform = 'scale(0.92)';
        if (hero.animate) {
            hero.animate([
                { opacity: 0, transform: 'scale(0.92)' },
                { opacity: 1, transform: 'scale(1)' }
            ], { duration: 1000, fill: 'forwards' });
        } else {
            hero.style.transition = 'opacity 1s ease, transform 1s ease';
            setTimeout(function () {
                hero.style.opacity = '1';
                hero.style.transform = 'scale(1)';
            }, 100);
        }
    }

    var logoText = document.querySelector('.logo-text');
    if (logoText && logoText.animate) {
        logoText.animate([
            { backgroundPosition: '0% 50%' },
            { backgroundPosition: '100% 50%' },
            { backgroundPosition: '0% 50%' }
        ], { duration: 5000, iterations: Infinity, easing: 'ease-in-out' });
    }

    function getIndexInParent(el) {
        var i = 0, p = el.previousElementSibling;
        while (p) { i++; p = p.previousElementSibling; }
        return i;
    }

    function revealElement(el) {
        if (el.classList.contains('animate-in')) return;
        el.classList.add('animate-in');
        var from, to = { opacity: 1, transform: 'none' };
        var duration = 1100, easing = 'cubic-bezier(0.16, 1, 0.3, 1)';

        if (el.classList.contains('section-header')) {
            if (el.closest('#products')) {
                from = { opacity: 0, transform: 'perspective(800px) rotateX(-60deg) translateY(-40px)' };
                duration = 1100;
            } else if (el.closest('.features-section')) {
                from = { opacity: 0, transform: 'perspective(800px) translateY(-50px) scale(0.85)' };
                duration = 1000;
            } else if (el.closest('.stats-section')) {
                from = { opacity: 0, transform: 'perspective(600px) scale(0.3) rotate(180deg)' };
                duration = 1300;
                easing = 'cubic-bezier(0.68, -0.55, 0.27, 1.55)';
            } else if (el.closest('.contact-section')) {
                from = { opacity: 0, transform: 'perspective(1000px) translateX(-60px) rotateY(-25deg)' };
                duration = 1200;
            } else {
                from = { opacity: 0, transform: 'translateY(-20px)' };
            }
        } else if (el.classList.contains('filters')) {
            from = { opacity: 0, transform: 'perspective(800px) translateY(40px) rotateX(15deg)' };
            duration = 1000;
        } else if (el.classList.contains('feature-card')) {
            var fi = getIndexInParent(el) % 4;
            var fAnims = [
                { transform: 'perspective(800px) translateY(80px) rotateX(20deg)' },
                { transform: 'perspective(800px) translateX(80px) rotateY(-20deg)' },
                { transform: 'perspective(800px) translateY(80px) rotateX(20deg)' },
                { transform: 'perspective(800px) translateX(-80px) rotateY(20deg)' }
            ];
            from = { opacity: 0, ...fAnims[fi] };
            duration = 1000 + fi * 80;
            easing = 'cubic-bezier(0.34, 1.56, 0.64, 1)';
        } else if (el.classList.contains('stat-item')) {
            var si = getIndexInParent(el) % 4;
            var sAnims = [
                { transform: 'perspective(600px) scale(0.2) rotate(-30deg)' },
                { transform: 'perspective(600px) translateY(80px) scale(0.5)' },
                { transform: 'perspective(600px) scale(0.2) rotate(30deg)' },
                { transform: 'perspective(600px) translateY(80px) scale(0.5)' }
            ];
            from = { opacity: 0, ...sAnims[si] };
            duration = 1200 + si * 100;
            easing = si % 2 === 0 ? 'cubic-bezier(0.68, -0.55, 0.27, 1.55)' : 'cubic-bezier(0.16, 1, 0.3, 1)';
        } else if (el.classList.contains('contact-card')) {
            var ci = getIndexInParent(el) % 2;
            var cAnims = [
                { transform: 'perspective(1000px) translateX(-80px) rotateY(25deg)' },
                { transform: 'perspective(1000px) translateX(80px) rotateY(-25deg)' }
            ];
            from = { opacity: 0, ...cAnims[ci] };
            duration = 1200;
        } else if (el.classList.contains('product-card')) {
            var pi = parseInt(el.dataset.revealIndex || '0', 10) % 4;
            var pAnims = [
                { transform: 'perspective(800px) translateY(60px) rotateX(15deg)' },
                { transform: 'perspective(800px) translateX(60px) rotateY(-15deg)' },
                { transform: 'perspective(800px) translateY(60px) rotateX(15deg)' },
                { transform: 'perspective(800px) translateX(-60px) rotateY(15deg)' }
            ];
            from = { opacity: 0, ...pAnims[pi] };
            duration = 1000;
            easing = 'cubic-bezier(0.34, 1.56, 0.64, 1)';
        } else {
            from = { opacity: 0, transform: 'perspective(800px) translateY(30px)' };
        }

        if (el.animate) {
            el.animate([from, to], { duration: duration, fill: 'forwards', easing: easing });
        }
    }

    function checkReveals() {
        document.querySelectorAll('.reveal:not(.animate-in)').forEach(function (el) {
            var rect = el.getBoundingClientRect();
            var vh = window.innerHeight;
            if (rect.top < vh && rect.bottom > 0) {
                revealElement(el);
            }
        });
    }

    if (document.querySelectorAll('.reveal').length) {
        window.addEventListener('scroll', checkReveals, { passive: true });
        setInterval(checkReveals, 500);
        setTimeout(checkReveals, 500);
        setTimeout(checkReveals, 2000);
        setTimeout(checkReveals, 5000);
    }
});
