import { useState, useCallback } from 'react';
import Icon from '@/components/ui/icon';

const symbols = ['☽', '☀', '⛤', '∞', 'ᛉ', 'ᚠ', 'ᛏ', '✦', '⊕', '⊗', '⊙', '✧'];
const intentions = ['Защита', 'Удача', 'Любовь', 'Здоровье', 'Мудрость', 'Богатство', 'Гармония', 'Сила'];

function generateCode(name: string, date: string, intention: string): string {
  const cleaned = (name + date + intention).replace(/\s/g, '').toUpperCase();
  const hash = cleaned.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const prefix = 'ARK';
  const num = ((hash * 7919) % 99999).toString().padStart(5, '0');
  const suffix = cleaned.slice(0, 3).padEnd(3, 'X');
  return `${prefix}-${suffix}-${num}`;
}

function getSymbolsByDate(date: string): string[] {
  if (!date) return symbols.slice(0, 3);
  const d = new Date(date);
  const month = d.getMonth();
  const day = d.getDate();
  const idx = (month + day) % symbols.length;
  return [symbols[idx], symbols[(idx + 4) % symbols.length], symbols[(idx + 8) % symbols.length]];
}

export default function GeneratorSection() {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [intention, setIntention] = useState('');
  const [generated, setGenerated] = useState<null | { code: string; symbols: string[] }>(null);
  const [saved, setSaved] = useState<Array<{ code: string; name: string; symbols: string[] }>>([]);
  const [step, setStep] = useState(1);

  const handleGenerate = useCallback(() => {
    if (!name || !date || !intention) return;
    const code = generateCode(name, date, intention);
    const syms = getSymbolsByDate(date);
    setGenerated({ code, symbols: syms });
    setStep(3);
  }, [name, date, intention]);

  const handleSave = useCallback(() => {
    if (!generated) return;
    setSaved((prev) => {
      const exists = prev.find((s) => s.code === generated.code);
      if (exists) return prev;
      return [...prev, { code: generated.code, name, symbols: generated.symbols }];
    });
  }, [generated, name]);

  const handleReset = useCallback(() => {
    setGenerated(null);
    setStep(1);
    setName('');
    setDate('');
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
          <div className="card-mystic rounded-xl p-8 md:p-10 text-center animate-scale-in">
            <div className="mb-6">
              <span className="font-body text-[10px] tracking-[0.4em] uppercase text-gold/60">
                Ваш амулет готов
              </span>
            </div>

            <div className="relative inline-flex items-center justify-center mb-8">
              <div className="w-36 h-36 rounded-full border border-gold/30 flex items-center justify-center glow-gold animate-pulse-glow relative">
                <div className="absolute inset-3 rounded-full border border-gold/20 animate-rotate-slow" />
                <span className="text-6xl relative z-10">{generated.symbols[0]}</span>
              </div>
              <span className="absolute -top-3 -right-3 text-2xl animate-float">{generated.symbols[1]}</span>
              <span className="absolute -bottom-3 -left-3 text-2xl animate-float" style={{ animationDelay: '1s' }}>{generated.symbols[2]}</span>
            </div>

            <div className="font-display text-3xl text-foreground mb-2">
              Амулет <span className="text-gold">{intention}</span>
            </div>
            <p className="font-body text-sm text-foreground/50 mb-6">Создан для: {name}</p>

            <div className="bg-obsidian rounded-lg px-6 py-4 mb-6 inline-block glow-gold-sm">
              <div className="font-body text-[9px] tracking-widest uppercase text-gold/50 mb-1">Уникальный код</div>
              <div className="font-body text-lg tracking-[0.3em] text-gold font-medium">{generated.code}</div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4">
              <button
                onClick={handleSave}
                className="btn-gold px-6 py-3 rounded text-xs flex items-center gap-2 justify-center"
              >
                <Icon name="Bookmark" size={14} />
                Сохранить
              </button>
              <button
                onClick={handleReset}
                className="btn-outline-gold px-6 py-3 rounded text-xs flex items-center gap-2 justify-center"
              >
                <Icon name="RefreshCw" size={14} />
                Новый амулет
              </button>
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
                    <span className="text-2xl">{s.symbols[0]}</span>
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
