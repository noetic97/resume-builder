// Resume data types

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  summary: string; // HTML content
}

export interface ExperienceItem {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string; // HTML content
  isCurrentPosition: boolean;
}

export interface EducationItem {
  institution: string;
  degree: string;
  field: string;
  graduationDate: string;
  gpa: string;
}

export interface ResumeData {
  personal: PersonalInfo;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: string[];
}

// Template types
export type TemplateId =
  | "classic"
  | "modern"
  | "minimal"
  | "professional"
  | "creative";

export interface TemplateStyles {
  id: TemplateId;
  name: string;
  description: string;
  containerStyles: string;
  headerStyles: string;
  nameStyles: string;
  titleStyles: string;
  sectionHeaderStyles: string;
  sectionStyles: string;
  itemTitleStyles: string;
  itemSubtitleStyles: string;
  itemDateStyles: string;
  skillStyles: string;
  skillsContainerStyles: string;
  textStyles: string;
}

export interface TemplateInfo {
  id: TemplateId;
  name: string;
  description: string;
}
