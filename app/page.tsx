'use client';

import { useState } from "react";
import CertificateForm from "./components/CertificateForm";
import CertificatePreview from "./components/CertificatePreview";
import TemplateSelector from "./components/TemplateSelector";

// Define certificate data type
interface CertificateData {
  recipientName: string;
  certificateTitle: string;
  issuerName: string;
  issueDate: Date;
  description: string;
  selectedTemplate: number;
  borderStyle: string;
  primaryColor: string;
  secondaryColor: string;
  font: string;
  logo?: File;
  signature?: File;
  certificateNumber: string;
  qrCode: boolean;
  watermark: boolean;
  selectedText: string | null;
  selectedElement: string | null;
}

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
    <div className="min-h-screen p-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Certificate Generator</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white section-heading">Certificate Settings</h2>
            <TemplateSelector 
              selectedTemplate={certificateData.selectedTemplate}
              onSelectTemplate={(templateId) => handleDataChange({ selectedTemplate: templateId })}
            />
            <CertificateForm 
              certificateData={certificateData}
              onDataChange={handleDataChange}
            />
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white section-heading">Preview</h2>
            <CertificatePreview data={certificateData} />
          </div>
        </div>
      </div>
    </div>
  );
}
