import { useState, useCallback, useRef } from 'react';
import Icon from '@/components/ui/icon';

const intentions = ['Защита', 'Удача', 'Любовь', 'Здоровье', 'Мудрость', 'Богатство', 'Гармония', 'Сила'];

// Китайские стихии по году рождения
function getChineseElement(year: number): { name: string; nameRu: string; color: string; symbol: string; description: string } {
  const elements = [
    { name: 'Metal', nameRu: 'Металл', color: '#d4af37', symbol: '金', description: 'Сила, решимость, справедливость' },
    { name: 'Water', nameRu: 'Вода',   color: '#6baed6', symbol: '水', description: 'Мудрость, гибкость, интуиция' },
    { name: 'Wood',  nameRu: 'Дерево', color: '#74c476', symbol: '木', description: 'Рост, творчество, жизнь' },
    { name: 'Fire',  nameRu: 'Огонь',  color: '#fd8d3c', symbol: '火', description: 'Страсть, энергия, лидерство' },
    { name: 'Earth', nameRu: 'Земля',  color: '#a1845c', symbol: '土', description: 'Стабильность, забота, гармония' },
  ];
  // Цикл: каждые 2 года — новая стихия (начало цикла с 1900 = Металл)
  const idx = Math.floor(((year - 1900) % 10) / 2);
  return elements[((idx % 5) + 5) % 5];
}

interface ZodiacInfo {
  sign: string;
  symbol: string;
  dates: string;
}

function getZodiac(dateStr: string): ZodiacInfo {
  const d = new Date(dateStr);
  const month = d.getMonth() + 1;
  const day = d.getDate();
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19))  return { sign: 'Овен',      symbol: '♈', dates: '21.03–19.04' };
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20))  return { sign: 'Телец',     symbol: '♉', dates: '20.04–20.05' };
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20))  return { sign: 'Близнецы',  symbol: '♊', dates: '21.05–20.06' };
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22))  return { sign: 'Рак',       symbol: '♋', dates: '21.06–22.07' };
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22))  return { sign: 'Лев',       symbol: '♌', dates: '23.07–22.08' };
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22))  return { sign: 'Дева',      symbol: '♍', dates: '23.08–22.09' };
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return { sign: 'Весы',      symbol: '♎', dates: '23.09–22.10' };
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21))return { sign: 'Скорпион',  symbol: '♏', dates: '23.10–21.11' };
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21))return { sign: 'Стрелец',   symbol: '♐', dates: '22.11–21.12' };
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return { sign: 'Козерог',   symbol: '♑', dates: '22.12–19.01' };
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18))  return { sign: 'Водолей',   symbol: '♒', dates: '20.01–18.02' };
  return { sign: 'Рыбы', symbol: '♓', dates: '19.02–20.03' };
}

function formatDateShort(dateStr: string): string {
  const d = new Date(dateStr);
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${dd}.${mm}.${yyyy}`;
}

// SVG амулет — круглый, под печать в кулон
function AmuletSVG({ name, date, time, zodiac, element }: {
  name: string;
  date: string;
  time: string;
  zodiac: ZodiacInfo;
  element: ReturnType<typeof getChineseElement>;
}) {
  const cx = 200;
  const cy = 200;
  const R = 185; // внешний радиус

  const dateFormatted = formatDateShort(date);

  // Текст по окружности — утилита
  function circleTextPath(id: string, r: number, startAngle = 0) {
    const rad = (startAngle * Math.PI) / 180;
    // path по часовой стрелке
    return (
      <defs>
        <path
          id={id}
          d={`M ${cx + r * Math.cos(rad - Math.PI / 2)},${cy + r * Math.sin(rad - Math.PI / 2)}
              a ${r},${r} 0 1,1 -0.01,0`}
        />
      </defs>
    );
  }

  return (
    <svg
      viewBox="0 0 400 400"
      width="400"
      height="400"
      xmlns="http://www.w3.org/2000/svg"
      style={{ fontFamily: 'Cormorant Garamond, serif' }}
    >
      {/* Фон */}
      <circle cx={cx} cy={cy} r={R + 10} fill="#0a0a0f" />

      {/* Внешний декоративный обод */}
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={element.color} strokeWidth="2" opacity="0.9" />
      <circle cx={cx} cy={cy} r={R - 6} fill="none" stroke={element.color} strokeWidth="0.5" opacity="0.4" />

      {/* Деления на внешнем ободе — 36 штук */}
      {Array.from({ length: 36 }).map((_, i) => {
        const angle = (i * 10 * Math.PI) / 180;
        const len = i % 3 === 0 ? 10 : 5;
        const x1 = cx + (R - 1) * Math.cos(angle);
        const y1 = cy + (R - 1) * Math.sin(angle);
        const x2 = cx + (R - 1 - len) * Math.cos(angle);
        const y2 = cy + (R - 1 - len) * Math.sin(angle);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={element.color} strokeWidth={i % 3 === 0 ? "1.5" : "0.7"} opacity="0.7" />;
      })}

      {/* Кольцо стихии — средний пояс */}
      <circle cx={cx} cy={cy} r={R - 22} fill="none" stroke={element.color} strokeWidth="0.5" opacity="0.3" />
      <circle cx={cx} cy={cy} r={R - 42} fill="none" stroke={element.color} strokeWidth="1" opacity="0.5" />

      {/* Символы стихии по кругу (8 штук) */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 45 * Math.PI) / 180 - Math.PI / 2;
        const r = R - 32;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        return (
          <text
            key={i}
            x={x} y={y}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="14"
            fill={element.color}
            opacity="0.85"
            style={{ fontFamily: 'serif' }}
          >
            {element.symbol}
          </text>
        );
      })}

      {/* Внутреннее кольцо */}
      <circle cx={cx} cy={cy} r={R - 52} fill="#0d0d16" stroke={element.color} strokeWidth="1.5" opacity="0.8" />

      {/* Орнаментальные точки на внутреннем кольце */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180 - Math.PI / 2;
        const r = R - 52;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        return <circle key={i} cx={x} cy={y} r="2.5" fill={element.color} opacity="0.7" />;
      })}

      {/* Знак зодиака — ЦЕНТР */}
      <text
        x={cx} y={cy - 18}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="62"
        fill={element.color}
        opacity="0.95"
      >
        {zodiac.symbol}
      </text>

      {/* Название знака под символом */}
      <text
        x={cx} y={cy + 38}
        textAnchor="middle"
        fontSize="13"
        fill={element.color}
        opacity="0.7"
        letterSpacing="3"
        style={{ fontFamily: 'Montserrat, sans-serif', textTransform: 'uppercase' }}
      >
        {zodiac.sign.toUpperCase()}
      </text>

      {/* Тонкая линия-разделитель */}
      <line x1={cx - 40} y1={cy + 52} x2={cx + 40} y2={cy + 52} stroke={element.color} strokeWidth="0.5" opacity="0.4" />

      {/* СВЕРХУ — время рождения */}
      <text
        x={cx} y={cy - 98}
        textAnchor="middle"
        fontSize="11"
        fill="#c9993a"
        opacity="0.9"
        letterSpacing="2"
        style={{ fontFamily: 'Montserrat, sans-serif' }}
      >
        {time ? `✦ ${time} ✦` : '✦ время неизвестно ✦'}
      </text>

      {/* СНИЗУ — дата рождения */}
      <text
        x={cx} y={cy + 78}
        textAnchor="middle"
        fontSize="12"
        fill="#c9993a"
        opacity="0.9"
        letterSpacing="1.5"
        style={{ fontFamily: 'Montserrat, sans-serif' }}
      >
        {dateFormatted}
      </text>

      {/* ИМЯ — под датой */}
      <text
        x={cx} y={cy + 98}
        textAnchor="middle"
        fontSize="11"
        fill="rgba(201,153,58,0.6)"
        letterSpacing="3"
        style={{ fontFamily: 'Montserrat, sans-serif', textTransform: 'uppercase' }}
      >
        {name.toUpperCase()}
      </text>

      {/* Название стихии — по кругу снаружи (нижняя дуга) */}
      {circleTextPath('arcBottom', R - 14, 10)}
      <text fontSize="9" fill={element.color} opacity="0.5" letterSpacing="6"
        style={{ fontFamily: 'Montserrat, sans-serif' }}>
        <textPath href="#arcBottom" startOffset="18%">
          {element.nameRu.toUpperCase()} · {element.description.toUpperCase()} ·
        </textPath>
      </text>

      {/* Верхняя дуга — знак зодиака даты */}
      <defs>
        <path id="arcTop" d={`M ${cx - R + 14},${cy} a ${R - 14},${R - 14} 0 0,1 ${2 * (R - 14)},0`} />
      </defs>
      <text fontSize="9" fill={element.color} opacity="0.5" letterSpacing="5"
        style={{ fontFamily: 'Montserrat, sans-serif' }}>
        <textPath href="#arcTop" startOffset="12%">
          {zodiac.sign.toUpperCase()} · {zodiac.dates} · АРКАНУМ ·
        </textPath>
      </text>

      {/* Угловые акценты */}
      {[0, 90, 180, 270].map((deg) => {
        const rad = (deg * Math.PI) / 180 - Math.PI / 2;
        const r1 = R - 54;
        const x = cx + r1 * Math.cos(rad);
        const y = cy + r1 * Math.sin(rad);
        return (
          <g key={deg} transform={`rotate(${deg}, ${cx}, ${cy})`}>
            <circle cx={x} cy={y} r="3" fill="none" stroke={element.color} strokeWidth="1" opacity="0.5" />
            <circle cx={x} cy={y} r="1" fill={element.color} opacity="0.7" />
          </g>
        );
      })}

      {/* Внешний обрезной круг (для кулона) */}
      <circle cx={cx} cy={cy} r={R + 8} fill="none" stroke="#ffffff" strokeWidth="0.3" strokeDasharray="2,4" opacity="0.2" />
    </svg>
  );
}

export default function GeneratorSection() {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [intention, setIntention] = useState('');
  const [generated, setGenerated] = useState<null | {
    code: string;
    zodiac: ZodiacInfo;
    element: ReturnType<typeof getChineseElement>;
  }>(null);
  const [saved, setSaved] = useState<Array<{ code: string; name: string; sign: string }>>([]);
  const [step, setStep] = useState(1);
  const svgRef = useRef<HTMLDivElement>(null);

  const handleGenerate = useCallback(() => {
    if (!name || !date || !intention) return;
    const year = new Date(date).getFullYear();
    const zodiac = getZodiac(date);
    const element = getChineseElement(year);
    const cleaned = (name + date + time + intention).replace(/\s/g, '').toUpperCase();
    const hash = cleaned.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
    const code = `ARK-${cleaned.slice(0, 3).padEnd(3, 'X')}-${((hash * 7919) % 99999).toString().padStart(5, '0')}`;
    setGenerated({ code, zodiac, element });
    setStep(3);
  }, [name, date, time, intention]);

  const handlePrint = useCallback(() => {
    if (!svgRef.current) return;
    const svgEl = svgRef.current.querySelector('svg');
    if (!svgEl) return;
    const svgData = new XMLSerializer().serializeToString(svgEl);
    const win = window.open('', '_blank');
    if (!win) return;
    win.document.write(`
      <!DOCTYPE html><html><head><title>Амулет — ${name}</title>
      <style>
        body { margin: 0; background: #fff; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
        .hint { position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); font-family: sans-serif; font-size: 12px; color: #666; }
        @media print { .hint { display: none; } body { background: #fff; } }
        svg { max-width: 90vmin; max-height: 90vmin; }
      </style></head>
      <body>
        <img src="data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgData)))}" width="400" height="400" />
        <div class="hint">Обрежьте по пунктирной линии и вложите в круглый кулон</div>
        <script>window.onload=()=>window.print();</script>
      </body></html>
    `);
    win.document.close();
  }, [name]);

  const handleReset = useCallback(() => {
    setGenerated(null);
    setStep(1);
    setName('');
    setDate('');
    setTime('');
    setIntention('');
  }, []);

  const handleSave = useCallback(() => {
    if (!generated) return;
    setSaved((prev) => {
      if (prev.find((s) => s.code === generated.code)) return prev;
      return [...prev, { code: generated.code, name, sign: generated.zodiac.symbol }];
    });
  }, [generated, name]);

  return (
    <section className="min-h-screen py-24 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-obsidian/50 to-background" />

      <div className="relative z-10 container mx-auto max-w-3xl">
        <div className="text-center mb-16">
          <span className="font-body text-[10px] tracking-[0.5em] uppercase text-gold/60">Уникальный символ</span>
          <h2 className="font-display text-6xl md:text-7xl font-light text-foreground mt-3 mb-4">Генератор</h2>
          <div className="mystic-divider max-w-xs mx-auto"><span className="text-gold/50 text-xs">✦</span></div>
          <p className="font-body text-sm text-foreground/50 mt-4">Создайте персональный амулет для кулона</p>
        </div>

        {/* Шаги */}
        <div className="flex items-center justify-center gap-0 mb-10">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-body text-xs transition-all duration-500 ${step >= s ? 'bg-gold text-obsidian' : 'border border-gold/30 text-gold/30'}`}>
                {step > s ? '✓' : s}
              </div>
              {s < 3 && <div className={`w-16 h-px transition-all duration-500 ${step > s ? 'bg-gold' : 'bg-gold/20'}`} />}
            </div>
          ))}
        </div>

        {!generated ? (
          <div className="card-mystic rounded-xl p-8 md:p-10">
            <div className="space-y-6">
              <div>
                <label className="font-body text-[10px] tracking-widest uppercase text-gold/70 block mb-2">Ваше имя</label>
                <input
                  type="text" value={name}
                  onChange={(e) => { setName(e.target.value); if (e.target.value) setStep(Math.max(step, 1)); }}
                  placeholder="Введите имя..."
                  className="mystic-input w-full px-4 py-3 rounded text-sm font-body placeholder:text-foreground/30"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-body text-[10px] tracking-widest uppercase text-gold/70 block mb-2">Дата рождения</label>
                  <input
                    type="date" value={date}
                    onChange={(e) => { setDate(e.target.value); if (e.target.value) setStep(Math.max(step, 2)); }}
                    className="mystic-input w-full px-4 py-3 rounded text-sm font-body"
                    style={{ colorScheme: 'dark' }}
                  />
                </div>
                <div>
                  <label className="font-body text-[10px] tracking-widest uppercase text-gold/70 block mb-2">
                    Время рождения <span className="text-gold/30 normal-case tracking-normal">(если знаете)</span>
                  </label>
                  <input
                    type="time" value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="mystic-input w-full px-4 py-3 rounded text-sm font-body"
                    style={{ colorScheme: 'dark' }}
                  />
                </div>
              </div>

              <div>
                <label className="font-body text-[10px] tracking-widest uppercase text-gold/70 block mb-3">Намерение</label>
                <div className="grid grid-cols-4 gap-2">
                  {intentions.map((int) => (
                    <button key={int}
                      onClick={() => { setIntention(int); setStep(Math.max(step, 2)); }}
                      className={`py-2 px-2 rounded text-[10px] font-body tracking-widest uppercase transition-all duration-300 ${intention === int ? 'bg-gold text-obsidian' : 'border border-gold/20 text-foreground/50 hover:border-gold/50 hover:text-gold/70'}`}
                    >{int}</button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={!name || !date || !intention}
                className={`w-full py-4 rounded text-xs tracking-widest uppercase font-body font-semibold transition-all duration-300 mt-4 ${name && date && intention ? 'btn-gold animate-pulse-glow' : 'bg-gold/20 text-foreground/30 cursor-not-allowed'}`}
              >
                ✦ Создать Амулет ✦
              </button>
            </div>
          </div>
        ) : (
          <div className="card-mystic rounded-xl overflow-hidden animate-scale-in">
            {/* Шапка */}
            <div className="bg-gradient-to-b from-obsidian to-midnight px-8 pt-8 pb-4 text-center border-b border-gold/10">
              <span className="font-body text-[10px] tracking-[0.4em] uppercase text-gold/50">Амулет готов к печати</span>
              <div className="font-display text-2xl text-foreground mt-1">
                {name} · <span className="text-gold">{generated.zodiac.sign}</span>
              </div>
              <div className="flex items-center justify-center gap-3 mt-2">
                <span className="font-body text-xs text-foreground/40">Стихия:</span>
                <span className="font-body text-sm font-medium" style={{ color: generated.element.color }}>
                  {generated.element.symbol} {generated.element.nameRu}
                </span>
                <span className="font-body text-xs text-foreground/30">— {generated.element.description}</span>
              </div>
            </div>

            {/* SVG амулет */}
            <div
              ref={svgRef}
              className="flex items-center justify-center bg-[#08080f] py-8 px-4"
            >
              <div className="w-full max-w-[360px]">
                <AmuletSVG
                  name={name}
                  date={date}
                  time={time}
                  zodiac={generated.zodiac}
                  element={generated.element}
                />
              </div>
            </div>

            {/* Подсказка */}
            <div className="px-8 py-3 bg-obsidian/60 border-t border-gold/10 text-center">
              <p className="font-body text-[10px] text-foreground/40 tracking-widest">
                Обрежьте по пунктирной линии · Вложите в круглый кулон диаметром 3–4 см
              </p>
            </div>

            {/* Код и кнопки */}
            <div className="px-8 py-6 space-y-4">
              <div className="bg-obsidian rounded-lg px-5 py-3 flex items-center justify-between glow-gold-sm">
                <div>
                  <div className="font-body text-[9px] tracking-widest uppercase text-gold/40 mb-1">Уникальный код</div>
                  <div className="font-body text-base tracking-[0.25em] text-gold font-medium">{generated.code}</div>
                </div>
                <button onClick={() => navigator.clipboard?.writeText(generated.code)} className="text-gold/30 hover:text-gold transition-colors" title="Скопировать">
                  <Icon name="Copy" size={16} />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <button onClick={handlePrint} className="btn-gold py-3 rounded text-xs flex items-center gap-2 justify-center col-span-1">
                  <Icon name="Printer" size={14} />
                  Печать
                </button>
                <button onClick={handleSave} className="btn-outline-gold py-3 rounded text-xs flex items-center gap-2 justify-center">
                  <Icon name="Bookmark" size={14} />
                  Сохранить
                </button>
                <button onClick={handleReset} className="btn-outline-gold py-3 rounded text-xs flex items-center gap-2 justify-center">
                  <Icon name="RefreshCw" size={14} />
                  Новый
                </button>
              </div>
            </div>
          </div>
        )}

        {saved.length > 0 && (
          <div className="mt-10">
            <div className="mystic-divider mb-6">
              <span className="font-body text-[10px] tracking-widest uppercase text-gold/50">Сохранённые</span>
            </div>
            <div className="space-y-3">
              {saved.map((s) => (
                <div key={s.code} className="card-mystic rounded-lg px-5 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl text-gold">{s.sign}</span>
                    <div>
                      <div className="font-body text-xs text-foreground/70">{s.name}</div>
                      <div className="font-body text-[10px] tracking-widest text-gold/60">{s.code}</div>
                    </div>
                  </div>
                  <Icon name="ChevronRight" size={16} className="text-gold/40" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}