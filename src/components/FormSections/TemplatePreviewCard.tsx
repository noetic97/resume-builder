import React from "react";
import styled from "styled-components";
import { templateStyles } from "../templates";
import { TemplateId } from "../../types/resume";

interface TemplatePreviewCardProps {
  templateId: TemplateId;
}

// Container for the preview card
const PreviewContainer = styled.div`
  width: 100%;
  height: 6rem;
  overflow: hidden;
  transform: scale(0.75);
  transform-origin: top left;
`;

// Sample section component for the preview
const SampleSection = styled.div`
  margin-bottom: 0.25rem;
`;

const SampleSectionHeader = styled.div<{ template: any }>`
  ${(props) => props.template.sectionHeader}
  font-size: 0.5rem !important; /* Override the template's font size */
`;

const SampleLine = styled.div`
  height: 0.25rem;
  background-color: #e5e7eb;
  width: 100%;
  border-radius: 0.125rem;
`;

// A miniature preview of how the resume template will look
const TemplatePreviewCard: React.FC<TemplatePreviewCardProps> = ({
  templateId,
}) => {
  const template = templateStyles[templateId];

  // Basic sample data for preview
  const sampleData = {
    name: "John Doe",
    title: "Software Engineer",
    sections: ["Summary", "Experience", "Education", "Skills"],
  };

  // Create styled components that apply the template styles
  const TemplateContainer = styled.div`
    ${template.container}
  `;

  const TemplateHeader = styled.div`
    ${template.header}
  `;

  const TemplateName = styled.div`
    ${template.nameStyle}
    font-size: 0.75rem !important; /* Override the template's font size */
  `;

  const TemplateTitle = styled.div`
    ${template.title}
    font-size: 0.5rem !important; /* Override the template's font size */
  `;

  return (
    <PreviewContainer>
      <TemplateContainer>
        {/* Miniature header */}
        <TemplateHeader>
          <TemplateName>{sampleData.name}</TemplateName>
          <TemplateTitle>{sampleData.title}</TemplateTitle>
        </TemplateHeader>

        {/* Sample sections */}
        <div style={{ marginTop: "0.25rem" }}>
          {sampleData.sections.map((section, index) => (
            <SampleSection key={index}>
              <SampleSectionHeader template={template}>
                {section}
              </SampleSectionHeader>
              <SampleLine />
            </SampleSection>
          ))}
        </div>
      </TemplateContainer>
    </PreviewContainer>
  );
};

export default TemplatePreviewCard;
