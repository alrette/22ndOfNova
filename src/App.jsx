import { useEffect, useMemo, useRef, useState } from 'react';
import { stars, video, ui } from './content';
import { useMedia, useReducedMotion } from './hooks';
import { clearProgress, introSeen, loadProgress, markIntroSeen, saveProgress } from './store';
import { centerOf, fx, fxState } from './fx/bus';
import Ambient from './fx/Ambient';
import Touch from './fx/Touch';
import { music, sfx } from './fx/sound';
import Intro from './components/Intro';
import Bar from './components/Bar';
import Sky from './components/Sky';
import Panel from './components/Panel';
import Finale from './components/Finale';
import Letter from './components/Letter';
import VideoModal from './components/VideoModal';

const IDS = stars.map((s) => s.id);
const SECRET_AFTER = 3; // stars opened before the faint star shows up
const starEl = (id) => document.querySelector(`.sky [data-star="${id}"]`);

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
  const [travel, setTravel] = useState(null); // { from, to, key } while a comet flies to the next star
  const [aligning, setAligning] = useState(false);
  const [finaleOpen, setFinaleOpen] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(sfx.enabled);
  const timers = useRef([]);

  const hasVideo = Boolean(video.src);
  const allVisited = IDS.every((id) => visited.includes(id));
  const secretUnlocked = visited.length >= SECRET_AFTER || secretFound;

  const later = (fn, ms) => {
    timers.current.push(setTimeout(fn, ms));
  };
  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  useEffect(() => clearTimers, []);

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
    music.duck(letterOpen ? 0.6 : 1);
  }, [letterOpen]);
  useEffect(() => {
    fxState.panelOpen = openId !== null || aligning;
  }, [openId, aligning]);

  // A phone sheet or dialog covers the sky, so the page behind it stays put.
  useEffect(() => {
    const lock = phase === 'intro' || (!isDesktop && (openId || finaleOpen || letterOpen || videoOpen));
    document.documentElement.classList.toggle('locked', Boolean(lock));
  }, [phase, isDesktop, openId, finaleOpen, letterOpen, videoOpen]);

  // On a phone, bring a point of the tall sky into the given share of the screen.
  const scrollSkyTo = (y, share) => {
    if (isDesktop) return;
    // A locked page ignores scrolling, so lift the lock for one instant jump.
    const root = document.documentElement;
    const locked = root.classList.contains('locked');
    root.classList.remove('locked');
    window.scrollTo({ top: Math.max(0, y - window.innerHeight * share), behavior: reduced || locked ? 'auto' : 'smooth' });
    if (locked) root.classList.add('locked');
  };

  // withSound: true or false from the two opening buttons, undefined from "Skip intro".
  const enterSky = (withSound) => {
    if (phase !== 'intro') return;
    markIntroSeen();
    if (withSound !== undefined) {
      sfx.setEnabled(withSound);
      setSoundOn(withSound);
      if (withSound) music.start(reduced ? 0 : 2); // the fade waits out the warp
    }
    sfx.warp();
    if (reduced) {
      setRevealed(true);
      setPhase('sky');
      return;
    }
    const c = centerOf(document.querySelector('.intro-spark'));
    fx.emit('warp', c);
    fx.emit('nova', { ...c, tone: 'blue', scale: 1.1 });
    setPhase('leaving');
    later(() => setRevealed(true), 650);
    later(() => setPhase('sky'), 2100);
  };

  const openStar = (id, el = starEl(id)) => {
    if (id === 'secret') setSecretFound(true);
    else setVisited((v) => (v.includes(id) ? v : [...v, id]));
    if (id === 'secret') sfx.secret();
    else sfx.chime(IDS.indexOf(id));
    setOpenId(id);
    setShownId(id);
    setMenuOpen(false);
    if (el) {
      const r = el.getBoundingClientRect();
      // The phone sheet leaves the top third of the sky visible: put the star there.
      scrollSkyTo(window.scrollY + r.top + r.height / 2, 0.17);
      if (!reduced) {
        const c = centerOf(el);
        fx.emit('pull', c);
        fx.emit('flare', c);
      }
    }
  };

  const openFinale = () => {
    setFinaleSeen(true);
    setFinaleOpen(true);
  };

  // The ending: every line flares in turn, light gathers, then the birthday screen.
  const playAlignment = () => {
    clearTimers();
    setMenuOpen(false);
    sfx.align();
    if (reduced) {
      openFinale();
      return;
    }
    const sky = document.getElementById('sky');
    if (sky) {
      const r = sky.getBoundingClientRect();
      scrollSkyTo(window.scrollY + r.top + r.height * 0.4, 0.5);
    }
    setAligning(true);
    later(() => fx.emit('nova', { x: window.innerWidth / 2, y: window.innerHeight * 0.45, scale: 1.2 }), 1700);
    later(() => {
      setAligning(false);
      openFinale();
    }, 2500);
  };

  const closePanel = () => {
    const id = openId;
    setOpenId(null);
    setTravel(null);
    sfx.close();
    requestAnimationFrame(() => {
      document.querySelector(`[data-star="${id}"]`)?.focus({ preventScroll: true });
    });
    if (!finaleSeen && allVisited) {
      clearTimers();
      later(playAlignment, 600);
    }
  };

  const nextId = (() => {
    const i = IDS.indexOf(shownId);
    return i >= 0 && i < IDS.length - 1 ? IDS[i + 1] : null;
  })();
  const nextStar = stars.find((s) => s.id === nextId);
  const nextLabel = nextStar ? ui.nextStar : !finaleSeen && allVisited ? ui.seeSky : ui.backToSky;

  // Next star: a comet runs along the constellation line, then the next story opens.
  const goNext = () => {
    if (!nextId) {
      closePanel();
      return;
    }
    if (reduced) {
      openStar(nextId);
      return;
    }
    clearTimers();
    const from = shownId;
    setTravel({ from, to: nextId, key: Date.now() });
    sfx.comet();
    if (!isDesktop) {
      setOpenId(null);
      const a = starEl(from)?.getBoundingClientRect();
      const b = starEl(nextId)?.getBoundingClientRect();
      if (a && b) scrollSkyTo(window.scrollY + (a.top + b.top) / 2, 0.5);
    }
    later(
      () => {
        setTravel(null);
        openStar(nextId);
      },
      isDesktop ? 1250 : 1750,
    );
  };

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

  const openLetter = () => {
    setMenuOpen(false);
    setFinaleOpen(false);
    setLetterOpen(true);
    sfx.paper();
  };

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
        onLetter={openLetter}
        onVideo={() => {
          setMenuOpen(false);
          setVideoOpen(true);
        }}
        onReplay={playAlignment}
        soundOn={soundOn}
        onToggleSound={() => {
          sfx.setEnabled(!soundOn);
          setSoundOn(!soundOn);
          if (!soundOn) {
            sfx.tick();
            music.start();
          }
        }}
      />

      <main className="stage">
        <Sky
          isDesktop={isDesktop}
          reduced={reduced}
          visited={visited}
          secretFound={secretFound}
          secretUnlocked={secretUnlocked}
          openId={openId}
          travel={travel}
          aligning={aligning}
          revealed={revealed}
          finaleSeen={finaleSeen}
          onOpen={openStar}
        />
        <Panel
          id={shownId}
          open={openId !== null}
          traveling={Boolean(travel)}
          isDesktop={isDesktop}
          onClose={closePanel}
          onNext={goNext}
          nextLabel={nextLabel}
          nextHint={nextStar?.label}
        />
      </main>

      {phase !== 'sky' && <Intro onEnter={enterSky} leaving={phase === 'leaving'} reduced={reduced} />}

      {finaleOpen && (
        <Finale
          hasVideo={hasVideo}
          reduced={reduced}
          onClose={() => setFinaleOpen(false)}
          onLetter={openLetter}
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
