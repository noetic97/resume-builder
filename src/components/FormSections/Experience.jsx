import React from "react";

const Experience = ({ experienceData, setExperienceData }) => {
  const handleExperienceChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    const updatedExperience = [...experienceData];
    updatedExperience[index] = {
      ...updatedExperience[index],
      [name]: newValue,
    };

    // If current position is checked, clear the end date
    if (name === "isCurrentPosition" && checked) {
      updatedExperience[index].endDate = "";
    }

    setExperienceData(updatedExperience);
  };

  const addExperience = () => {
    setExperienceData([
      ...experienceData,
      {
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        description: "",
        isCurrentPosition: false,
      },
    ]);
  };

  const removeExperience = (index) => {
    const updatedExperience = [...experienceData];
    updatedExperience.splice(index, 1);
    setExperienceData(updatedExperience);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Work Experience</h2>

      {experienceData.map((exp, index) => (
        <div
          key={index}
          className="mb-6 pb-6 border-b border-gray-200 last:border-b-0 last:pb-0"
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium text-lg">Position {index + 1}</h3>
            {experienceData.length > 1 && (
              <button
                onClick={() => removeExperience(index)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Company
              </label>
              <input
                type="text"
                name="company"
                value={exp.company}
                onChange={(e) => handleExperienceChange(index, e)}
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Acme Corp"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Position
              </label>
              <input
                type="text"
                name="position"
                value={exp.position}
                onChange={(e) => handleExperienceChange(index, e)}
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Senior Developer"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Start Date
                </label>
                <input
                  type="text"
                  name="startDate"
                  value={exp.startDate}
                  onChange={(e) => handleExperienceChange(index, e)}
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="Jan 2020"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  End Date
                </label>
                <input
                  type="text"
                  name="endDate"
                  value={exp.endDate}
                  onChange={(e) => handleExperienceChange(index, e)}
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="Present"
                  disabled={exp.isCurrentPosition}
                />
                <div className="mt-1 flex items-center">
                  <input
                    type="checkbox"
                    name="isCurrentPosition"
                    checked={exp.isCurrentPosition}
                    onChange={(e) => handleExperienceChange(index, e)}
                    className="mr-2"
                  />
                  <label className="text-sm text-gray-700">
                    Current Position
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={exp.description}
                onChange={(e) => handleExperienceChange(index, e)}
                rows="4"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="• Led development of a new feature that increased user engagement by 25%
• Managed a team of 5 developers"
              />
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={addExperience}
        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
      >
        Add Experience
      </button>
    </div>
  );
};

export default Experience;
