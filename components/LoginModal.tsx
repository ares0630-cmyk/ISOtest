import React, { useState } from 'react';
import { X, Lock, KeyRound } from 'lucide-react';
import { Button } from './Button';

interface LoginModalProps {
  onClose: () => void;
  onLogin: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ onClose, onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 預設密碼為 admin123
    if (password === 'admin123') {
      onLogin();
    } else {
      setError('Incorrect password');
      setPassword('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden relative animate-fade-in-up">
        <button 
            onClick={onClose} 
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-8">
            <div className="flex flex-col items-center mb-6">
                <div className="p-3 bg-slate-100 rounded-full mb-4">
                    <Lock className="h-8 w-8 text-slate-700" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Admin Access</h2>
                <p className="text-sm text-gray-500">Enter password to manage content</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <div className="relative">
                        <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input 
                            type="password" 
                            autoFocus
                            placeholder="••••••••" 
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setError('');
                            }}
                        />
                    </div>
                    {error && <p className="text-red-500 text-xs mt-1 ml-1">{error}</p>}
                </div>
                
                <Button type="submit" variant="secondary" className="w-full mt-2" size="md">
                    Login
                </Button>
            </form>
        </div>
      </div>
    </div>
  );
};