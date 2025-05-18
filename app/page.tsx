'use client';

import { useState, useEffect } from "react";
import CertificateForm from "./components/CertificateForm";
import TemplateSelector from "./components/TemplateSelector";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Navbar from "./components/Navbar";
import { CertificateData } from "@/types/interface";
import { getErrorMsg } from "@/lib/utils";
import CertificatePreview from "./components/CertificatePreview";
import { HiOutlineSparkles } from "react-icons/hi";
import { FaRegLightbulb } from "react-icons/fa";

export default function Home() {
  const [activeTab, setActiveTab] = useState("template");
  
  const [certificateData, setCertificateData] = useState<CertificateData>({
    recipientName: "",
    certificateTitle: "",
    issuerName: "",
    issueDate: new Date(),
    description: "",
    selectedTemplate: 0, // Set to 0 to indicate no template selected initially
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
        <div className="max-w-full mx-auto backdrop-blur-md bg-[#0e0e16]/80 border border-white/5 rounded-2xl p-8 mb-8">
          <div className="flex justify-center mb-8">
            <div className="inline-flex p-1 bg-[#161622] rounded-lg border border-white/5">
              <button 
                onClick={() => setActiveTab("template")}
                className={`px-6 py-2.5 rounded-md font-medium transition-all ${
                  activeTab === "template" 
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg" 
                    : "text-gray-400 hover:text-gray-300"
                }`}
              >
                Design Certificate
              </button>
              <button 
                onClick={() => setActiveTab("preview")}
                className={`px-6 py-2.5 rounded-md font-medium transition-all ${
                  activeTab === "preview" 
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg" 
                    : "text-gray-400 hover:text-gray-300"
                }`}
              >
                Preview & Download
              </button>
            </div>
          </div>

          {/* Template Selection */}
          {activeTab === "template" && (
            <div className="space-y-8">
              {!certificateData.selectedTemplate ? (
                <div id="template-section" className="relative">
                  {/* Card glow effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur-xl opacity-50 animate-pulse"></div>
                  
                  <div className="relative bg-[#0e0e16] border border-white/10 p-8 rounded-xl backdrop-blur-sm">
                    <h2 className="text-2xl font-bold mb-2 text-white">Choose Your Template</h2>
                    <p className="text-gray-400 mb-8">
                      Select a professional template to start customizing your certificate
                    </p>
                    <TemplateSelector 
                      selectedTemplate={certificateData.selectedTemplate}
                      onSelectTemplate={(templateId) => handleDataChange({ selectedTemplate: templateId })}
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Certificate Form Card */}
                  <div className="relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur-xl opacity-50"></div>
                    
                    <div className="relative bg-[#0e0e16] border border-white/10 p-6 rounded-xl backdrop-blur-sm">
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-white">Customize Template</h2>
                        <Button
                          onClick={() => handleDataChange({ selectedTemplate: 0 })}
                          className="bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 rounded-lg px-4 py-2 text-sm font-medium transition-all"
                        >
                          Change Template
                        </Button>
                      </div>
                      <CertificateForm 
                        certificateData={certificateData}
                        onDataChange={handleDataChange}
                      />
                    </div>
                  </div>
                  
                  {/* Preview Card */}
                  <div className="relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur-xl opacity-50"></div>
                    
                    <div className="relative bg-[#0e0e16] border border-white/10 p-6 rounded-xl backdrop-blur-sm">
                      <h2 className="text-xl font-bold mb-4 text-white">Live Preview</h2>
                      <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                        <CertificatePreview data={certificateData} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Preview & Download */}
          {activeTab === "preview" && (
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur-xl opacity-50"></div>
              
              <div className="relative bg-[#0e0e16] border border-white/10 p-8 rounded-xl backdrop-blur-sm">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2 text-white">Final Preview</h2>
                  <p className="text-gray-400">
                    Review your certificate before downloading
                  </p>
                </div>
                
                <div className="bg-white/5 p-6 rounded-lg border border-white/10 mb-8">
                  <div className="aspect-[1.414/1] w-full">
                    <CertificatePreview data={certificateData} />
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
                  <div className="text-gray-400 max-w-xl">
                    <p className="text-sm flex items-start">
                      <FaRegLightbulb className="text-blue-400 mr-2 mt-1 flex-shrink-0" />
                      <span>
                        Your certificate is ready for download. You can save it as a PDF file and distribute it to recipients.
                      </span>
                    </p>
                  </div>
                  
                  <div className="flex space-x-4">
                    <Button
                      onClick={() => setActiveTab("template")}
                      className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 rounded-lg text-sm font-medium transition-all"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={handleDownload}
                      className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg transition transform hover:translate-y-[-2px] shadow-lg hover:shadow-indigo-500/25"
                    >
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}