import React from "react";
import { PersonalInfo as PersonalInfoType } from "../../types/resume";

interface PersonalInfoProps {
  personalData: PersonalInfoType;
  setPersonalData: (data: PersonalInfoType) => void;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({
  personalData,
  setPersonalData,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setPersonalData({
      ...personalData,
      [name]: value,
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={personalData.name}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Jane Doe"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Professional Title
          </label>
          <input
            type="text"
            name="title"
            value={personalData.title}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Software Engineer"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={personalData.email}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="jane.doe@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={personalData.phone}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="(555) 123-4567"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={personalData.location}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="San Francisco, CA"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Professional Summary
          </label>
          <textarea
            name="summary"
            value={personalData.summary}
            onChange={handleChange}
            rows={4}
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Experienced software engineer with a passion for developing innovative solutions..."
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
