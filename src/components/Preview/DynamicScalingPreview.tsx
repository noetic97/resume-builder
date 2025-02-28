import React, { useRef, useEffect, useState } from "react";
import { templateStyles, DEFAULT_TEMPLATE } from "../templates";
import { ResumeData, TemplateId, TemplateStyles } from "../../types/resume";

// A4 paper dimensions constants
const A4_WIDTH_MM = 210; // Width in mm
const A4_HEIGHT_MM = 297; // Height in mm
const PAGE_MARGIN_MM = 10; // Margin in mm (reduced from 20 to 10)

// Convert mm to px (96 dpi)
const MM_TO_PX = 3.78; // Approximate conversion at 96 DPI

interface DynamicScalingPreviewProps {
  resumeData: ResumeData;
  selectedTemplate?: TemplateId;
  forExport?: boolean; // Prop to determine if this is for export (no page numbers)
  marginSize?: "small" | "medium" | "large"; // Optional margin size setting
}

interface ResumeContentProps {
  resumeData: ResumeData;
  template: TemplateStyles;
}

const DynamicScalingPreview: React.FC<DynamicScalingPreviewProps> = ({
  resumeData,
  selectedTemplate = DEFAULT_TEMPLATE,
  forExport = false,
  marginSize = "small",
}) => {
  // Calculate margin based on marginSize
  const getMarginMM = (): number => {
    switch (marginSize) {
      case "small":
        return 10;
      case "medium":
        return 15;
      case "large":
        return 20;
      default:
        return 10;
    }
  };

  const pageMarginMM = getMarginMM();
  const template =
    templateStyles[selectedTemplate] || templateStyles[DEFAULT_TEMPLATE];
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [pages, setPages] = useState<number[]>([0]); // Initially just the first page
  const [scale, setScale] = useState<number>(1.0); // Default scale
  const [contentHeight, setContentHeight] = useState<number>(0);

  // Calculate the scale based on container width and window size
  useEffect(() => {
    const calculateScale = (): void => {
      if (containerRef.current) {
        // Get the available width (with some padding)
        const availableWidth = containerRef.current.clientWidth - 40;
        const availableHeight = window.innerHeight * 0.7; // 70% of window height

        // Calculate scales for width and height
        const widthScale = Math.min(
          availableWidth / (A4_WIDTH_MM * MM_TO_PX),
          1.0
        );
        const heightScale = Math.min(
          availableHeight / (A4_HEIGHT_MM * MM_TO_PX),
          1.0
        );

        // Use the smaller of the two to maintain aspect ratio
        const calculatedScale = Math.min(widthScale, heightScale);

        // Set the new scale (minimum 0.3, maximum 1.0)
        setScale(Math.max(0.3, Math.min(calculatedScale, 1.0)));
      }
    };

    // Calculate initially
    calculateScale();

    // Add resize listener
    window.addEventListener("resize", calculateScale);

    // Cleanup
    return () => window.removeEventListener("resize", calculateScale);
  }, []);

  // Measure the content height
  useEffect(() => {
    const measureContentHeight = (): void => {
      if (contentRef.current) {
        // Force the content to be visible during measurement
        const current = contentRef.current as HTMLElement;
        const originalStyle = current.style.cssText;
        current.style.position = "static";
        current.style.visibility = "visible";
        current.style.transform = "none";
        current.style.maxWidth = "none";
        current.style.width = `${
          (A4_WIDTH_MM - pageMarginMM * 2) * MM_TO_PX
        }px`;

        // Get accurate height
        setContentHeight(current.scrollHeight);

        // Restore styles
        current.style.cssText = originalStyle;
      }
    };

    // Small delay to ensure content is rendered
    const timer = setTimeout(measureContentHeight, 100);

    // Set up a mutation observer to watch for content changes
    const observer = new MutationObserver(measureContentHeight);

    if (contentRef.current) {
      observer.observe(contentRef.current, {
        childList: true,
        subtree: true,
        characterData: true,
      });
    }

    // Measure again whenever window resizes
    window.addEventListener("resize", measureContentHeight);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      window.removeEventListener("resize", measureContentHeight);
    };
  }, [resumeData, selectedTemplate, pageMarginMM]);

  // Calculate page count based on content height
  useEffect(() => {
    if (contentHeight > 0) {
      // Calculate max content height per page
      const pageContentHeight =
        A4_HEIGHT_MM * MM_TO_PX * scale - pageMarginMM * 2 * MM_TO_PX * scale;

      // Calculate how many pages we need
      const pageCount = Math.max(
        1,
        Math.ceil(contentHeight / (pageContentHeight / scale))
      );

      // Create array of page starting positions
      const newPages = Array.from(
        { length: pageCount },
        (_, i) => i * (pageContentHeight / scale)
      );

      setPages(newPages);
    }
  }, [contentHeight, scale, pageMarginMM]);

  return (
    <div className="sticky top-6 xl:pr-8" ref={containerRef}>
      <h2 className="text-xl font-semibold mb-4">Resume Preview</h2>

      <div className="preview-container overflow-auto">
        {/* Hidden div to measure content height */}
        <div
          className="absolute top-0 left-0 opacity-0 pointer-events-none"
          style={{ zIndex: -1000 }}
        >
          <div
            ref={contentRef}
            style={{
              width: `${
                A4_WIDTH_MM * MM_TO_PX - PAGE_MARGIN_MM * 2 * MM_TO_PX
              }px`,
            }}
          >
            <ResumeContent resumeData={resumeData} template={template} />
          </div>
        </div>

        {/* Wrapper for centering */}
        <div className="preview-wrapper mx-auto">
          {/* Render each page */}
          {pages.map((_, index) => (
            <div
              key={index}
              id={
                index === 0
                  ? "resume-preview"
                  : `resume-preview-page-${index + 1}`
              }
              className="relative mb-6 last:mb-0 shadow-lg"
              style={{
                width: `${A4_WIDTH_MM * MM_TO_PX * scale}px`,
                height: `${A4_HEIGHT_MM * MM_TO_PX * scale}px`,
                backgroundColor: "white",
              }}
            >
              {/* Actual page content */}
              <div
                className="absolute inset-0"
                style={{
                  padding: `${pageMarginMM * MM_TO_PX * scale}px`,
                  overflow: "hidden",
                }}
              >
                {/* Resume content with proper positioning for each page */}
                <div
                  className={`h-full overflow-hidden ${template.containerStyles.replace(
                    /bg-\w+-\d+/g,
                    ""
                  )}`}
                  style={{
                    transformOrigin: "top left",
                    transform: `scale(${scale})`,
                    width: `${(A4_WIDTH_MM - pageMarginMM * 2) * MM_TO_PX}px`,
                    height: `${(A4_HEIGHT_MM - pageMarginMM * 2) * MM_TO_PX}px`,
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: `-${
                        index *
                        (((A4_HEIGHT_MM - pageMarginMM * 2) * MM_TO_PX) / scale)
                      }px`,
                      width: "100%",
                    }}
                  >
                    <ResumeContent
                      resumeData={resumeData}
                      template={template}
                    />
                  </div>
                </div>
              </div>

              {/* Page number indicator (outside actual page content) */}
              {!forExport && (
                <div className="absolute bottom-[-20px] right-0 text-xs text-gray-500 page-number">
                  Page {index + 1} of {pages.length}
                </div>
              )}
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

        <div className="mt-2 flex flex-wrap justify-center gap-x-2 text-xs sm:text-sm text-gray-600">
          {resumeData.personal.email && (
            <span className="whitespace-nowrap">
              {resumeData.personal.email}
            </span>
          )}
          {resumeData.personal.phone && (
            <span className="whitespace-nowrap">
              {resumeData.personal.phone}
            </span>
          )}
          {resumeData.personal.location && (
            <span className="whitespace-nowrap">
              {resumeData.personal.location}
            </span>
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
                  <div className="w-full flex flex-col mb-1">
                    <h3 className={`${template.itemTitleStyles}`}>
                      {exp.position || "Position"}
                    </h3>
                    <div className="flex justify-between items-center">
                      <span className={`${template.itemSubtitleStyles}`}>
                        {exp.company || "Company"}
                      </span>
                      <span
                        className={`${template.itemDateStyles} text-xs whitespace-nowrap`}
                      >
                        {exp.startDate || "Start Date"} -{" "}
                        {exp.isCurrentPosition
                          ? "Present"
                          : exp.endDate || "End Date"}
                      </span>
                    </div>
                  </div>
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
                  <div className="w-full flex flex-col mb-1">
                    <h3 className={`${template.itemTitleStyles}`}>
                      {edu.institution || "Institution"}
                    </h3>
                    <div className="flex justify-between items-center">
                      <span className={`${template.itemSubtitleStyles}`}>
                        {edu.degree || "Degree"}
                        {edu.field ? ` in ${edu.field}` : ""}
                        {edu.gpa ? ` - GPA: ${edu.gpa}` : ""}
                      </span>
                      <span
                        className={`${template.itemDateStyles} text-xs whitespace-nowrap`}
                      >
                        {edu.graduationDate || "Graduation Date"}
                      </span>
                    </div>
                  </div>
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
