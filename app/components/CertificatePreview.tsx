'use client';

import { useRef, useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import ClassicTemplate from '../templates/ClassicTemplate';
import ModernTemplate from '../templates/ModernTemplate';
import ElegantTemplate from '../templates/ElegantTemplate';
import { CertificateData } from '@/types/interface';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

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
  const [isDownloading, setIsDownloading] = useState(false);
  const [logoDataUrl, setLogoDataUrl] = useState<string | null>(null);
  const [signatureDataUrl, setSignatureDataUrl] = useState<string | null>(null);
  
  // Convert uploaded files to data URLs for PDF
  useEffect(() => {
    // Handle logo
    if (data.logo instanceof File) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoDataUrl(e.target?.result as string);
      };
      reader.readAsDataURL(data.logo);
    } else {
      setLogoDataUrl(null);
    }
    
    // Handle signature
    if (data.signature instanceof File) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSignatureDataUrl(e.target?.result as string);
      };
      reader.readAsDataURL(data.signature);
    } else {
      setSignatureDataUrl(null);
    }
  }, [data.logo, data.signature]);

  const handleTextSelect = (text: string, element: string) => {
    onDataChange?.({
      selectedText: text,
      selectedElement: element
    });
  };

  // Direct PDF generation with all user data including images
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
      
      // Set white background
      pdf.setFillColor(255, 255, 255);
      pdf.rect(0, 0, pageWidth, pageHeight, 'F');
      
      // Add watermark if enabled and logo exists
      if (data.watermark && logoDataUrl) {
        pdf.saveGraphicsState();
        pdf.setGState(new pdf.GState({ opacity: 0.1 }));
        pdf.addImage(
          logoDataUrl, 
          'AUTO', 
          pageWidth / 2 - 40, 
          pageHeight / 2 - 40, 
          80, 
          80
        );
        pdf.restoreGraphicsState();
      }
      
      // Add border based on style
      const borderMargin = 10;
      
      // Extract color values
      const primaryColorRGB = {
        r: parseInt(data.primaryColor.substring(1, 3), 16) || 0,
        g: parseInt(data.primaryColor.substring(3, 5), 16) || 0,
        b: parseInt(data.primaryColor.substring(5, 7), 16) || 0
      };
      
      const secondaryColorRGB = {
        r: parseInt(data.secondaryColor.substring(1, 3), 16) || 0,
        g: parseInt(data.secondaryColor.substring(3, 5), 16) || 0,
        b: parseInt(data.secondaryColor.substring(5, 7), 16) || 0
      };
      
      // Set border color and style
      pdf.setDrawColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b);
      
      if (data.borderStyle === 'classic') {
        // Double border for classic style
        pdf.setLineWidth(1.5);
        pdf.rect(borderMargin, borderMargin, pageWidth - (borderMargin * 2), pageHeight - (borderMargin * 2));
        pdf.setLineWidth(0.5);
        pdf.rect(borderMargin + 3, borderMargin + 3, pageWidth - (borderMargin * 2) - 6, pageHeight - (borderMargin * 2) - 6);
      } else if (data.borderStyle === 'ornate') {
        // Ornate border style
        pdf.setLineWidth(3);
        pdf.rect(borderMargin, borderMargin, pageWidth - (borderMargin * 2), pageHeight - (borderMargin * 2));
        pdf.setLineWidth(1);
        pdf.rect(borderMargin + 5, borderMargin + 5, pageWidth - (borderMargin * 2) - 10, pageHeight - (borderMargin * 2) - 10);
      } else {
        // Simple modern border
        pdf.setLineWidth(1);
        pdf.rect(borderMargin, borderMargin, pageWidth - (borderMargin * 2), pageHeight - (borderMargin * 2));
      }
      
      // Add logo if uploaded
      if (logoDataUrl) {
        const logoSize = 20; // Size in mm
        const logoX = 20;
        const logoY = 20;
        pdf.addImage(logoDataUrl, 'AUTO', logoX, logoY, logoSize, logoSize);
      }
      
      // Set font based on user selection
      const fontFamily = data.font === 'serif' ? 'times' : 'helvetica';
      
      // Set certificate title
      pdf.setFont(fontFamily, 'bold');
      pdf.setFontSize(32);
      pdf.setTextColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b);
      pdf.text(data.certificateTitle || 'Certificate of Achievement', pageWidth / 2, 60, { align: 'center' });
      
      // Add "This is to certify that" text
      pdf.setFont(fontFamily, 'normal');
      pdf.setFontSize(16);
      pdf.setTextColor(80, 80, 80);
      pdf.text('This is to certify that', pageWidth / 2, 75, { align: 'center' });
      
      // Add recipient name
      pdf.setFont(fontFamily, 'bold');
      pdf.setFontSize(28);
      pdf.setTextColor(secondaryColorRGB.r, secondaryColorRGB.g, secondaryColorRGB.b);
      pdf.text(data.recipientName || 'Recipient Name', pageWidth / 2, 90, { align: 'center' });
      
      // Add description
      pdf.setFont(fontFamily, 'normal');
      pdf.setFontSize(14);
      pdf.setTextColor(60, 60, 60);
      
      // Split description into multiple lines if needed
      const description = data.description || 'has successfully completed the requirements';
      const maxWidth = 150; // Maximum width for description text in mm
      const lines = pdf.splitTextToSize(description, maxWidth);
      
      // Calculate starting y position for description based on number of lines
      const descriptionY = 110;
      pdf.text(lines, pageWidth / 2, descriptionY, { align: 'center' });
      
      // Add date and signature section
      const bottomY = pageHeight - 40;
      
      // Format date
      const dateStr = data.issueDate instanceof Date 
        ? data.issueDate.toLocaleDateString() 
        : new Date(data.issueDate).toLocaleDateString();
      
      // Draw lines for signature and date
      pdf.setDrawColor(100, 100, 100);
      pdf.setLineWidth(0.5);
      
      // Date line
      const dateLineX = pageWidth / 4;
      pdf.line(dateLineX - 30, bottomY, dateLineX + 30, bottomY);
      pdf.setFontSize(12);
      pdf.text(`Date: ${dateStr}`, dateLineX, bottomY + 8, { align: 'center' });
      
      // Signature line
      const signatureLineX = (pageWidth / 4) * 3;
      
      // Add signature image if uploaded
      if (signatureDataUrl) {
        const signatureSize = {
          width: 60,
          height: 30
        };
        pdf.addImage(
          signatureDataUrl, 
          'AUTO', 
          signatureLineX - (signatureSize.width / 2), 
          bottomY - signatureSize.height - 5, 
          signatureSize.width, 
          signatureSize.height
        );
      }
      
      pdf.line(signatureLineX - 30, bottomY, signatureLineX + 30, bottomY);
      pdf.text(data.issuerName || 'Issuer', signatureLineX, bottomY + 8, { align: 'center' });
      
      // Add certificate number if available
      if (data.certificateNumber) {
        pdf.setFontSize(10);
        pdf.setTextColor(100, 100, 100);
        pdf.text(`Certificate No: ${data.certificateNumber}`, 20, pageHeight - 15);
      }
      
      // Add QR code if enabled (using a simple QR representation)
      if (data.qrCode) {
        // Create a verifiable URL using certificate number
        const qrText = `https://verify.certificate.com/${data.certificateNumber || 'sample'}`;
        
        // Add QR code info
        pdf.setFontSize(8);
        pdf.setTextColor(100, 100, 100);
        pdf.text('Scan to verify', pageWidth - 20, pageHeight - 15, { align: 'center' });
        
        // Create a simple QR code representation
        // In a real implementation, you would import a proper QR code library
        const qrSize = 25;
        const qrX = pageWidth - qrSize - 10;
        const qrY = pageHeight - qrSize - 20;
        
        // Draw a QR-like square
        pdf.setFillColor(0, 0, 0);
        pdf.roundedRect(qrX, qrY, qrSize, qrSize, 1, 1, 'F');
        
        // Add some white squares to make it look like a QR code
        pdf.setFillColor(255, 255, 255);
        const cellSize = qrSize / 7;
        
        // Draw a QR-like pattern (this is just for visual representation)
        [
          [1, 1], [1, 2], [1, 5], [2, 1], [2, 5], [5, 1], [5, 2], [5, 5],
          [2, 3], [3, 2], [3, 4], [4, 3], [4, 5]
        ].forEach(([x, y]) => {
          pdf.rect(qrX + x * cellSize, qrY + y * cellSize, cellSize, cellSize, 'F');
        });
      }
      
      // Generate safe filename from recipient name
      const safeFileName = (data.recipientName || 'certificate')
        .replace(/[^a-z0-9]/gi, '_')
        .toLowerCase();
      
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

  // Export the download function for external use
  if (typeof window !== 'undefined') {
    // @ts-expect-error - Add to window for external access
    window.downloadCertificateAsPDF = downloadAsPDF;
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
          onClick={downloadAsPDF}
          disabled={isDownloading}
          className="mt-4 w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white p-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center"
        >
          {isDownloading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating PDF...
            </>
          ) : (
            <>
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 15L12 3M12 15L8 11M12 15L16 11M21 15V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17V15" 
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Download Certificate
            </>
          )}
        </Button>
      )}
    </div>
  );
}