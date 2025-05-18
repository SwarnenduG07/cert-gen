'use client';

import { useState } from "react";
import CertificateForm from "./components/CertificateForm";
import CertificatePreview from "./components/CertificatePreview";
import TemplateSelector from "./components/TemplateSelector";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Navbar from "./components/Navbar";
import { CertificateData } from "@/types/interface";


export default function Home() {
  const [certificateData, setCertificateData] = useState<CertificateData>({
    recipientName: "",
    certificateTitle: "",
    issuerName: "",
    issueDate: new Date(),
    description: "",
    selectedTemplate: 1,
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

  const handleDataChange = (data: Partial<CertificateData>) => {
    setCertificateData(prev => ({ ...prev, ...data }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <Navbar />  
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="design" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="template">Choose Template</TabsTrigger>
            <TabsTrigger value="design">Customize Design</TabsTrigger>
            <TabsTrigger value="preview">Preview & Download</TabsTrigger>
          </TabsList>

          <TabsContent value="template" className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Select Template</h2>
              <TemplateSelector 
                selectedTemplate={certificateData.selectedTemplate}
                onSelectTemplate={(templateId) => handleDataChange({ selectedTemplate: templateId })}
              />
            </div>
          </TabsContent>

          <TabsContent value="design">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                <CertificateForm 
                  certificateData={certificateData}
                  onDataChange={handleDataChange}
                />
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                <CertificatePreview data={certificateData} />
              </div>
            </div>
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
                <Button onClick={() => {
                  toast.success("Certificate downloaded successfully!");
                  /* Add download logic */
                }}>
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
