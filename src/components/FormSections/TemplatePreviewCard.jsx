import React from "react";
import { templateStyles } from "../templates";

// A miniature preview of how the resume template will look
const TemplatePreviewCard = ({ templateId }) => {
  const template = templateStyles[templateId];

  // Basic sample data for preview
  const sampleData = {
    name: "John Doe",
    title: "Software Engineer",
    sections: ["Summary", "Experience", "Education", "Skills"],
  };

  return (
    <div
      className={`w-full h-24 ${template.containerStyles} overflow-hidden scale-75 transform origin-top-left`}
    >
      {/* Miniature header */}
      <div className={template.headerStyles}>
        <div className={`text-xs ${template.nameStyles}`}>
          {sampleData.name}
        </div>
        <div className={`text-xs ${template.titleStyles}`}>
          {sampleData.title}
        </div>
      </div>

      {/* Sample sections */}
      <div className="mt-1">
        {sampleData.sections.map((section, index) => (
          <div key={index} className="mb-1">
            <div className={`text-xs ${template.sectionHeaderStyles}`}>
              {section}
            </div>
            <div className="h-1 bg-gray-200 w-full rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplatePreviewCard;
