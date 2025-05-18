'use client';

import { useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import ClassicTemplate from '../templates/ClassicTemplate';
import ModernTemplate from '../templates/ModernTemplate';
import ElegantTemplate from '../templates/ElegantTemplate';
import { CertificateData } from '@/types/interface';



interface CertificatePreviewProps {
  data: CertificateData;
  onDataChange?: (data: Partial<CertificateData>) => void;
}

export default function CertificatePreview({ data, onDataChange }: CertificatePreviewProps) {
  const certificateRef = useRef<HTMLDivElement>(null);

  const handleTextSelect = (text: string, element: string) => {
    onDataChange?.({
      selectedText: text,
      selectedElement: element
    });
  };

  // Generate unique certificate verification URL
  const verificationUrl = `https://your-domain.com/verify/${data.certificateNumber}`;

  // Bring back the template rendering function
  const renderTemplate = () => {
    switch (data.selectedTemplate) {
      case 1:
        return <ClassicTemplate data={data} onTextSelect={handleTextSelect} />;
      case 2:
        return <ModernTemplate data={data} onTextSelect={handleTextSelect} />;
      case 3:
        return <ElegantTemplate data={data} onTextSelect={handleTextSelect} />;
      default:
        return <ClassicTemplate data={data} onTextSelect={handleTextSelect} />;
    }
  };

  const downloadAsPDF = async () => {
    if (!certificateRef.current) return;

    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: null
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });

      pdf.setProperties({
        title: `Certificate - ${data.recipientName}`,
        subject: data.certificateTitle,
        author: data.issuerName,
        keywords: 'certificate, achievement',
        creator: 'Certificate Generator'
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${data.recipientName}-certificate.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div className="relative">
      <div 
        ref={certificateRef}
        className={`aspect-[1.414/1] w-full p-8 relative ${data.font}`}
        style={{
          backgroundColor: '#ffffff',
          boxShadow: '0 0 20px rgba(0,0,0,0.1)'
        }}
      >
        {data.selectedTemplate === 1 && <ClassicTemplate data={data} onTextSelect={handleTextSelect} />}
        {data.selectedTemplate === 2 && <ModernTemplate data={data} onTextSelect={handleTextSelect} />}
        {data.selectedTemplate === 3 && <ElegantTemplate data={data} onTextSelect={handleTextSelect} />}
      </div>

      <button
        onClick={downloadAsPDF}
        className="mt-4 w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
      >
        Download Certificate
      </button>
    </div>
  );
} 