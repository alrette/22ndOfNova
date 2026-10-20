import { useState } from 'react';
import { finale, reply, song, ui } from '../content';
import { asset } from '../hooks';
import { PREVIEW } from '../preview';
import { sfx } from '../fx/sound';

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

const spotifyEmbed = (url) => {
  const m = /open\.spotify\.com\/(?:intl-[a-z]+\/)?(track|album|playlist)\/([A-Za-z0-9]+)/.exec(url || '');
  return m ? `https://open.spotify.com/embed/${m[1]}/${m[2]}?theme=0` : '';
};

// Our song: nothing loads from Spotify until she taps the button.
export function SongButton() {
  const [open, setOpen] = useState(false);
  const src = spotifyEmbed(song.spotifyUrl);
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
      {src ? (
        <iframe
          title={`${song.title} by ${song.artist}`}
          src={src}
          width="100%"
          height="80"
          allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      ) : (
        missing('song.spotifyUrl')
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
