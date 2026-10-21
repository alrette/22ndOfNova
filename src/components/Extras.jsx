import { useEffect, useRef, useState } from 'react';
import { finale, moreSongs, reply, song, ui } from '../content';
import { asset } from '../hooks';
import { PREVIEW } from '../preview';
import { music, sfx } from '../fx/sound';

const missing = (what) => <span className="preview-missing">{ui.previewMissing(what)}</span>;

// One last photo on the birthday screen.
export function FinalePhoto() {
  if (!finale.photo && !PREVIEW) return null;
  return (
    <figure className="finale-photo">
      <div className="finale-photo-frame">
        {finale.photo ? (
          <img src={asset(finale.photo)} alt={finale.photoAlt || ''} style={{ objectPosition: finale.focus || '50% 40%' }} />
        ) : (
          missing('finale.photo')
        )}
      </div>
      {finale.photoCaption && <figcaption>{finale.photoCaption}</figcaption>}
    </figure>
  );
}

const spotifyId = (url) =>
  /open\.spotify\.com\/(?:intl-[a-z]+\/)?(track|album|playlist)\/([A-Za-z0-9]+)/.exec(url || '');
const spotifyEmbed = (url) => {
  const m = spotifyId(url);
  return m ? `https://open.spotify.com/embed/${m[1]}/${m[2]}?theme=0` : '';
};
const spotifyUri = (url) => {
  const m = spotifyId(url);
  return m ? `spotify:${m[1]}:${m[2]}` : '';
};

let apiReady;
// Loaded on the first tap only. Rejects if the script is blocked or never answers.
function spotifyApi() {
  apiReady ||= new Promise((resolve, reject) => {
    window.onSpotifyIframeApiReady = resolve;
    const s = document.createElement('script');
    s.src = 'https://open.spotify.com/embed/iframe-api/v1';
    s.async = true;
    s.onerror = reject;
    document.body.append(s);
    setTimeout(reject, 8000);
  });
  return apiReady;
}

// Our song, then any others that remind him of her: one player, a list to choose from.
// Nothing loads from Spotify until she taps the button.
// The background music steps aside while a song plays (or while the plain embed is open).
export function SongButton() {
  const [open, setOpen] = useState(false);
  const [plain, setPlain] = useState(false); // the Spotify API failed: fall back to a plain iframe
  const [pick, setPick] = useState(0);
  const host = useRef(null);
  const list = [song, ...(moreSongs || [])].filter((s) => s && spotifyUri(s.spotifyUrl));
  const cur = list[pick];
  const src = spotifyEmbed(cur?.spotifyUrl);
  const uri = spotifyUri(cur?.spotifyUrl);

  useEffect(() => {
    if (!open || !uri) return undefined;
    let dead = false;
    let controller;
    let holding = false;
    const hold = (on) => {
      if (on === holding) return;
      holding = on;
      if (on) music.fadeOut('song');
      else music.fadeIn('song');
    };
    spotifyApi()
      .then((api) => {
        if (dead) return;
        api.createController(host.current, { uri, width: '100%', height: 80 }, (c) => {
          if (dead) {
            c.destroy();
            return;
          }
          controller = c;
          c.addListener('playback_update', ({ data: d }) => {
            if ((d.duration > 0 && d.position >= d.duration) || d.isPaused) hold(false);
            else if (d.isPaused === false) hold(true);
          });
        });
      })
      .catch(() => {
        if (dead) return;
        setPlain(true);
        hold(true);
      });
    return () => {
      dead = true;
      controller?.destroy();
      hold(false);
    };
  }, [open, uri]);

  if (!src && !PREVIEW) return null;
  if (!open) {
    return (
      <button
        type="button"
        className="btn btn-ghost song-btn"
        onClick={() => {
          sfx.chime(2);
          setOpen(true);
        }}
      >
        {ui.songOpen}
      </button>
    );
  }
  return (
    <div className="song">
      {!src && missing('song.spotifyUrl')}
      {/* Keyed wrapper: Spotify swaps the inner div for its iframe, so each song gets a fresh one. */}
      {src && !plain && (
        <div key={uri}>
          <div ref={host} />
        </div>
      )}
      {src && plain && (
        <iframe
          key={src}
          title={`${cur.title} by ${cur.artist}`}
          src={src}
          width="100%"
          height="80"
          allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      )}
      {list.length > 1 && (
        <div className="song-list">
          <p className="song-list-title">{ui.moreSongs}</p>
          <ol>
            {list.map((s, i) => (
              <li key={s.spotifyUrl}>
                <button
                  type="button"
                  className={`song-pick ${i === pick ? 'is-on' : ''}`}
                  aria-pressed={i === pick}
                  onClick={() => setPick(i)}
                >
                  <span className="song-name">
                    {s.title} <small>{s.artist}</small>
                  </span>
                  {s.why && <span className="song-why">{s.why}</span>}
                </button>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

// Her way back to him, at the end of the letter.
export function ReplyButton() {
  const phone = (reply.phone || '').replace(/\D/g, '');
  if (!phone) return PREVIEW ? <p className="reply">{missing('reply.phone')}</p> : null;
  const href = `https://wa.me/${phone}${reply.message ? `?text=${encodeURIComponent(reply.message)}` : ''}`;
  return (
    <p className="reply">
      <a className="btn btn-ink" href={href} target="_blank" rel="noopener noreferrer">
        {reply.label}
      </a>
    </p>
  );
}
