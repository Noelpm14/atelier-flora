import React, { useState, useEffect, useRef } from 'react';
import './App.css';

// Botanical Palette & Distinct Colors
const FLOWER_COLORS: Record<string, string[]> = {
  rose: ['#E11D48', '#BE123C', '#FB7185', '#FFFFFF', '#FCD34D'],
  tulip: ['#FFFFFF', '#E11D48', '#FB7185', '#F97316', '#A855F7'],
  peony: ['#FB7185', '#FDA4AF', '#BE123C', '#FFFFFF', '#E879F9'],
  daisy: ['#FFFFFF', '#FDE047', '#F472B6', '#C084FC', '#93C5FD'],
  babysbreath: ['#FFFFFF', '#FFF7ED', '#FBCFE8', '#BAE6FD'],
  eucalyptus: ['#6B8E62', '#4D7C59', '#7C9872', '#3D5A40'],
  ruscus: ['#2D5A27', '#3B7A33', '#1E3F1A', '#528E4A']
};

const VESSEL_COLORS = ['#BE123C', '#D4AF37', '#2E1C14', '#1E1E1E', '#E2DCD5', '#284632'];

const NOTE_FONTS = [
  { id: "'Cormorant Garamond', Georgia, serif", name: 'Serif Classic' },
  { id: "'Alex Brush', cursive", name: 'Calligraphy' },
  { id: "'Playfair Display', serif", name: 'Editorial' },
  { id: "'Montserrat', sans-serif", name: 'Minimal Modern' }
];

const PAPER_THEMES = [
  { id: 'noir', name: 'Noir Glass', bg: 'rgba(0, 0, 0, 0.45)', ink: '#FCF8F2' },
  { id: 'vellum', name: 'Warm Vellum', bg: '#F6EFE6', ink: '#2E1C14' },
  { id: 'rose', name: 'Dusty Rose', bg: '#3D1C24', ink: '#FCE7F3' },
  { id: 'parchment', name: 'Parchment', bg: '#EDE4D3', ink: '#1F1610' }
];

// Vector Botanicals & Detailed Fillers
const renderFlowerSVG = (type: string, color: string) => {
  const isWhite = color.toLowerCase() === '#ffffff';

  switch (type) {
    case 'rose':
      return (
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <circle cx="50" cy="50" r="44" fill={color} stroke={isWhite ? '#D8CFCE' : 'none'} strokeWidth="1.5" />
          <path d="M26 44 C26 22, 74 22, 74 44 C74 68, 26 68, 26 44 Z" fill="rgba(0,0,0,0.18)" />
          <circle cx="50" cy="50" r="28" fill={color} filter="brightness(1.12)" />
          <circle cx="50" cy="50" r="16" fill="rgba(0,0,0,0.22)" />
          <path d="M46 40 Q55 44 48 56" stroke={isWhite ? '#9E9291' : '#FFF'} strokeWidth="3.5" fill="none" opacity="0.65" strokeLinecap="round" />
        </svg>
      );
    case 'tulip':
      return (
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <path d="M50 12 C20 40 28 85 50 85 C72 85 80 40 50 12 Z" fill={color} stroke={isWhite ? '#D8CFCE' : 'none'} strokeWidth="1.5" />
          <path d="M50 20 C34 44 40 85 50 85 C60 85 66 44 50 20 Z" fill={isWhite ? '#ECE5E3' : 'rgba(255,255,255,0.3)'} />
          <path d="M50 28 Q58 55 50 85" stroke={isWhite ? '#B0A4A3' : 'rgba(0,0,0,0.18)'} strokeWidth="3" fill="none" />
        </svg>
      );
    case 'peony':
      return (
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <circle cx="50" cy="50" r="44" fill={color} filter="brightness(0.85)" stroke={isWhite ? '#D8CFCE' : 'none'} />
          <circle cx="50" cy="46" r="34" fill={color} />
          <circle cx="50" cy="44" r="24" fill={color} filter="brightness(1.15)" />
          <circle cx="50" cy="44" r="12" fill="#FBBF24" />
        </svg>
      );
    case 'daisy':
      return (
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <g fill={color} stroke="#C4B8B6" strokeWidth="1.2">
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
              <ellipse key={deg} cx="50" cy="50" rx="9" ry="36" transform={`rotate(${deg} 50 50)`} />
            ))}
          </g>
          <circle cx="50" cy="50" r="16" fill="#F59E0B" />
          <circle cx="47" cy="47" r="4" fill="#FDE68A" />
        </svg>
      );
    case 'babysbreath':
      return (
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <line x1="50" y1="92" x2="50" y2="55" stroke="#4D7C59" strokeWidth="2.5" />
          <line x1="50" y1="55" x2="22" y2="28" stroke="#4D7C59" strokeWidth="2" />
          <line x1="50" y1="55" x2="78" y2="28" stroke="#4D7C59" strokeWidth="2" />
          <line x1="50" y1="42" x2="50" y2="16" stroke="#4D7C59" strokeWidth="2" />
          <line x1="36" y1="41" x2="16" y2="48" stroke="#4D7C59" strokeWidth="1.5" />
          <line x1="64" y1="41" x2="84" y2="48" stroke="#4D7C59" strokeWidth="1.5" />
          {[
            [22, 28], [78, 28], [50, 16], [36, 41], [64, 41],
            [16, 48], [84, 48], [34, 18], [66, 18], [50, 34]
          ].map(([cx, cy], i) => (
            <g key={i}>
              <circle cx={cx} cy={cy} r="5.5" fill={color} stroke="#C4B8B6" strokeWidth="0.8" />
              <circle cx={cx} cy={cy} r="2" fill="#FEF08A" opacity="0.8" />
            </g>
          ))}
        </svg>
      );
    case 'eucalyptus':
      return (
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <line x1="50" y1="10" x2="50" y2="92" stroke="#2B3D24" strokeWidth="3.5" strokeLinecap="round" />
          <ellipse cx="28" cy="24" rx="19" ry="14" fill={color} transform="rotate(-22 28 24)" />
          <ellipse cx="72" cy="40" rx="19" ry="14" fill={color} filter="brightness(1.1)" transform="rotate(22 72 40)" />
          <ellipse cx="28" cy="58" rx="19" ry="14" fill={color} transform="rotate(-22 28 58)" />
          <ellipse cx="72" cy="74" rx="18" ry="13" fill={color} filter="brightness(1.1)" transform="rotate(22 72 74)" />
        </svg>
      );
    case 'ruscus':
    default:
      return (
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <path d="M50 92 Q48 50 50 10" stroke="#1B3815" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M50 15 C35 5 30 25 50 30 C70 25 65 5 50 15 Z" fill={color} />
          <path d="M49 32 C30 26 22 45 48 50 Z" fill={color} filter="brightness(0.9)" />
          <path d="M51 42 C70 36 78 55 52 60 Z" fill={color} filter="brightness(1.1)" />
          <path d="M49 58 C30 52 22 71 48 76 Z" fill={color} filter="brightness(0.9)" />
          <path d="M51 68 C70 62 78 81 52 86 Z" fill={color} filter="brightness(1.1)" />
        </svg>
      );
  }
};

// Layered Wraps with Vintage Kraft Brown Paper
const renderBackShell = (type: string, color: string) => {
  if (type === 'vintage') {
    return (
      <svg viewBox="0 0 400 500" width="100%" height="100%">
        <defs>
          <linearGradient id="kraftBack" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8A6343" />
            <stop offset="100%" stopColor="#5E3F27" />
          </linearGradient>
        </defs>
        {/* Layered folded antique paper flaps behind arrangement */}
        <polygon points="30,70 370,70 230,360 170,360" fill="url(#kraftBack)" />
        <polygon points="10,50 390,50 200,360" fill="#4D331E" opacity="0.45" />
        <line x1="30" y1="70" x2="200" y2="360" stroke="#442915" strokeWidth="1.5" opacity="0.6" />
        <line x1="370" y1="70" x2="200" y2="360" stroke="#442915" strokeWidth="1.5" opacity="0.6" />
      </svg>
    );
  }

  if (type === 'paper') {
    return (
      <svg viewBox="0 0 400 500" width="100%" height="100%">
        <polygon points="40,80 360,80 230,360 170,360" fill={color} filter="brightness(0.65)" />
        <polygon points="15,60 385,60 200,360" fill={color} opacity="0.3" />
      </svg>
    );
  }
  return null;
};

const renderFrontVessel = (type: string, color: string) => {
  if (type === 'vintage') {
    return (
      <svg viewBox="0 0 400 500" width="100%" height="100%">
        <defs>
          <linearGradient id="kraftFront" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#B38758" />
            <stop offset="50%" stopColor="#9C7246" />
            <stop offset="100%" stopColor="#754E2C" />
          </linearGradient>
          <linearGradient id="kraftFold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#754E2C" opacity="0.8" />
            <stop offset="100%" stopColor="#A87B4D" opacity="0.2" />
          </linearGradient>
        </defs>

        {/* Diagonal Envelope Creases (Classic European Kraft Wrap) */}
        <polygon points="45,210 355,210 230,360 170,360" fill="url(#kraftFront)" stroke="#5E3F27" strokeWidth="1.5" />
        <polygon points="45,210 200,360 170,360" fill="url(#kraftFold)" />
        <polygon points="355,210 200,360 230,360" fill="#694323" opacity="0.4" />
        
        {/* Lower Kraft Cone Stand */}
        <polygon points="170,360 230,360 260,465 140,465" fill="url(#kraftFront)" stroke="#5E3F27" strokeWidth="1" />
        
        {/* Handcrafted Rustic Jute Twine Ribbon Tie */}
        <g transform="translate(200, 360)">
          {/* Wrapped Twine Cord Band */}
          <rect x="-35" y="-10" width="70" height="18" rx="4" fill="#D9C3A5" stroke="#8C6D47" strokeWidth="1.5" />
          <line x1="-30" y1="-4" x2="30" y2="-4" stroke="#8C6D47" strokeWidth="1" strokeDasharray="3 2" />
          <line x1="-30" y1="2" x2="30" y2="2" stroke="#8C6D47" strokeWidth="1" strokeDasharray="3 2" />

          {/* Twine Bow Loops */}
          <path d="M-6,-2 C-35,-20 -60,-8 -40,10 C-20,20 -5,4 0,0 Z" fill="none" stroke="#D9C3A5" strokeWidth="4" strokeLinecap="round" />
          <path d="M6,-2 C35,-20 60,-8 40,10 C20,20 5,4 0,0 Z" fill="none" stroke="#D9C3A5" strokeWidth="4" strokeLinecap="round" />
          <path d="M-6,-2 C-35,-20 -60,-8 -40,10 C-20,20 -5,4 0,0 Z" fill="none" stroke="#8C6D47" strokeWidth="1.2" />
          <path d="M6,-2 C35,-20 60,-8 40,10 C20,20 5,4 0,0 Z" fill="none" stroke="#8C6D47" strokeWidth="1.2" />

          {/* Hanging Jute Tails */}
          <path d="M-4,4 Q-25,50 -45,85" fill="none" stroke="#D9C3A5" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M-4,4 Q-25,50 -45,85" fill="none" stroke="#8C6D47" strokeWidth="1" />
          <path d="M4,4 Q25,50 45,85" fill="none" stroke="#D9C3A5" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M4,4 Q25,50 45,85" fill="none" stroke="#8C6D47" strokeWidth="1" />

          {/* Center Knot */}
          <ellipse cx="0" cy="0" rx="9" ry="7" fill="#8C6D47" stroke="#D9C3A5" strokeWidth="1.5" />
        </g>
      </svg>
    );
  }

  if (type === 'paper') {
    return (
      <svg viewBox="0 0 400 500" width="100%" height="100%">
        <defs>
          <linearGradient id="paperWrapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} filter="brightness(1.15)" />
            <stop offset="100%" stopColor={color} filter="brightness(0.75)" />
          </linearGradient>
        </defs>
        <polygon points="60,220 340,220 225,360 175,360" fill="url(#paperWrapGrad)" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
        <polygon points="110,220 290,220 200,360" fill={color} filter="brightness(0.88)" />
        <polygon points="175,360 225,360 255,465 145,465" fill="url(#paperWrapGrad)" />
        <g transform="translate(200, 360)">
          <path d="M-40,-5 Q-80,-25 -70,-5 Q-60,15 -10,5 Z" fill="#D4AF37" />
          <path d="M40,-5 Q80,-25 70,-5 Q60,15 10,5 Z" fill="#D4AF37" />
          <path d="M-15,5 Q-40,65 -65,95 Q-42,82 -20,88 Q-5,45 0,10 Z" fill="#D4AF37" />
          <path d="M15,5 Q40,65 65,95 Q42,82 20,88 Q5,45 0,10 Z" fill="#D4AF37" />
          <ellipse cx="0" cy="0" rx="14" ry="11" fill="#B38F24" stroke="#FFF" strokeWidth="0.8" />
        </g>
      </svg>
    );
  }

  // Satin Ribbon Wrap
  return (
    <svg viewBox="0 0 400 500" width="100%" height="100%">
      <rect x="170" y="348" width="60" height="24" rx="8" fill={color} filter="brightness(0.6)" opacity="0.85" />
      <g transform="translate(200, 360)">
        <path d="M-20,0 Q-60,70 -90,110 Q-65,95 -40,105 Q-10,50 0,10 Z" fill={color} />
        <path d="M20,0 Q60,70 90,110 Q65,95 40,105 Q10,50 0,10 Z" fill={color} />
        <path d="M0,0 C-50,-35 -80,-10 -60,15 C-40,35 -10,15 0,0 Z" fill={color} stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        <path d="M0,0 C50,-35 80,-10 60,15 C40,35 10,15 0,0 Z" fill={color} stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        <ellipse cx="0" cy="0" rx="15" ry="12" fill={color} filter="brightness(0.8)" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
      </g>
    </svg>
  );
};

const BLOOM_TYPES = [
  { id: 'rose', name: 'Rose' },
  { id: 'tulip', name: 'Tulip' },
  { id: 'peony', name: 'Peony' },
  { id: 'daisy', name: 'Daisy' },
  { id: 'babysbreath', name: "Baby's Breath" },
  { id: 'eucalyptus', name: 'Eucalyptus' },
  { id: 'ruscus', name: 'Ruscus' },
];

interface PlacedBloom {
  id: number;
  type: string;
  color: string;
  rot: number;
  stemLength: number;
  scale: number;
  zIndex: number;
}

export default function App() {
  const [selectedType, setSelectedType] = useState('rose');
  const [selectedColor, setSelectedColor] = useState(FLOWER_COLORS['rose'][0]);
  const [containerType, setContainerType] = useState('vintage');
  const [vesselColor, setVesselColor] = useState(VESSEL_COLORS[0]);

  const [note, setNote] = useState('');
  const [selectedFont, setSelectedFont] = useState(NOTE_FONTS[0].id);
  const [paperTheme, setPaperTheme] = useState(PAPER_THEMES[0]);

  const [placedFlowers, setPlacedFlowers] = useState<PlacedBloom[]>([]);
  const [backupLayout, setBackupLayout] = useState<PlacedBloom[] | null>(null);
  const [isViewer, setIsViewer] = useState(false);
  const stageRef = useRef<HTMLDivElement | null>(null);

  const handleTypeChange = (typeId: string) => {
    setSelectedType(typeId);
    setSelectedColor(FLOWER_COLORS[typeId][0]);
  };

  useEffect(() => {
    if (window.location.hash) {
      try {
        const payload = JSON.parse(decodeURIComponent(atob(window.location.hash.slice(1))));
        setPlacedFlowers(payload.flowers || []);
        setNote(payload.note || '');
        setContainerType(payload.container || 'vintage');
        setVesselColor(payload.vesselColor || VESSEL_COLORS[0]);
        setSelectedFont(payload.font || NOTE_FONTS[0].id);
        const matchedTheme = PAPER_THEMES.find((t) => t.id === payload.themeId);
        if (matchedTheme) setPaperTheme(matchedTheme);
        setIsViewer(true);
      } catch (err) {
        console.error('Invalid URL payload', err);
      }
    }
  }, []);

  const handleStageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isViewer || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickY = ((e.clientY - rect.top) / rect.height) * 100;

    const dx = clickX - 50;
    const dy = 72 - clickY;

    const rot = Math.round((Math.atan2(dx, dy) * 180) / Math.PI);
    const stemLength = Math.max(80, Math.min(220, Math.round(Math.hypot(dx, dy) * 2.8)));

    setPlacedFlowers((prev) => {
      const highestZ = prev.reduce((max, f) => Math.max(max, f.zIndex || 0), 0);
      return [
        ...prev,
        {
          id: Date.now() + Math.random(),
          type: selectedType,
          color: selectedColor,
          rot,
          stemLength,
          scale: 0.95,
          zIndex: highestZ + 1,
        },
      ];
    });
  };

  const autoArrange = () => {
    if (!placedFlowers.length) return alert('Place some botanicals on the card first.');
    setBackupLayout([...placedFlowers]);

    const count = placedFlowers.length;

    const arranged = placedFlowers.map((flower, i) => {
      let rot = 0;
      let stemLength = 175;
      let scale = 1.05;
      let zIndex = 50;

      if (count > 1) {
        const isFiller = ['babysbreath', 'eucalyptus', 'ruscus'].includes(flower.type);
        const ring = isFiller ? (i % 2 === 0 ? 0 : 1) : (i % 3);
        const indexInRing = Math.floor(i / 3);
        const countInRing = Math.ceil(count / 3);

        const progress = countInRing > 1 ? (indexInRing / (countInRing - 1)) * 2 - 1 : 0;

        if (ring === 0) {
          rot = Math.round(progress * 38);
          stemLength = 200 - Math.abs(progress) * 22;
          scale = 0.92;
          zIndex = 10;
        } else if (ring === 1) {
          rot = Math.round(progress * 22 + (Math.random() * 4 - 2));
          stemLength = 160 - Math.abs(progress) * 16;
          scale = 1.0;
          zIndex = 25;
        } else {
          rot = Math.round(progress * 10);
          stemLength = 125;
          scale = 1.08;
          zIndex = 40;
        }
      }

      return {
        ...flower,
        rot,
        stemLength,
        scale,
        zIndex,
      };
    });

    setPlacedFlowers(arranged);
  };

  const revertAutoArrange = () => {
    if (backupLayout) {
      setPlacedFlowers(backupLayout);
      setBackupLayout(null);
    }
  };

  const handleShare = () => {
    if (!placedFlowers.length) return alert('Place some botanicals first.');
    const payload = {
      flowers: placedFlowers,
      note,
      container: containerType,
      vesselColor,
      font: selectedFont,
      themeId: paperTheme.id,
    };
    const data = btoa(encodeURIComponent(JSON.stringify(payload)));
    navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}#${data}`).then(() => {
      alert('Keepsake link copied to clipboard.');
    });
  };

  return (
    <>
      <header className="app-header">
        <div className="brand-badge">Atelier Flora</div>
        <h1>{isViewer ? 'A Curated Arrangement' : 'Bouquet Studio'}</h1>
        <p>{isViewer ? 'A bespoke botanical creation, arranged just for you.' : 'Curate custom botanicals, select tones, and compose a keepsake note.'}</p>
      </header>

      <div className="studio">
        {/* Left: Botanical Palette & Wrap Controls */}
        {!isViewer && (
          <section className="panel">
            <h2>Botanicals & Fillers</h2>
            <div className="flower-grid">
              {BLOOM_TYPES.map((b) => (
                <button
                  key={b.id}
                  className={`swatch ${selectedType === b.id ? 'selected' : ''}`}
                  onClick={() => handleTypeChange(b.id)}
                >
                  <div style={{ width: 32, height: 32 }}>{renderFlowerSVG(b.id, FLOWER_COLORS[b.id][0])}</div>
                  <span>{b.name}</span>
                </button>
              ))}
            </div>

            <div className="section-title">Petal Hue</div>
            <div className="color-row">
              {FLOWER_COLORS[selectedType].map((c) => (
                <div
                  key={c}
                  className={`color-dot ${selectedColor === c ? 'selected' : ''}`}
                  style={{ backgroundColor: c }}
                  onClick={() => setSelectedColor(c)}
                />
              ))}
            </div>

            <div className="section-title">Wrapping Style</div>
            <div className="wrap-options">
              {[
                { id: 'vintage', label: 'Vintage Kraft' },
                { id: 'paper', label: 'Color Wrap' },
                { id: 'ribbon', label: 'Satin Bow' },
              ].map((w) => (
                <button
                  key={w.id}
                  className={`wrap-btn ${containerType === w.id ? 'selected' : ''}`}
                  onClick={() => setContainerType(w.id)}
                >
                  {w.label}
                </button>
              ))}
            </div>

            {containerType !== 'vintage' && (
              <>
                <div className="section-title">Wrap & Bow Hue</div>
                <div className="color-row">
                  {VESSEL_COLORS.map((vc) => (
                    <div
                      key={vc}
                      className={`color-dot ${vesselColor === vc ? 'selected' : ''}`}
                      style={{ backgroundColor: vc }}
                      onClick={() => setVesselColor(vc)}
                    />
                  ))}
                </div>
              </>
            )}
          </section>
        )}

        {/* Center: Arrangement Stage */}
        <section className="panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2>Arrangement</h2>
          <div className="bouquet-stage" ref={stageRef} onClick={handleStageClick}>
            
            {/* Layer 1: Back Shell */}
            <div className="back-layer">
              {renderBackShell(containerType, vesselColor)}
            </div>

            {/* Layer 2: Flowers & Foliage */}
            <div className="flowers-layer">
              {placedFlowers.map((f, idx) => (
                <div
                  key={f.id || idx}
                  className="bloom-wrapper"
                  style={{
                    transform: `translate(-50%, -100%) rotate(${f.rot}deg) scale(${f.scale})`,
                    zIndex: f.zIndex || idx + 1,
                  } as React.CSSProperties}
                >
                  <div className="bloom-head" style={{ width: 54, height: 54 }}>
                    {renderFlowerSVG(f.type, f.color)}
                  </div>
                  <div className="bloom-stem" style={{ height: `${f.stemLength}px` }} />
                </div>
              ))}
            </div>

            {/* Layer 3: Front Wrap & Ties */}
            <div className="front-layer">
              {renderFrontVessel(containerType, vesselColor)}
            </div>
          </div>

          {!isViewer && (
            <div className="actions">
              <button className="btn arrange-btn" onClick={autoArrange}>Auto-Arrange</button>
              {backupLayout && (
                <button className="btn revert-btn" onClick={revertAutoArrange}>Revert</button>
              )}
              <button className="btn ghost" onClick={() => setPlacedFlowers((prev) => prev.slice(0, -1))}>Undo</button>
              <button className="btn ghost" onClick={() => { setPlacedFlowers([]); setBackupLayout(null); }}>Clear</button>
            </div>
          )}
        </section>

        {/* Right: Keepsake Note */}
        <section className="panel">
          <h2>{isViewer ? 'Gift Note' : 'Keepsake Note'}</h2>

          <div className="note-tag" style={{ backgroundColor: paperTheme.bg }}>
            <textarea
              value={note}
              readOnly={isViewer}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Inscribe a thoughtful note..."
              maxLength={220}
              style={{
                fontFamily: selectedFont,
                color: paperTheme.ink,
              }}
            />
          </div>

          {!isViewer && (
            <>
              <div className="section-title">Typography</div>
              <div className="font-options">
                {NOTE_FONTS.map((font) => (
                  <button
                    key={font.id}
                    className={`font-btn ${selectedFont === font.id ? 'selected' : ''}`}
                    onClick={() => setSelectedFont(font.id)}
                    style={{ fontFamily: font.id }}
                  >
                    {font.name}
                  </button>
                ))}
              </div>

              <div className="section-title">Card Finish</div>
              <div className="wrap-options">
                {PAPER_THEMES.map((theme) => (
                  <button
                    key={theme.id}
                    className={`wrap-btn ${paperTheme.id === theme.id ? 'selected' : ''}`}
                    onClick={() => setPaperTheme(theme)}
                  >
                    {theme.name}
                  </button>
                ))}
              </div>
            </>
          )}

          {!isViewer ? (
            <button className="btn gold" onClick={handleShare}>Copy Share Link</button>
          ) : (
            <button className="btn sage" onClick={() => { window.location.hash = ''; window.location.reload(); }}>
              Create a Bouquet
            </button>
          )}
        </section>
      </div>
    </>
  );
}