import React from "react";

const Education = ({ educationData, setEducationData }) => {
  const handleEducationChange = (index, e) => {
    const { name, value } = e.target;
    const updatedEducation = [...educationData];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [name]: value,
    };

    setEducationData(updatedEducation);
  };

  const addEducation = () => {
    setEducationData([
      ...educationData,
      {
        institution: "",
        degree: "",
        field: "",
        graduationDate: "",
        gpa: "",
      },
    ]);
  };

  const removeEducation = (index) => {
    const updatedEducation = [...educationData];
    updatedEducation.splice(index, 1);
    setEducationData(updatedEducation);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Education</h2>

      {educationData.map((edu, index) => (
        <div
          key={index}
          className="mb-6 pb-6 border-b border-gray-200 last:border-b-0 last:pb-0"
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium text-lg">Education {index + 1}</h3>
            {educationData.length > 1 && (
              <button
                onClick={() => removeEducation(index)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Institution
              </label>
              <input
                type="text"
                name="institution"
                value={edu.institution}
                onChange={(e) => handleEducationChange(index, e)}
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="University of Example"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Degree
                </label>
                <input
                  type="text"
                  name="degree"
                  value={edu.degree}
                  onChange={(e) => handleEducationChange(index, e)}
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="Bachelor of Science"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Field of Study
                </label>
                <input
                  type="text"
                  name="field"
                  value={edu.field}
                  onChange={(e) => handleEducationChange(index, e)}
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="Computer Science"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Graduation Date
                </label>
                <input
                  type="text"
                  name="graduationDate"
                  value={edu.graduationDate}
                  onChange={(e) => handleEducationChange(index, e)}
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="May 2018"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  GPA (optional)
                </label>
                <input
                  type="text"
                  name="gpa"
                  value={edu.gpa}
                  onChange={(e) => handleEducationChange(index, e)}
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="3.8/4.0"
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={addEducation}
        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
      >
        Add Education
      </button>
    </div>
  );
};

export default Education;
