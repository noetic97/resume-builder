import React, { useState, useEffect } from "react";
import PersonalInfo from "./FormSections/PersonalInfo";
import Experience from "./FormSections/Experience";
import Education from "./FormSections/Education";
import Skills from "./FormSections/Skills";
import DynamicScalingPreview from "./Preview/DynamicScalingPreview";
import TemplateSelector from "./FormSections/TemplateSelector";
import { DEFAULT_TEMPLATE } from "./templates";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const ResumeBuilder = () => {
  // Default resume data structure
  const defaultResumeData = {
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
  const [resumeData, setResumeData] = useState(defaultResumeData);
  const [selectedTemplate, setSelectedTemplate] = useState(DEFAULT_TEMPLATE);
  const [lastEdited, setLastEdited] = useState(null);
  const [showLastEditedNotice, setShowLastEditedNotice] = useState(false);

  // Load data from localStorage on initial load
  useEffect(() => {
    const savedData = localStorage.getItem("resumeData");
    const savedTemplate = localStorage.getItem("selectedTemplate");
    const lastEditedTime = localStorage.getItem("lastEdited");

    if (savedData) {
      try {
        setResumeData(JSON.parse(savedData));

        if (lastEditedTime) {
          const editTime = new Date(JSON.parse(lastEditedTime));
          setLastEdited(editTime);
          setShowLastEditedNotice(true);

          // Hide the notice after 5 seconds
          const timer = setTimeout(() => {
            setShowLastEditedNotice(false);
          }, 5000);

          return () => clearTimeout(timer);
        }
      } catch (e) {
        console.error("Error parsing saved resume data", e);
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
      const now = new Date();
      localStorage.setItem("resumeData", JSON.stringify(resumeData));
      localStorage.setItem("selectedTemplate", selectedTemplate);
      localStorage.setItem("lastEdited", JSON.stringify(now));
      setLastEdited(now);
    }
  }, [resumeData, selectedTemplate]);

  // Export PDF with multi-page support
  const exportToPdf = async () => {
    // Check if we have multiple pages
    const mainPreview = document.getElementById("resume-preview");
    if (!mainPreview) return;

    // Create PDF with A4 dimensions (portrait)
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // Function to add a page to the PDF
    const addPageToPdf = async (element, isFirstPage = false) => {
      const canvas = await html2canvas(element, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        logging: false,
        // Ensure proper background colors
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");

      // If not the first page, add a new page to the PDF
      if (!isFirstPage) {
        pdf.addPage();
      }

      // Calculate proper scaling to fit the A4 page
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    };

    // Add first page
    await addPageToPdf(mainPreview, true);

    // Check for additional pages
    let pageIndex = 2;
    let nextPage = document.getElementById(`resume-preview-page-${pageIndex}`);

    // Add each additional page
    while (nextPage) {
      await addPageToPdf(nextPage);
      pageIndex++;
      nextPage = document.getElementById(`resume-preview-page-${pageIndex}`);
    }

    // Save the PDF
    const filename = resumeData.personal.name
      ? `resume_${resumeData.personal.name
          .toLowerCase()
          .replace(/\s+/g, "_")}.pdf`
      : "resume.pdf";

    pdf.save(filename);
  };

  // DOCX export function (simplified)
  const exportToDocx = () => {
    alert("DOCX export coming soon!");
    // In a real implementation, you'd generate a DOCX file here
  };

  // Reset form
  const resetForm = () => {
    if (
      window.confirm(
        "Are you sure you want to reset the form? All your data will be lost."
      )
    ) {
      setResumeData(defaultResumeData);
      setSelectedTemplate(DEFAULT_TEMPLATE);
      localStorage.removeItem("resumeData");
      localStorage.removeItem("selectedTemplate");
      localStorage.removeItem("lastEdited");
    }
  };

  // Format last edited time for display
  const formatLastEdited = (date) => {
    if (!date) return "";

    const now = new Date();
    const diffMs = now - date;
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
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Export to PDF
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
          />
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
