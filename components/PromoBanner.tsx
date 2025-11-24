import React from 'react';
import { CheckCircle, Sparkles } from 'lucide-react';

export const PromoBanner: React.FC = () => {
  return (
    <div className="relative overflow-hidden py-12">
        {/* Dynamic Background - Lighter, Fresher Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500 animate-gradient-flow opacity-95"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-4 shadow-sm">
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span className="text-xs font-semibold text-white uppercase tracking-wider">Premium Benefit</span>
            </div>
            
            <h2 className="text-2xl md:text-4xl font-bold mb-4 tracking-tight">
                Free ISO Compliance Check
            </h2>
            
            <p className="text-base md:text-lg text-blue-50 max-w-2xl mx-auto mb-6 leading-relaxed font-light">
                Purchase any premium document and receive a <strong className="text-white font-medium border-b border-yellow-300">one-time free expert review</strong> to ensure your documentation meets standards.
            </p>

             <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm font-medium text-blue-100">
                <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-cyan-300" />
                    <span>Auditor Approved</span>
                </div>
                <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-cyan-300" />
                    <span>Detailed Feedback</span>
                </div>
                 <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-cyan-300" />
                    <span>Guaranteed Compliance</span>
                </div>
            </div>
        </div>
    </div>
  );
};