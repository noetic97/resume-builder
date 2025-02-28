import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import PersonalInfo from "./FormSections/PersonalInfo";
import Experience from "./FormSections/Experience";
import Education from "./FormSections/Education";
import Skills from "./FormSections/Skills";
import MarginSizeSelector from "./FormSections/MarginSizeSelectors";
import DynamicScalingPreview from "./Preview/DynamicScalingPreview";
import TemplateSelector from "./FormSections/TemplateSelector";
import { DEFAULT_TEMPLATE } from "./templates";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { ResumeData, TemplateId } from "../types/resume";
import {
  saveResumeState,
  loadResumeState,
  clearAllData,
} from "../utils/storageService";
import { Container, Heading1, Text, Button, Row, Col, Spacer } from "./Common";
import CollapsibleSection from "./Common/CollapsibleSection";
import { TemplateStyleProvider } from "./Common/TemplateStyleManager";

// A4 paper dimensions constants
const A4_WIDTH_MM = 210; // Width in mm
const A4_HEIGHT_MM = 297; // Height in mm

// Styled components for the ResumeBuilder
const PageContainer = styled(Container)`
  padding: 1.5rem 1.5rem;
  max-width: 1400px;
  margin: 0 auto;

  ${(props) => props.theme.media.md} {
    padding: 2rem;
    max-width: 95%;
  }

  ${(props) => props.theme.media.lg} {
    padding: 2rem 3rem;
    max-width: 90%;
  }

  ${(props) => props.theme.media.xl} {
    max-width: 1536px;
    padding: 2.5rem 4rem;
  }

  ${(props) => props.theme.media["2xl"]} {
    padding: 3rem 5rem;
  }
`;

const Header = styled.header`
  margin-bottom: 2rem;
  text-align: center;
`;

const NoticeMessage = styled.div`
  margin-top: 0.5rem;
  font-size: ${(props) => props.theme.typography.fontSize.sm};
  color: ${(props) => props.theme.colors.primary.main};
  background-color: ${(props) => props.theme.colors.blue[50]};
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  display: inline-block;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const LastSavedText = styled.span`
  font-size: ${(props) => props.theme.typography.fontSize.xs};
  color: ${(props) => props.theme.colors.text.secondary};
  align-self: center;
  margin-left: auto;
`;

const ContentLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  ${(props) => props.theme.media.lg} {
    flex-direction: row;
    gap: 3rem;
  }

  ${(props) => props.theme.media.xl} {
    gap: 4rem;
  }

  ${(props) => props.theme.media["2xl"]} {
    gap: 5rem;
  }
`;

const FormColumn = styled.div`
  width: 100%;

  ${(props) => props.theme.media.lg} {
    width: 48%;
  }

  ${(props) => props.theme.media.xl} {
    width: 45%;
  }

  ${(props) => props.theme.media["2xl"]} {
    width: 40%;
  }
`;

const PreviewColumn = styled.div`
  width: 100%;

  ${(props) => props.theme.media.lg} {
    width: 52%;
  }

  ${(props) => props.theme.media.xl} {
    width: 55%;
  }

  ${(props) => props.theme.media["2xl"]} {
    width: 60%;
  }
`;

const ResumeBuilder: React.FC = () => {
  // Default resume data structure
  const defaultResumeData: ResumeData = {
    personal: {
      name: "",
      title: "",
      email: "",
      phone: "",
      location: "",
      summary: "",
    },
    experience: [
      {
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        description: "",
        isCurrentPosition: false,
      },
    ],
    education: [
      {
        institution: "",
        degree: "",
        field: "",
        graduationDate: "",
        gpa: "",
      },
    ],
    skills: [],
  };

  // State for resume data and selected template
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [selectedTemplate, setSelectedTemplate] =
    useState<TemplateId>(DEFAULT_TEMPLATE);
  const [lastEdited, setLastEdited] = useState<Date | null>(null);
  const [showLastEditedNotice, setShowLastEditedNotice] =
    useState<boolean>(false);
  // State for tracking PDF export process and margin size
  const [isPdfExporting, setIsPdfExporting] = useState<boolean>(false);
  const [marginSize, setMarginSize] = useState<"small" | "medium" | "large">(
    "small"
  );

  // Load data from localStorage on initial load
  useEffect(() => {
    const {
      resumeData: savedData,
      selectedTemplate: savedTemplate,
      lastEdited: lastEditedTime,
    } = loadResumeState(defaultResumeData, DEFAULT_TEMPLATE);

    if (savedData) {
      setResumeData(savedData);

      if (lastEditedTime) {
        const editTime = new Date(lastEditedTime);
        setLastEdited(editTime);
        setShowLastEditedNotice(true);

        // Hide the notice after 5 seconds
        const timer = setTimeout(() => {
          setShowLastEditedNotice(false);
        }, 5000);

        return () => clearTimeout(timer);
      }
    }

    if (savedTemplate) {
      setSelectedTemplate(savedTemplate);
    }
  }, []);

  // Save data to localStorage whenever resumeData or selectedTemplate changes
  useEffect(() => {
    // Skip the initial render
    const isInitialRender =
      JSON.stringify(resumeData) === JSON.stringify(defaultResumeData) &&
      selectedTemplate === DEFAULT_TEMPLATE;

    if (!isInitialRender) {
      saveResumeState(resumeData, selectedTemplate);
      setLastEdited(new Date());
    }
  }, [resumeData, selectedTemplate]);

  // Improved PDF export with multi-page support
  const exportToPdf = async (): Promise<void> => {
    setIsPdfExporting(true);
    try {
      // Create PDF with A4 dimensions
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // Get all visible preview pages
      const pages = document.querySelectorAll('[id^="resume-preview"]');

      if (pages.length === 0) {
        console.error("No preview pages found");
        return;
      }

      // Process each page
      for (let i = 0; i < pages.length; i++) {
        const page = pages[i] as HTMLElement;

        // Capture the page as an image
        const canvas = await html2canvas(page, {
          scale: 2, // Higher scale for better quality
          useCORS: true,
          logging: false,
          backgroundColor: "#ffffff",
          // Capture just the page content, not the page number
          onclone: (document, element) => {
            const clonedElement = element as HTMLElement;
            // Remove page numbers from the clone before rendering
            const pageNumbers = clonedElement.querySelectorAll(".page-number");
            pageNumbers.forEach((el) => el.remove());
          },
        });

        // Get the image data
        const imgData = canvas.toDataURL("image/png");

        // Add new page if not the first page
        if (i > 0) {
          pdf.addPage();
        }

        // Add image to PDF - fill entire page
        pdf.addImage(imgData, "PNG", 0, 0, A4_WIDTH_MM, A4_HEIGHT_MM);
      }

      // Generate filename
      const filename = resumeData.personal.name
        ? `resume_${resumeData.personal.name
            .toLowerCase()
            .replace(/\s+/g, "_")}.pdf`
        : "resume.pdf";

      // Save the PDF
      pdf.save(filename);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsPdfExporting(false);
    }
  };

  // DOCX export function (simplified)
  const exportToDocx = (): void => {
    alert("DOCX export coming soon!");
    // In a real implementation, you'd generate a DOCX file here
  };

  // Reset form
  const resetForm = (): void => {
    if (
      window.confirm(
        "Are you sure you want to reset the form? All your data will be lost."
      )
    ) {
      setResumeData(defaultResumeData);
      setSelectedTemplate(DEFAULT_TEMPLATE);
      clearAllData();
      setLastEdited(null);
    }
  };

  // Format last edited time for display
  const formatLastEdited = (date: Date | null): string => {
    if (!date) return "";

    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60)
      return `${diffMins} minute${diffMins === 1 ? "" : "s"} ago`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24)
      return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;

    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;

    return date.toLocaleDateString();
  };

  return (
    <PageContainer>
      <Header>
        <Heading1>Resume Builder</Heading1>
        <Text>Create a professional resume in minutes</Text>

        {showLastEditedNotice && lastEdited && (
          <NoticeMessage>
            Loaded your resume from {formatLastEdited(lastEdited)}
          </NoticeMessage>
        )}
      </Header>

      {/* Wrap content with TemplateStyleProvider */}
      <TemplateStyleProvider selectedTemplate={selectedTemplate}>
        <ContentLayout>
          {/* Form Section */}
          <FormColumn>
            <ButtonGroup>
              <Button
                onClick={exportToPdf}
                disabled={isPdfExporting}
                $variant={isPdfExporting ? undefined : "primary"}
                style={{
                  opacity: isPdfExporting ? 0.75 : 1,
                  cursor: isPdfExporting ? "not-allowed" : "pointer",
                }}
              >
                {isPdfExporting ? "Generating PDF..." : "Export to PDF"}
              </Button>
              <Button onClick={exportToDocx} $variant="success">
                Export to DOCX
              </Button>
              <Button onClick={resetForm} $variant="error">
                Reset
              </Button>

              {lastEdited && (
                <LastSavedText>
                  Last saved: {formatLastEdited(lastEdited)}
                </LastSavedText>
              )}
            </ButtonGroup>

            <CollapsibleSection
              title="Template & Layout"
              defaultExpanded={true}
            >
              <TemplateSelector
                selectedTemplate={selectedTemplate}
                onSelectTemplate={setSelectedTemplate}
              />

              <Spacer size={4} />

              <MarginSizeSelector
                selectedMarginSize={marginSize}
                onChange={setMarginSize}
              />
            </CollapsibleSection>

            {/* Use the template-aware editor components in each section */}
            <CollapsibleSection
              title="Personal Information"
              defaultExpanded={true}
            >
              <PersonalInfo
                personalData={resumeData.personal}
                setPersonalData={(data) =>
                  setResumeData({ ...resumeData, personal: data })
                }
                useTemplateStyles={true}
              />
            </CollapsibleSection>

            <CollapsibleSection title="Work Experience">
              <Experience
                experienceData={resumeData.experience}
                setExperienceData={(data) =>
                  setResumeData({ ...resumeData, experience: data })
                }
                useTemplateStyles={true}
              />
            </CollapsibleSection>

            <CollapsibleSection title="Education">
              <Education
                educationData={resumeData.education}
                setEducationData={(data) =>
                  setResumeData({ ...resumeData, education: data })
                }
                // useTemplateStyles={true}
              />
            </CollapsibleSection>

            <CollapsibleSection title="Skills">
              <Skills
                skillsData={resumeData.skills}
                setSkillsData={(data) =>
                  setResumeData({ ...resumeData, skills: data })
                }
                // useTemplateStyles={true}
              />
            </CollapsibleSection>
          </FormColumn>

          {/* Preview Section */}
          <PreviewColumn>
            <DynamicScalingPreview
              resumeData={resumeData}
              selectedTemplate={selectedTemplate}
              marginSize={marginSize}
            />
          </PreviewColumn>
        </ContentLayout>
      </TemplateStyleProvider>
    </PageContainer>
  );
};

export default ResumeBuilder;
