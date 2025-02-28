/**
 * Storage service for handling local storage operations
 * This centralizes all storage logic and provides error handling
 */
import { ResumeData, TemplateId } from "../types/resume";

export const STORAGE_KEYS = {
  RESUME_DATA: "resumeData",
  SELECTED_TEMPLATE: "selectedTemplate",
  LAST_EDITED: "lastEdited",
  VERSION: "resumeBuilderVersion",
} as const;

type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

// Current data version - increment this when the data structure changes
const CURRENT_VERSION = "1.0";

/**
 * Save data to local storage
 * @param {StorageKey} key - Storage key
 * @param {T} data - Data to store
 * @returns {boolean} - Success status
 */
export const saveData = <T>(key: StorageKey, data: T): boolean => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
    return true;
  } catch (error) {
    console.error(`Error saving data to localStorage (${key}):`, error);
    return false;
  }
};

/**
 * Load data from local storage
 * @param {StorageKey} key - Storage key
 * @param {T | null} defaultValue - Default value if data doesn't exist
 * @returns {T | null} - Retrieved data or default value
 */
export const loadData = <T>(
  key: StorageKey,
  defaultValue: T | null = null
): T | null => {
  try {
    const serializedData = localStorage.getItem(key);
    if (serializedData === null) return defaultValue;
    return JSON.parse(serializedData) as T;
  } catch (error) {
    console.error(`Error loading data from localStorage (${key}):`, error);
    return defaultValue;
  }
};

/**
 * Remove data from local storage
 * @param {StorageKey} key - Storage key
 * @returns {boolean} - Success status
 */
export const removeData = (key: StorageKey): boolean => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing data from localStorage (${key}):`, error);
    return false;
  }
};

interface ResumeState {
  resumeData: ResumeData;
  selectedTemplate: TemplateId;
  lastEdited: string | null;
}

/**
 * Save the complete resume state
 * @param {ResumeData} resumeData - Resume data object
 * @param {TemplateId} selectedTemplate - Selected template ID
 */
export const saveResumeState = (
  resumeData: ResumeData,
  selectedTemplate: TemplateId
): void => {
  saveData(STORAGE_KEYS.RESUME_DATA, resumeData);
  saveData(STORAGE_KEYS.SELECTED_TEMPLATE, selectedTemplate);
  saveData(STORAGE_KEYS.LAST_EDITED, new Date().toISOString());
  saveData(STORAGE_KEYS.VERSION, CURRENT_VERSION);
};

/**
 * Load the complete resume state
 * @param {ResumeData} defaultResumeData - Default resume data
 * @param {TemplateId} defaultTemplate - Default template ID
 * @returns {ResumeState} - The loaded state
 */
export const loadResumeState = (
  defaultResumeData: ResumeData,
  defaultTemplate: TemplateId
): ResumeState => {
  const storedVersion = loadData<string>(STORAGE_KEYS.VERSION);

  // If there's a version mismatch or no version, use default data
  if (storedVersion !== CURRENT_VERSION) {
    return {
      resumeData: defaultResumeData,
      selectedTemplate: defaultTemplate,
      lastEdited: null,
    };
  }

  return {
    resumeData: loadData<ResumeData>(
      STORAGE_KEYS.RESUME_DATA,
      defaultResumeData
    ) as ResumeData,
    selectedTemplate: loadData<TemplateId>(
      STORAGE_KEYS.SELECTED_TEMPLATE,
      defaultTemplate
    ) as TemplateId,
    lastEdited: loadData<string>(STORAGE_KEYS.LAST_EDITED, null),
  };
};

/**
 * Clear all resume builder data from local storage
 */
export const clearAllData = (): void => {
  Object.values(STORAGE_KEYS).forEach((key) => removeData(key as StorageKey));
};
