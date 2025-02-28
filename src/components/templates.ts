import { css } from "styled-components";
import { TemplateId } from "../types/resume";

// Define all template ID constants
const TEMPLATES = {
  CLASSIC: "classic",
  MODERN: "modern",
  MINIMAL: "minimal",
  PROFESSIONAL: "professional",
  CREATIVE: "creative",
} as const;

export type TemplateKeys = keyof typeof TEMPLATES;

// Original template styles interface
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

// Enhanced typography definitions
export interface TemplateTypography {
  primaryFont: string;
  secondaryFont: string;
  baseFontSize: string;
  headerFontSize: string;
  subheaderFontSize: string;
  bodyFontSize: string;
  lineHeight: string;
  fontWeight: {
    light: number;
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
  };
}

// Enhanced color scheme definitions
export interface TemplateColorScheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

// Enhanced spacing definitions
export interface TemplateSpacing {
  sectionGap: string;
  itemGap: string;
  contentDensity: "compact" | "normal" | "spacious";
  margins: {
    small: string;
    medium: string;
    large: string;
  };
}

// Enhanced formatting presets
export interface TemplateFormattingPresets {
  sectionTitle: {
    fontFamily: string;
    fontSize: string;
    fontWeight: number;
    color: string;
    alignment: "left" | "center" | "right";
    underline?: boolean;
    uppercase?: boolean;
    marginBottom: string;
  };
  jobTitle: {
    fontFamily: string;
    fontSize: string;
    fontWeight: number;
    color: string;
    alignment: "left" | "center" | "right";
  };
  companyName: {
    fontFamily: string;
    fontSize: string;
    fontWeight: number;
    color: string;
    italics?: boolean;
  };
  dates: {
    fontFamily: string;
    fontSize: string;
    fontWeight: number;
    color: string;
  };
  summary: {
    fontFamily: string;
    fontSize: string;
    fontWeight: number;
    color: string;
    lineHeight: string;
    alignment: "left" | "center" | "right" | "justify";
  };
  bulletPoints: {
    type: "disc" | "circle" | "square" | "none";
    indentation: string;
    spacing: string;
    fontFamily: string;
    fontSize: string;
    color: string;
  };
}

// Enhanced template interface
export interface EnhancedTemplateStyles extends StyledTemplateStyles {
  typography: TemplateTypography;
  colorScheme: TemplateColorScheme;
  spacing: TemplateSpacing;
  formatting: TemplateFormattingPresets;
}

// Default typography values for reference
// const defaultTypography: TemplateTypography = {
//   primaryFont: "Calibri, sans-serif",
//   secondaryFont: "Calibri, sans-serif",
//   baseFontSize: "12px",
//   headerFontSize: "18px",
//   subheaderFontSize: "14px",
//   bodyFontSize: "12px",
//   lineHeight: "1.5",
//   fontWeight: {
//     light: 300,
//     normal: 400,
//     medium: 500,
//     semibold: 600,
//     bold: 700,
//   },
// };

// Enhanced template definitions
export const templateStyles: Record<TemplateId, EnhancedTemplateStyles> = {
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
    // Added enhanced properties
    typography: {
      primaryFont: "Calibri, sans-serif",
      secondaryFont: "Times New Roman, serif",
      baseFontSize: "12px",
      headerFontSize: "18px",
      subheaderFontSize: "14px",
      bodyFontSize: "12px",
      lineHeight: "1.5",
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
    },
    colorScheme: {
      primary: "#1f2937",
      secondary: "#4b5563",
      accent: "#3b82f6",
      background: "#ffffff",
      text: {
        primary: "#1f2937",
        secondary: "#4b5563",
        accent: "#3b82f6",
      },
    },
    spacing: {
      sectionGap: "1.5rem",
      itemGap: "0.75rem",
      contentDensity: "normal",
      margins: {
        small: "10mm",
        medium: "15mm",
        large: "20mm",
      },
    },
    formatting: {
      sectionTitle: {
        fontFamily: "Calibri, sans-serif",
        fontSize: "14px",
        fontWeight: 600,
        color: "#1f2937",
        alignment: "left",
        underline: true,
        uppercase: false,
        marginBottom: "0.5rem",
      },
      jobTitle: {
        fontFamily: "Calibri, sans-serif",
        fontSize: "13px",
        fontWeight: 600,
        color: "#1f2937",
        alignment: "left",
      },
      companyName: {
        fontFamily: "Calibri, sans-serif",
        fontSize: "12px",
        fontWeight: 400,
        color: "#4b5563",
        italics: false,
      },
      dates: {
        fontFamily: "Calibri, sans-serif",
        fontSize: "11px",
        fontWeight: 400,
        color: "#6b7280",
      },
      summary: {
        fontFamily: "Calibri, sans-serif",
        fontSize: "12px",
        fontWeight: 400,
        color: "#374151",
        lineHeight: "1.5",
        alignment: "left",
      },
      bulletPoints: {
        type: "disc",
        indentation: "1.5rem",
        spacing: "0.25rem",
        fontFamily: "Calibri, sans-serif",
        fontSize: "12px",
        color: "#374151",
      },
    },
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
    // Added enhanced properties
    typography: {
      primaryFont: "Helvetica, sans-serif",
      secondaryFont: "Arial, sans-serif",
      baseFontSize: "12px",
      headerFontSize: "20px",
      subheaderFontSize: "16px",
      bodyFontSize: "12px",
      lineHeight: "1.6",
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
    },
    colorScheme: {
      primary: "#3b82f6",
      secondary: "#1e40af",
      accent: "#bfdbfe",
      background: "#ffffff",
      text: {
        primary: "#111827",
        secondary: "#4b5563",
        accent: "#3b82f6",
      },
    },
    spacing: {
      sectionGap: "1.75rem",
      itemGap: "1rem",
      contentDensity: "normal",
      margins: {
        small: "12mm",
        medium: "16mm",
        large: "22mm",
      },
    },
    formatting: {
      sectionTitle: {
        fontFamily: "Helvetica, sans-serif",
        fontSize: "16px",
        fontWeight: 600,
        color: "#111827",
        alignment: "left",
        underline: false,
        uppercase: false,
        marginBottom: "0.75rem",
      },
      jobTitle: {
        fontFamily: "Helvetica, sans-serif",
        fontSize: "14px",
        fontWeight: 600,
        color: "#111827",
        alignment: "left",
      },
      companyName: {
        fontFamily: "Helvetica, sans-serif",
        fontSize: "13px",
        fontWeight: 500,
        color: "#3b82f6",
        italics: false,
      },
      dates: {
        fontFamily: "Helvetica, sans-serif",
        fontSize: "12px",
        fontWeight: 400,
        color: "#4b5563",
      },
      summary: {
        fontFamily: "Helvetica, sans-serif",
        fontSize: "13px",
        fontWeight: 400,
        color: "#374151",
        lineHeight: "1.6",
        alignment: "left",
      },
      bulletPoints: {
        type: "disc",
        indentation: "1.25rem",
        spacing: "0.35rem",
        fontFamily: "Helvetica, sans-serif",
        fontSize: "12px",
        color: "#374151",
      },
    },
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
    // Added enhanced properties
    typography: {
      primaryFont: "Inter, sans-serif",
      secondaryFont: "Inter, sans-serif",
      baseFontSize: "12px",
      headerFontSize: "16px",
      subheaderFontSize: "14px",
      bodyFontSize: "12px",
      lineHeight: "1.5",
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
    },
    colorScheme: {
      primary: "#1f2937",
      secondary: "#4b5563",
      accent: "#d1d5db",
      background: "#ffffff",
      text: {
        primary: "#1f2937",
        secondary: "#4b5563",
        accent: "#6b7280",
      },
    },
    spacing: {
      sectionGap: "1.25rem",
      itemGap: "0.5rem",
      contentDensity: "compact",
      margins: {
        small: "15mm",
        medium: "20mm",
        large: "25mm",
      },
    },
    formatting: {
      sectionTitle: {
        fontFamily: "Inter, sans-serif",
        fontSize: "11px",
        fontWeight: 500,
        color: "#6b7280",
        alignment: "left",
        underline: false,
        uppercase: true,
        marginBottom: "0.5rem",
      },
      jobTitle: {
        fontFamily: "Inter, sans-serif",
        fontSize: "13px",
        fontWeight: 500,
        color: "#1f2937",
        alignment: "left",
      },
      companyName: {
        fontFamily: "Inter, sans-serif",
        fontSize: "12px",
        fontWeight: 400,
        color: "#4b5563",
        italics: false,
      },
      dates: {
        fontFamily: "Inter, sans-serif",
        fontSize: "11px",
        fontWeight: 400,
        color: "#6b7280",
      },
      summary: {
        fontFamily: "Inter, sans-serif",
        fontSize: "12px",
        fontWeight: 400,
        color: "#4b5563",
        lineHeight: "1.5",
        alignment: "left",
      },
      bulletPoints: {
        type: "disc",
        indentation: "1rem",
        spacing: "0.25rem",
        fontFamily: "Inter, sans-serif",
        fontSize: "12px",
        color: "#4b5563",
      },
    },
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
    // Added enhanced properties
    typography: {
      primaryFont: "Georgia, serif",
      secondaryFont: "Arial, sans-serif",
      baseFontSize: "12px",
      headerFontSize: "20px",
      subheaderFontSize: "16px",
      bodyFontSize: "12px",
      lineHeight: "1.6",
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
    },
    colorScheme: {
      primary: "#1f2937",
      secondary: "#374151",
      accent: "#d1d5db",
      background: "#f9fafb",
      text: {
        primary: "#1f2937",
        secondary: "#374151",
        accent: "#d1d5db",
      },
    },
    spacing: {
      sectionGap: "1.5rem",
      itemGap: "0.75rem",
      contentDensity: "normal",
      margins: {
        small: "12mm",
        medium: "18mm",
        large: "24mm",
      },
    },
    formatting: {
      sectionTitle: {
        fontFamily: "Georgia, serif",
        fontSize: "16px",
        fontWeight: 600,
        color: "#1f2937",
        alignment: "left",
        underline: false,
        uppercase: false,
        marginBottom: "0.75rem",
      },
      jobTitle: {
        fontFamily: "Georgia, serif",
        fontSize: "14px",
        fontWeight: 600,
        color: "#1f2937",
        alignment: "left",
      },
      companyName: {
        fontFamily: "Arial, sans-serif",
        fontSize: "13px",
        fontWeight: 500,
        color: "#374151",
        italics: false,
      },
      dates: {
        fontFamily: "Arial, sans-serif",
        fontSize: "12px",
        fontWeight: 500,
        color: "#4b5563",
      },
      summary: {
        fontFamily: "Georgia, serif",
        fontSize: "13px",
        fontWeight: 400,
        color: "#374151",
        lineHeight: "1.6",
        alignment: "left",
      },
      bulletPoints: {
        type: "square",
        indentation: "1.25rem",
        spacing: "0.35rem",
        fontFamily: "Arial, sans-serif",
        fontSize: "12px",
        color: "#374151",
      },
    },
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
    // Added enhanced properties
    typography: {
      primaryFont: "Poppins, sans-serif",
      secondaryFont: "Montserrat, sans-serif",
      baseFontSize: "13px",
      headerFontSize: "22px",
      subheaderFontSize: "16px",
      bodyFontSize: "13px",
      lineHeight: "1.7",
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
    },
    colorScheme: {
      primary: "#4f46e5",
      secondary: "#7c3aed",
      accent: "#c4b5fd",
      background: "#ede9fe",
      text: {
        primary: "#312e81",
        secondary: "#6d28d9",
        accent: "#4f46e5",
      },
    },
    spacing: {
      sectionGap: "2rem",
      itemGap: "1rem",
      contentDensity: "spacious",
      margins: {
        small: "10mm",
        medium: "15mm",
        large: "20mm",
      },
    },
    formatting: {
      sectionTitle: {
        fontFamily: "Poppins, sans-serif",
        fontSize: "16px",
        fontWeight: 600,
        color: "#4f46e5",
        alignment: "left",
        underline: false,
        uppercase: false,
        marginBottom: "0.75rem",
      },
      jobTitle: {
        fontFamily: "Poppins, sans-serif",
        fontSize: "15px",
        fontWeight: 600,
        color: "#312e81",
        alignment: "left",
      },
      companyName: {
        fontFamily: "Montserrat, sans-serif",
        fontSize: "14px",
        fontWeight: 500,
        color: "#6d28d9",
        italics: false,
      },
      dates: {
        fontFamily: "Montserrat, sans-serif",
        fontSize: "12px",
        fontWeight: 400,
        color: "#4f46e5",
      },
      summary: {
        fontFamily: "Montserrat, sans-serif",
        fontSize: "13px",
        fontWeight: 400,
        color: "#312e81",
        lineHeight: "1.7",
        alignment: "left",
      },
      bulletPoints: {
        type: "circle",
        indentation: "1.5rem",
        spacing: "0.5rem",
        fontFamily: "Montserrat, sans-serif",
        fontSize: "13px",
        color: "#312e81",
      },
    },
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
