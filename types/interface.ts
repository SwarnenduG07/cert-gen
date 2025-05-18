export interface CertificateData {
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