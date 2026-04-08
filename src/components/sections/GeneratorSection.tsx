import { useState, useCallback } from 'react';
import Icon from '@/components/ui/icon';

const symbols = ['☽', '☀', '⛤', '∞', 'ᛉ', 'ᚠ', 'ᛏ', '✦', '⊕', '⊗', '⊙', '✧'];
const intentions = ['Защита', 'Удача', 'Любовь', 'Здоровье', 'Мудрость', 'Богатство', 'Гармония', 'Сила'];

interface ZodiacInfo {
  sign: string;
  symbol: string;
  element: string;
  elementSymbol: string;
  elementColor: string;
  dates: string;
}

function getZodiac(dateStr: string): ZodiacInfo {
  const d = new Date(dateStr);
  const month = d.getMonth() + 1;
  const day = d.getDate();

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19))
    return { sign: 'Овен', symbol: '♈', element: 'Огонь', elementSymbol: '🜂', elementColor: 'text-red-400', dates: '21 мар — 19 апр' };
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20))
    return { sign: 'Телец', symbol: '♉', element: 'Земля', elementSymbol: '🜄', elementColor: 'text-green-400', dates: '20 апр — 20 май' };
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20))
    return { sign: 'Близнецы', symbol: '♊', element: 'Воздух', elementSymbol: '🜁', elementColor: 'text-sky-400', dates: '21 май — 20 июн' };
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22))
    return { sign: 'Рак', symbol: '♋', element: 'Вода', elementSymbol: '🜃', elementColor: 'text-blue-400', dates: '21 июн — 22 июл' };
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22))
    return { sign: 'Лев', symbol: '♌', element: 'Огонь', elementSymbol: '🜂', elementColor: 'text-red-400', dates: '23 июл — 22 авг' };
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22))
    return { sign: 'Дева', symbol: '♍', element: 'Земля', elementSymbol: '🜄', elementColor: 'text-green-400', dates: '23 авг — 22 сен' };
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22))
    return { sign: 'Весы', symbol: '♎', element: 'Воздух', elementSymbol: '🜁', elementColor: 'text-sky-400', dates: '23 сен — 22 окт' };
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21))
    return { sign: 'Скорпион', symbol: '♏', element: 'Вода', elementSymbol: '🜃', elementColor: 'text-blue-400', dates: '23 окт — 21 ноя' };
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21))
    return { sign: 'Стрелец', symbol: '♐', element: 'Огонь', elementSymbol: '🜂', elementColor: 'text-red-400', dates: '22 ноя — 21 дек' };
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19))
    return { sign: 'Козерог', symbol: '♑', element: 'Земля', elementSymbol: '🜄', elementColor: 'text-green-400', dates: '22 дек — 19 янв' };
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18))
    return { sign: 'Водолей', symbol: '♒', element: 'Воздух', elementSymbol: '🜁', elementColor: 'text-sky-400', dates: '20 янв — 18 фев' };
  return { sign: 'Рыбы', symbol: '♓', element: 'Вода', elementSymbol: '🜃', elementColor: 'text-blue-400', dates: '19 фев — 20 мар' };
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
}

function generateCode(name: string, date: string, time: string, intention: string): string {
  const cleaned = (name + date + time + intention).replace(/\s/g, '').toUpperCase();
  const hash = cleaned.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const prefix = 'ARK';
  const num = ((hash * 7919) % 99999).toString().padStart(5, '0');
  const suffix = cleaned.slice(0, 3).padEnd(3, 'X');
  return `${prefix}-${suffix}-${num}`;
}

function getMainSymbol(date: string, time: string): string {
  if (!date) return '✦';
  const d = new Date(date);
  const month = d.getMonth();
  const day = d.getDate();
  const hour = time ? parseInt(time.split(':')[0], 10) : 0;
  const idx = (month + day + hour) % symbols.length;
  return symbols[idx];
}

export default function GeneratorSection() {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [intention, setIntention] = useState('');
  const [generated, setGenerated] = useState<null | {
    code: string;
    mainSymbol: string;
    zodiac: ZodiacInfo;
  }>(null);
  const [saved, setSaved] = useState<Array<{ code: string; name: string; sign: string }>>([]);
  const [step, setStep] = useState(1);

  const handleGenerate = useCallback(() => {
    if (!name || !date || !intention) return;
    const code = generateCode(name, date, time, intention);
    const mainSymbol = getMainSymbol(date, time);
    const zodiac = getZodiac(date);
    setGenerated({ code, mainSymbol, zodiac });
    setStep(3);
  }, [name, date, time, intention]);

  const handleSave = useCallback(() => {
    if (!generated) return;
    setSaved((prev) => {
      const exists = prev.find((s) => s.code === generated.code);
      if (exists) return prev;
      return [...prev, { code: generated.code, name, sign: generated.zodiac.symbol }];
    });
  }, [generated, name]);

  const handleReset = useCallback(() => {
    setGenerated(null);
    setStep(1);
    setName('');
    setDate('');
    setTime('');
    setIntention('');
  }, []);

  return (
    <section className="min-h-screen py-24 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-obsidian/50 to-background" />

      <div className="relative z-10 container mx-auto max-w-3xl">
        <div className="text-center mb-16">
          <span className="font-body text-[10px] tracking-[0.5em] uppercase text-gold/60">Уникальный символ</span>
          <h2 className="font-display text-6xl md:text-7xl font-light text-foreground mt-3 mb-4">
            Генератор
          </h2>
          <div className="mystic-divider max-w-xs mx-auto">
            <span className="text-gold/50 text-xs">✦</span>
          </div>
          <p className="font-body text-sm text-foreground/50 mt-4">
            Создайте персональный амулет по вашей энергии
          </p>
        </div>

        <div className="flex items-center justify-center gap-0 mb-10">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-body text-xs transition-all duration-500 ${
                step >= s ? 'bg-gold text-obsidian' : 'border border-gold/30 text-gold/30'
              }`}>
                {step > s ? '✓' : s}
              </div>
              {s < 3 && (
                <div className={`w-16 h-px transition-all duration-500 ${step > s ? 'bg-gold' : 'bg-gold/20'}`} />
              )}
            </div>
          ))}
        </div>

        {!generated ? (
          <div className="card-mystic rounded-xl p-8 md:p-10">
            <div className="space-y-6">
              <div>
                <label className="font-body text-[10px] tracking-widest uppercase text-gold/70 block mb-2">
                  Ваше имя
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => { setName(e.target.value); if (e.target.value) setStep(Math.max(step, 1)); }}
                  placeholder="Введите имя..."
                  className="mystic-input w-full px-4 py-3 rounded text-sm font-body placeholder:text-foreground/30"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-body text-[10px] tracking-widest uppercase text-gold/70 block mb-2">
                    Дата рождения
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => { setDate(e.target.value); if (e.target.value) setStep(Math.max(step, 2)); }}
                    className="mystic-input w-full px-4 py-3 rounded text-sm font-body"
                    style={{ colorScheme: 'dark' }}
                  />
                </div>
                <div>
                  <label className="font-body text-[10px] tracking-widest uppercase text-gold/70 block mb-2">
                    Время рождения
                    <span className="text-gold/30 normal-case tracking-normal ml-1">(если знаете)</span>
                  </label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="mystic-input w-full px-4 py-3 rounded text-sm font-body"
                    style={{ colorScheme: 'dark' }}
                  />
                </div>
              </div>

              <div>
                <label className="font-body text-[10px] tracking-widest uppercase text-gold/70 block mb-3">
                  Намерение
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {intentions.map((int) => (
                    <button
                      key={int}
                      onClick={() => { setIntention(int); setStep(Math.max(step, 2)); }}
                      className={`py-2 px-2 rounded text-[10px] font-body tracking-widest uppercase transition-all duration-300 ${
                        intention === int
                          ? 'bg-gold text-obsidian'
                          : 'border border-gold/20 text-foreground/50 hover:border-gold/50 hover:text-gold/70'
                      }`}
                    >
                      {int}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={!name || !date || !intention}
                className={`w-full py-4 rounded text-xs tracking-widest uppercase font-body font-semibold transition-all duration-300 mt-4 ${
                  name && date && intention
                    ? 'btn-gold animate-pulse-glow'
                    : 'bg-gold/20 text-foreground/30 cursor-not-allowed'
                }`}
              >
                ✦ Сгенерировать Амулет ✦
              </button>
            </div>
          </div>
        ) : (
          <div className="card-mystic rounded-xl overflow-hidden animate-scale-in">

            {/* Шапка амулета */}
            <div className="bg-gradient-to-b from-obsidian to-midnight px-8 pt-10 pb-6 text-center border-b border-gold/10">
              <span className="font-body text-[10px] tracking-[0.4em] uppercase text-gold/50">
                Персональный амулет
              </span>
              <div className="font-display text-3xl text-foreground mt-1">
                {name} · <span className="text-gold">{intention}</span>
              </div>
            </div>

            {/* Центральный символ */}
            <div className="flex flex-col items-center py-10 px-8 bg-gradient-to-b from-midnight to-background/50">
              <div className="relative">
                {/* Внешнее кольцо */}
                <div className="w-52 h-52 rounded-full border border-gold/15 flex items-center justify-center relative animate-rotate-slow">
                  {/* Деления на кольце */}
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 rounded-full bg-gold/30"
                      style={{
                        top: '50%',
                        left: '50%',
                        transform: `rotate(${i * 30}deg) translateY(-102px)`,
                        transformOrigin: '0 0',
                      }}
                    />
                  ))}
                </div>
                {/* Среднее кольцо */}
                <div className="absolute inset-4 rounded-full border border-gold/25 flex items-center justify-center" style={{ animationDirection: 'reverse', animationDuration: '25s' }} />
                {/* Внутренний круг */}
                <div className="absolute inset-8 rounded-full border border-gold/40 glow-gold flex items-center justify-center animate-pulse-glow">
                  <span className="text-6xl">{generated.mainSymbol}</span>
                </div>
                {/* Знак зодиака — сверху */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-obsidian border border-gold/40 flex items-center justify-center">
                  <span className="text-lg text-gold">{generated.zodiac.symbol}</span>
                </div>
                {/* Символ стихии — снизу */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-obsidian border border-gold/40 flex items-center justify-center">
                  <span className={`text-base ${generated.zodiac.elementColor}`}>{generated.zodiac.elementSymbol}</span>
                </div>
              </div>
            </div>

            {/* Данные амулета */}
            <div className="px-8 pb-8 space-y-3">
              {/* Строка: дата и время */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-obsidian rounded-lg px-4 py-3">
                  <div className="font-body text-[9px] tracking-widest uppercase text-gold/40 mb-1">Дата рождения</div>
                  <div className="font-display text-base text-foreground">{formatDate(date)}</div>
                </div>
                <div className="bg-obsidian rounded-lg px-4 py-3">
                  <div className="font-body text-[9px] tracking-widest uppercase text-gold/40 mb-1">Время рождения</div>
                  <div className="font-display text-base text-foreground">
                    {time ? time : <span className="text-foreground/30 text-sm">не указано</span>}
                  </div>
                </div>
              </div>

              {/* Строка: знак зодиака и стихия */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-obsidian rounded-lg px-4 py-3 flex items-center gap-3">
                  <span className="text-2xl text-gold">{generated.zodiac.symbol}</span>
                  <div>
                    <div className="font-body text-[9px] tracking-widest uppercase text-gold/40 mb-0.5">Знак зодиака</div>
                    <div className="font-display text-base text-foreground">{generated.zodiac.sign}</div>
                    <div className="font-body text-[9px] text-foreground/30">{generated.zodiac.dates}</div>
                  </div>
                </div>
                <div className="bg-obsidian rounded-lg px-4 py-3 flex items-center gap-3">
                  <span className={`text-2xl ${generated.zodiac.elementColor}`}>{generated.zodiac.elementSymbol}</span>
                  <div>
                    <div className="font-body text-[9px] tracking-widest uppercase text-gold/40 mb-0.5">Стихия</div>
                    <div className={`font-display text-base ${generated.zodiac.elementColor}`}>{generated.zodiac.element}</div>
                  </div>
                </div>
              </div>

              {/* Уникальный код */}
              <div className="bg-obsidian rounded-lg px-5 py-4 flex items-center justify-between glow-gold-sm">
                <div>
                  <div className="font-body text-[9px] tracking-widest uppercase text-gold/40 mb-1">Уникальный код</div>
                  <div className="font-body text-lg tracking-[0.25em] text-gold font-medium">{generated.code}</div>
                </div>
                <button
                  onClick={() => navigator.clipboard?.writeText(generated.code)}
                  className="text-gold/30 hover:text-gold transition-colors"
                  title="Скопировать"
                >
                  <Icon name="Copy" size={16} />
                </button>
              </div>

              {/* Кнопки */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleSave}
                  className="btn-gold flex-1 py-3 rounded text-xs flex items-center gap-2 justify-center"
                >
                  <Icon name="Bookmark" size={14} />
                  Сохранить
                </button>
                <button
                  onClick={handleReset}
                  className="btn-outline-gold flex-1 py-3 rounded text-xs flex items-center gap-2 justify-center"
                >
                  <Icon name="RefreshCw" size={14} />
                  Новый амулет
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
