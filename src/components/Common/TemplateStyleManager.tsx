import React, { createContext, useContext, useState, useEffect } from "react";
import { EnhancedTemplateStyles } from "../templates";
import { templateStyles, DEFAULT_TEMPLATE } from "../templates";
import { TemplateId } from "../../types/resume";

// Type definition for the context
interface TemplateStyleContextType {
  currentTemplate: EnhancedTemplateStyles;
  applyFormatting: (
    elementType: keyof EnhancedTemplateStyles["formatting"]
  ) => void;
  getEditorConfig: () => {
    fontFamily: string;
    fontSize: string;
    textColor: string;
    alignment: "left" | "center" | "right" | "justify";
    bulletType: "disc" | "circle" | "square" | "none";
  };
  getCustomStyles: (element: string) => React.CSSProperties;
}

// Create context
const TemplateStyleContext = createContext<
  TemplateStyleContextType | undefined
>(undefined);

// Hook for components to consume the context
export const useTemplateStyles = () => {
  const context = useContext(TemplateStyleContext);
  if (!context) {
    throw new Error(
      "useTemplateStyles must be used within a TemplateStyleProvider"
    );
  }
  return context;
};

interface TemplateStyleProviderProps {
  selectedTemplate: TemplateId;
  children: React.ReactNode;
}

export const TemplateStyleProvider: React.FC<TemplateStyleProviderProps> = ({
  selectedTemplate,
  children,
}) => {
  // Cast the template styles to include our enhanced properties
  // In a real implementation, you would properly extend the existing templates
  const [currentTemplate, setCurrentTemplate] =
    useState<EnhancedTemplateStyles>(
      (templateStyles[selectedTemplate] as unknown as EnhancedTemplateStyles) ||
        (templateStyles[DEFAULT_TEMPLATE] as unknown as EnhancedTemplateStyles)
    );

  // Update the current template when the selected template changes
  useEffect(() => {
    setCurrentTemplate(
      (templateStyles[selectedTemplate] as unknown as EnhancedTemplateStyles) ||
        (templateStyles[DEFAULT_TEMPLATE] as unknown as EnhancedTemplateStyles)
    );
  }, [selectedTemplate]);

  // Function to apply formatting for a specific element type
  const applyFormatting = (
    elementType: keyof EnhancedTemplateStyles["formatting"]
  ) => {
    // This would be implemented to apply formatting to the editor
    // Return formatting instructions for the given element type
    return currentTemplate.formatting[elementType];
  };

  // Function to get editor configuration based on template
  const getEditorConfig = () => {
    return {
      fontFamily: currentTemplate.typography.primaryFont,
      fontSize: currentTemplate.typography.bodyFontSize,
      textColor: currentTemplate.colorScheme.text.primary,
      alignment: currentTemplate.formatting.sectionTitle.alignment,
      bulletType: currentTemplate.formatting.bulletPoints.type,
    };
  };

  // Function to get CSS styles for a specific element
  const getCustomStyles = (element: string): React.CSSProperties => {
    switch (element) {
      case "sectionTitle":
        return {
          fontFamily: currentTemplate.formatting.sectionTitle.fontFamily,
          fontSize: currentTemplate.formatting.sectionTitle.fontSize,
          fontWeight: currentTemplate.formatting.sectionTitle.fontWeight,
          color: currentTemplate.formatting.sectionTitle.color,
          textAlign: currentTemplate.formatting.sectionTitle.alignment,
          textDecoration: currentTemplate.formatting.sectionTitle.underline
            ? "underline"
            : "none",
          textTransform: currentTemplate.formatting.sectionTitle.uppercase
            ? "uppercase"
            : "none",
          marginBottom: currentTemplate.formatting.sectionTitle.marginBottom,
        };
      case "jobTitle":
        return {
          fontFamily: currentTemplate.formatting.jobTitle.fontFamily,
          fontSize: currentTemplate.formatting.jobTitle.fontSize,
          fontWeight: currentTemplate.formatting.jobTitle.fontWeight,
          color: currentTemplate.formatting.jobTitle.color,
          textAlign: currentTemplate.formatting.jobTitle.alignment,
        };
      case "companyName":
        return {
          fontFamily: currentTemplate.formatting.companyName.fontFamily,
          fontSize: currentTemplate.formatting.companyName.fontSize,
          fontWeight: currentTemplate.formatting.companyName.fontWeight,
          color: currentTemplate.formatting.companyName.color,
          fontStyle: currentTemplate.formatting.companyName.italics
            ? "italic"
            : "normal",
        };
      default:
        return {};
    }
  };

  // Create the context value
  const contextValue: TemplateStyleContextType = {
    currentTemplate,
    applyFormatting,
    getEditorConfig,
    getCustomStyles,
  };

  // Provide the context to children
  return (
    <TemplateStyleContext.Provider value={contextValue}>
      {children}
    </TemplateStyleContext.Provider>
  );
};
