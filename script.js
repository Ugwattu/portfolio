// ---------- Theme toggle (in-memory only) ----------
var isDark = true;
var themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', function () {
  isDark = !isDark;
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
});

// ---------- Mobile nav ----------
var navToggle = document.getElementById('navToggle');
var navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', function () {
  var isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
});
navLinks.querySelectorAll('a').forEach(function (link) {
  link.addEventListener('click', function () {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ---------- Scroll-spy active nav ----------
var navLinkEls = document.querySelectorAll('.nav-link');
var spySections = document.querySelectorAll('section[id], header[id]');
var spyObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      navLinkEls.forEach(function (link) {
        link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
spySections.forEach(function (s) { spyObserver.observe(s); });

// ---------- Reveal on scroll ----------
var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var revealEls = document.querySelectorAll('.reveal');
if (prefersReduced) {
  revealEls.forEach(function (el) { el.classList.add('is-visible'); });
} else {
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(function (el) { revealObserver.observe(el); });
}

// ---------- Contact form -> mailto ----------
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();
  var name = this.name.value, email = this.email.value, message = this.message.value;
  var subject = encodeURIComponent('Portfolio contact from ' + name);
  var body = encodeURIComponent(message + '\n\n— ' + name + ' (' + email + ')');
  window.location.href = 'mailto:umair.ghafoor06@gmail.com?subject=' + subject + '&body=' + body;
});


// ---------- Tools data + filter ----------
var tools = [
  { name: "Dorion", url: "https://spikehd.github.io/projects/dorion/", icon: "https://raw.githubusercontent.com/SpikeHD/Dorion/main/src-tauri/icons/icon.png", cat: "media" },
  { name: "Metrolist", url: "https://github.com/mostafaalagamy/metrolist", icon: "https://avatars.githubusercontent.com/u/260068764?s=200&v=4", cat: "media" },
  { name: "TrueNAS", url: "https://www.truenas.com/", icon: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.osboxes.org%2Fwp-content%2Fuploads%2F2022%2F02%2Ftruenas-logo.png&f=1&nofb=1", cat: "dev" },
  { name: "Futo", url: "https://futo.tech/", icon: "https://avatars.githubusercontent.com/u/129423434?s=200&v=4", cat: "sec" },
  { name: "KDE", url: "https://www.kde.org/", icon: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fkde.org%2Fstuff%2Fclipart%2Flogo%2Fkde-logo-blue-transparent-3000x3000.png&f=1&nofb=1", cat: "dev" },
  { name: "Stripe", url: "https://stripe.com/", icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQGluJhW7I1NYU7jF77E-9K9I46_ib_DUNHw&s", cat: "dev" },
  { name: "Bitwarden", url: "https://bitwarden.com/", icon: "https://avatars.githubusercontent.com/u/15990069?s=200&v=4", cat: "sec" },
  { name: "Proton", url: "https://proton.me/", icon: "https://avatars.githubusercontent.com/u/6953970?s=200&v=4", cat: "sec" },
  { name: "Signal", url: "https://signal.org/", icon: "https://avatars.githubusercontent.com/u/702459?s=200&v=4", cat: "sec" },
  { name: "Firefox", url: "https://www.mozilla.org/en-US/firefox/new/", icon: "https://www.mozilla.org/media/protocol/img/logos/firefox/logo.fedb52c912d6.svg", cat: "sec" },
  { name: "7-Zip", url: "https://www.7-zip.org/", icon: "https://www.7-zip.org/7ziplogo.png", cat: "dev" },
  { name: "uBlock Origin", url: "https://github.com/gorhill/uBlock", icon: "https://raw.githubusercontent.com/gorhill/uBlock/master/src/img/ublock.svg", cat: "sec" },
  { name: "FxSound", url: "https://www.fxsound.com/", icon: "https://avatars.githubusercontent.com/u/103012411?s=200&v=4", cat: "media" },
  { name: "OBS Studio", url: "https://obsproject.com/", icon: "https://obsproject.com/assets/images/new_icon_small-r.png", cat: "media" },
  { name: "GuardianProject", url: "https://guardianproject.info/", icon: "https://guardianproject.info/GP_Logo_hires.png", cat: "sec" },
  { name: "SafeCharge", url: "https://play.google.com/store/apps/details?id=com.onesilicondiode.batterywise&hl=en", icon: "https://play-lh.googleusercontent.com/8qnlDrFkq1337psFMfAqU40tblRCzWhBm0p9yqa34rxyfxtIkm54_AAGNsaQj4QlTg=w240-h480", cat: "dev" },
  { name: "FMHY", url: "https://fmhy.net/", icon: "https://raw.githubusercontent.com/fmhy/edit/refs/heads/main/docs/public/favicon.ico", cat: "prod" },
  { name: "VLC", url: "https://www.videolan.org/", icon: "https://images.videolan.org/images/VLC-IconSmall.png", cat: "media" },
  { name: "Cashew", url: "https://github.com/jameskokoska/Cashew", icon: "https://raw.githubusercontent.com/jameskokoska/Cashew/main/promotional/icons/icon.png", cat: "prod" },
  { name: "SmartTube", url: "https://github.com/yuliskov/SmartTube", icon: "https://raw.githubusercontent.com/yuliskov/SmartTube/refs/heads/master/images/app_icon.png", cat: "media" },
  { name: "OnlyOffice", url: "https://www.onlyoffice.com/", icon: "https://avatars.githubusercontent.com/u/1426033?s=200&v=4", cat: "prod" },
  { name: "OSS Scanner", url: "https://github.com/Akylas/OSS-DocumentScanner", icon: "https://raw.githubusercontent.com/Akylas/OSS-DocumentScanner/refs/heads/main/fastlane/metadata/com.akylas.documentscanner/android/en-US/images/icon.png", cat: "prod" },
  { name: "Localcdn", url: "https://www.localcdn.org/", icon: "https://www.localcdn.org/img/logo-protected.svg", cat: "sec" },
  { name: "Cryptomator", url: "https://cryptomator.org/", icon: "https://cryptomator.org/img/logo.svg", cat: "sec" },
  { name: "VS Codium", url: "https://vscodium.com/", icon: "https://vscodium.com/img/codium_cnl.svg", cat: "dev" },
  { name: "AB Download Manager", url: "https://abdownloadmanager.com/", icon: "https://raw.githubusercontent.com/amir1376/ab-download-manager/master/assets/logo/app_logo_with_background.svg", cat: "prod" },
  { name: "Ventoy", url: "https://www.ventoy.net/", icon: "https://www.ventoy.net/static/img/ventoy.png?v=1", cat: "dev" },
  { name: "AME Labs", url: "https://amelabs.net/", icon: "https://avatars.githubusercontent.com/u/131649633?s=200&v=4", cat: "dev" },
  { name: "Adguard", url: "https://adguard.com/", icon: "https://avatars.githubusercontent.com/u/8361145?s=200&v=4", cat: "sec" },
  { name: "BentoPDF", url: "https://bentopdf.com/", icon: "https://raw.githubusercontent.com/alam00000/bentopdf/refs/heads/main/public/images/favicon.png", cat: "prod" },
  { name: "LocalSend", url: "https://localsend.org/", icon: "https://raw.githubusercontent.com/localsend/localsend/refs/heads/main/app/assets/img/logo-128.png", cat: "prod" },
  { name: "QuaX", url: "https://github.com/Teskann/QuaX", icon: "https://raw.githubusercontent.com/Teskann/QuaX/refs/heads/master/assets/readme/icon.png", cat: "media" },
  { name: "Photopea", url: "https://www.photopea.com/", icon: "https://www.vecpea.com/promo/icon512.png", cat: "prod" },
  { name: "FFmpeg", url: "https://ffmpeg.org/", icon: "https://avatars.githubusercontent.com/u/729418?s=200&v=4", cat: "dev" },
  { name: "Drawio", url: "https://www.drawio.com/", icon: "https://www.drawio.com/img/logo.svg", cat: "prod" },
  { name: "Ollama", url: "https://ollama.com/", icon: "https://avatars.githubusercontent.com/u/151674099?s=200&v=4", cat: "prod" },
  { name: "Aegis Authenticator", url: "https://getaegis.app/", icon: "https://raw.githubusercontent.com/beemdevelopment/Aegis/refs/heads/master/metadata/en-US/images/icon.png", cat: "sec" },
  { name: "Syncthing", url: "https://syncthing.net/", icon: "https://avatars.githubusercontent.com/u/7628018?s=200&v=4", cat: "prod" },
  { name: "Frigate", url: "https://frigate.video/", icon: "https://raw.githubusercontent.com/blakeblackshear/frigate/a573ea49bffb0a8a6dcd4cc83db01aaf409bd4e6/docs/static/img/branding/logo.svg", cat: "sec" }
];

var toolsGrid = document.getElementById('toolsGrid');
function renderTools(filter) {
  var filtered = tools.filter(function (t) { return filter === 'all' || t.cat === filter; });
  toolsGrid.innerHTML = filtered.map(function (t) {
    return '<a class="tool-chip" href="' + t.url + '" target="_blank" rel="noopener noreferrer">' +
      '<img src="' + t.icon + '" alt="" loading="lazy" onerror="this.style.display=\'none\'">' +
      '<span>' + t.name + '</span></a>';
  }).join('');
}
renderTools('all');
document.querySelectorAll('.filter-tab').forEach(function (tab) {
  tab.addEventListener('click', function () {
    document.querySelectorAll('.filter-tab').forEach(function (t) { t.classList.remove('active'); });
    tab.classList.add('active');
    renderTools(tab.dataset.filter);
  });
});