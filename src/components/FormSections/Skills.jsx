import React from "react";

const Skills = ({ skillsData, setSkillsData }) => {
  const handleSkillInput = (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      e.preventDefault();
      setSkillsData([...skillsData, e.target.value.trim()]);
      e.target.value = "";
    }
  };

  const removeSkill = (indexToRemove) => {
    setSkillsData(skillsData.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Skills</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Add skills (press Enter after each skill)
        </label>
        <input
          type="text"
          onKeyDown={handleSkillInput}
          className="p-2 w-full border rounded-md"
          placeholder="JavaScript, React, Node.js"
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {skillsData.map((skill, index) => (
          <div
            key={index}
            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center"
          >
            <span>{skill}</span>
            <button
              onClick={() => removeSkill(index)}
              className="ml-2 text-blue-600 hover:text-blue-800"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
