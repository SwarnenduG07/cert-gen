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
    <div className={`w-full h-full ${data.font}`}
      // style={{ background: `linear-gradient(to right, ${data.primaryColor}10, ${data.secondaryColor}10)` }}
    >

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

      <div className={`w-full h-full p-8 flex flex-col items-center justify-start rounded-lg border-2`}
        style={{ borderColor: data.primaryColor }}>

        {/* Logo */}
        {data.logo && (
          <div className="absolute top-10 left-11 w-16 h-16">
            <img
              src={URL.createObjectURL(data.logo)}
              alt="Organization Logo"
              className="w-full h-full object-contain"
            />
          </div>
        )}

        <h3
          className="text-lg uppercase tracking-wider mb-2 pt-5 cursor-text"
          style={{ color: data.primaryColor }}
          onMouseUp={() => handleTextSelection('title')}
        >
          {data.certificateTitle || "Certificate of Achievement"}
        </h3>

        <p
          className="my-2 cursor-text"
          style={{ color: data.secondaryColor }}
          onMouseUp={() => handleTextSelection('subtitle')}
        >
          is hereby granted to
        </p>

        <h2
          className="text-2xl font-sans mt-3 font-bold cursor-text"
          style={{ color: data.primaryColor }}
          onMouseUp={() => handleTextSelection('recipientName')}
        >
          {data.recipientName || "Recipient Name"}
        </h2>

        <p
          className="mt-3 max-w-md cursor-text z-50"
          style={{ color: data.secondaryColor }}
          onMouseUp={() => handleTextSelection('description')}
        >
          {data.description || "for outstanding achievement and dedication"}
        </p>

        <div className="absolute bottom-9 right-10 flex flex-col items-center">
          {data.signature && (
            <div className="flex justify-center mb-2">
              <img
                src={URL.createObjectURL(data.signature) || "/placeholder.svg"}
                alt="Signature"
                className="w-32 h-12 object-contain"
              />
            </div>
          )}
          <div className="w-36 h-0.5 bg-gray-400" />
          <p className="mt-1 text-sm text-black text-center" onMouseUp={() => handleTextSelection("date")}>
            Date: {data.issueDate ? data.issueDate.toLocaleDateString() : ""}
          </p>
        </div>

        <div className='absolute bottom-2 left-8'>
          <p
            className="text-sm cursor-text"
            style={{ color: data.secondaryColor }}
            onMouseUp={() => handleTextSelection('certificateNumber')}
          >
            Certificate No: {data.certificateNumber}
          </p>
        </div>

        {/* Certificate Number and QR Code */}
        <div className="absolute bottom-10 left-10">
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