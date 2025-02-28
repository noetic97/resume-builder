import React from "react";
import { TEMPLATES_LIST } from "../templates";
import TemplatePreviewCard from "./TemplatePreviewCard";

const TemplateSelector = ({ selectedTemplate, onSelectTemplate }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Choose a Template</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-4">
        {TEMPLATES_LIST.map((template) => (
          <div
            key={template.id}
            className={`
              border rounded-md p-4 cursor-pointer transition-all hover:shadow-md
              ${
                selectedTemplate === template.id
                  ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
                  : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
              }
            `}
            onClick={() => onSelectTemplate(template.id)}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-lg">{template.name}</h3>
              {selectedTemplate === template.id && (
                <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">
                  Selected
                </span>
              )}
            </div>

            <div className="mb-3 h-24 border rounded overflow-hidden">
              <TemplatePreviewCard templateId={template.id} />
            </div>

            <p className="text-sm text-gray-600">{template.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
