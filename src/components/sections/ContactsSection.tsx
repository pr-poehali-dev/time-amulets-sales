import { useState } from 'react';
import Icon from '@/components/ui/icon';

const contacts = [
  { icon: 'Mail', label: 'Email', value: 'info@arkanam.ru' },
  { icon: 'Phone', label: 'Телефон', value: '+7 (999) 000-00-00' },
  { icon: 'MapPin', label: 'Адрес', value: 'Москва, ул. Мистическая, 13' },
  { icon: 'Clock', label: 'Работаем', value: 'Пн-Вс: 9:00 — 21:00' },
];

export default function ContactsSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section className="min-h-screen py-24 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-obsidian/50 to-obsidian" />

      <div className="relative z-10 container mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <span className="font-body text-[10px] tracking-[0.5em] uppercase text-gold/60">Связаться с нами</span>
          <h2 className="font-display text-6xl md:text-7xl font-light text-foreground mt-3 mb-4">
            Контакты
          </h2>
          <div className="mystic-divider max-w-xs mx-auto">
            <span className="text-gold/50 text-xs">✦</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="card-mystic rounded-xl p-8">
              <h3 className="font-display text-2xl text-foreground mb-6">Наши координаты</h3>
              <div className="space-y-5">
                {contacts.map((c) => (
                  <div key={c.label} className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center group-hover:border-gold/50 transition-all">
                      <Icon name={c.icon} fallback="Circle" size={16} className="text-gold/60 group-hover:text-gold transition-colors" />
                    </div>
                    <div>
                      <div className="font-body text-[9px] tracking-widest uppercase text-gold/40">{c.label}</div>
                      <div className="font-body text-sm text-foreground/70">{c.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-mystic rounded-xl p-8">
              <h3 className="font-display text-2xl text-foreground mb-4">Мы в сетях</h3>
              <div className="flex gap-3">
                {['Telegram', 'Instagram', 'VK'].map((soc) => (
                  <button
                    key={soc}
                    className="btn-outline-gold px-4 py-2 rounded text-xs"
                  >
                    {soc}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="card-mystic rounded-xl p-8">
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-8">
                <span className="text-5xl mb-4 animate-float">✦</span>
                <h3 className="font-display text-3xl text-gold mb-3">Сообщение отправлено</h3>
                <p className="font-body text-sm text-foreground/50">
                  Мы свяжемся с вами в течение одного дня
                </p>
                <button
                  onClick={() => { setSent(false); setForm({ name: '', email: '', message: '' }); }}
                  className="btn-outline-gold px-6 py-3 rounded text-xs mt-6"
                >
                  Отправить ещё
                </button>
              </div>
            ) : (
              <>
                <h3 className="font-display text-2xl text-foreground mb-6">Написать нам</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="font-body text-[10px] tracking-widest uppercase text-gold/70 block mb-2">
                      Ваше имя
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Как к вам обращаться..."
                      className="mystic-input w-full px-4 py-3 rounded text-sm font-body placeholder:text-foreground/30"
                      required
                    />
                  </div>
                  <div>
                    <label className="font-body text-[10px] tracking-widest uppercase text-gold/70 block mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="your@email.com"
                      className="mystic-input w-full px-4 py-3 rounded text-sm font-body placeholder:text-foreground/30"
                      required
                    />
                  </div>
                  <div>
                    <label className="font-body text-[10px] tracking-widest uppercase text-gold/70 block mb-2">
                      Сообщение
                    </label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Ваш вопрос или пожелание..."
                      rows={4}
                      className="mystic-input w-full px-4 py-3 rounded text-sm font-body placeholder:text-foreground/30 resize-none"
                      required
                    />
                  </div>
                  <button type="submit" className="btn-gold w-full py-4 rounded text-xs mt-2">
                    ✦ Отправить Сообщение
                  </button>
                </form>
              </>
            )}
          </div>
        </div>

        <div className="text-center mt-16 pb-4">
          <div className="font-display text-2xl text-foreground/20 mb-2">✦ Арканум ✦</div>
          <p className="font-body text-[10px] tracking-widest uppercase text-foreground/20">
            © 2024 — Все права защищены
          </p>
        </div>
      </div>
    </section>
  );
}