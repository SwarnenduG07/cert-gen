'use client';

import { useRef } from 'react';
import ClassicTemplate from '../templates/ClassicTemplate';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import ModernTemplate from '../templates/ModernTemplate';
import ElegantTemplate from '../templates/ElegantTemplate';

interface CertificateData {
  recipientName: string;
  certificateTitle: string;
  issuerName: string;
  issueDate: Date;
  description: string;
  selectedTemplate: number;
}

interface CertificatePreviewProps {
  data: CertificateData;
}

export default function CertificatePreview({ data }: CertificatePreviewProps) {
  const certificateRef = useRef<HTMLDivElement>(null);

  // Select template based on user's choice
  const renderTemplate = () => {
    switch (data.selectedTemplate) {
      case 1:
        return <ClassicTemplate data={data} />;
      case 2:
        return <ModernTemplate data={data} />;
      case 3:
        return <ElegantTemplate data={data} />;
      default:
        return <ClassicTemplate data={data} />;
    }
  };

  const downloadAsPDF = async () => {
    if (certificateRef.current === null) return;
    
    try {
      const dataUrl = await toPng(certificateRef.current, { quality: 1.0 });
      
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });
      
      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${data.recipientName}-certificate.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div className="bg-white p-2 rounded-lg shadow-md">
      <div 
        ref={certificateRef}
        className="border border-gray-200 aspect-[1.414/1] w-full"
      >
        {renderTemplate()}
      </div>
    </div>
  );
} 