import { useEffect, useRef } from 'react';
import { video, ui } from '../content';
import { asset, useFocusTrap } from '../hooks';
import { music } from '../fx/sound';

// Never autoplays. Metadata only until she presses play, so it costs nothing on a phone plan.
export default function VideoModal({ onClose }) {
  const ref = useRef(null);
  useFocusTrap(ref);
  // Closing the dialog mid-video fires no pause event we can hear, so release the music here.
  useEffect(() => music.fadeIn, []);
  return (
    <div
      className="overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="video-card" role="dialog" aria-modal="true" aria-label={video.title} ref={ref} tabIndex={-1}>
        <button type="button" className="icon-btn video-close" aria-label={ui.close} onClick={onClose} data-autofocus>
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
        <video
          controls
          playsInline
          preload="metadata"
          poster={asset(video.poster) || undefined}
          src={asset(video.src)}
          onPlay={music.fadeOut}
          onPause={music.fadeIn}
          onEnded={music.fadeIn}
        >
          {video.captions && (
            <track kind="captions" src={asset(video.captions)} srcLang="en" label="English" default />
          )}
        </video>
      </div>
    </div>
  );
}
