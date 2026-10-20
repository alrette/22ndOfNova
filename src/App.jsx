import { useEffect, useMemo, useRef, useState } from 'react';
import { stars, video, ui } from './content';
import { useMedia, useReducedMotion } from './hooks';
import { clearProgress, introSeen, loadProgress, markIntroSeen, saveProgress } from './store';
import { fx, fxState } from './fx/bus';
import Ambient from './fx/Ambient';
import Touch from './fx/Touch';
import Intro from './components/Intro';
import Bar from './components/Bar';
import Sky from './components/Sky';
import Panel from './components/Panel';
import Finale from './components/Finale';
import Letter from './components/Letter';
import VideoModal from './components/VideoModal';

const IDS = stars.map((s) => s.id);
const SECRET_AFTER = 3; // stars opened before the faint star shows up

export default function App() {
  const isDesktop = useMedia('(min-width: 900px)');
  const reduced = useReducedMotion();
  const [vw, setVw] = useState(window.innerWidth);

  const init = useMemo(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.has('reset')) {
      clearProgress();
      url.searchParams.delete('reset');
      window.history.replaceState({}, '', url);
    }
    return { ...loadProgress(), intro: introSeen() };
  }, []);

  const [phase, setPhase] = useState(init.intro ? 'sky' : 'intro'); // intro | leaving | sky
  const [revealed, setRevealed] = useState(init.intro);
  const [visited, setVisited] = useState(init.visited);
  const [secretFound, setSecretFound] = useState(init.secretFound);
  const [finaleSeen, setFinaleSeen] = useState(init.finaleSeen);
  const [openId, setOpenId] = useState(null);
  const [shownId, setShownId] = useState('first-light');
  const [finaleOpen, setFinaleOpen] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const finaleTimer = useRef(0);

  const hasVideo = Boolean(video.src);
  const allVisited = IDS.every((id) => visited.includes(id));
  const secretUnlocked = visited.length >= SECRET_AFTER || secretFound;

  useEffect(() => {
    const on = () => setVw(window.innerWidth);
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, []);

  useEffect(() => {
    saveProgress({ visited, secretFound, finaleSeen });
  }, [visited, secretFound, finaleSeen]);

  useEffect(() => {
    fxState.calm = letterOpen || videoOpen;
  }, [letterOpen, videoOpen]);
  useEffect(() => {
    fxState.panelOpen = openId !== null;
  }, [openId]);

  // A phone sheet or dialog covers the sky, so the page behind it stays put.
  useEffect(() => {
    const lock = phase === 'intro' || (!isDesktop && (openId || finaleOpen || letterOpen || videoOpen));
    document.documentElement.classList.toggle('locked', Boolean(lock));
  }, [phase, isDesktop, openId, finaleOpen, letterOpen, videoOpen]);

  const enterSky = () => {
    if (phase !== 'intro') return;
    markIntroSeen();
    setRevealed(true);
    if (reduced) {
      setPhase('sky');
    } else {
      setPhase('leaving');
      setTimeout(() => setPhase('sky'), 1500);
    }
  };

  const openStar = (id, el) => {
    if (id === 'secret') setSecretFound(true);
    else setVisited((v) => (v.includes(id) ? v : [...v, id]));
    setOpenId(id);
    setShownId(id);
    setMenuOpen(false);
    if (el) {
      const r = el.getBoundingClientRect();
      fx.emit('pull', { x: r.left + r.width / 2, y: r.top + r.height / 2 });
    }
  };

  const openFinale = () => {
    setFinaleSeen(true);
    setFinaleOpen(true);
  };

  const closePanel = () => {
    const id = openId;
    setOpenId(null);
    requestAnimationFrame(() => {
      document.querySelector(`[data-star="${id}"]`)?.focus({ preventScroll: true });
    });
    if (!finaleSeen && allVisited) {
      clearTimeout(finaleTimer.current);
      finaleTimer.current = setTimeout(openFinale, 700);
    }
  };

  const nextId = (() => {
    const i = IDS.indexOf(shownId);
    return i >= 0 && i < IDS.length - 1 ? IDS[i + 1] : null;
  })();
  const nextStar = stars.find((s) => s.id === nextId);
  const nextLabel = nextStar ? ui.nextStar : !finaleSeen && allVisited ? ui.seeSky : ui.backToSky;

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      if (letterOpen) setLetterOpen(false);
      else if (videoOpen) setVideoOpen(false);
      else if (finaleOpen) setFinaleOpen(false);
      else if (menuOpen) setMenuOpen(false);
      else if (openId) closePanel();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const wide = shownId === 'moments';
  const target = isDesktop ? Math.round(wide ? Math.min(vw * 0.62, 880) : Math.min(vw * 0.44, 620)) : 0;
  const stageStyle = {
    '--panel-target': `${target}px`,
    '--panel-px': `${openId ? target : 0}px`,
  };

  return (
    <div
      className="app"
      style={stageStyle}
      data-phase={phase}
      data-calm={letterOpen || videoOpen ? 'true' : 'false'}
      data-wide={wide}
    >
      <Ambient reduced={reduced} />

      <Bar
        visited={visited}
        hasVideo={hasVideo}
        allVisited={allVisited}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        onOpenStar={(id) => openStar(id)}
        onLetter={() => {
          setMenuOpen(false);
          setLetterOpen(true);
        }}
        onVideo={() => {
          setMenuOpen(false);
          setVideoOpen(true);
        }}
        onReplay={() => {
          setMenuOpen(false);
          setFinaleOpen(true);
        }}
      />

      <main className="stage">
        <Sky
          isDesktop={isDesktop}
          visited={visited}
          secretFound={secretFound}
          secretUnlocked={secretUnlocked}
          openId={openId}
          revealed={revealed}
          finaleSeen={finaleSeen}
          onOpen={openStar}
        />
        <Panel
          id={shownId}
          open={openId !== null}
          isDesktop={isDesktop}
          onClose={closePanel}
          onNext={() => (nextId ? openStar(nextId) : closePanel())}
          nextLabel={nextLabel}
          nextHint={nextStar?.label}
        />
      </main>

      {phase !== 'sky' && <Intro onEnter={enterSky} leaving={phase === 'leaving'} reduced={reduced} />}

      {finaleOpen && (
        <Finale
          hasVideo={hasVideo}
          onClose={() => setFinaleOpen(false)}
          onLetter={() => {
            setFinaleOpen(false);
            setLetterOpen(true);
          }}
          onVideo={() => {
            setFinaleOpen(false);
            setVideoOpen(true);
          }}
        />
      )}
      {letterOpen && <Letter onClose={() => setLetterOpen(false)} />}
      {videoOpen && <VideoModal onClose={() => setVideoOpen(false)} />}

      <Touch reduced={reduced} />
    </div>
  );
}
