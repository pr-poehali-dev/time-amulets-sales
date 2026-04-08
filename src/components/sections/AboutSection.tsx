const topics = [
  {
    symbol: '🔮',
    title: 'Что такое амулет?',
    text: 'Амулет — это предмет, наделённый особой силой защищать своего владельца от злых духов, болезней и неудач. Первые амулеты появились более 30 000 лет назад.',
  },
  {
    symbol: '✦',
    title: 'Как работает символика?',
    text: 'Каждый символ несёт вибрацию определённой энергии. Руны, астрологические знаки, сакральная геометрия — все они взаимодействуют с энергетическим полем человека.',
  },
  {
    symbol: '🌙',
    title: 'Персонализация и дата',
    text: 'Дата рождения определяет ваш нумерологический код и астральный покровитель. Имя усиливает связь между владельцем и символом через вибрацию звуков.',
  },
  {
    symbol: '⚗️',
    title: 'Материалы и создание',
    text: 'Амулеты изготавливаются из серебра 925 пробы, меди и бронзы. Каждое изделие проходит ритуал освящения в полнолуние и активацию намерением.',
  },
];

const elements = [
  { symbol: '🜁', name: 'Воздух', desc: 'Интеллект, коммуникация, свобода' },
  { symbol: '🜂', name: 'Огонь', desc: 'Воля, страсть, трансформация' },
  { symbol: '🜃', name: 'Вода', desc: 'Интуиция, эмоции, исцеление' },
  { symbol: '🜄', name: 'Земля', desc: 'Стабильность, изобилие, защита' },
  { symbol: '⊕', name: 'Эфир', desc: 'Дух, единство, вознесение' },
];

export default function AboutSection() {
  return (
    <section className="min-h-screen py-24 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-obsidian/30 to-background" />

      <div className="relative z-10 container mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <span className="font-body text-[10px] tracking-[0.5em] uppercase text-gold/60">Знания и история</span>
          <h2 className="font-display text-6xl md:text-7xl font-light text-foreground mt-3 mb-4">
            Об Амулетах
          </h2>
          <div className="mystic-divider max-w-xs mx-auto">
            <span className="text-gold/50 text-xs">✦</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {topics.map((topic, i) => (
            <div
              key={topic.title}
              className="card-mystic rounded-xl p-7 animate-fade-in-up opacity-0"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl">{topic.symbol}</span>
                <h3 className="font-display text-xl text-foreground">{topic.title}</h3>
              </div>
              <p className="font-body text-sm text-foreground/55 leading-relaxed">{topic.text}</p>
            </div>
          ))}
        </div>

        <div className="card-mystic rounded-xl p-8 mb-12">
          <h3 className="font-display text-3xl text-center text-foreground mb-8">
            Пять <span className="text-gold">Стихий</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {elements.map((el) => (
              <div key={el.name} className="text-center group">
                <div className="relative inline-flex w-14 h-14 items-center justify-center mx-auto mb-3">
                  <div className="absolute inset-0 rounded-full border border-gold/20 group-hover:border-gold/60 transition-all group-hover:glow-gold-sm" />
                  <span className="text-2xl group-hover:animate-float">{el.symbol}</span>
                </div>
                <div className="font-display text-lg text-gold">{el.name}</div>
                <div className="font-body text-[10px] text-foreground/40 leading-tight mt-1">{el.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center card-mystic rounded-xl p-10">
          <div className="font-display text-4xl italic text-foreground/70 mb-4">
            «Амулет — это мост между <span className="text-gold">видимым</span><br/>
            и <span className="text-gold">невидимым</span> мирами»
          </div>
          <div className="font-body text-xs tracking-widest uppercase text-foreground/30">— Древняя мудрость</div>
        </div>
      </div>
    </section>
  );
}
