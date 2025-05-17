'use client';


interface CertificateData {
  recipientName: string;
  certificateTitle: string;
  issuerName: string;
  issueDate: Date;
  description: string;
  selectedTemplate: number;
}

interface CertificateFormProps {
  certificateData: CertificateData;
  onDataChange: (data: Partial<CertificateData>) => void;
}

export default function CertificateForm({ certificateData, onDataChange }: CertificateFormProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onDataChange({ [name]: value });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onDataChange({ issueDate: new Date(e.target.value) });
  };

  const downloadCertificate = () => {
    // This will be implemented to download the certificate as PDF
    alert('Download functionality will be implemented here');
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md certificate-form">
      <div className="mb-4">
        <label htmlFor="recipientName" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200 form-label">
          Recipient Name
        </label>
        <input
          type="text"
          id="recipientName"
          name="recipientName"
          value={certificateData.recipientName}
          onChange={handleInputChange}
          className="w-full p-2 border rounded text-gray-900 dark:text-white dark:bg-gray-700 dark:border-gray-600 form-input"
          placeholder="Enter recipient name"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="certificateTitle" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200 form-label">
          Certificate Title
        </label>
        <input
          type="text"
          id="certificateTitle"
          name="certificateTitle"
          value={certificateData.certificateTitle}
          onChange={handleInputChange}
          className="w-full p-2 border rounded text-gray-900 dark:text-white dark:bg-gray-700 dark:border-gray-600 form-input"
          placeholder="e.g. Certificate of Achievement"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="issuerName" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200 form-label">
          Issuer Name
        </label>
        <input
          type="text"
          id="issuerName"
          name="issuerName"
          value={certificateData.issuerName}
          onChange={handleInputChange}
          className="w-full p-2 border rounded text-gray-900 dark:text-white dark:bg-gray-700 dark:border-gray-600 form-input"
          placeholder="Enter issuer/organization name"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="issueDate" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200 form-label">
          Issue Date
        </label>
        <input
          type="date"
          id="issueDate"
          name="issueDate"
          value={certificateData.issueDate.toISOString().split('T')[0]}
          onChange={handleDateChange}
          className="w-full p-2 border rounded text-gray-900 dark:text-white dark:bg-gray-700 dark:border-gray-600 form-input"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200 form-label">
          Description/Achievement
        </label>
        <textarea
          id="description"
          name="description"
          value={certificateData.description}
          onChange={handleInputChange}
          className="w-full p-2 border rounded text-gray-900 dark:text-white dark:bg-gray-700 dark:border-gray-600 form-input"
          rows={3}
          placeholder="Describe the achievement or purpose of this certificate"
        />
      </div>

      <button
        onClick={downloadCertificate}
        className="w-full bg-blue-600 text-white p-2 rounded font-medium hover:bg-blue-700 transition"
      >
        Download Certificate
      </button>
    </div>
  );
} 