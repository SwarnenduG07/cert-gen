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

export default function ElegantTemplate({ data, onTextSelect }: TemplateProps) {
  const handleTextSelection = (element: string) => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      onTextSelect?.(selection.toString(), element);
    }
  };

  return (
    <div className={`w-full h-full flex flex-col items-center justify-center p-8 ${data.font}`}>
      <div className="w-full h-full p-8 flex flex-col items-center justify-center relative">
        {/* Decorative corners */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2" style={{ borderColor: data.primaryColor }}></div>
        <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2" style={{ borderColor: data.primaryColor }}></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2" style={{ borderColor: data.primaryColor }}></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2" style={{ borderColor: data.primaryColor }}></div>
        
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
        
        <h3 
          className="text-xl italic mb-2 cursor-text"
          style={{ color: data.primaryColor }}
          onMouseUp={() => handleTextSelection('title')}
        >
          {data.certificateTitle || "Certificate of Excellence"}
        </h3>
        
        <p 
          className="mt-4 mb-2 cursor-text"
          style={{ color: data.secondaryColor }}
          onMouseUp={() => handleTextSelection('subtitle')}
        >
          This is to certify that
        </p>
        
        <h2 
          className="text-3xl my-4 font-bold cursor-text"
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
          {data.description || "has demonstrated exceptional achievement"}
        </p>
        
        <div className="mt-8 grid grid-cols-2 w-full">
          <div className="text-left">
            <p 
              className="text-sm cursor-text"
              style={{ color: data.secondaryColor }}
              onMouseUp={() => handleTextSelection('date')}
            >
              {data.issueDate.toLocaleDateString()}
            </p>
            <div className="mt-2 pt-2 w-32" style={{ borderTop: `1px solid ${data.primaryColor}` }}>
              <p className="text-sm" style={{ color: data.secondaryColor }}>Date</p>
            </div>
          </div>
          
          <div className="text-right">
            {data.signature && (
              <img 
                src={URL.createObjectURL(data.signature)}
                alt="Signature"
                className="w-48 h-20 object-contain ml-auto"
              />
            )}
            <p 
              className="text-sm font-bold cursor-text"
              style={{ color: data.primaryColor }}
              onMouseUp={() => handleTextSelection('issuerName')}
            >
              {data.issuerName || "Issuer"}
            </p>
            <div className="mt-2 pt-2 w-32 ml-auto" style={{ borderTop: `1px solid ${data.primaryColor}` }}>
              <p className="text-sm" style={{ color: data.secondaryColor }}>Signature</p>
            </div>
          </div>
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