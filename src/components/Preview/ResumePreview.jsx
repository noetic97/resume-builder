import React from "react";
import { templateStyles, DEFAULT_TEMPLATE } from "../templates";

const ResumePreview = ({ resumeData, selectedTemplate = DEFAULT_TEMPLATE }) => {
  // Get the appropriate template styles
  const template =
    templateStyles[selectedTemplate] || templateStyles[DEFAULT_TEMPLATE];

  return (
    <div className="sticky top-6">
      <h2 className="text-xl font-semibold mb-4">Resume Preview</h2>

      <div id="resume-preview" className={template.containerStyles}>
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
            <h2 className={template.sectionHeaderStyles}>
              Professional Summary
            </h2>
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
      </div>
    </div>
  );
};

export default ResumePreview;
