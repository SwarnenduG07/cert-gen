'use client';
import { SketchPicker } from 'react-color';
import { useState } from 'react';

interface CertificateData {
  recipientName: string;
  certificateTitle: string;
  issuerName: string;
  issueDate: Date;
  description: string;
  selectedTemplate: number;
  // New customization fields
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

// Add these options
const BORDER_STYLES = [
  { id: 'classic', name: 'Classic Border' },
  { id: 'modern', name: 'Modern Minimal' },
  { id: 'ornate', name: 'Ornate Design' },
  { id: 'custom', name: 'Custom Border' }
];

const FONTS = [
  { id: 'serif', name: 'Elegant Serif' },
  { id: 'sans', name: 'Modern Sans' },
  { id: 'script', name: 'Calligraphy' },
  { id: 'formal', name: 'Formal' }
];

interface CertificateFormProps {
  certificateData: CertificateData;
  onDataChange: (data: Partial<CertificateData>) => void;
}

export default function CertificateForm({ certificateData, onDataChange }: CertificateFormProps) {
  const [showPrimaryColorPicker, setShowPrimaryColorPicker] = useState(false);
  const [showSecondaryColorPicker, setShowSecondaryColorPicker] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onDataChange({ [name]: value });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onDataChange({ issueDate: new Date(e.target.value) });
  };
  const handleColorChange = (color: { hex: string }, type: 'primary' | 'secondary') => {
    onDataChange({ [`${type}Color`]: color.hex });
  };

  const downloadCertificate = () => {
    // This will be implemented to download the certificate as PDF
    alert('Download functionality will be implemented here');
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onDataChange({ logo: file });
    }
  };

  const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onDataChange({ signature: file });
    }
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

      {/* Design Customization */}
      <div className="border-t mt-6 pt-6">
        <h3 className="text-lg font-medium mb-4 dark:text-gray-200">Design Customization</h3>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 dark:text-gray-200">
            Border Style
          </label>
          <select
            name="borderStyle"
            value={certificateData.borderStyle}
            onChange={handleInputChange}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          >
            {BORDER_STYLES.map(style => (
              <option key={style.id} value={style.id}>{style.name}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 dark:text-gray-200">
            Font Style
          </label>
          <select
            name="font"
            value={certificateData.font}
            onChange={handleInputChange}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          >
            {FONTS.map(font => (
              <option key={font.id} value={font.id}>{font.name}</option>
            ))}
          </select>
        </div>

        {/* Color Pickers */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 dark:text-gray-200">
            Primary Color
          </label>
          <div className="relative">
            <button
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white flex items-center gap-2"
              onClick={() => setShowPrimaryColorPicker(!showPrimaryColorPicker)}
            >
              <div 
                className="w-6 h-6 rounded"
                style={{ backgroundColor: certificateData.primaryColor }}
              />
              {certificateData.primaryColor}
            </button>
            {showPrimaryColorPicker && (
              <div className="absolute z-10 mt-2">
                <div 
                  className="fixed inset-0" 
                  onClick={() => setShowPrimaryColorPicker(false)}
                />
                <SketchPicker
                  color={certificateData.primaryColor}
                  onChange={(color) => handleColorChange(color, 'primary')}
                />
              </div>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 dark:text-gray-200">
            Secondary Color
          </label>
          <div className="relative">
            <button
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white flex items-center gap-2"
              onClick={() => setShowSecondaryColorPicker(!showSecondaryColorPicker)}
            >
              <div 
                className="w-6 h-6 rounded"
                style={{ backgroundColor: certificateData.secondaryColor }}
              />
              {certificateData.secondaryColor}
            </button>
            {showSecondaryColorPicker && (
              <div className="absolute z-10 mt-2">
                <div 
                  className="fixed inset-0" 
                  onClick={() => setShowSecondaryColorPicker(false)}
                />
                <SketchPicker
                  color={certificateData.secondaryColor}
                  onChange={(color) => handleColorChange(color, 'secondary')}
                />
              </div>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 dark:text-gray-200">
            Upload Logo
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 dark:text-gray-200">
            Upload Signature
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleSignatureUpload}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 dark:text-gray-200">
            Certificate Number
          </label>
          <input
            type="text"
            name="certificateNumber"
            value={certificateData.certificateNumber}
            onChange={handleInputChange}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            placeholder="e.g., CERT-2024-001"
          />
        </div>

        <div className="flex gap-4 mb-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="qrCode"
              checked={certificateData.qrCode}
              onChange={(e) => onDataChange({ qrCode: e.target.checked })}
              className="mr-2"
            />
            <label htmlFor="qrCode" className="text-sm dark:text-gray-200">
              Add QR Code
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="watermark"
              checked={certificateData.watermark}
              onChange={(e) => onDataChange({ watermark: e.target.checked })}
              className="mr-2"
            />
            <label htmlFor="watermark" className="text-sm dark:text-gray-200">
              Add Watermark
            </label>
          </div>
        </div>
      </div>

      {/* Text Styling Section */}
      {certificateData.selectedText && (
        <div className="border-t mt-6 pt-6">
          <h3 className="text-lg font-medium mb-4 dark:text-gray-200">
            Text Styling - {certificateData.selectedElement}
          </h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 dark:text-gray-200">
              Font Style
            </label>
            <select
              value={certificateData.font}
              onChange={(e) => onDataChange({ font: e.target.value })}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            >
              {FONTS.map(font => (
                <option key={font.id} value={font.id}>{font.name}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 dark:text-gray-200">
              Text Color
            </label>
            <div className="relative">
              <button
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white flex items-center gap-2"
                onClick={() => setShowColorPicker(!showColorPicker)}
              >
                <div 
                  className="w-6 h-6 rounded"
                  style={{ 
                    backgroundColor: certificateData.selectedElement === 'title' ? 
                      certificateData.primaryColor : certificateData.secondaryColor 
                  }}
                />
                Select Color
              </button>
              {showColorPicker && (
                <div className="absolute z-10 mt-2">
                  <div 
                    className="fixed inset-0" 
                    onClick={() => setShowColorPicker(false)}
                  />
                  <SketchPicker
                    color={certificateData.selectedElement === 'title' ? 
                      certificateData.primaryColor : certificateData.secondaryColor}
                    onChange={(color) => handleColorChange(color, 
                      certificateData.selectedElement === 'title' ? 'primary' : 'secondary'
                    )}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <button
        onClick={downloadCertificate}
        className="w-full bg-blue-600 text-white p-2 rounded font-medium hover:bg-blue-700 transition"
      >
        Download Certificate
      </button>
    </div>
  );
} 