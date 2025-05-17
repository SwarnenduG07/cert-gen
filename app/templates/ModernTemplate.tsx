'use client';

interface CertificateData {
  recipientName: string;
  certificateTitle: string;
  issuerName: string;
  issueDate: Date;
  description: string;
  selectedTemplate: number;
}

interface TemplateProps {
  data: CertificateData;
}

export default function ModernTemplate({ data }: TemplateProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    }).format(date);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-r from-blue-50 to-indigo-50 text-center">
      <div className="w-full h-full p-8 flex flex-col items-center justify-center rounded-lg border border-blue-200">
        <h3 className="text-blue-800 text-lg uppercase tracking-wider mb-2">
          {data.certificateTitle || "Certificate of Achievement"}
        </h3>
        
        <div className="my-4 w-16 h-1 bg-blue-500"></div>
        
        <p className="text-gray-600 my-2">is hereby granted to</p>
        
        <h2 className="text-3xl font-sans my-4 font-bold text-blue-900">
          {data.recipientName || "Recipient Name"}
        </h2>
        
        <p className="text-gray-600 my-4 max-w-md">
          {data.description || "for outstanding achievement and dedication"}
        </p>
        
        <div className="mt-8 flex flex-col items-center">
          <p className="text-sm text-gray-500">Issued on {formatDate(data.issueDate)}</p>
          <div className="mt-6 pt-4 border-t border-blue-300 w-48">
            <p className="font-bold text-blue-900">{data.issuerName || "Issuer"}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 