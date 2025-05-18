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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <Navbar />  
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="template">Design Certificate</TabsTrigger>
            <TabsTrigger value="preview">Preview & Download</TabsTrigger>
          </TabsList>

          <TabsContent value="template" className="space-y-4">
            {!certificateData.selectedTemplate ? (
              <div id="template-section" className="bg-white dark:bg-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Choose Your Template</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Select a template to start customizing your certificate
                </p>
                <TemplateSelector 
                  selectedTemplate={certificateData.selectedTemplate}
                  onSelectTemplate={(templateId) => handleDataChange({ selectedTemplate: templateId })}
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-semibold">Customize Template</h2>
                      <Button
                        variant="outline"
                        onClick={() => handleDataChange({ selectedTemplate: 0 })}
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
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                  <h2 className="text-xl font-semibold mb-4">Live Preview</h2>
                  <CertificatePreview data={certificateData} />
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="preview" className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Final Preview</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Review your certificate before downloading
                </p>
              </div>
              <div className="aspect-[1.414/1] w-full">
                <CertificatePreview data={certificateData} />
              </div>
              <div className="mt-6 flex justify-end gap-4">
                <Button variant="outline" onClick={() => {/* Add edit logic */}}>
                  Edit
                </Button>
                <Button onClick={handleDownload}>
                  Download
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}