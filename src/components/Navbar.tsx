import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

interface NavbarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const navItems = [
  { id: 'home', label: 'Главная' },
  { id: 'shop', label: 'Магазин' },
  { id: 'generator', label: 'Генератор' },
  { id: 'about', label: 'Об амулетах' },
  { id: 'account', label: 'Кабинет' },
  { id: 'contacts', label: 'Контакты' },
];

export default function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-obsidian/95 backdrop-blur-md border-b border-gold/10 py-3' : 'bg-transparent py-5'
    }`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 group"
        >
          <div className="relative">
            <span className="text-2xl animate-float">🔮</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display text-xl font-bold text-gold-light tracking-widest uppercase">Арканум</span>
            <span className="font-body text-[9px] tracking-[0.3em] text-gold/60 uppercase">Магазин Амулетов</span>
          </div>
        </button>

        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`font-body text-xs tracking-widest uppercase transition-all duration-300 relative group ${
                activeSection === item.id
                  ? 'text-gold'
                  : 'text-foreground/60 hover:text-gold/80'
              }`}
            >
              {item.label}
              <span className={`absolute -bottom-1 left-0 h-px bg-gold transition-all duration-300 ${
                activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </button>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => onNavigate('account')}
            className="btn-outline-gold px-4 py-2 rounded text-xs"
          >
            Войти
          </button>
          <button
            onClick={() => onNavigate('shop')}
            className="btn-gold px-5 py-2 rounded text-xs"
          >
            Купить
          </button>
        </div>

        <button
          className="lg:hidden text-gold"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Icon name={menuOpen ? "X" : "Menu"} size={24} />
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-obsidian/98 border-t border-gold/10 px-6 py-4 flex flex-col gap-4 animate-fade-in">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { onNavigate(item.id); setMenuOpen(false); }}
              className={`font-body text-xs tracking-widest uppercase text-left py-2 border-b border-gold/10 transition-colors ${
                activeSection === item.id ? 'text-gold' : 'text-foreground/60'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
