import React, { useState, useEffect } from "react";
import PersonalInfo from "./FormSections/PersonalInfo";
import Experience from "./FormSections/Experience";
import Education from "./FormSections/Education";
import Skills from "./FormSections/Skills";
import ResumePreview from "./Preview/ResumePreview";
import TemplateSelector from "./FormSections/TemplateSelector";
import { DEFAULT_TEMPLATE } from "./templates";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const ResumeBuilder = () => {
  // State for resume data
  const [resumeData, setResumeData] = useState({
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
  });

  // State for selected template
  const [selectedTemplate, setSelectedTemplate] = useState(DEFAULT_TEMPLATE);

  // Load data from localStorage on initial load
  useEffect(() => {
    const savedData = localStorage.getItem("resumeData");
    const savedTemplate = localStorage.getItem("selectedTemplate");

    if (savedData) {
      try {
        setResumeData(JSON.parse(savedData));
      } catch (e) {
        console.error("Error parsing saved resume data", e);
      }
    }

    if (savedTemplate) {
      setSelectedTemplate(savedTemplate);
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("resumeData", JSON.stringify(resumeData));
    localStorage.setItem("selectedTemplate", selectedTemplate);
  }, [resumeData, selectedTemplate]);

  // PDF export function
  const exportToPdf = () => {
    const input = document.getElementById("resume-preview");
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;

      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save("resume.pdf");
    });
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
      setResumeData({
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
      });
      setSelectedTemplate(DEFAULT_TEMPLATE);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Resume Builder</h1>
        <p className="text-gray-600">Create a professional resume in minutes</p>
      </header>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Form Section */}
        <div className="w-full md:w-1/2 space-y-6">
          <div className="flex space-x-2 mb-6">
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
        <div className="w-full md:w-1/2">
          <ResumePreview
            resumeData={resumeData}
            selectedTemplate={selectedTemplate}
          />
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
