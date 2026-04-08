import { useState } from 'react';
import Icon from '@/components/ui/icon';

export default function AccountSection() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  return (
    <section className="min-h-screen py-24 px-6 relative flex items-center">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-obsidian/40 to-background" />

      <div className="relative z-10 container mx-auto max-w-md">
        <div className="text-center mb-12">
          <span className="font-body text-[10px] tracking-[0.5em] uppercase text-gold/60">Ваш профиль</span>
          <h2 className="font-display text-6xl font-light text-foreground mt-3 mb-4">
            Кабинет
          </h2>
          <div className="mystic-divider max-w-xs mx-auto">
            <span className="text-gold/50 text-xs">✦</span>
          </div>
        </div>

        <div className="card-mystic rounded-xl p-8">
          <div className="flex rounded-lg overflow-hidden mb-8 border border-gold/20">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 font-body text-xs tracking-widest uppercase transition-all ${
                isLogin ? 'bg-gold text-obsidian' : 'text-foreground/50 hover:text-gold/70'
              }`}
            >
              Войти
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 font-body text-xs tracking-widest uppercase transition-all ${
                !isLogin ? 'bg-gold text-obsidian' : 'text-foreground/50 hover:text-gold/70'
              }`}
            >
              Регистрация
            </button>
          </div>

          <div className="space-y-4">
            {!isLogin && (
              <div>
                <label className="font-body text-[10px] tracking-widest uppercase text-gold/70 block mb-2">
                  Имя
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ваше имя..."
                  className="mystic-input w-full px-4 py-3 rounded text-sm font-body placeholder:text-foreground/30"
                />
              </div>
            )}

            <div>
              <label className="font-body text-[10px] tracking-widest uppercase text-gold/70 block mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="mystic-input w-full px-4 py-3 rounded text-sm font-body placeholder:text-foreground/30"
              />
            </div>

            <div>
              <label className="font-body text-[10px] tracking-widest uppercase text-gold/70 block mb-2">
                Пароль
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mystic-input w-full px-4 py-3 rounded text-sm font-body placeholder:text-foreground/30"
              />
            </div>

            <button className="btn-gold w-full py-4 rounded text-xs mt-6">
              {isLogin ? '✦ Войти в Кабинет' : '✦ Создать Аккаунт'}
            </button>
          </div>

          {isLogin && (
            <div className="text-center mt-4">
              <button className="font-body text-xs text-gold/40 hover:text-gold/70 transition-colors underline decoration-gold/20">
                Забыли пароль?
              </button>
            </div>
          )}
        </div>

        <div className="mt-8 card-mystic rounded-xl p-6">
          <h4 className="font-display text-xl text-foreground mb-4 flex items-center gap-2">
            <Icon name="Star" size={16} className="text-gold" />
            Возможности кабинета
          </h4>
          <ul className="space-y-3">
            {[
              'Сохранение персональных амулетов',
              'История заказов и покупок',
              'Коды амулетов для переиспользования',
              'Эксклюзивные предложения для членов',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 font-body text-xs text-foreground/55">
                <span className="text-gold mt-0.5">✦</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
