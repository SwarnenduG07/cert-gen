'use client';

import { QRCodeCanvas } from 'qrcode.react';

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

interface ClassicTemplateProps {
  data: CertificateData;
  onTextSelect?: (text: string, element: string) => void;
}

export default function ClassicTemplate({ data, onTextSelect }: ClassicTemplateProps) {
  const handleTextSelection = (element: string) => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      onTextSelect?.(selection.toString(), element);
    }
  };

  // const formatDate = (date: Date) => {
  //   return new Intl.DateTimeFormat('en-US', { 
  //     day: 'numeric', 
  //     month: 'long', 
  //     year: 'numeric' 
  //   }).format(date);
  // };

  return (
    <div className={`h-full border-8 ${
      data.borderStyle === 'classic' ? 'border-double border-[#c9a84b]' :
      data.borderStyle === 'modern' ? 'border-solid border-gray-800' :
      data.borderStyle === 'ornate' ? 'border-[16px] border-double border-[#8b6c15]' :
      'border-solid border-gray-300'
    } p-8`}>
      {/* Background Watermark */}
      {data.watermark && data.logo && (
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <img 
            src={URL.createObjectURL(data.logo)}
            alt="Watermark"
            className="w-2/3 h-2/3 object-contain"
          />
        </div>
      )}

      {/* Logo */}
      {data.logo && (
        <div className="absolute top-8 left-8 w-24 h-24">
          <img 
            src={URL.createObjectURL(data.logo)}
            alt="Organization Logo"
            className="w-full h-full object-contain"
          />
        </div>
      )}

      <div className={`text-center space-y-6 ${data.font}`}>
        <h1 
          className="text-3xl font-bold cursor-text"
          style={{ color: data.primaryColor }}
          onMouseUp={() => handleTextSelection('title')}
        >
          {data.certificateTitle || "Certificate of Achievement"}
        </h1>
        
        <p 
          className="text-lg cursor-text"
          onMouseUp={() => handleTextSelection('subtitle')}
        >
          This is to certify that
        </p>
        
        <h2 
          className="text-4xl font-bold cursor-text"
          style={{ color: data.secondaryColor }}
          onMouseUp={() => handleTextSelection('recipientName')}
        >
          {data.recipientName}
        </h2>
        
        <p 
          className="text-lg max-w-2xl mx-auto cursor-text"
          onMouseUp={() => handleTextSelection('description')}
        >
          {data.description}
        </p>

        <div className="mt-12 flex justify-between items-end px-12">
          <div className="text-center">
            <div className="w-48 h-0.5 bg-gray-400"/>
            <p 
              className="mt-2 cursor-text"
              onMouseUp={() => handleTextSelection('date')}
            >
              Date: {data.issueDate.toLocaleDateString()}
            </p>
          </div>

          {data.signature && (
            <div className="text-center">
              <img 
                src={URL.createObjectURL(data.signature)}
                alt="Signature"
                className="w-48 h-20 object-contain"
              />
              <div className="w-48 h-0.5 bg-gray-400"/>
              <p 
                className="mt-2 cursor-text"
                onMouseUp={() => handleTextSelection('issuerName')}
              >
                {data.issuerName}
              </p>
            </div>
          )}
        </div>

        {/* Certificate Number and QR Code */}
        <div className="absolute bottom-4 flex justify-between w-full px-8">
          <p 
            className="text-sm text-gray-500 cursor-text"
            onMouseUp={() => handleTextSelection('certificateNumber')}
          >
            Certificate No: {data.certificateNumber}
          </p>
          
          {data.qrCode && (
            <div className="bg-white p-1">
              <QRCodeCanvas 
                value={`https://your-domain.com/verify/${data.certificateNumber}`}
                size={64}
                level="H"
                includeMargin={true}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 