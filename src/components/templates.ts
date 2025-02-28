// src/components/templates.ts
import { TemplateId, TemplateStyles, TemplateInfo } from "../types/resume";

const TEMPLATES = {
  CLASSIC: "classic" as TemplateId,
  MODERN: "modern" as TemplateId,
  MINIMAL: "minimal" as TemplateId,
  PROFESSIONAL: "professional" as TemplateId,
  CREATIVE: "creative" as TemplateId,
};

// Template definitions with their styling properties
export const templateStyles: Record<TemplateId, TemplateStyles> = {
  [TEMPLATES.CLASSIC]: {
    id: TEMPLATES.CLASSIC,
    name: "Classic",
    description:
      "A traditional resume format with a clean, professional layout",
    containerStyles: "bg-white p-6 rounded-md shadow border border-gray-200",
    headerStyles: "text-center mb-6",
    nameStyles: "text-2xl font-bold text-gray-800",
    titleStyles: "text-lg text-gray-600",
    sectionHeaderStyles:
      "text-lg font-semibold border-b border-gray-300 pb-1 mb-2 text-gray-800",
    sectionStyles: "mb-6",
    itemTitleStyles: "font-medium text-gray-800",
    itemSubtitleStyles: "text-gray-700",
    itemDateStyles: "text-sm text-gray-600",
    skillStyles: "bg-gray-200 px-2 py-1 text-sm rounded text-gray-800",
    skillsContainerStyles: "flex flex-wrap gap-1",
    textStyles: "text-sm text-gray-700",
  },

  [TEMPLATES.MODERN]: {
    id: TEMPLATES.MODERN,
    name: "Modern",
    description:
      "A contemporary design with bold section headers and clean typography",
    containerStyles: "bg-white p-6 rounded-md shadow-md",
    headerStyles: "border-l-4 border-blue-500 pl-4 mb-6",
    nameStyles: "text-2xl font-bold text-gray-900",
    titleStyles: "text-lg text-blue-600 font-medium",
    sectionHeaderStyles:
      "text-lg font-semibold border-l-4 border-blue-500 pl-2 mb-3 text-gray-900",
    sectionStyles: "mb-6",
    itemTitleStyles: "font-semibold text-gray-900",
    itemSubtitleStyles: "text-blue-600",
    itemDateStyles: "text-sm text-gray-600 italic",
    skillStyles: "bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm",
    skillsContainerStyles: "flex flex-wrap gap-2",
    textStyles: "text-sm text-gray-700 leading-relaxed",
  },

  [TEMPLATES.MINIMAL]: {
    id: TEMPLATES.MINIMAL,
    name: "Minimal",
    description: "A minimalist design focusing on content with subtle styling",
    containerStyles: "bg-white p-6 rounded-md",
    headerStyles: "mb-6 pb-3 border-b border-gray-200",
    nameStyles: "text-2xl font-light text-gray-800",
    titleStyles: "text-gray-500",
    sectionHeaderStyles:
      "uppercase tracking-wider text-sm font-medium text-gray-500 mb-3",
    sectionStyles: "mb-6",
    itemTitleStyles: "font-medium text-gray-800",
    itemSubtitleStyles: "text-gray-600",
    itemDateStyles: "text-sm text-gray-500",
    skillStyles: "mr-3 text-gray-600 text-sm",
    skillsContainerStyles: "flex flex-wrap",
    textStyles: "text-sm text-gray-600 leading-relaxed",
  },

  [TEMPLATES.PROFESSIONAL]: {
    id: TEMPLATES.PROFESSIONAL,
    name: "Professional",
    description:
      "A structured, business-focused layout for corporate positions",
    containerStyles:
      "bg-gray-50 p-6 rounded-md border border-gray-300 shadow-sm",
    headerStyles: "bg-gray-800 text-white p-4 mb-6 rounded-t-md -mx-6 -mt-6",
    nameStyles: "text-2xl font-bold",
    titleStyles: "text-gray-300",
    sectionHeaderStyles:
      "text-lg font-semibold text-gray-800 border-b-2 border-gray-800 pb-1 mb-3",
    sectionStyles: "mb-6",
    itemTitleStyles: "font-semibold text-gray-800",
    itemSubtitleStyles: "text-gray-700",
    itemDateStyles: "text-sm font-medium text-gray-600",
    skillStyles: "bg-gray-800 text-white px-2 py-1 text-xs rounded",
    skillsContainerStyles: "flex flex-wrap gap-1",
    textStyles: "text-sm text-gray-700",
  },

  [TEMPLATES.CREATIVE]: {
    id: TEMPLATES.CREATIVE,
    name: "Creative",
    description: "A vibrant design for creative fields and positions",
    containerStyles:
      "bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-md shadow-md",
    headerStyles: "mb-6 text-center",
    nameStyles: "text-3xl font-bold text-indigo-900",
    titleStyles: "text-lg text-purple-600",
    sectionHeaderStyles:
      "text-lg font-semibold text-indigo-800 border-b border-purple-300 pb-1 mb-3",
    sectionStyles: "mb-6",
    itemTitleStyles: "font-semibold text-indigo-900",
    itemSubtitleStyles: "text-purple-700",
    itemDateStyles: "text-sm text-indigo-600",
    skillStyles:
      "bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm",
    skillsContainerStyles: "flex flex-wrap gap-2",
    textStyles: "text-sm text-indigo-900",
  },
};

// Default template
export const DEFAULT_TEMPLATE = TEMPLATES.CLASSIC;

// Export templates object for use in selectors
export const TEMPLATES_LIST: TemplateInfo[] = Object.values(templateStyles).map(
  (template) => ({
    id: template.id,
    name: template.name,
    description: template.description,
  })
);

export default TEMPLATES;
