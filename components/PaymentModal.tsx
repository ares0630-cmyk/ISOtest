import React, { useState } from 'react';
import { X, CreditCard, Lock, CheckCircle, ExternalLink, ArrowRight } from 'lucide-react';
import { IsoDocument } from '../types';
import { Button } from './Button';

interface PaymentModalProps {
  doc: IsoDocument | null;
  onClose: () => void;
  onSuccess: (docId: string) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ doc, onClose, onSuccess }) => {
  // Steps: 'details' -> 'redirecting' -> 'confirm' -> 'success'
  const [step, setStep] = useState<'details' | 'redirecting' | 'confirm' | 'success'>('details');

  if (!doc) return null;

  const handleStartPayment = () => {
    setStep('redirecting');
    
    // Simulate opening Stripe in new tab
    setTimeout(() => {
      if (doc.paymentLink) {
        window.open(doc.paymentLink, '_blank');
      } else {
        // Fallback for demo if no link provided
        console.log("No payment link provided, simulating local flow.");
      }
      setStep('confirm');
    }, 1500);
  };

  const handleConfirmPayment = () => {
    setStep('success');
    setTimeout(() => {
      onSuccess(doc.id);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative animate-fade-in-up">
        <button 
            onClick={onClose} 
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            disabled={step === 'redirecting' || step === 'success'}
        >
          <X className="h-5 w-5" />
        </button>

        {step === 'details' && (
          <div className="p-8">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-50 rounded-full">
                    <Lock className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Secure Checkout</h2>
                    <p className="text-sm text-gray-500">Powered by Stripe</p>
                </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-100">
                <p className="text-sm font-medium text-gray-500 mb-1">Order Summary</p>
                <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">{doc.code}</span>
                    <span className="font-bold text-gray-900 text-lg">${doc.price.toFixed(2)}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1 truncate">{doc.title}</p>
            </div>

            <div className="space-y-4">
                <div className="text-sm text-gray-600">
                    <p>You will be redirected to our secure payment partner to complete your purchase.</p>
                </div>
                
                <Button onClick={handleStartPayment} className="w-full mt-4 flex items-center justify-center gap-2" size="lg">
                    Proceed to Payment <ArrowRight className="h-4 w-4" />
                </Button>
                
                <div className="flex justify-center gap-4 mt-4 opacity-50">
                    <CreditCard className="h-6 w-6 text-gray-400" />
                    <div className="font-mono text-xs text-gray-400 pt-1">VISA / MC / AMEX</div>
                </div>
            </div>
          </div>
        )}

        {step === 'redirecting' && (
          <div className="p-12 text-center flex flex-col items-center justify-center min-h-[300px]">
            <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin mb-6"></div>
            <h3 className="text-lg font-semibold text-gray-900">Redirecting to Stripe...</h3>
            <p className="text-gray-500 text-sm mt-2">Please do not close this window.</p>
          </div>
        )}

        {step === 'confirm' && (
           <div className="p-8 text-center flex flex-col items-center justify-center min-h-[300px]">
             <ExternalLink className="h-12 w-12 text-blue-500 mb-4" />
             <h3 className="text-xl font-bold text-gray-900 mb-2">Payment Pending</h3>
             <p className="text-gray-600 text-sm mb-6">
                We've opened the payment page in a new tab. Once you've completed the transaction, please click the button below to access your document.
             </p>
             
             <Button onClick={handleConfirmPayment} className="w-full" variant="primary">
                I have completed payment
             </Button>
             
             <button onClick={() => setStep('details')} className="mt-4 text-sm text-gray-400 hover:text-gray-600">
                Cancel and go back
             </button>
           </div>
        )}

        {step === 'success' && (
           <div className="p-12 text-center flex flex-col items-center justify-center min-h-[300px]">
             <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600 animate-bounce">
                <CheckCircle className="h-8 w-8" />
             </div>
             <h3 className="text-xl font-bold text-gray-900 mb-2">Purchase Confirmed!</h3>
             <p className="text-gray-500">Your document has been unlocked.</p>
           </div>
        )}
      </div>
    </div>
  );
};