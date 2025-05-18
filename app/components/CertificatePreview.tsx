'use client';

import { useRef } from 'react';
// import { jsPDF } from 'jspdf';
import ClassicTemplate from '../templates/ClassicTemplate';
import ModernTemplate from '../templates/ModernTemplate';
import ElegantTemplate from '../templates/ElegantTemplate';
import { CertificateData } from '@/types/interface';
import { Button } from '@/components/ui/button';
// import { toast } from 'sonner';

interface CertificatePreviewProps {
  data: CertificateData;
  onDataChange?: (data: Partial<CertificateData>) => void;
  showDownloadButton?: boolean;
}

export default function CertificatePreview({ 
  data, 
  onDataChange,
  showDownloadButton = true 
}: CertificatePreviewProps) {
  const certificateRef = useRef<HTMLDivElement>(null);
  // const [isDownloading, setIsDownloading] = useState(false);
  
  const handleTextSelect = (text: string, element: string) => {
    onDataChange?.({
      selectedText: text,
      selectedElement: element
    });
  };

  // Temporary placeholder function for download
  const handleTempDownload = () => {
    alert("avi tak bana nahi hai kal suva banega");
  };

  /* PDF Generation Code Commented Out
  const downloadAsPDF = async () => {
    try {
      setIsDownloading(true);
      toast.loading("Generating your certificate...");
      
      // Create PDF document with proper dimensions
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });
      
      // Get page dimensions
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      // ... Rest of the PDF generation code ...
      
      // Save PDF
      pdf.save(`${safeFileName}-certificate.pdf`);
      
      toast.success("Certificate downloaded successfully!");
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error("Failed to generate certificate", {
        description: error instanceof Error ? error.message : "An unexpected error occurred"
      });
    } finally {
      setIsDownloading(false);
    }
  };
  */

  // Export the temp function for external use
  if (typeof window !== 'undefined') {
    // @ts-expect-error - Add to window for external access
    window.downloadCertificateAsPDF = handleTempDownload;
  }

  return (
    <div className="relative">
      <div 
        ref={certificateRef}
        className={`aspect-[1.414/1] w-full p-8 relative ${data.font} bg-white`}
        style={{
          backgroundColor: '#ffffff',
          boxShadow: '0 0 20px rgba(0,0,0,0.1)'
        }}
        data-certificate="true"
      >
        {data.selectedTemplate === 1 && <ClassicTemplate data={data} onTextSelect={handleTextSelect} />}
        {data.selectedTemplate === 2 && <ModernTemplate data={data} onTextSelect={handleTextSelect} />}
        {data.selectedTemplate === 3 && <ElegantTemplate data={data} onTextSelect={handleTextSelect} />}
      </div>

      {showDownloadButton && (
        <Button
          onClick={handleTempDownload}
          className="mt-4 w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white p-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 15L12 3M12 15L8 11M12 15L16 11M21 15V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17V15" 
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Download Certificate
        </Button>
      )}
    </div>
  );
}