import React, { useState, useEffect, useRef } from "react";
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

// A4 paper dimensions constants
const A4_WIDTH_MM = 210; // Width in mm
const A4_HEIGHT_MM = 297; // Height in mm

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
    <div className="container mx-auto px-4 xl:max-w-full 2xl:px-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Resume Builder</h1>
        <p className="text-gray-600">Create a professional resume in minutes</p>

        {showLastEditedNotice && lastEdited && (
          <div className="mt-2 text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block">
            Loaded your resume from {formatLastEdited(lastEdited)}
          </div>
        )}
      </header>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Form Section */}
        <div className="w-full lg:w-[45%] xl:w-[40%] 2xl:w-1/3 space-y-6">
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={exportToPdf}
              disabled={isPdfExporting}
              className={`px-4 py-2 bg-blue-600 text-white rounded ${
                isPdfExporting
                  ? "opacity-75 cursor-not-allowed"
                  : "hover:bg-blue-700"
              }`}
            >
              {isPdfExporting ? "Generating PDF..." : "Export to PDF"}
            </button>
            <button
              onClick={exportToDocx}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Export to DOCX
            </button>
            <button
              onClick={resetForm}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Reset
            </button>

            {lastEdited && (
              <span className="text-xs text-gray-500 self-center ml-auto">
                Last saved: {formatLastEdited(lastEdited)}
              </span>
            )}
          </div>

          <TemplateSelector
            selectedTemplate={selectedTemplate}
            onSelectTemplate={setSelectedTemplate}
          />

          <MarginSizeSelector
            selectedMarginSize={marginSize}
            onChange={setMarginSize}
          />

          <PersonalInfo
            personalData={resumeData.personal}
            setPersonalData={(data) =>
              setResumeData({ ...resumeData, personal: data })
            }
          />

          <Experience
            experienceData={resumeData.experience}
            setExperienceData={(data) =>
              setResumeData({ ...resumeData, experience: data })
            }
          />

          <Education
            educationData={resumeData.education}
            setEducationData={(data) =>
              setResumeData({ ...resumeData, education: data })
            }
          />

          <Skills
            skillsData={resumeData.skills}
            setSkillsData={(data) =>
              setResumeData({ ...resumeData, skills: data })
            }
          />
        </div>

        {/* Preview Section */}
        <div className="w-full lg:w-[55%] xl:w-[60%] 2xl:w-2/3">
          <DynamicScalingPreview
            resumeData={resumeData}
            selectedTemplate={selectedTemplate}
            marginSize={marginSize}
          />
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
