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
    <div className={`w-full h-full flex flex-col items-center justify-center ${data.font}`}>
      <div className="w-full h-full flex flex-col items-center relative">
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
          <div className="absolute top-3 left-3 w-16 h-16">
            <img
              src={URL.createObjectURL(data.logo)}
              alt="Organization Logo"
              className="w-full h-full object-contain"
            />
          </div>
        )}

        <h3
          className="text-xl italic pt-10 mb-2 cursor-text"
          style={{ color: data.primaryColor }}
          onMouseUp={() => handleTextSelection('title')}
        >
          {data.certificateTitle || "Certificate of Excellence"}
        </h3>

        <p
          className="mt-2 cursor-text"
          style={{ color: data.secondaryColor }}
          onMouseUp={() => handleTextSelection('subtitle')}
        >
          This is to certify that
        </p>

        <h2
          className="text-2xl mt-3 font-bold cursor-text"
          style={{ color: data.primaryColor }}
          onMouseUp={() => handleTextSelection('recipientName')}
        >
          {data.recipientName || "Recipient Name"}
        </h2>

        <p
          className="mt-4 max-w-md cursor-text"
          style={{ color: data.secondaryColor }}
          onMouseUp={() => handleTextSelection('description')}
        >
          {data.description || "has demonstrated exceptional achievement"}
        </p>

        <div className="flex w-full justify-between px-2 absolute bottom-0">
          <div className="text-left flex flex-col justify-end mb-2">
            <p
              className="text-sm cursor-text"
              style={{ color: data.secondaryColor }}
              onMouseUp={() => handleTextSelection('date')}
            >
              <span className="text-sm" style={{ color: data.secondaryColor }}>Date: </span>{data.issueDate.toLocaleDateString()}
            </p>
          </div>

          <div className="flex flex-col justify-end mb-2">
            <p
              className="text-[12px] cursor-text"
              style={{ color: data.secondaryColor }}
              onMouseUp={() => handleTextSelection('certificateNumber')}
            >
              Certificate No: {data.certificateNumber}
            </p>
          </div>

          <div className="text-right flex flex-col justify-end mb-2">
            {data.signature && (
              <img
                src={URL.createObjectURL(data.signature)}
                alt="Signature"
                className="w-32 h-14 object-contain ml-auto"
              />
            )}
            <p
              className="text-sm font-bold cursor-text"
              style={{ color: data.primaryColor }}
              onMouseUp={() => handleTextSelection('issuerName')}
            >
              {data.issuerName || "Issuer"}
            </p>
            <div className="mt-2 w-32 ml-auto" style={{ borderTop: `1px solid ${data.primaryColor}` }}>
              <p className="text-sm" style={{ color: data.secondaryColor }}>Signature</p>
            </div>
          </div>
        </div>

        {/* Certificate Number and QR Code */}
        <div className="absolute bottom-6 left-2">
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