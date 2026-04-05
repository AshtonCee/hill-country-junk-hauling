document.addEventListener('DOMContentLoaded', () => {

    /* -------------------------------------
       0. Mobile Menu Toggle
       ------------------------------------- */
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    /* -------------------------------------
       1. Hero Initial Load Animation
       ------------------------------------- */
    // Add the 'show' class to start the CSS animations
    const heroElements = document.querySelectorAll('.text-animate');
    setTimeout(() => {
        heroElements.forEach(el => {
            el.classList.add('show');
        });
    }, 100);

    /* -------------------------------------
       2. Intersection Observer (Scroll Animations)
       ------------------------------------- */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Unobserve after animating once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to observe
    const animatedElements = document.querySelectorAll('.scroll-animate, .scroll-left, .scroll-right');
    animatedElements.forEach(el => {
        scrollObserver.observe(el);
    });

    /* -------------------------------------
       3. Parallax Effect logic
       ------------------------------------- */
    // Simple parallax effect using translate Y
    const parallaxSection = document.querySelector('.parallax-section');
    const parallaxBg = document.querySelector('.parallax-bg');

    if (parallaxSection && parallaxBg) {
        window.addEventListener('scroll', () => {
            // Get position of the parallax section relative to viewport
            const rect = parallaxSection.getBoundingClientRect();
            
            // Proceed only if the section is in or near the viewport
            if (rect.top <= window.innerHeight && rect.bottom >= 0) {
                // Calculate how far we've scrolled within the section
                const scrollProgress = rect.top / window.innerHeight;
                
                // Apply subtle Y transform for the parallax feel (moving slower than foreground)
                const yOffset = scrollProgress * 150; 
                parallaxBg.style.transform = `translateY(${yOffset}px)`;
            }
        });
    }

});
