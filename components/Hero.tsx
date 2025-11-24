import React from 'react';
import { ShieldCheck, Search, Zap, Lock } from 'lucide-react';
import { Button } from './Button';
import { SiteConfig } from '../types';

interface HeroProps {
  config: SiteConfig;
  onCtaClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ config, onCtaClick }) => {
  return (
    <div className="relative bg-primary overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-primary sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <svg
            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-primary transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                <span className="block xl:inline">{config.heroHeadline}</span>{' '}
                <span className="block text-secondary">{config.heroHeadlineHighlight}</span>
              </h1>
              <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                {config.heroSubtitle}
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Button size="lg" onClick={onCtaClick}>
                    {config.heroButtonText}
                  </Button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-gray-900 flex items-center justify-center">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full mix-blend-overlay transition-opacity duration-500"
          style={{ opacity: (config.heroImageOpacity ?? 60) / 100 }}
          src={config.heroImageUrl}
          alt="Hero background"
        />
        <div className="absolute grid grid-cols-2 gap-8 p-8">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/20 flex flex-col items-center text-center text-white">
                <ShieldCheck className="h-10 w-10 text-secondary mb-2" />
                <h3 className="font-bold">Enterprise Security</h3>
                <p className="text-sm text-gray-300">Bank-grade payment & data protection.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/20 flex flex-col items-center text-center text-white">
                <Zap className="h-10 w-10 text-yellow-400 mb-2" />
                <h3 className="font-bold">Fast DMS</h3>
                <p className="text-sm text-gray-300">Instant access to digital assets.</p>
            </div>
             <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/20 flex flex-col items-center text-center text-white">
                <Search className="h-10 w-10 text-green-400 mb-2" />
                <h3 className="font-bold">SEO Optimized</h3>
                <p className="text-sm text-gray-300">Discoverable resources.</p>
            </div>
             <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/20 flex flex-col items-center text-center text-white">
                <Lock className="h-10 w-10 text-red-400 mb-2" />
                <h3 className="font-bold">Access Control</h3>
                <p className="text-sm text-gray-300">Secure tiered document access.</p>
            </div>
        </div>
      </div>
    </div>
  );
};