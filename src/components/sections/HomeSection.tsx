interface HomeSectionProps {
  onNavigate: (section: string) => void;
}

const stars = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  delay: `${Math.random() * 4}s`,
  size: Math.random() > 0.7 ? 'w-1.5 h-1.5' : 'w-1 h-1',
}));

export default function HomeSection({ onNavigate }: HomeSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden noise-bg">
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-background to-obsidian" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(https://cdn.poehali.dev/projects/9686ad9d-7d7b-4e6a-bc50-712b3d7ff355/files/5cbd950c-5279-42bc-95cb-a84d72a9020a.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(2px)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian/60 via-transparent to-obsidian/90" />

      {stars.map((star) => (
        <div
          key={star.id}
          className={`absolute ${star.size} rounded-full bg-gold/40 animate-star`}
          style={{ top: star.top, left: star.left, animationDelay: star.delay }}
        />
      ))}

      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
        <div className="w-[600px] h-[600px] border border-gold rounded-full animate-rotate-slow" />
        <div className="absolute w-[450px] h-[450px] border border-gold/50 rounded-full animate-rotate-slow" style={{ animationDirection: 'reverse', animationDuration: '30s' }} />
        <div className="absolute w-[300px] h-[300px] border border-gold/30 rounded-full" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="mb-6 animate-fade-in-up stagger-1 opacity-0">
          <span className="font-body text-[10px] tracking-[0.5em] uppercase text-gold/70">
            ✦ Магия · Защита · Судьба ✦
          </span>
        </div>

        <h1 className="font-display text-7xl md:text-9xl font-light mb-4 animate-fade-in-up stagger-2 opacity-0 leading-none">
          <span className="animate-shimmer">Арканум</span>
        </h1>

        <div className="mystic-divider mb-6 animate-fade-in-up stagger-3 opacity-0">
          <span className="text-gold/50 text-xs">✦</span>
        </div>

        <p className="font-display text-2xl md:text-3xl font-light italic text-foreground/70 mb-4 animate-fade-in-up stagger-3 opacity-0">
          Персональные амулеты силы и защиты
        </p>

        <p className="font-body text-sm text-foreground/50 mb-10 max-w-xl mx-auto leading-relaxed animate-fade-in-up stagger-4 opacity-0">
          Каждый амулет создаётся по вашей дате рождения и имени.<br/>
          Уникальный код хранит вашу энергию навсегда.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up stagger-5 opacity-0">
          <button
            onClick={() => onNavigate('generator')}
            className="btn-gold px-8 py-4 rounded text-sm tracking-widest uppercase animate-pulse-glow"
          >
            ✦ Создать Амулет
          </button>
          <button
            onClick={() => onNavigate('shop')}
            className="btn-outline-gold px-8 py-4 rounded text-sm"
          >
            Смотреть Коллекцию
          </button>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto animate-fade-in-up stagger-5 opacity-0">
          {[
            { num: '847', label: 'Амулетов создано' },
            { num: '12', label: 'Видов символов' },
            { num: '99%', label: 'Довольных душ' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-3xl text-gold font-light">{stat.num}</div>
              <div className="font-body text-[9px] tracking-widest uppercase text-foreground/40 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="flex flex-col items-center gap-2 text-gold/40">
          <span className="font-body text-[9px] tracking-widest uppercase">Листать</span>
          <div className="w-px h-8 bg-gradient-to-b from-gold/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}
