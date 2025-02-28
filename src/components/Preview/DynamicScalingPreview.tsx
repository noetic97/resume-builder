import React, { useRef, useEffect, useState } from "react";
import { templateStyles, DEFAULT_TEMPLATE } from "../templates";
import { ResumeData, TemplateId, TemplateStyles } from "../../types/resume";

// A4 paper dimensions constants
const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;
const PAGE_MARGIN_MM = 20;

interface DynamicScalingPreviewProps {
  resumeData: ResumeData;
  selectedTemplate?: TemplateId;
}

interface ResumeContentProps {
  resumeData: ResumeData;
  template: TemplateStyles;
}

const DynamicScalingPreview: React.FC<DynamicScalingPreviewProps> = ({
  resumeData,
  selectedTemplate = DEFAULT_TEMPLATE,
}) => {
  const template =
    templateStyles[selectedTemplate] || templateStyles[DEFAULT_TEMPLATE];
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [pages, setPages] = useState<number[]>([0]); // Initially just the first page
  const [scale, setScale] = useState<number>(1.5); // Default scale

  // Dynamically calculate the best scale based on container width
  useEffect(() => {
    const calculateScale = (): void => {
      if (containerRef.current) {
        // Get the available width (with some padding)
        const availableWidth = containerRef.current.clientWidth - 40;

        // Calculate a scale that fits the available width (max 2.2, min 1.0)
        const calculatedScale = Math.min(
          2.2,
          Math.max(1.0, availableWidth / A4_WIDTH_MM)
        );

        // Set the new scale
        setScale(calculatedScale);
      }
    };

    // Calculate initially
    calculateScale();

    // Add resize listener
    window.addEventListener("resize", calculateScale);

    // Cleanup
    return () => window.removeEventListener("resize", calculateScale);
  }, []);

  // Calculate page count based on content height
  useEffect(() => {
    if (contentRef.current) {
      // Get the content height
      const height = contentRef.current.scrollHeight;

      // Calculate max content height per page (accounting for margins)
      const maxContentHeight =
        A4_HEIGHT_MM * scale - PAGE_MARGIN_MM * 2 * scale;

      // Calculate how many pages we need
      const pageCount = Math.max(1, Math.ceil(height / maxContentHeight));

      // Create array of page starting positions
      const newPages = Array.from(
        { length: pageCount },
        (_, i) => i * maxContentHeight
      );
      setPages(newPages);
    }
  }, [resumeData, selectedTemplate, scale]);

  return (
    <div className="sticky top-6 xl:pr-8" ref={containerRef}>
      <h2 className="text-xl font-semibold mb-4">Resume Preview</h2>

      <div className="preview-container">
        {/* Create a hidden div to measure content height */}
        <div className="hidden">
          <div
            ref={contentRef}
            style={{
              width: `${A4_WIDTH_MM * scale - PAGE_MARGIN_MM * 2 * scale}px`,
              position: "absolute",
              visibility: "hidden",
            }}
          >
            <ResumeContent resumeData={resumeData} template={template} />
          </div>
        </div>

        {/* Wrapper for centering */}
        <div className="preview-wrapper">
          {/* Render each page */}
          {pages.map((startPosition, index) => (
            <div
              key={index}
              id={
                index === 0
                  ? "resume-preview"
                  : `resume-preview-page-${index + 1}`
              }
              style={{
                width: `${A4_WIDTH_MM * scale}px`,
                minHeight: `${A4_HEIGHT_MM * scale}px`,
                padding: `${PAGE_MARGIN_MM * scale}px`,
                backgroundColor: "white",
                boxShadow: "0 3px 10px rgba(0, 0, 0, 0.2)",
                margin: "0 auto",
                marginBottom: index < pages.length - 1 ? "20px" : "0",
                position: "relative",
                pageBreakAfter: "always",
              }}
              className={`${index < pages.length - 1 ? "overflow" : ""}`}
            >
              <div
                className={`relative z-10 ${template.containerStyles.replace(
                  /bg-\w+-\d+/g,
                  ""
                )}`}
              >
                {/* Clip the content to this page only */}
                <div
                  style={{
                    height: `${
                      A4_HEIGHT_MM * scale - PAGE_MARGIN_MM * 2 * scale
                    }px`,
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: index === 0 ? "0" : `-${startPosition}px`,
                      width: "100%",
                    }}
                  >
                    <ResumeContent
                      resumeData={resumeData}
                      template={template}
                    />
                  </div>
                </div>

                {/* Page number indicator */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "5px",
                    right: "10px",
                    fontSize: "10px",
                    color: "#aaa",
                  }}
                >
                  Page {index + 1} of {pages.length}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Separate component for the actual resume content
const ResumeContent: React.FC<ResumeContentProps> = ({
  resumeData,
  template,
}) => {
  return (
    <>
      {/* Header/Personal Info */}
      <div className={template.headerStyles}>
        <h1 className={template.nameStyles}>
          {resumeData.personal.name || "Your Name"}
        </h1>
        <p className={template.titleStyles}>
          {resumeData.personal.title || "Professional Title"}
        </p>

        <div className="mt-2 flex flex-wrap justify-center gap-x-3 text-sm text-gray-600">
          {resumeData.personal.email && (
            <span>{resumeData.personal.email}</span>
          )}
          {resumeData.personal.phone && (
            <span>{resumeData.personal.phone}</span>
          )}
          {resumeData.personal.location && (
            <span>{resumeData.personal.location}</span>
          )}
        </div>
      </div>

      {/* Summary */}
      {resumeData.personal.summary && (
        <div className={template.sectionStyles}>
          <h2 className={template.sectionHeaderStyles}>Professional Summary</h2>
          <p className={template.textStyles}>{resumeData.personal.summary}</p>
        </div>
      )}

      {/* Experience */}
      {resumeData.experience.some((exp) => exp.company || exp.position) && (
        <div className={template.sectionStyles}>
          <h2 className={template.sectionHeaderStyles}>Work Experience</h2>

          {resumeData.experience.map(
            (exp, index) =>
              (exp.company || exp.position) && (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-baseline">
                    <h3 className={template.itemTitleStyles}>
                      {exp.position || "Position"}
                    </h3>
                    <span className={template.itemDateStyles}>
                      {exp.startDate || "Start Date"} -{" "}
                      {exp.isCurrentPosition
                        ? "Present"
                        : exp.endDate || "End Date"}
                    </span>
                  </div>
                  <p className={template.itemSubtitleStyles}>
                    {exp.company || "Company"}
                  </p>
                  {exp.description && (
                    <p
                      className={`${template.textStyles} mt-1 whitespace-pre-line`}
                    >
                      {exp.description}
                    </p>
                  )}
                </div>
              )
          )}
        </div>
      )}

      {/* Education */}
      {resumeData.education.some((edu) => edu.institution || edu.degree) && (
        <div className={template.sectionStyles}>
          <h2 className={template.sectionHeaderStyles}>Education</h2>

          {resumeData.education.map(
            (edu, index) =>
              (edu.institution || edu.degree) && (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-baseline">
                    <h3 className={template.itemTitleStyles}>
                      {edu.institution || "Institution"}
                    </h3>
                    <span className={template.itemDateStyles}>
                      {edu.graduationDate || "Graduation Date"}
                    </span>
                  </div>
                  <p className={template.itemSubtitleStyles}>
                    {edu.degree || "Degree"}
                    {edu.field ? ` in ${edu.field}` : ""}
                    {edu.gpa ? ` - GPA: ${edu.gpa}` : ""}
                  </p>
                </div>
              )
          )}
        </div>
      )}

      {/* Skills */}
      {resumeData.skills.length > 0 && (
        <div className={template.sectionStyles}>
          <h2 className={template.sectionHeaderStyles}>Skills</h2>
          <div className={template.skillsContainerStyles}>
            {resumeData.skills.map((skill, index) => (
              <span key={index} className={template.skillStyles}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default DynamicScalingPreview;
