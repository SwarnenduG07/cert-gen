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

export default function ElegantTemplate({ data }: TemplateProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    }).format(date);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-[#fafafa] text-center">
      <div className="w-full h-full p-8 flex flex-col items-center justify-center relative">
        {/* Decorative corners */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-gray-800"></div>
        <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-gray-800"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-gray-800"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-gray-800"></div>
        
        <h3 className="text-gray-800 text-xl font-serif italic mb-2">
          {data.certificateTitle || "Certificate of Excellence"}
        </h3>
        
        <p className="text-gray-600 mt-4 mb-2 font-serif">This is to certify that</p>
        
        <h2 className="text-3xl font-serif my-4 font-bold text-gray-900">
          {data.recipientName || "Recipient Name"}
        </h2>
        
        <p className="text-gray-600 my-4 max-w-md font-serif">
          {data.description || "has demonstrated exceptional achievement"}
        </p>
        
        <div className="mt-8 grid grid-cols-2 w-full">
          <div className="text-left">
            <p className="text-sm text-gray-500 font-serif">{formatDate(data.issueDate)}</p>
            <div className="mt-2 pt-2 border-t border-gray-400 w-32">
              <p className="text-sm text-gray-500 font-serif">Date</p>
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-sm text-gray-800 font-serif font-bold">{data.issuerName || "Issuer"}</p>
            <div className="mt-2 pt-2 border-t border-gray-400 w-32 ml-auto">
              <p className="text-sm text-gray-500 font-serif">Signature</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 