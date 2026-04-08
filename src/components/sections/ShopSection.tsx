interface ShopSectionProps {
  onNavigate: (section: string) => void;
}

const products = [
  {
    id: 1,
    name: 'Амулет Луны',
    symbol: '☽',
    category: 'Защита',
    price: '2 400 ₽',
    desc: 'Оберегает от негативных энергий, усиливает интуицию и женскую силу',
    tags: ['Защита', 'Интуиция'],
  },
  {
    id: 2,
    name: 'Амулет Солнца',
    symbol: '☀',
    category: 'Удача',
    price: '2 800 ₽',
    desc: 'Притягивает удачу, усиливает жизненную силу и уверенность в себе',
    tags: ['Удача', 'Сила'],
  },
  {
    id: 3,
    name: 'Пентакль',
    symbol: '⛤',
    category: 'Магия',
    price: '3 200 ₽',
    desc: 'Мощный символ пяти стихий. Баланс и гармония во всех сферах жизни',
    tags: ['Баланс', 'Магия'],
  },
  {
    id: 4,
    name: 'Глаз Гора',
    symbol: '𓂀',
    category: 'Защита',
    price: '3 600 ₽',
    desc: 'Древнеегипетский символ защиты, мудрости и царственности',
    tags: ['Защита', 'Мудрость'],
  },
  {
    id: 5,
    name: 'Руна Альгиз',
    symbol: 'ᛉ',
    category: 'Защита',
    price: '1 900 ₽',
    desc: 'Руна защиты и связи с высшими силами. Щит от зла и неудач',
    tags: ['Руны', 'Щит'],
  },
  {
    id: 6,
    name: 'Бесконечность',
    symbol: '∞',
    category: 'Любовь',
    price: '2 100 ₽',
    desc: 'Символ вечной любви и бесконечных возможностей. Притягивает гармонию',
    tags: ['Любовь', 'Вечность'],
  },
];

const categories = ['Все', 'Защита', 'Удача', 'Магия', 'Любовь'];

export default function ShopSection({ onNavigate }: ShopSectionProps) {
  return (
    <section className="min-h-screen py-24 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-background to-background" />

      <div className="relative z-10 container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <span className="font-body text-[10px] tracking-[0.5em] uppercase text-gold/60">Наши изделия</span>
          <h2 className="font-display text-6xl md:text-7xl font-light text-foreground mt-3 mb-4">
            Коллекция
          </h2>
          <div className="mystic-divider max-w-xs mx-auto">
            <span className="text-gold/50 text-xs">✦</span>
          </div>
          <p className="font-body text-sm text-foreground/50 mt-4 max-w-md mx-auto">
            Каждый амулет изготовлен вручную с нанесением персональных символов
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              className="btn-outline-gold px-5 py-2 rounded-full text-xs hover:btn-gold transition-all"
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <div
              key={product.id}
              className="card-mystic rounded-lg p-6 group cursor-pointer animate-fade-in-up opacity-0"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border border-gold/20 group-hover:border-gold/50 transition-all" />
                  <span className="text-3xl group-hover:animate-float">{product.symbol}</span>
                </div>
                <span className="font-body text-[9px] tracking-widest uppercase text-gold/60 bg-gold/10 px-2 py-1 rounded">
                  {product.category}
                </span>
              </div>

              <h3 className="font-display text-2xl font-light text-foreground mb-2 group-hover:text-gold transition-colors">
                {product.name}
              </h3>
              <p className="font-body text-xs text-foreground/50 leading-relaxed mb-4">
                {product.desc}
              </p>

              <div className="flex flex-wrap gap-1 mb-4">
                {product.tags.map((tag) => (
                  <span key={tag} className="font-body text-[9px] uppercase tracking-widest text-gold/50 border border-gold/20 px-2 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gold/10">
                <span className="font-display text-xl text-gold">{product.price}</span>
                <button className="btn-gold px-4 py-2 rounded text-xs">
                  Добавить
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => onNavigate('generator')}
            className="btn-outline-gold px-8 py-3 rounded text-xs"
          >
            ✦ Создать Персональный Амулет
          </button>
        </div>
      </div>
    </section>
  );
}
