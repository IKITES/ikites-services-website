/* ==========================================================================
   KITES intro story — scroll-driven "Innovation" reveal.
   Ported from a React/GSAP component into plain JS so it runs on this
   static site without a build step. Behavior is unchanged from the source:
   as the visitor scrolls past the intro, the light "landing" panel fades
   while the active "Innovation" pillar letter flies to the center of the
   screen and expands into the dark "Innovation" panel's headline.
   ========================================================================== */
(function () {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  var story = document.getElementById('kl-story');
  var shell = document.getElementById('kl-story-shell');
  var sourceWord = document.getElementById('kl-source-word');
  var targetWord = document.getElementById('kl-target-word');
  if (!story || !shell || !sourceWord || !targetWord) return;

  var siteHeader = document.querySelector('.site-header');
  var headerOffset = siteHeader ? siteHeader.offsetHeight : 74;

  story.classList.add('kl-js-enabled');

  var mm = gsap.matchMedia();

  mm.add(
    {
      animated: '(min-width: 761px) and (prefers-reduced-motion: no-preference)',
      compact: '(max-width: 760px) and (prefers-reduced-motion: no-preference)',
    },
    function (context) {
      var conditions = context.conditions;
      var animated = conditions.animated;
      var compact = conditions.compact;
      if (!animated && !compact) return;

      var innovationPanel = story.querySelector('.kl-innovation-panel');
      var innovationIntro = story.querySelector('.kl-innovation-intro');
      var innovationFooter = story.querySelector('.kl-innovation-footer');
      var innovationNodes = story.querySelectorAll('.kl-innovation-node');
      var landingFade = story.querySelectorAll('.kl-landing-copy, .kl-scroll-note');
      var inactivePillars = story.querySelectorAll('.kl-pillar:not(.kl-pillar--active)');

      gsap.set(innovationPanel, { autoAlpha: 0 });
      gsap.set(targetWord, { autoAlpha: 0 });
      gsap.set(innovationNodes, { autoAlpha: 0, y: 24 });
      gsap.set([innovationIntro, innovationFooter], { autoAlpha: 0, y: 18 });

      function destination() {
        var rect = sourceWord.getBoundingClientRect();
        return {
          x: window.innerWidth / 2 - (rect.left + rect.width / 2),
          y: window.innerHeight / 2 - (rect.top + rect.height / 2),
          scale: Math.min(
            compact ? 3.2 : 5.5,
            (window.innerWidth * (compact ? 0.72 : 0.42)) / rect.width
          ),
        };
      }

      var timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: story,
          start: 'top ' + headerOffset + 'px',
          end: compact ? '+=125%' : '+=180%',
          pin: shell,
          scrub: compact ? 0.45 : 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(landingFade, { autoAlpha: 0, y: -24, duration: 0.16 }, 0)
        .to(inactivePillars, { autoAlpha: 0, y: 16, duration: 0.16 }, 0.03)
        .to(
          sourceWord,
          {
            x: function () { return destination().x; },
            y: function () { return destination().y; },
            scale: function () { return destination().scale; },
            color: '#4e174d',
            duration: 0.38,
          },
          0.16
        )
        .set(innovationPanel, { autoAlpha: 1 }, 0.5)
        .to(sourceWord, { autoAlpha: 0, duration: 0.08 }, 0.53)
        .to(targetWord, { autoAlpha: 1, duration: 0.1 }, 0.56)
        .to(innovationIntro, { autoAlpha: 1, y: 0, duration: 0.16 }, 0.6)
        .to(innovationNodes, { autoAlpha: 1, y: 0, stagger: 0.035, duration: 0.18 }, 0.64)
        .to(innovationFooter, { autoAlpha: 1, y: 0, duration: 0.14 }, 0.78);

      return function () {
        timeline.kill();
      };
    }
  );
})();
