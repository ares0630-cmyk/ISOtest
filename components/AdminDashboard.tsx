import React, { useState } from 'react';
import { IsoDocument, SiteConfig } from '../types';
import { Button } from './Button';
import { Edit, Trash2, Plus, Upload, X, Save, FileText, Filter, LayoutTemplate, FileBox, Image as ImageIcon } from 'lucide-react';

interface AdminDashboardProps {
  documents: IsoDocument[];
  siteConfig: SiteConfig;
  onAdd: (doc: IsoDocument) => void;
  onEdit: (doc: IsoDocument) => void;
  onDelete: (id: string) => void;
  onUpdateSiteConfig: (config: SiteConfig) => void;
}

type AdminTab = 'DOCUMENTS' | 'CONTENT';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  documents, 
  siteConfig,
  onAdd, 
  onEdit, 
  onDelete,
  onUpdateSiteConfig
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('DOCUMENTS');
  
  // Document State
  const [isEditingDoc, setIsEditingDoc] = useState(false);
  const [currentDoc, setCurrentDoc] = useState<Partial<IsoDocument>>({});
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');

  // Content State
  const [tempSiteConfig, setTempSiteConfig] = useState<SiteConfig>(siteConfig);

  // --- Document Handlers ---
  const handleEditDocClick = (doc: IsoDocument) => {
    setCurrentDoc(doc);
    setIsEditingDoc(true);
  };

  const handleAddDocClick = () => {
    setCurrentDoc({
      id: `doc_${Date.now()}`,
      price: 0,
      category: 'Quality',
      fileType: 'PDF',
      downloadUrl: '#'
    });
    setIsEditingDoc(true);
  };

  const handleDocSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentDoc.id && currentDoc.title) {
        if (documents.some(d => d.id === currentDoc.id)) {
            onEdit(currentDoc as IsoDocument);
        } else {
            onAdd(currentDoc as IsoDocument);
        }
        setIsEditingDoc(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
          const fakeUrl = URL.createObjectURL(file);
          const ext = file.name.split('.').pop()?.toUpperCase() as any;
          setCurrentDoc(prev => ({
              ...prev,
              downloadUrl: fakeUrl,
              fileType: ['PDF', 'DOCX', 'XLSX'].includes(ext) ? ext : 'PDF'
          }));
      }
  };

  const filteredDocuments = documents.filter(doc => {
    if (categoryFilter === 'ALL') return true;
    return doc.category === categoryFilter;
  });

  // --- Content Handlers ---
  const handleConfigSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSiteConfig(tempSiteConfig);
    alert('Site content updated successfully!');
  };

  // --- Renders ---

  if (isEditingDoc) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-slate-50">
            <h2 className="text-xl font-bold text-gray-800">
                {documents.some(d => d.id === currentDoc.id) ? 'Edit Document' : 'Upload New Document'}
            </h2>
            <button onClick={() => setIsEditingDoc(false)} className="text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6" />
            </button>
          </div>
          
          <form onSubmit={handleDocSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ISO Code</label>
                    <input 
                        type="text" 
                        required
                        value={currentDoc.code || ''}
                        onChange={e => setCurrentDoc({...currentDoc, code: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                        placeholder="e.g. ISO 9001:2015"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select 
                        value={currentDoc.category}
                        onChange={e => setCurrentDoc({...currentDoc, category: e.target.value as any})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                    >
                        <option value="Quality">Quality</option>
                        <option value="Security">Security</option>
                        <option value="Environment">Environment</option>
                        <option value="Safety">Safety</option>
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Document Title</label>
                <input 
                    type="text" 
                    required
                    value={currentDoc.title || ''}
                    onChange={e => setCurrentDoc({...currentDoc, title: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                    placeholder="e.g. Implementation Checklist"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                    rows={4}
                    value={currentDoc.description || ''}
                    onChange={e => setCurrentDoc({...currentDoc, description: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                    <div className="relative">
                        <span className="absolute left-3 top-2 text-gray-500">$</span>
                        <input 
                            type="number" 
                            min="0"
                            step="0.01"
                            value={currentDoc.price || 0}
                            onChange={e => setCurrentDoc({...currentDoc, price: parseFloat(e.target.value)})}
                            className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                        />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Set to 0 for Free documents.</p>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">File Upload</label>
                    <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Upload className="w-8 h-8 mb-2 text-gray-400" />
                                <p className="text-sm text-gray-500"><span className="font-semibold">Click to upload</span></p>
                                <p className="text-xs text-gray-500">PDF, DOCX, XLSX</p>
                            </div>
                            <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} />
                        </label>
                    </div>
                    {currentDoc.fileType && (
                         <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
                            <FileText className="w-4 h-4"/> File type detected: {currentDoc.fileType}
                         </p>
                    )}
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <Button type="button" variant="outline" onClick={() => setIsEditingDoc(false)}>Cancel</Button>
                <Button type="submit" className="flex items-center gap-2">
                    <Save className="h-4 w-4" /> Save Document
                </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
            <h1 className="text-3xl font-bold text-gray-900">CMS Dashboard</h1>
            <p className="text-gray-500 mt-1">Manage your ISO documents and site content.</p>
        </div>
        
        {/* Tab Switcher */}
        <div className="flex p-1 bg-gray-100 rounded-lg">
            <button 
                onClick={() => setActiveTab('DOCUMENTS')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    activeTab === 'DOCUMENTS' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
            >
                <FileBox className="w-4 h-4" /> Documents
            </button>
            <button 
                onClick={() => setActiveTab('CONTENT')}
                 className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    activeTab === 'CONTENT' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
            >
                <LayoutTemplate className="w-4 h-4" /> Site Content
            </button>
        </div>
      </div>

      {activeTab === 'DOCUMENTS' && (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div className="relative rounded-md shadow-sm w-64">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Filter className="h-4 w-4 text-gray-400" aria-hidden="true" />
                    </div>
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="block w-full rounded-md border-gray-300 pl-10 focus:border-secondary focus:ring-secondary sm:text-sm py-2 border"
                    >
                        <option value="ALL">All Categories</option>
                        <option value="Quality">Quality</option>
                        <option value="Security">Security</option>
                        <option value="Environment">Environment</option>
                        <option value="Safety">Safety</option>
                    </select>
                </div>
                <Button onClick={handleAddDocClick} className="flex items-center gap-2 whitespace-nowrap">
                    <Plus className="h-5 w-5" /> Upload New
                </Button>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredDocuments.length > 0 ? (
                            filteredDocuments.map((doc) => (
                            <tr key={doc.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{doc.code}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-xs truncate">{doc.title}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                        doc.category === 'Security' ? 'bg-red-100 text-red-800' :
                                        doc.category === 'Quality' ? 'bg-blue-100 text-blue-800' :
                                        doc.category === 'Environment' ? 'bg-green-100 text-green-800' :
                                        'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {doc.category}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {doc.price === 0 ? <span className="text-green-600 font-bold">Free</span> : `$${doc.price.toFixed(2)}`}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => handleEditDocClick(doc)} className="text-secondary hover:text-blue-900 mr-4">
                                        <Edit className="h-5 w-5" />
                                    </button>
                                    <button onClick={() => onDelete(doc.id)} className="text-red-600 hover:text-red-900">
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                </td>
                            </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                    No documents found in this category.
                                </td>
                            </tr>
                        )}
                    </tbody>
                    </table>
                </div>
            </div>
        </div>
      )}

      {activeTab === 'CONTENT' && (
         <div className="bg-white shadow-md rounded-lg border border-gray-200 p-6">
             <h2 className="text-lg font-medium text-gray-900 mb-6 border-b border-gray-200 pb-2">Homepage - Hero Section</h2>
             <form onSubmit={handleConfigSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Main Headline</label>
                        <input 
                            type="text" 
                            value={tempSiteConfig.heroHeadline}
                            onChange={e => setTempSiteConfig({...tempSiteConfig, heroHeadline: e.target.value})}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                        />
                    </div>
                    <div>
                         <label className="block text-sm font-medium text-gray-700 mb-1">Highlight Text (Blue)</label>
                        <input 
                            type="text" 
                            value={tempSiteConfig.heroHeadlineHighlight}
                            onChange={e => setTempSiteConfig({...tempSiteConfig, heroHeadlineHighlight: e.target.value})}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                        />
                    </div>
                </div>
                <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                     <textarea 
                        rows={2}
                        value={tempSiteConfig.heroSubtitle}
                        onChange={e => setTempSiteConfig({...tempSiteConfig, heroSubtitle: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                     />
                </div>
                 <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">CTA Button Text</label>
                     <input 
                        type="text" 
                        value={tempSiteConfig.heroButtonText}
                        onChange={e => setTempSiteConfig({...tempSiteConfig, heroButtonText: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                     />
                </div>
                
                <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                        <ImageIcon className="w-4 h-4" /> Hero Background Image
                     </label>
                     <div className="space-y-4">
                         <div>
                            <label className="block text-xs text-gray-500 mb-1">Image URL</label>
                            <input 
                                type="text" 
                                value={tempSiteConfig.heroImageUrl}
                                onChange={e => setTempSiteConfig({...tempSiteConfig, heroImageUrl: e.target.value})}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                                placeholder="https://..."
                            />
                         </div>
                         
                         <div>
                            <div className="flex justify-between items-center mb-1">
                                <label className="block text-xs text-gray-500">Image Opacity (Balance)</label>
                                <span className="text-xs font-medium text-gray-700">{tempSiteConfig.heroImageOpacity ?? 60}%</span>
                            </div>
                            <input 
                                type="range" 
                                min="0" 
                                max="100" 
                                step="5"
                                value={tempSiteConfig.heroImageOpacity ?? 60}
                                onChange={e => setTempSiteConfig({...tempSiteConfig, heroImageOpacity: parseInt(e.target.value)})}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-secondary"
                            />
                         </div>
                         
                         {tempSiteConfig.heroImageUrl && (
                             <div className="relative rounded-lg overflow-hidden border border-gray-200 h-48 bg-gray-900 group">
                                <img 
                                    src={tempSiteConfig.heroImageUrl} 
                                    alt="Preview" 
                                    className="w-full h-full object-cover mix-blend-overlay transition-opacity duration-300"
                                    style={{ opacity: (tempSiteConfig.heroImageOpacity ?? 60) / 100 }}
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                     <div className="bg-black/30 backdrop-blur-sm px-3 py-1 rounded text-white text-sm font-medium border border-white/20">
                                        Preview
                                     </div>
                                </div>
                             </div>
                         )}
                     </div>
                </div>

                <h2 className="text-lg font-medium text-gray-900 pt-6 mb-6 border-b border-gray-200 pb-2">About Page</h2>
                <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">About Title</label>
                     <input 
                        type="text" 
                        value={tempSiteConfig.aboutTitle}
                        onChange={e => setTempSiteConfig({...tempSiteConfig, aboutTitle: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                     />
                </div>
                <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">About Text Content</label>
                     <textarea 
                        rows={8}
                        value={tempSiteConfig.aboutText}
                        onChange={e => setTempSiteConfig({...tempSiteConfig, aboutText: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent font-mono text-sm"
                     />
                </div>

                <div className="flex justify-end pt-4">
                    <Button type="submit" className="flex items-center gap-2">
                        <Save className="h-4 w-4" /> Save Site Content
                    </Button>
                </div>
             </form>
         </div>
      )}
    </div>
  );
};