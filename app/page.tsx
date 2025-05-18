'use client';

import { useState, useEffect } from "react";
import CertificateForm from "./components/CertificateForm";
import TemplateSelector from "./components/TemplateSelector";
import { toast } from "sonner";
import Navbar from "./components/Navbar";
import { CertificateData } from "@/types/interface";
import { getErrorMsg } from "@/lib/utils";
import CertificatePreview from "./components/CertificatePreview";
import { HiOutlineSparkles } from "react-icons/hi";

export default function Home() {
  const [activeTab, setActiveTab] = useState("template");
  
  const [certificateData, setCertificateData] = useState<CertificateData>({
    recipientName: "",
    certificateTitle: "",
    issuerName: "",
    issueDate: new Date(),
    description: "",
    selectedTemplate: 0, 
    borderStyle: 'classic',
    primaryColor: '#000000',
    secondaryColor: '#000000',
    font: 'serif',
    certificateNumber: '',
    qrCode: false,
    watermark: false,
    selectedText: null,
    selectedElement: null
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab');
      
      if (tabParam && (tabParam === 'template' || tabParam === 'preview')) {
        setActiveTab(tabParam);
        
        if (tabParam === 'template' && window.location.hash === '#template-section') {
          setTimeout(() => {
            document.getElementById('template-section')?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      }
    }
  }, []);

  const handleDataChange = (data: Partial<CertificateData>) => {
    setCertificateData(prev => ({ ...prev, ...data }));
  };

  const handleDownload = async () => {
    try {
      toast.loading("Downloading certificate...");
      //TODO: Add download logic
      setTimeout(() => {
        toast.success("Certificate downloaded successfully!");
      }, 2000);
    } catch (error) {
      toast.error("Failed to download certificate", {
        description: error instanceof Error ? error.message : String(error) || getErrorMsg(error),
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#080510] text-white relative pt-16 overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 left-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-violet-600/20 to-blue-600/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-gradient-to-l from-indigo-600/10 to-fuchsia-600/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

      {/* Mesh grid overlay */}
      <div className="absolute inset-0 bg-[url('/mesh-grid.png')] bg-center opacity-10 pointer-events-none"></div>
      
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* App Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 mb-6 bg-white/5 backdrop-blur-md rounded-full border border-white/10">
            <HiOutlineSparkles className="text-blue-400 mr-2" />
            <span className="text-sm font-medium text-blue-300">Professional Certificate Generator</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Create stunning certificates
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400">
              in minutes, not hours.
            </span>
          </h1>
          
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Our intuitive platform lets you design and generate professional certificates with enterprise-grade features.
          </p>
        </div>

        {/* Custom styled tabs */}
        <div className="max-w-full mx-auto backdrop-blur-md bg-gradient-to-b from-[#0e0e16]/90 to-[#12121e]/90 border border-white/10 rounded-2xl shadow-2xl p-0 overflow-hidden mb-8">
          {/* Premium Tab Navigation with Accent Line */}
          <div className="relative bg-[#0a0a14]/80 border-b border-white/5 px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex space-x-1">
                <button 
                  onClick={() => setActiveTab("template")}
                  className={`relative px-6 py-3 rounded-lg font-medium text-sm transition-all duration-300 ${
                    activeTab === "template" 
                      ? "text-white" 
                      : "text-gray-400 hover:text-gray-300 hover:bg-white/5"
                  }`}
                >
                  <span className="relative z-10 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Design Certificate
                  </span>
                  {activeTab === "template" && (
                    <>
                      <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-600/20 to-indigo-600/20 animate-pulse-slow"></span>
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500"></span>
                    </>
                  )}
                </button>
                
                <button 
                  onClick={() => setActiveTab("preview")}
                  className={`relative px-6 py-3 rounded-lg font-medium text-sm transition-all duration-300 ${
                    activeTab === "preview" 
                      ? "text-white" 
                      : "text-gray-400 hover:text-gray-300 hover:bg-white/5"
                  }`}
                >
                  <span className="relative z-10 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Preview & Download
                  </span>
                  {activeTab === "preview" && (
                    <>
                      <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-600/20 to-indigo-600/20 animate-pulse-slow"></span>
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500"></span>
                    </>
                  )}
                </button>
              </div>
              
              {/* Session indicator */}
              <div className="hidden md:flex items-center bg-white/5 px-3 py-1.5 rounded-full text-xs text-gray-400 border border-white/5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
                <span>Unsaved changes will be preserved</span>
              </div>
            </div>
          </div>

          {/* Content Container */}
          <div className="p-8">
            {/* Template Selection */}
            {activeTab === "template" && (
              <div className="space-y-8">
                {!certificateData.selectedTemplate ? (
                  <div id="template-section" className="relative group">
                    {/* Premium glass card design */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-violet-600 rounded-xl opacity-70 blur-xl group-hover:opacity-100 transition duration-500"></div>
                    
                    <div className="relative bg-gradient-to-b from-[#14141f] to-[#0e0e16] border border-white/10 rounded-xl overflow-hidden backdrop-blur-md">
                      {/* Card header with decorative element */}
                      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                      
                      <div className="relative p-8">
                        <div className="flex items-center mb-6">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600/10 border border-blue-600/20 mr-4">
                            <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                            </svg>
                          </div>
                          <div>
                            <h2 className="text-2xl font-bold text-white leading-tight">Choose Your Template</h2>
                            <p className="text-gray-400">
                              Select a professional design to start customizing
                            </p>
                          </div>
                        </div>
                        
                        <TemplateSelector 
                          selectedTemplate={certificateData.selectedTemplate}
                          onSelectTemplate={(templateId) => handleDataChange({ selectedTemplate: templateId })}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Certificate Form Card - Takes 5/12 of the width */}
                    <div className="lg:col-span-5 relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl opacity-70 blur-xl group-hover:opacity-100 transition duration-500"></div>
                      
                      <div className="relative bg-gradient-to-b from-[#14141f] to-[#0e0e16] border border-white/10 rounded-xl backdrop-blur-md h-full">
                        <div className="p-6">
                          <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600/10 border border-indigo-600/20 mr-3">
                                <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </div>
                              <h2 className="text-xl font-bold text-white">Customize Certificate</h2>
                            </div>
                            <button
                              onClick={() => handleDataChange({ selectedTemplate: 0 })}
                              className="group flex items-center space-x-1 text-sm text-gray-400 hover:text-gray-300 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-3 py-1.5 transition-all"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                              </svg>
                              <span>Change Template</span>
                            </button>
                          </div>
                          
                          {/* Scrollable form container with custom scrollbar */}
                          <div className="pr-2 h-[calc(100vh-260px)] overflow-y-auto custom-scrollbar">
                            <CertificateForm 
                              certificateData={certificateData}
                              onDataChange={handleDataChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Preview Card - Takes 7/12 of the width */}
                    <div className="lg:col-span-7 relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-xl opacity-70 blur-xl group-hover:opacity-100 transition duration-500"></div>
                      
                      <div className="relative bg-gradient-to-b from-[#14141f] to-[#0e0e16] border border-white/10 p-6 rounded-xl backdrop-blur-md h-full">
                        <div className="flex items-center mb-4">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-600/10 border border-violet-600/20 mr-3">
                            <svg className="w-4 h-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </div>
                          <h2 className="text-xl font-bold text-white">Live Preview</h2>
                        </div>
                        
                        <div className="bg-gradient-to-r from-white/5 to-white/10 rounded-lg border border-white/10 p-6 shadow-inner h-[calc(100%-60px)] flex items-center justify-center">
                          {/* Certificate display with subtle float animation */}
                          <div className="w-full max-w-3xl transition transform hover:scale-[1.01] duration-500 ease-out shadow-xl animate-float">
                            <CertificatePreview data={certificateData} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Preview & Download */}
            {activeTab === "preview" && (
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-xl opacity-70 blur-xl group-hover:opacity-100 transition duration-500"></div>
                
                <div className="relative bg-gradient-to-b from-[#14141f] to-[#0e0e16] border border-white/10 rounded-xl backdrop-blur-md">
                  <div className="p-8">
                    <div className="flex items-center mb-6">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600/10 border border-indigo-600/20 mr-4">
                        <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white leading-tight">Final Preview</h2>
                        <p className="text-gray-400">
                          Review and download your certificate
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-white/5 to-white/10 rounded-lg border border-white/10 p-8 shadow-inner">
                      <div className="max-w-3xl mx-auto">
                        <div className="aspect-[1.414/1] w-full transition transform hover:scale-[1.01] duration-500 ease-out shadow-2xl">
                          <CertificatePreview data={certificateData} />
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-10 flex flex-col md:flex-row gap-10 justify-between items-center">
                      <div className="bg-gradient-to-r from-white/5 to-white/10 rounded-lg border border-white/10 p-4 max-w-xl">
                        <div className="flex items-start">
                          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-600/10 border border-blue-600/20 mr-4">
                            <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-white mb-1">Ready for download</h3>
                            <p className="text-sm text-gray-400">
                              Your certificate will be downloaded as a high-resolution PDF file that's ready to print or share digitally.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-4">
                        <button
                          onClick={() => setActiveTab("template")}
                          className="px-5 py-3 bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 rounded-lg text-sm font-medium transition-all flex items-center"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                          Return to Editor
                        </button>
                        <button
                          onClick={handleDownload}
                          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg transition transform hover:translate-y-[-2px] shadow-lg hover:shadow-indigo-500/25 flex items-center"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          Download Certificate
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}