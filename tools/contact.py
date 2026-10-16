"""Floating "Contact me" button and its popup, shared by the Portfolio page and the artwork pages.

A page that sets data-fab-hide="<design px>" on <body> hides the button once it is scrolled past that point.
"""

CONTACT_CSS = """
.sc-fab { position: fixed; z-index: 70; right: calc(120px * var(--z)); bottom: calc(36px * var(--z)); zoom: var(--z);
  display: flex; align-items: center; gap: 14px; height: 58px; padding: 0 26px 0 30px; border-radius: 40px;
  background: var(--ink); color: var(--paper); text-decoration: none; font: 500 14px/1 "Gilroy", "Outfit", sans-serif; letter-spacing: 4.4px;
  text-transform: uppercase; box-shadow: 0 10px 30px rgba(0,0,0,.18); border: 1px solid var(--ink);
  transition: background .5s var(--soft), color .5s var(--soft), transform .5s var(--soft), box-shadow .5s var(--soft); }
.sc-fab svg { width: 22px; height: 20px; transition: transform .5s var(--soft); }
.sc-fab .e { max-width: 0; overflow: hidden; white-space: nowrap; letter-spacing: 1px; text-transform: none; font-weight: 400; opacity: 0;
  transition: max-width .6s var(--soft), opacity .4s var(--soft); }
.sc-fab:hover, .sc-fab:focus-visible { background: var(--paper); color: var(--ink); transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0,0,0,.22); }
.sc-fab:hover .e, .sc-fab:focus-visible .e { max-width: 220px; opacity: 1; }
.sc-fab:hover svg { transform: translateX(6px); }
.sc-pop { position: fixed; z-index: 71; right: calc(120px * var(--z)); bottom: calc(108px * var(--z)); zoom: var(--z); width: 300px;
  background: var(--paper); color: var(--ink); border: 1px solid var(--ink); font-family: "Gilroy", "Outfit", sans-serif;
  box-shadow: 0 18px 50px rgba(0,0,0,.16); opacity: 0; transform: translateY(14px); transition: opacity .45s var(--soft), transform .45s var(--soft); }
.sc-pop.on { opacity: 1; transform: none; }
.sc-pop[hidden] { display: none; }
.sc-pop h2 { margin: 0; height: 66px; display: flex; align-items: center; justify-content: center; font: 400 20px/1 "Gilroy", "Outfit", sans-serif;
  letter-spacing: 6.2px; text-transform: uppercase; border-bottom: 1px solid var(--ink); }
.sc-x { position: absolute; right: 8px; top: 6px; width: 28px; height: 28px; border: 0; background: none; color: var(--ink); font: 300 22px/1 "Outfit", sans-serif; cursor: pointer; opacity: .6; }
.sc-x:hover { opacity: 1; }
.sc-intro { margin: 18px 21px 16px; font: 400 13px/1.35 "Gilroy", "Outfit", sans-serif; }
.sc-form { display: flex; flex-direction: column; gap: 19px; padding: 0 21px; }
.sc-form input, .sc-form textarea { width: 100%; box-sizing: border-box; border: 1px solid rgba(54,54,54,.6); background: transparent; color: var(--ink);
  font: 400 13px/1.3 "Gilroy", "Outfit", sans-serif; padding: 10px 8px; border-radius: 0; outline: none; transition: border-color .3s; }
.sc-form textarea { height: 113px; resize: none; }
.sc-form input:focus, .sc-form textarea:focus { border-color: var(--ink); }
.sc-form ::placeholder { color: rgba(54,54,54,.55); }
.sc-send { display: flex; justify-content: space-between; align-items: center; margin-top: -9px; }
.sc-send button { font: 400 9.8px/1 "Gilroy", "Outfit", sans-serif; letter-spacing: 3px; text-transform: uppercase; color: var(--ink); background: none;
  border: 1px solid rgba(54,54,54,.6); padding: 8px 12px; cursor: pointer; transition: background .3s, color .3s; }
.sc-send button:hover { background: var(--ink); color: var(--paper); }
.sc-status { margin: 0; font-size: 11px; opacity: .7; }
.sc-mail { display: flex; align-items: center; gap: 12px; margin-top: 22px; padding: 16px 21px; border-top: 1px solid var(--ink); color: var(--ink); text-decoration: none; font-size: 13px; }
.sc-mail small { display: block; font-size: 9.8px; letter-spacing: 3px; opacity: .55; margin-bottom: 5px; }
.sc-soc { display: flex; justify-content: center; gap: 16px; padding: 16px; border-top: 1px solid var(--ink); }
.sc-soc a { width: 44px; height: 44px; border-radius: 50%; border: 1px solid var(--ink); display: flex; align-items: center; justify-content: center; transition: background .3s; }
/* Every button in the popup turns negative under the mouse. */
.sc-soc a img, .sc-mail img { transition: filter .3s; }
.sc-soc a:hover, .sc-soc a:focus-visible { background: var(--ink); }
.sc-soc a:hover img, .sc-soc a:focus-visible img { filter: brightness(0) invert(.95); }
.sc-mail { transition: background .3s, color .3s; }
.sc-mail:hover, .sc-mail:focus-visible { background: var(--ink); color: var(--paper); }
.sc-mail:hover img, .sc-mail:focus-visible img { filter: invert(1) brightness(1.15); }
.sc-x { border-radius: 50%; transition: background .3s, color .3s, opacity .3s; }
.sc-x:hover, .sc-x:focus-visible { background: var(--ink); color: var(--paper); }
.sc-send button:focus-visible { background: var(--ink); color: var(--paper); }
.sc-fab { cursor: pointer; }
.sc-fab[aria-expanded="true"] { background: var(--paper); color: var(--ink); }
.sc-fab[aria-expanded="true"] svg { transform: rotate(-90deg); }
.sc-fab.away { opacity: 0; transform: translateY(24px); pointer-events: none; }
.sc-fab { transition: background .5s var(--soft), color .5s var(--soft), transform .6s var(--soft), box-shadow .5s var(--soft), opacity .6s var(--soft); }
"""

CONTACT_JS = """
(function () {
  var fab = document.querySelector('.sc-fab'), pop = document.getElementById('sc-pop');
  function openPop(on) {
    fab.setAttribute('aria-expanded', on); if (on) { pop.hidden = false; requestAnimationFrame(function () { pop.classList.add('on'); }); pop.querySelector('input').focus({ preventScroll: true }); }
    else { pop.classList.remove('on'); setTimeout(function () { if (!pop.classList.contains('on')) pop.hidden = true; }, 450); }
  }
  fab.addEventListener('click', function () { openPop(fab.getAttribute('aria-expanded') !== 'true'); });
  pop.querySelector('.sc-x').addEventListener('click', function () { openPop(false); fab.focus(); });
  addEventListener('keydown', function (e) { if (e.key === 'Escape' && fab.getAttribute('aria-expanded') === 'true') { openPop(false); fab.focus(); } });
  document.addEventListener('click', function (e) { if (fab.getAttribute('aria-expanded') === 'true' && !pop.contains(e.target) && !fab.contains(e.target)) openPop(false); });
  var form = pop.querySelector('form'), st = pop.querySelector('.sc-status');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.checkValidity()) { st.textContent = 'Please fill in all three fields.'; return; }
    st.textContent = 'Sending\\u2026';
    fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
      .then(function (r) { if (!r.ok) throw 0; form.reset(); st.textContent = 'Thank you, message sent.'; })
      .catch(function () { st.textContent = 'Could not send. Please email me instead.'; });
  });
  // Artwork pages: the button shows only at the start and slips away once you scroll past the opening section.
  var away = +document.body.dataset.fabHide;
  if (away) {
    var check = function () {
      var z = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--z')) || 1, gone = scrollY / z > away;
      fab.classList.toggle('away', gone);
      if (gone && fab.getAttribute('aria-expanded') === 'true') openPop(false);
    };
    addEventListener('scroll', check, { passive: true }); check();
  }
})();
"""

# The fixed paper strip behind the header, with the Portfolio page's top-bar lines and joints.
_L = '<i class="hl" style="top:{}px"></i>'
_V = '<i class="vl" style="left:{}px;top:{}px;height:{}px"></i>'
_J = '<i class="j" style="left:{}px;top:{}px"></i>'
MASK = ('<div class="ar-mask" aria-hidden="true">' + _L.format(130) + _L.format(180)
        + _V.format(87, 58, 122) + _V.format(698, 58, 72) + _V.format(783, 58, 72) + _V.format(1390, 58, 122)
        + "".join(_J.format(x - 2, 128) for x in (87, 698, 783, 1390)) + _J.format(85, 178) + _J.format(1388, 178) + '</div>')

FAB = ('<button class="sc-fab" type="button" aria-haspopup="dialog" aria-controls="sc-pop" aria-expanded="false"><span class="t">Contact me</span>'
       '<svg viewBox="0 0 38 34" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M0 17h36M20 1l16 16-16 16"/></svg></button>')

ICONS = [("Behance", "https://www.behance.net/noajablon", "assets/img/1a710c2d6f4a60.svg", 22, 14),
         ("Instagram", "https://www.instagram.com/noaj.creative/", "assets/img/d0d99ff10c0164.svg", 23, 23),
         ("LinkedIn", "https://www.linkedin.com/in/noajablon/", "assets/img/373fad069254eb.svg", 21, 20)]


def popup():
    soc = "".join(f'<a href="{u}" target="_blank" rel="noopener" aria-label="{t}"><img src="{src}" alt="" width="{w}" height="{h}"></a>'
                  for t, u, src, w, h in ICONS)
    return f"""<div class="sc-pop" id="sc-pop" role="dialog" aria-modal="false" aria-labelledby="sc-pop-h" hidden>
<button class="sc-x" type="button" aria-label="Close">&times;</button>
<h2 id="sc-pop-h">Contact me</h2>
<p class="sc-intro">Have a project in mind? Get in touch \u2014 I\u2019ll be happy to discuss the details of our cooperation.</p>
<form class="sc-form" action="https://formspree.io/f/mgaoayek" method="POST" novalidate>
<input name="name" type="text" placeholder="Name and Surname" aria-label="Name and Surname" autocomplete="name" required>
<input name="email" type="email" placeholder="Email" aria-label="Email" autocomplete="email" required>
<textarea name="message" placeholder="Message" aria-label="Message" required></textarea>
<div class="sc-send"><p class="sc-status" aria-live="polite"></p><button type="submit">Send</button></div>
</form>
<a class="sc-mail" href="mailto:noajablon@gmail.com"><img src="assets/img/3f7ea14da518cf.webp" alt="" width="44" height="44"><span><small>EMAIL</small>noajablon@gmail.com</span></a>
<div class="sc-soc">{soc}</div>
</div>"""


