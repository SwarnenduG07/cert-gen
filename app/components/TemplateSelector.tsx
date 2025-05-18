'use client';

import ClassicTemplate from '../templates/ClassicTemplate';
import ModernTemplate from '../templates/ModernTemplate';
import ElegantTemplate from '../templates/ElegantTemplate';
import { CertificateData } from '@/types/interface';

interface TemplateSelectorProps {
  selectedTemplate: number;
  onSelectTemplate: (templateId: number) => void;
}

export default function TemplateSelector({ 
  selectedTemplate, 
  onSelectTemplate 
}: TemplateSelectorProps) {
  // Sample data for previews
  const previewData: CertificateData = {
    recipientName: "John Doe",
    certificateTitle: "Certificate of Achievement",
    issuerName: "Organization Name",
    issueDate: new Date(),
    description: "For successfully completing the course requirements with excellence.",
    selectedTemplate: 1,
    borderStyle: 'classic',
    primaryColor: '#000000',
    secondaryColor: '#000000',
    font: 'serif',
    certificateNumber: 'SAMPLE-123',
    qrCode: false,
    watermark: false,
    selectedText: null,
    selectedElement: null
  };

  // Define templates with actual components
  const templates = [
    { 
      id: 1, 
      name: "Classic",
      component: <ClassicTemplate data={{...previewData, selectedTemplate: 1}} />
    },
    { 
      id: 2, 
      name: "Modern",
      component: <ModernTemplate data={{...previewData, selectedTemplate: 2}} />
    },
    { 
      id: 3, 
      name: "Elegant",
      component: <ElegantTemplate data={{...previewData, selectedTemplate: 3}} />
    },
  ];

  return (
    <div className="mb-8">
      <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-200">Choose a Template</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {templates.map(template => (
          <div 
            key={template.id}
            className={`
              border-2 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300
              ${
                selectedTemplate === template.id 
                  ? 'border-blue-500 ring-2 ring-blue-300 dark:ring-blue-700 scale-[1.02]' 
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }
            `}
            onClick={() => onSelectTemplate(template.id)}
          >
            <div className="aspect-[1.4/1] p-2 bg-gray-50 dark:bg-gray-200 flex items-center justify-center cursor-pointer overflow-hidden">
              <div className="transform scale-[.40] origin-center w-[1050px] h-[600px]">
                {template.component}
              </div>
            </div>
            <div className="p-3 text-center bg-white dark:bg-gray-200 border-t border-gray-100 dark:border-gray-800">
              <p className="font-medium text-gray-800 dark:text-gray-800">{template.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-800 mt-1">Click to select</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 