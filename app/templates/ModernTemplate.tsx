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
}

interface TemplateProps {
  data: CertificateData;
  onTextSelect?: (text: string, element: string) => void;
}

export default function ModernTemplate({ data, onTextSelect }: TemplateProps) {
  const handleTextSelection = (element: string) => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      onTextSelect?.(selection.toString(), element);
    }
  };

  return (
    <div className={`w-full h-full flex flex-col items-center justify-center p-8 ${data.font}`}
         style={{ background: `linear-gradient(to right, ${data.primaryColor}10, ${data.secondaryColor}10)` }}>
      
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

      <div className={`w-full h-full p-8 flex flex-col items-center justify-center rounded-lg border-2`}
           style={{ borderColor: data.primaryColor }}>
        
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

        <h3 
          className="text-lg uppercase tracking-wider mb-2 cursor-text"
          style={{ color: data.primaryColor }}
          onMouseUp={() => handleTextSelection('title')}
        >
          {data.certificateTitle || "Certificate of Achievement"}
        </h3>
        
        <div className="my-4 w-16 h-1" style={{ backgroundColor: data.primaryColor }}></div>
        
        <p 
          className="my-2 cursor-text"
          style={{ color: data.secondaryColor }}
          onMouseUp={() => handleTextSelection('subtitle')}
        >
          is hereby granted to
        </p>
        
        <h2 
          className="text-3xl font-sans my-4 font-bold cursor-text"
          style={{ color: data.primaryColor }}
          onMouseUp={() => handleTextSelection('recipientName')}
        >
          {data.recipientName || "Recipient Name"}
        </h2>
        
        <p 
          className="my-4 max-w-md cursor-text"
          style={{ color: data.secondaryColor }}
          onMouseUp={() => handleTextSelection('description')}
        >
          {data.description || "for outstanding achievement and dedication"}
        </p>

        <div className="mt-8 flex justify-between items-end w-full px-12">
          <div className="text-center">
            <div className="w-48 h-0.5" style={{ backgroundColor: data.primaryColor }}/>
            <p 
              className="mt-2 cursor-text"
              style={{ color: data.secondaryColor }}
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
              <div className="w-48 h-0.5" style={{ backgroundColor: data.primaryColor }}/>
              <p 
                className="mt-2 cursor-text"
                style={{ color: data.primaryColor }}
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
            className="text-sm cursor-text"
            style={{ color: data.secondaryColor }}
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