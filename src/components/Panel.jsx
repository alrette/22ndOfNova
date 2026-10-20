import { useEffect, useRef, useState } from 'react';
import { stars, ui } from '../content';
import { useFocusTrap } from '../hooks';
import { STORIES, Secret } from './Stories';
import { Divider } from './Ornament';
import Sparkle from './Sparkle';

export default function Panel({ id, open, traveling, isDesktop, onClose, onNext, nextLabel, nextHint }) {
  const ref = useRef(null);
  const scroller = useRef(null);
  // On a phone the sheet opens to two thirds, leaving the sky in view, and grows when she reads on.
  const [expanded, setExpanded] = useState(false);
  // On a phone the sheet covers the sky, so it behaves like a dialog.
  useFocusTrap(ref, open && !isDesktop);

  useEffect(() => {
    if (!open) return;
    setExpanded(false);
    scroller.current?.scrollTo({ top: 0 });
    if (isDesktop) {
      requestAnimationFrame(() => document.getElementById('panel-title')?.focus({ preventScroll: true }));
    }
  }, [open, id, isDesktop]);

  const star = stars.find((s) => s.id === id);
  const Story = STORIES[id];
  const isSecret = id === 'secret';

  return (
    <aside
      ref={ref}
      className="panel"
      data-open={open}
      data-wide={id === 'moments'}
      data-expanded={expanded}
      data-traveling={traveling}
      role="dialog"
      aria-modal={open && !isDesktop ? 'true' : undefined}
      aria-labelledby="panel-title"
      inert={!open}
      tabIndex={-1}
    >
      {open && <span key={id} className="panel-seam" aria-hidden="true" />}
      <div className="panel-bar">
        {!isDesktop && (
          <button
            type="button"
            className="panel-handle"
            aria-label={expanded ? ui.collapse : ui.expand}
            aria-expanded={expanded}
            onClick={() => setExpanded((v) => !v)}
          />
        )}
        <span className="panel-name">
          {!isSecret && <Sparkle className="panel-name-star" />}
          {isSecret ? '' : star?.label}
        </span>
        <button type="button" className="icon-btn" aria-label={ui.close} onClick={onClose} data-autofocus>
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      <div
        className="panel-scroll"
        ref={scroller}
        onScroll={(e) => {
          if (!isDesktop && !expanded && e.currentTarget.scrollTop > 24) setExpanded(true);
        }}
      >
        <div className="panel-body" key={id}>
          {isSecret ? <Secret /> : Story && <Story star={star} />}
          <div className="panel-foot">
            <Divider />
            <button type="button" className="btn btn-ghost next" onClick={isSecret ? onClose : onNext}>
              <span>{isSecret ? ui.backToSky : nextLabel}</span>
              {!isSecret && nextHint && <small>{nextHint}</small>}
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
