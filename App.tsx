import React, { useState } from 'react';
import { PageView, UserState, IsoDocument, SiteConfig } from './types';
import { MOCK_DOCUMENTS, DEFAULT_SITE_CONFIG } from './constants';
import { Hero } from './components/Hero';
import { DocumentCard } from './components/DocumentCard';
import { ChatBot } from './components/ChatBot';
import { PaymentModal } from './components/PaymentModal';
import { Button } from './components/Button';
import { AdminDashboard } from './components/AdminDashboard';
import { PromoBanner } from './components/PromoBanner';
import { LoginModal } from './components/LoginModal';
import { LayoutGrid, Info, Shield, Mail, Menu, X, Globe, Lock, Settings } from 'lucide-react';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageView>(PageView.HOME);
  const [userState, setUserState] = useState<UserState>({ purchasedDocIds: [] });
  
  // Lifted state for documents and site content to allow Admin modification
  const [documents, setDocuments] = useState<IsoDocument[]>(MOCK_DOCUMENTS);
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(DEFAULT_SITE_CONFIG);

  const [selectedDocForPayment, setSelectedDocForPayment] = useState<IsoDocument | null>(null);
  const [downloadingDocId, setDownloadingDocId] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [filter, setFilter] = useState<'ALL' | 'FREE' | 'PAID'>('ALL');

  // Admin Auth State
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const handleDocAction = (doc: IsoDocument) => {
    const isOwned = doc.price === 0 || userState.purchasedDocIds.includes(doc.id);
    
    if (isOwned) {
      setDownloadingDocId(doc.id);
      // Simulate download delay
      setTimeout(() => {
        setDownloadingDocId(null);
        alert(`Successfully downloaded: ${doc.title}`);
      }, 1500);
    } else {
      setSelectedDocForPayment(doc);
    }
  };

  const handlePaymentSuccess = (docId: string) => {
    setUserState(prev => ({
      ...prev,
      purchasedDocIds: [...prev.purchasedDocIds, docId]
    }));
    setSelectedDocForPayment(null);
  };

  // --- Admin Logic ---
  const handleAdminAccessClick = () => {
    if (isAdminAuthenticated) {
      setCurrentPage(PageView.ADMIN);
    } else {
      setShowLoginModal(true);
    }
  };

  const handleLoginSuccess = () => {
    setIsAdminAuthenticated(true);
    setShowLoginModal(false);
    setCurrentPage(PageView.ADMIN);
  };

  // --- Admin Handlers ---
  const handleAddDocument = (newDoc: IsoDocument) => {
    setDocuments(prev => [newDoc, ...prev]);
    alert('Document uploaded successfully!');
  };

  const handleEditDocument = (updatedDoc: IsoDocument) => {
    setDocuments(prev => prev.map(doc => doc.id === updatedDoc.id ? updatedDoc : doc));
    alert('Document updated successfully!');
  };

  const handleDeleteDocument = (id: string) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
        setDocuments(prev => prev.filter(doc => doc.id !== id));
    }
  };

  const handleUpdateSiteConfig = (newConfig: SiteConfig) => {
      setSiteConfig(newConfig);
  };

  // --- Views ---

  const renderHome = () => (
    <>
      <Hero 
        config={siteConfig}
        onCtaClick={() => setCurrentPage(PageView.DOCUMENTS)} 
      />
      
      {/* Features Section (SEO, UX, Security Highlights) */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base text-secondary font-semibold tracking-wide uppercase">Why Choose Us</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Engineered for Compliance & Growth
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              We integrate modern web technologies with traditional ISO standards consulting.
            </p>
          </div>

          <div className="mt-20">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {[
                {
                  name: 'Responsive Design',
                  description: 'Access your ISO documents on any device. Our mobile-first approach ensures compliance management on the go.',
                  icon: Globe,
                },
                {
                  name: 'Advanced Security',
                  description: 'Your transactions and data are protected with SSL encryption and secure payment gateways compliant with PCI DSS.',
                  icon: Shield,
                },
                {
                  name: 'Smart Document Management',
                  description: 'Filter, search, and manage your purchased ISO templates in a centralized, user-friendly dashboard.',
                  icon: LayoutGrid,
                },
                {
                  name: 'Seamless Payments',
                  description: 'Integrated payment systems for instant access to premium implementation guides and manuals.',
                  icon: Lock,
                },
              ].map((feature) => (
                <div key={feature.name} className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-secondary text-white">
                      <feature.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </>
  );

  const renderDocuments = () => {
    const filteredDocs = documents.filter(doc => {
        if (filter === 'ALL') return true;
        if (filter === 'FREE') return doc.price === 0;
        if (filter === 'PAID') return doc.price > 0;
        return true;
    });

    return (
      <>
        {/* Slogan Banner moved here */}
        <PromoBanner />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Document Library</h1>
              <p className="text-gray-500 mt-1">Browse our collection of ISO templates, checklists, and manuals.</p>
            </div>
            
            <div className="bg-white p-1 rounded-lg border border-gray-200 inline-flex shadow-sm">
              {(['ALL', 'FREE', 'PAID'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    filter === f 
                      ? 'bg-secondary text-white shadow-sm' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {f.charAt(0) + f.slice(1).toLowerCase()}
                </button>
              ))}
            </div>
          </div>

          {filteredDocs.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200 border-dashed">
                  <p className="text-gray-500">No documents found in this category.</p>
              </div>
          ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDocs.map(doc => (
                  <DocumentCard 
                  key={doc.id} 
                  doc={doc} 
                  isPurchased={userState.purchasedDocIds.includes(doc.id)} 
                  isDownloading={downloadingDocId === doc.id}
                  onAction={handleDocAction} 
                  />
              ))}
              </div>
          )}
        </div>
      </>
    );
  };

  const renderAbout = () => (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">{siteConfig.aboutTitle}</h1>
        <div className="prose prose-lg text-gray-500 whitespace-pre-wrap">
            {siteConfig.aboutText}
        </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => setCurrentPage(PageView.HOME)}>
                <Shield className="h-8 w-8 text-secondary" />
                <span className="ml-2 text-xl font-bold text-gray-900">ISO Nexus</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {[
                    { name: 'Home', val: PageView.HOME },
                    { name: 'Documents', val: PageView.DOCUMENTS },
                    { name: 'About', val: PageView.ABOUT },
                ].map(item => (
                    <button
                        key={item.name}
                        onClick={() => setCurrentPage(item.val)}
                        className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                            currentPage === item.val 
                            ? 'border-secondary text-gray-900' 
                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                        }`}
                    >
                        {item.name}
                    </button>
                ))}
                {/* Admin Button Removed from here */}
              </div>
            </div>
            
            <div className="flex items-center gap-4">
                <div className="flex items-center sm:hidden">
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-gray-400 hover:text-gray-500">
                        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
            <div className="sm:hidden bg-white border-b border-gray-200">
                <div className="pt-2 pb-3 space-y-1">
                    {[
                        { name: 'Home', val: PageView.HOME },
                        { name: 'Documents', val: PageView.DOCUMENTS },
                        { name: 'About', val: PageView.ABOUT },
                    ].map(item => (
                        <button
                            key={item.name}
                            onClick={() => {
                                setCurrentPage(item.val);
                                setMobileMenuOpen(false);
                            }}
                            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium w-full text-left ${
                                currentPage === item.val
                                ? 'bg-blue-50 border-secondary text-secondary'
                                : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                            }`}
                        >
                            {item.name}
                        </button>
                    ))}
                    {/* Mobile Admin Link */}
                     <button
                        onClick={() => {
                            setMobileMenuOpen(false);
                            handleAdminAccessClick();
                        }}
                         className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium w-full text-left text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
                     >
                        Admin Access
                     </button>
                </div>
            </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="flex-grow">
        {currentPage === PageView.HOME && renderHome()}
        {currentPage === PageView.DOCUMENTS && renderDocuments()}
        {currentPage === PageView.ABOUT && renderAbout()}
        {currentPage === PageView.ADMIN && isAdminAuthenticated && (
            <AdminDashboard 
                documents={documents}
                siteConfig={siteConfig}
                onAdd={handleAddDocument}
                onEdit={handleEditDocument}
                onDelete={handleDeleteDocument}
                onUpdateSiteConfig={handleUpdateSiteConfig}
            />
        )}
      </div>

      {/* Footer */}
      <footer className="bg-primary text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
                <div className="flex items-center mb-4">
                    <Shield className="h-6 w-6 text-secondary" />
                    <span className="ml-2 text-lg font-bold">ISO Nexus</span>
                </div>
                <p className="text-gray-400 text-sm">
                    Providing world-class ISO documentation and consulting services.
                </p>
            </div>
            <div>
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase mb-4">Services</h3>
                <ul className="space-y-2 text-gray-400 text-sm">
                    <li>Document Management System</li>
                    <li>ISO Implementation</li>
                    <li>Internal Audits</li>
                    <li>Security Compliance</li>
                </ul>
            </div>
            <div>
                 <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase mb-4">Contact</h3>
                 <ul className="space-y-2 text-gray-400 text-sm">
                    <li className="flex items-center gap-2"><Mail className="h-4 w-4"/> support@isonexus.com</li>
                    <li className="flex items-center gap-2"><Info className="h-4 w-4"/> 1-800-ISO-HELP</li>
                 </ul>
            </div>
        </div>
        <div className="border-t border-gray-800 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
                <p>
                    &copy; 2024 ISO Nexus. All rights reserved. | SEO Optimized | Secure Payments
                </p>
                {/* Discreet Admin Link in Footer */}
                <button 
                    onClick={handleAdminAccessClick} 
                    className="mt-4 md:mt-0 flex items-center gap-1 hover:text-gray-300 transition-colors opacity-50 hover:opacity-100"
                >
                    <Settings className="w-3 h-3" />
                    <span className="text-xs">Admin Access</span>
                </button>
            </div>
        </div>
      </footer>

      {/* Overlays */}
      <ChatBot />
      {showLoginModal && (
        <LoginModal 
            onClose={() => setShowLoginModal(false)}
            onLogin={handleLoginSuccess}
        />
      )}
      {selectedDocForPayment && (
        <PaymentModal 
            doc={selectedDocForPayment} 
            onClose={() => setSelectedDocForPayment(null)} 
            onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
};

export default App;