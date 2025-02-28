import { css } from "styled-components";
import { TemplateId } from "../types/resume";

// Define new types for styled-components templates
export interface StyledTemplateStyles {
  id: TemplateId;
  name: string;
  description: string;
  container: ReturnType<typeof css>;
  header: ReturnType<typeof css>;
  nameStyle: ReturnType<typeof css>;
  title: ReturnType<typeof css>;
  sectionHeader: ReturnType<typeof css>;
  section: ReturnType<typeof css>;
  itemTitle: ReturnType<typeof css>;
  itemSubtitle: ReturnType<typeof css>;
  itemDate: ReturnType<typeof css>;
  skill: ReturnType<typeof css>;
  skillsContainer: ReturnType<typeof css>;
  text: ReturnType<typeof css>;
}

const TEMPLATES = {
  CLASSIC: "classic",
  MODERN: "modern",
  MINIMAL: "minimal",
  PROFESSIONAL: "professional",
  CREATIVE: "creative",
} as const;

export type TemplateKeys = keyof typeof TEMPLATES;

// Template definitions with their styling properties using styled-components
export const templateStyles: Record<TemplateId, StyledTemplateStyles> = {
  [TEMPLATES.CLASSIC]: {
    id: TEMPLATES.CLASSIC,
    name: "Classic",
    description:
      "A traditional resume format with a clean, professional layout",
    container: css`
      background-color: white;
      padding: 1.5rem;
      border-radius: 0.375rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      border: 1px solid #e5e7eb;
    `,
    header: css`
      text-align: center;
      margin-bottom: 1.5rem;
    `,
    nameStyle: css`
      font-size: 1.5rem;
      font-weight: 700;
      color: #1f2937;
    `,
    title: css`
      font-size: 1.125rem;
      color: #4b5563;
    `,
    sectionHeader: css`
      font-size: 1.125rem;
      font-weight: 600;
      border-bottom: 1px solid #d1d5db;
      padding-bottom: 0.25rem;
      margin-bottom: 0.5rem;
      color: #1f2937;
    `,
    section: css`
      margin-bottom: 1.5rem;
    `,
    itemTitle: css`
      font-weight: 500;
      color: #1f2937;
    `,
    itemSubtitle: css`
      color: #374151;
    `,
    itemDate: css`
      font-size: 0.875rem;
      color: #4b5563;
    `,
    skill: css`
      background-color: #e5e7eb;
      padding: 0 0.5rem;
      font-size: 0.875rem;
      border-radius: 0.25rem;
      color: #1f2937;
    `,
    skillsContainer: css`
      display: flex;
      flex-wrap: wrap;
      gap: 0.25rem;
    `,
    text: css`
      font-size: 0.875rem;
      color: #374151;
    `,
  },

  [TEMPLATES.MODERN]: {
    id: TEMPLATES.MODERN,
    name: "Modern",
    description:
      "A contemporary design with bold section headers and clean typography",
    container: css`
      background-color: white;
      padding: 1.5rem;
      border-radius: 0.375rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    `,
    header: css`
      border-left: 4px solid #3b82f6;
      padding-left: 1rem;
      margin-bottom: 1.5rem;
    `,
    nameStyle: css`
      font-size: 1.5rem;
      font-weight: 700;
      color: #111827;
    `,
    title: css`
      font-size: 1.125rem;
      color: #3b82f6;
      font-weight: 500;
    `,
    sectionHeader: css`
      font-size: 1.125rem;
      font-weight: 600;
      border-left: 4px solid #3b82f6;
      padding-left: 0.5rem;
      margin-bottom: 0.75rem;
      color: #111827;
    `,
    section: css`
      margin-bottom: 1.5rem;
    `,
    itemTitle: css`
      font-weight: 600;
      color: #111827;
    `,
    itemSubtitle: css`
      color: #3b82f6;
    `,
    itemDate: css`
      font-size: 0.875rem;
      color: #4b5563;
      font-style: italic;
    `,
    skill: css`
      background-color: #dbeafe;
      color: #1e40af;
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.875rem;
    `,
    skillsContainer: css`
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    `,
    text: css`
      font-size: 0.875rem;
      color: #374151;
      line-height: 1.5;
    `,
  },

  [TEMPLATES.MINIMAL]: {
    id: TEMPLATES.MINIMAL,
    name: "Minimal",
    description: "A minimalist design focusing on content with subtle styling",
    container: css`
      background-color: white;
      padding: 1.5rem;
      border-radius: 0.375rem;
    `,
    header: css`
      margin-bottom: 1.5rem;
      padding-bottom: 0.75rem;
      border-bottom: 1px solid #e5e7eb;
    `,
    nameStyle: css`
      font-size: 1.5rem;
      font-weight: 300;
      color: #1f2937;
    `,
    title: css`
      color: #6b7280;
    `,
    sectionHeader: css`
      text-transform: uppercase;
      letter-spacing: 0.05em;
      font-size: 0.875rem;
      font-weight: 500;
      color: #6b7280;
      margin-bottom: 0.75rem;
    `,
    section: css`
      margin-bottom: 1.5rem;
    `,
    itemTitle: css`
      font-weight: 500;
      color: #1f2937;
    `,
    itemSubtitle: css`
      color: #4b5563;
    `,
    itemDate: css`
      font-size: 0.875rem;
      color: #6b7280;
    `,
    skill: css`
      margin-right: 0.75rem;
      color: #4b5563;
      font-size: 0.875rem;
    `,
    skillsContainer: css`
      display: flex;
      flex-wrap: wrap;
    `,
    text: css`
      font-size: 0.875rem;
      color: #4b5563;
      line-height: 1.5;
    `,
  },

  [TEMPLATES.PROFESSIONAL]: {
    id: TEMPLATES.PROFESSIONAL,
    name: "Professional",
    description:
      "A structured, business-focused layout for corporate positions",
    container: css`
      background-color: #f9fafb;
      padding: 1.5rem;
      border-radius: 0.375rem;
      border: 1px solid #d1d5db;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    `,
    header: css`
      background-color: #1f2937;
      color: white;
      padding: 1rem;
      margin-bottom: 1.5rem;
      border-top-left-radius: 0.375rem;
      border-top-right-radius: 0.375rem;
      margin: -1.5rem -1.5rem 1.5rem -1.5rem;
    `,
    nameStyle: css`
      font-size: 1.5rem;
      font-weight: 700;
    `,
    title: css`
      color: #d1d5db;
    `,
    sectionHeader: css`
      font-size: 1.125rem;
      font-weight: 600;
      color: #1f2937;
      border-bottom: 2px solid #1f2937;
      padding-bottom: 0.25rem;
      margin-bottom: 0.75rem;
    `,
    section: css`
      margin-bottom: 1.5rem;
    `,
    itemTitle: css`
      font-weight: 600;
      color: #1f2937;
    `,
    itemSubtitle: css`
      color: #374151;
    `,
    itemDate: css`
      font-size: 0.875rem;
      font-weight: 500;
      color: #4b5563;
    `,
    skill: css`
      background-color: #1f2937;
      color: white;
      padding: 0.25rem 0.5rem;
      font-size: 0.75rem;
      border-radius: 0.25rem;
    `,
    skillsContainer: css`
      display: flex;
      flex-wrap: wrap;
      gap: 0.25rem;
    `,
    text: css`
      font-size: 0.875rem;
      color: #374151;
    `,
  },

  [TEMPLATES.CREATIVE]: {
    id: TEMPLATES.CREATIVE,
    name: "Creative",
    description: "A vibrant design for creative fields and positions",
    container: css`
      background: linear-gradient(to bottom right, #ede9fe, #e0e7ff);
      padding: 1.5rem;
      border-radius: 0.375rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    `,
    header: css`
      margin-bottom: 1.5rem;
      text-align: center;
    `,
    nameStyle: css`
      font-size: 1.875rem;
      font-weight: 700;
      color: #312e81;
    `,
    title: css`
      font-size: 1.125rem;
      color: #7c3aed;
    `,
    sectionHeader: css`
      font-size: 1.125rem;
      font-weight: 600;
      color: #4f46e5;
      border-bottom: 1px solid #c4b5fd;
      padding-bottom: 0.25rem;
      margin-bottom: 0.75rem;
    `,
    section: css`
      margin-bottom: 1.5rem;
    `,
    itemTitle: css`
      font-weight: 600;
      color: #312e81;
    `,
    itemSubtitle: css`
      color: #6d28d9;
    `,
    itemDate: css`
      font-size: 0.875rem;
      color: #4f46e5;
    `,
    skill: css`
      background: linear-gradient(to right, #4f46e5, #7c3aed);
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.875rem;
    `,
    skillsContainer: css`
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    `,
    text: css`
      font-size: 0.875rem;
      color: #312e81;
    `,
  },
};

// Default template
export const DEFAULT_TEMPLATE = TEMPLATES.CLASSIC;

// Export templates object for use in selectors
export const TEMPLATES_LIST = Object.values(templateStyles).map((template) => ({
  id: template.id,
  name: template.name,
  description: template.description,
}));

export default TEMPLATES;
