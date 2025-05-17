'use client';

interface TemplateSelectorProps {
  selectedTemplate: number;
  onSelectTemplate: (templateId: number) => void;
}

export default function TemplateSelector({ 
  selectedTemplate, 
  onSelectTemplate 
}: TemplateSelectorProps) {
  // Define your certificate templates
  const templates = [
    { id: 1, name: "Classic", thumbnail: "/templates/classic-thumb.png" },
    { id: 2, name: "Modern", thumbnail: "/templates/modern-thumb.png" },
    { id: 3, name: "Elegant", thumbnail: "/templates/elegant-thumb.png" },
  ];

  return (
    <div className="mb-6">
      <h3 className="text-md font-medium mb-2 text-gray-800 dark:text-gray-200 section-heading">Select Template</h3>
      <div className="grid grid-cols-3 gap-4">
        {templates.map(template => (
          <div 
            key={template.id}
            className={`border rounded p-2 cursor-pointer transition ${
              selectedTemplate === template.id 
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900 dark:border-blue-400' 
                : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
            }`}
            onClick={() => onSelectTemplate(template.id)}
          >
            <div className="aspect-w-16 aspect-h-9 mb-2 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
              {/* We can replace this with actual template thumbnails later */}
              <div className="text-sm text-gray-500 dark:text-gray-300">{template.name}</div>
            </div>
            <p className="text-xs text-center text-gray-800 dark:text-gray-200">{template.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 