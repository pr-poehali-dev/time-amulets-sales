import { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from '@/components/Navbar';
import HomeSection from '@/components/sections/HomeSection';
import ShopSection from '@/components/sections/ShopSection';
import GeneratorSection from '@/components/sections/GeneratorSection';
import AboutSection from '@/components/sections/AboutSection';
import AccountSection from '@/components/sections/AccountSection';
import ContactsSection from '@/components/sections/ContactsSection';

type Section = 'home' | 'shop' | 'generator' | 'about' | 'account' | 'contacts';

const App = () => {
  const [activeSection, setActiveSection] = useState<Section>('home');

  const navigate = (section: string) => {
    setActiveSection(section as Section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <TooltipProvider>
      <Toaster />
      <div className="min-h-screen bg-background scrollbar-mystic">
        <Navbar activeSection={activeSection} onNavigate={navigate} />
        <main>
          {activeSection === 'home' && <HomeSection onNavigate={navigate} />}
          {activeSection === 'shop' && <ShopSection onNavigate={navigate} />}
          {activeSection === 'generator' && <GeneratorSection />}
          {activeSection === 'about' && <AboutSection />}
          {activeSection === 'account' && <AccountSection />}
          {activeSection === 'contacts' && <ContactsSection />}
        </main>
      </div>
    </TooltipProvider>
  );
};

export default App;
