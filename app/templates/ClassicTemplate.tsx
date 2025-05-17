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

export default function ClassicTemplate({ data }: TemplateProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    }).format(date);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-[#fffbf2] text-center">
      <div className="border-8 border-double border-[#c9a84b] w-full h-full p-8 flex flex-col items-center justify-center">
        <h3 className="text-[#8b6c15] text-lg mb-2">
          {data.certificateTitle || "Certificate of Achievement"}
        </h3>
        
        <div className="my-2 w-48 h-1 bg-[#c9a84b]"></div>
        
        <p className="text-sm my-2">This certifies that</p>
        
        <h2 className="text-2xl font-serif my-2 font-bold">
          {data.recipientName || "Recipient Name"}
        </h2>
        
        <p className="text-sm my-2 max-w-md">
          {data.description || "has successfully completed the requirements"}
        </p>
        
        <div className="mt-8 mb-2">
          <p className="text-sm italic">Issued on {formatDate(data.issueDate)}</p>
          <div className="mt-4 pt-4 border-t border-[#c9a84b] w-48">
            <p className="font-bold">{data.issuerName || "Issuer"}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 