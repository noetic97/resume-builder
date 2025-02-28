import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { templateStyles, DEFAULT_TEMPLATE } from "../templates";
import { ResumeData, TemplateId } from "../../types/resume";
import { Heading2 } from "../Common";
import SafeHTMLContent from "../Common/HTMLContent";

// A4 paper dimensions constants
const A4_WIDTH_MM = 210; // Width in mm
const A4_HEIGHT_MM = 297; // Height in mm
const MM_TO_PX = 3.78; // Approximate conversion at 96 DPI

interface DynamicScalingPreviewProps {
  resumeData: ResumeData;
  selectedTemplate?: TemplateId;
  forExport?: boolean; // Prop to determine if this is for export (no page numbers)
  marginSize?: "small" | "medium" | "large"; // Optional margin size setting
}

interface ResumeContentProps {
  resumeData: ResumeData;
  $template: any;
}

// Styled components for the preview
const PreviewContainer = styled.div`
  position: sticky;
  top: 1.5rem;

  ${(props) => props.theme.media.xl} {
    padding-right: 2rem;
  }
`;

const PreviewOverflowContainer = styled.div`
  overflow: auto;
`;

const PreviewWrapper = styled.div`
  margin: 0 auto;
`;

interface PreviewPageProps {
  scale: number;
  $pageMarginPx: number;
}

const PreviewPage = styled.div<PreviewPageProps>`
  position: relative;
  margin-bottom: 1.5rem;
  box-shadow: ${(props) => props.theme.shadows.xl};
  background-color: white;

  &:last-child {
    margin-bottom: 0;
  }

  width: ${(props) => A4_WIDTH_MM * MM_TO_PX * props.scale}px;
  height: ${(props) => A4_HEIGHT_MM * MM_TO_PX * props.scale}px;
`;

const PageContent = styled.div<PreviewPageProps>`
  position: absolute;
  inset: 0;
  padding: ${(props) => props.$pageMarginPx}px;
  overflow: hidden;
`;

interface ContentWrapperProps {
  scale: number;
  $pageMarginMM: number;
}

const ContentWrapper = styled.div<ContentWrapperProps>`
  height: 100%;
  overflow: hidden;
  transform-origin: top left;
  transform: scale(${(props) => props.scale});
  width: ${(props) => (A4_WIDTH_MM - props.$pageMarginMM * 2) * MM_TO_PX}px;
  height: ${(props) => (A4_HEIGHT_MM - props.$pageMarginMM * 2) * MM_TO_PX}px;
  position: relative;
`;

interface ContentPositionerProps {
  $pageIndex: number;
  $contentPerPage: number;
}

const ContentPositioner = styled.div<ContentPositionerProps>`
  position: absolute;
  top: -${(props) => props.$pageIndex * props.$contentPerPage}px;
  width: 100%;
`;

const PageNumber = styled.div`
  position: absolute;
  bottom: -20px;
  right: 0;
  font-size: 0.75rem;
  color: ${(props) => props.theme.colors.gray[500]};
`;

// Hidden content measurement div
const HiddenContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  pointer-events: none;
  z-index: -1000;
`;

// Resume-specific styled components
const ResumeHeader = styled.div<{ $template: any }>`
  ${(props) => props.$template.header}
`;

const ResumeName = styled.h1<{ $template: any }>`
  ${(props) => props.$template.nameStyle}
`;

const ResumeTitle = styled.p<{ $template: any }>`
  ${(props) => props.$template.title}
`;

const ResumeContactInfo = styled.div`
  margin-top: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: ${(props) => props.theme.colors.gray[600]};

  ${(props) => props.theme.media.sm} {
    font-size: 0.875rem;
  }
`;

const ContactItem = styled.span`
  white-space: nowrap;
`;

const ResumeSection = styled.div<{ $template: any }>`
  ${(props) => props.$template.section}
`;

const SectionHeader = styled.h2<{ $template: any }>`
  ${(props) => props.$template.sectionHeader}
`;

const ExperienceItem = styled.div`
  margin-bottom: 1rem;
`;

const ExperienceHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 0.25rem;
`;

const ItemTitle = styled.h3<{ $template: any }>`
  ${(props) => props.$template.itemTitle}
`;

const ItemDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ItemSubtitle = styled.span<{ $template: any }>`
  ${(props) => props.$template.itemSubtitle}
`;

const ItemDate = styled.span<{ $template: any }>`
  ${(props) => props.$template.itemDate}
  font-size: 0.75rem;
  white-space: nowrap;
`;

const SkillsContainer = styled.div<{ $template: any }>`
  ${(props) => props.$template.skillsContainer}
`;

const SkillItem = styled.span<{ $template: any }>`
  ${(props) => props.$template.skill}
`;

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
    <PreviewContainer ref={containerRef}>
      <Heading2>Resume Preview</Heading2>

      <PreviewOverflowContainer>
        {/* Hidden div to measure content height */}
        <HiddenContent>
          <div
            ref={contentRef}
            style={{
              width: `${(A4_WIDTH_MM - pageMarginMM * 2) * MM_TO_PX}px`,
            }}
          >
            <ResumeContent resumeData={resumeData} $template={template} />
          </div>
        </HiddenContent>

        {/* Wrapper for centering */}
        <PreviewWrapper>
          {/* Render each page */}
          {pages.map((_, index) => (
            <PreviewPage
              key={index}
              id={
                index === 0
                  ? "resume-preview"
                  : `resume-preview-page-${index + 1}`
              }
              scale={scale}
              $pageMarginPx={pageMarginMM * MM_TO_PX * scale}
            >
              <PageContent
                scale={scale}
                $pageMarginPx={pageMarginMM * MM_TO_PX * scale}
              >
                <ContentWrapper scale={scale} $pageMarginMM={pageMarginMM}>
                  <ContentPositioner
                    $pageIndex={index}
                    $contentPerPage={
                      ((A4_HEIGHT_MM - pageMarginMM * 2) * MM_TO_PX) / scale
                    }
                  >
                    <ResumeContent
                      resumeData={resumeData}
                      $template={template}
                    />
                  </ContentPositioner>
                </ContentWrapper>
              </PageContent>

              {/* Page number indicator (outside actual page content) */}
              {!forExport && (
                <PageNumber className="page-number">
                  Page {index + 1} of {pages.length}
                </PageNumber>
              )}
            </PreviewPage>
          ))}
        </PreviewWrapper>
      </PreviewOverflowContainer>
    </PreviewContainer>
  );
};

// Separate component for the actual resume content
const ResumeContent: React.FC<ResumeContentProps> = ({
  resumeData,
  $template: templateProp,
}) => {
  return (
    <>
      {/* Header/Personal Info */}
      <ResumeHeader $template={templateProp}>
        <ResumeName $template={templateProp}>
          {resumeData.personal.name || "Your Name"}
        </ResumeName>
        <ResumeTitle $template={templateProp}>
          {resumeData.personal.title || "Professional Title"}
        </ResumeTitle>

        <ResumeContactInfo>
          {resumeData.personal.email && (
            <ContactItem>{resumeData.personal.email}</ContactItem>
          )}
          {resumeData.personal.phone && (
            <ContactItem>{resumeData.personal.phone}</ContactItem>
          )}
          {resumeData.personal.location && (
            <ContactItem>{resumeData.personal.location}</ContactItem>
          )}
        </ResumeContactInfo>
      </ResumeHeader>

      {/* Summary */}
      {resumeData.personal.summary && (
        <ResumeSection $template={templateProp}>
          <SectionHeader $template={templateProp}>
            Professional Summary
          </SectionHeader>
          <SafeHTMLContent
            html={resumeData.personal.summary}
            $template={templateProp}
          />
        </ResumeSection>
      )}

      {/* Experience */}
      {resumeData.experience.some((exp) => exp.company || exp.position) && (
        <ResumeSection $template={templateProp}>
          <SectionHeader $template={templateProp}>
            Work Experience
          </SectionHeader>

          {resumeData.experience.map(
            (exp, index) =>
              (exp.company || exp.position) && (
                <ExperienceItem key={index}>
                  <ExperienceHeader>
                    <ItemTitle $template={templateProp}>
                      {exp.position || "Position"}
                    </ItemTitle>
                    <ItemDetails>
                      <ItemSubtitle $template={templateProp}>
                        {exp.company || "Company"}
                      </ItemSubtitle>
                      <ItemDate $template={templateProp}>
                        {exp.startDate || "Start Date"} -{" "}
                        {exp.isCurrentPosition
                          ? "Present"
                          : exp.endDate || "End Date"}
                      </ItemDate>
                    </ItemDetails>
                  </ExperienceHeader>
                  {exp.description && (
                    <SafeHTMLContent
                      html={exp.description}
                      $template={templateProp}
                    />
                  )}
                </ExperienceItem>
              )
          )}
        </ResumeSection>
      )}

      {/* Education */}
      {resumeData.education.some((edu) => edu.institution || edu.degree) && (
        <ResumeSection $template={templateProp}>
          <SectionHeader $template={templateProp}>Education</SectionHeader>

          {resumeData.education.map(
            (edu, index) =>
              (edu.institution || edu.degree) && (
                <ExperienceItem key={index}>
                  <ExperienceHeader>
                    <ItemTitle $template={templateProp}>
                      {edu.institution || "Institution"}
                    </ItemTitle>
                    <ItemDetails>
                      <ItemSubtitle $template={templateProp}>
                        {edu.degree || "Degree"}
                        {edu.field ? ` in ${edu.field}` : ""}
                        {edu.gpa ? ` - GPA: ${edu.gpa}` : ""}
                      </ItemSubtitle>
                      <ItemDate $template={templateProp}>
                        {edu.graduationDate || "Graduation Date"}
                      </ItemDate>
                    </ItemDetails>
                  </ExperienceHeader>
                </ExperienceItem>
              )
          )}
        </ResumeSection>
      )}

      {/* Skills */}
      {resumeData.skills.length > 0 && (
        <ResumeSection $template={templateProp}>
          <SectionHeader $template={templateProp}>Skills</SectionHeader>
          <SkillsContainer $template={templateProp}>
            {resumeData.skills.map((skill, index) => (
              <SkillItem key={index} $template={templateProp}>
                {skill}
              </SkillItem>
            ))}
          </SkillsContainer>
        </ResumeSection>
      )}
    </>
  );
};

export default DynamicScalingPreview;
