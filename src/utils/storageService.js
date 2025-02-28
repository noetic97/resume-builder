/**
 * Storage service for handling local storage operations
 * This centralizes all storage logic and provides error handling
 */

const STORAGE_KEYS = {
  RESUME_DATA: "resumeData",
  SELECTED_TEMPLATE: "selectedTemplate",
  LAST_EDITED: "lastEdited",
  VERSION: "resumeBuilderVersion",
};

// Current data version - increment this when the data structure changes
const CURRENT_VERSION = "1.0";

/**
 * Save data to local storage
 * @param {string} key - Storage key
 * @param {any} data - Data to store
 * @returns {boolean} - Success status
 */
const saveData = (key, data) => {
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
 * @param {string} key - Storage key
 * @param {any} defaultValue - Default value if data doesn't exist
 * @returns {any} - Retrieved data or default value
 */
const loadData = (key, defaultValue = null) => {
  try {
    const serializedData = localStorage.getItem(key);
    if (serializedData === null) return defaultValue;
    return JSON.parse(serializedData);
  } catch (error) {
    console.error(`Error loading data from localStorage (${key}):`, error);
    return defaultValue;
  }
};

/**
 * Remove data from local storage
 * @param {string} key - Storage key
 * @returns {boolean} - Success status
 */
const removeData = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing data from localStorage (${key}):`, error);
    return false;
  }
};

/**
 * Save the complete resume state
 * @param {object} resumeData - Resume data object
 * @param {string} selectedTemplate - Selected template ID
 */
const saveResumeState = (resumeData, selectedTemplate) => {
  saveData(STORAGE_KEYS.RESUME_DATA, resumeData);
  saveData(STORAGE_KEYS.SELECTED_TEMPLATE, selectedTemplate);
  saveData(STORAGE_KEYS.LAST_EDITED, new Date().toISOString());
  saveData(STORAGE_KEYS.VERSION, CURRENT_VERSION);
};

/**
 * Load the complete resume state
 * @param {object} defaultResumeData - Default resume data
 * @param {string} defaultTemplate - Default template ID
 * @returns {object} - The loaded state { resumeData, selectedTemplate, lastEdited }
 */
const loadResumeState = (defaultResumeData, defaultTemplate) => {
  const storedVersion = loadData(STORAGE_KEYS.VERSION);

  // If there's a version mismatch or no version, use default data
  if (storedVersion !== CURRENT_VERSION) {
    return {
      resumeData: defaultResumeData,
      selectedTemplate: defaultTemplate,
      lastEdited: null,
    };
  }

  return {
    resumeData: loadData(STORAGE_KEYS.RESUME_DATA, defaultResumeData),
    selectedTemplate: loadData(STORAGE_KEYS.SELECTED_TEMPLATE, defaultTemplate),
    lastEdited: loadData(STORAGE_KEYS.LAST_EDITED, null),
  };
};

/**
 * Clear all resume builder data from local storage
 */
const clearAllData = () => {
  Object.values(STORAGE_KEYS).forEach((key) => removeData(key));
};

// Export available functions
export {
  STORAGE_KEYS,
  saveData,
  loadData,
  removeData,
  saveResumeState,
  loadResumeState,
  clearAllData,
};
